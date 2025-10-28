import { useCallback, useEffect, useReducer, useState } from "react";
import useResponsive from "@/hooks/useResponsive";
import { useAppSelector } from "@/store";

import commonUtils from "@/utils/common";
import { searchUsers } from "@/services/group";
import { groupsSelector } from "@/store/reducers/groups";
import {
  initialUsersSearchResultsState,
  usersSearchResultsActions,
  usersSearchResultsReducer,
} from "@/reducers/usersSearchResultsReducer";

import {
  Box,
  Button,
  InputAdornment,
  TextField,
  useTheme,
} from "@mui/material";
import { ArrowBack, PersonAdd, Search } from "@mui/icons-material";
import AppModal from "../common/AppModal";

const InviteUsers = () => {
  const theme = useTheme();
  const [state, dispatch] = useReducer(
    usersSearchResultsReducer,
    initialUsersSearchResultsState
  );
  const { selectedGroup } = useAppSelector(groupsSelector);
  const { isMobile } = useResponsive();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);

    document.body.style.overflow = "hidden";
  };

  const handleClose = async () => {
    if (state.isLoading) return;
    setIsOpen(false);

    await commonUtils.sleep(1);

    document.body.style.overflow = "unset";
  };

  const handleSearch = useCallback(
    async (query: string) => {
      if (!selectedGroup?.group._id || !query.trim()) return;

      dispatch(usersSearchResultsActions.setIsLoading(true));
      await commonUtils.sleep(1);

      try {
        const response = await searchUsers(
          selectedGroup.group._id,
          query,
          1,
          state.pagination.limit
        );

        if (response) {
          const { users, pagination } = response;

          dispatch(usersSearchResultsActions.setSearchResults(users));
          dispatch(usersSearchResultsActions.setPagination(pagination));
        }
      } catch (error: any) {
        dispatch(usersSearchResultsActions.setError(error.message));
      } finally {
        dispatch(usersSearchResultsActions.setIsLoading(false));
      }
    },
    [selectedGroup?.group._id, state.pagination.limit]
  );

  const loadMoreResults = useCallback(
    async (query: string) => {
      if (!selectedGroup?.group._id || !query.trim()) return;

      dispatch(usersSearchResultsActions.setIsLoading(true));
      await commonUtils.sleep(1);

      try {
        const response = await searchUsers(
          selectedGroup.group._id,
          query,
          state.pagination.page + 1,
          state.pagination.limit
        );

        if (response) {
          const { users, pagination } = response;

          dispatch(usersSearchResultsActions.setSearchResults(users));
          dispatch(usersSearchResultsActions.setPagination(pagination));
        }
      } catch (error: any) {
        dispatch(usersSearchResultsActions.setError(error.message));
      } finally {
        dispatch(usersSearchResultsActions.setIsLoading(false));
      }
    },
    [selectedGroup?.group._id, state.pagination.page, state.pagination.limit]
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    dispatch(usersSearchResultsActions.setSearchQuery(value));
  };

  useEffect(() => {
    if (!state.searchQuery.trim()) return;

    const timer = setTimeout(() => {
      handleSearch(state.searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [state.searchQuery, handleSearch]);

  return (
    <>
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
        className="w-full h-full !overflow-y-auto !rounded-none md:max-w-xl md:h-auto md:min-h-96 md:!rounded-xl"
        isOpen={isOpen}
        emitClose={handleClose}
      >
        <Box className="flex flex-row p-6 pt-16 relative items-center justify-center md:justify-start md:px-8">
          {isMobile && (
            <Button
              className="!absolute top-4 left-0 !w-[40px] !h-[40px] p-2 md:!px-4 !rounded-full"
              variant="text"
              onClick={handleClose}
              disabled={state.isLoading}
            >
              <ArrowBack sx={{ color: theme.palette.text.primary }} />
            </Button>
          )}
          <TextField
            sx={{
              "> .MuiInputBase-root": {
                borderRadius: 100,

                "> input": {
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
        </Box>
      </AppModal>
    </>
  );
};

export default InviteUsers;
