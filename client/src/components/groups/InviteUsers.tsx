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
import {
  ArrowBack,
  CheckCircle,
  PersonAdd,
  Search,
  Send,
} from "@mui/icons-material";
import AppModal from "../common/AppModal";
import AppLoader from "../common/AppLoader";
import UserSearchResultItem from "./UserSearchResult";
import useInviteUsers from "./useInviteUsers";

const InviteUsers = () => {
  const theme = useTheme();
  const { isMobile } = useResponsive();
  const {
    isOpen,
    isSuccess,
    state,
    members,
    hasSelectedAll,
    handleOpen,
    handleClose,
    handleQueryChange,
    handleToggleInvitation,
    handleShowAllSelected,
    handleToggleSelectAll,
    handleSendInvitations,
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

  const searchResultsElements = state.users.map((user) => {
    const isChecked = members.some((member) => member._id === user._id);

    return (
      <UserSearchResultItem
        key={user._id}
        result={user}
        isChecked={isChecked}
        emitToggleInvitation={handleToggleInvitation}
      />
    );
  });

  let content = (
    <>
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
          disabled={state.isLoading}
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

      {(state.users.length > 0 || state.searchQuery.trim().length > 0) && (
        <Stack
          className="!flex-row items-center justify-between p-4 h-[50px] md:p-6 md:h-[70px]"
          sx={{
            backgroundColor: theme.palette.background.paper,
          }}
        >
          {!state.isLoading && state.searchQuery.trim().length > 0 && (
            <Typography variant={isMobile ? "regular_14" : "regular_16"}>
              {state.users.length}
              {state.users.length === 1 ? " result " : " results "}
              found
            </Typography>
          )}
          {state.users.length > 0 && (
            <Stack className="!flex-row flex-1 items-center justify-end gap-2">
              {members.length > 0 && (
                <Button
                  className="!font-normal !h-fit !p-0"
                  sx={{ lineHeight: "1px" }}
                  variant="text"
                  size={isMobile ? "small" : "medium"}
                  onClick={handleShowAllSelected}
                >
                  {members.length} selected
                </Button>
              )}
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
          )}
        </Stack>
      )}
      {(state.users.length > 0 || members.length > 0) && (
        <>
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
              onClick={handleSendInvitations}
            >
              <Send />
              Invite
            </Button>
          </Box>
        </>
      )}
    </>
  );

  if (isSuccess) {
    content = (
      <Box className="w-full h-full flex flex-col items-center justify-center">
        <Box className="flex flex-row items-center gap-2">
          <Typography variant="b_38" color="success">
            Success
          </Typography>
          <CheckCircle color="success" fontSize="large" />
        </Box>
        <Typography variant="medium_22">
          Invitations sent successfully!
        </Typography>
      </Box>
    );
  }

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
        className={`w-full h-full outline-none !overflow-y-auto !rounded-none md:max-w-2xl md:max-h-[65%] md:!rounded-xl`}
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
          {content}
        </Stack>
      </AppModal>
    </>
  );
};

export default InviteUsers;
