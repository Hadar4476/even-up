import { useEffect, useRef } from "react";
import useResponsive from "@/hooks/useResponsive";

import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { ArrowBack, PersonAdd, Search, Send } from "@mui/icons-material";
import AppModal from "../common/AppModal";
import AppLoader from "../common/AppLoader";
import UserSearchResultItem from "./UserSearchResult";
import useInviteUsers from "./useInviteUsers";

const InviteUsers = () => {
  const theme = useTheme();
  const { isMobile } = useResponsive();
  const {
    isOpen,
    state,
    members,
    hasSelectedAll,
    handleOpen,
    handleClose,
    handleQueryChange,
    handleToggleInvitation,
    handleToggleSelectAll,
    loadMoreResults,
  } = useInviteUsers();

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      const scrollThreshold = 5;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

      if (distanceFromBottom <= scrollThreshold && !state.isLoading) {
        loadMoreResults();
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [state.isLoading]);

  const searchResultsElements = state.users.map((user) => (
    <UserSearchResultItem
      key={user._id}
      result={user}
      isChecked={members.includes(user._id)}
      emitToggleInvitation={handleToggleInvitation}
    />
  ));

  return (
    <>
      {state.isLoading && <AppLoader />}
      <Box className="flex items-end justify-end">
        <Button
          className="!w-[40px] !p-0 md:!w-fit md:flex md:gap-1 md:!px-4 !rounded-full"
          disableRipple={!isMobile}
          variant="outlined"
          size="medium"
          onClick={handleOpen}
        >
          <PersonAdd className="md:!text-lg" />
          {!isMobile && "Invite Users"}
        </Button>
      </Box>
      <AppModal
        className="w-full h-full !overflow-y-auto !rounded-none md:max-w-2xl md:max-h-[70%] md:!rounded-xl"
        isOpen={isOpen}
        emitClose={handleClose}
      >
        <Stack className="w-full h-full">
          {isMobile && (
            <Stack
              className="py-4 px-0 border-b"
              sx={{
                borderColor: theme.palette.border?.default,
              }}
            >
              <Button
                className="!w-[40px] !h-[40px] md:!px-4 !rounded-full"
                variant="text"
                onClick={handleClose}
                disabled={state.isLoading}
              >
                <ArrowBack sx={{ color: theme.palette.text.primary }} />
              </Button>
            </Stack>
          )}
          <Stack className="p-4 md:p-6">
            <TextField
              sx={{
                "> .MuiInputBase-root": {
                  borderRadius: 100,
                  height: isMobile ? "48px" : "56px",

                  "> input": {
                    height: "100%",
                    paddingY: 0,
                    paddingX: "20px",
                  },
                },
              }}
              fullWidth
              variant="outlined"
              placeholder="Search members to invite"
              value={state.searchQuery}
              onChange={handleQueryChange}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end" sx={{ paddingX: "6px" }}>
                      <Search />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Stack>

          {state.users.length > 0 && (
            <>
              <Stack
                className="!flex-row items-center justify-between p-4 md:p-6"
                sx={{
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Typography variant={isMobile ? "regular_14" : "regular_16"}>
                  {state.users.length} results found
                </Typography>
                <Stack className="!flex-row items-center gap-2">
                  <Typography
                    color="primary.main"
                    variant={isMobile ? "regular_14" : "regular_16"}
                  >
                    {members.length} selected
                  </Typography>
                  <Button
                    className="!font-normal !h-fit !p-0"
                    sx={{ lineHeight: "1px" }}
                    variant="text"
                    size={isMobile ? "small" : "medium"}
                    onClick={handleToggleSelectAll}
                  >
                    {hasSelectedAll ? "Unselect All" : "Select All"}
                  </Button>
                </Stack>
              </Stack>

              <Stack
                className="w-full h-full flex-1 overflow-y-auto"
                ref={containerRef}
              >
                {searchResultsElements}
              </Stack>
              <Box
                className="p-4 border-t"
                sx={{
                  borderColor: theme.palette.border?.default,
                }}
              >
                <Button
                  className="gap-1"
                  fullWidth
                  size="large"
                  disabled={state.isLoading}
                >
                  <Send />
                  Invite
                  {members.length > 0 ? `(${members.length})` : ""}
                </Button>
              </Box>
            </>
          )}
        </Stack>
      </AppModal>
    </>
  );
};

export default InviteUsers;
