import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import useResponsive from "@/hooks/useResponsive";
import { useAppSelector } from "@/store";

import { getAllGroups, searchGroups } from "@/services/group";
import commonUtils from "@/utils/common";

import { groupsSelector } from "@/store/reducers/groups";
import { groupsActions } from "@/store/reducers/groups";

import {
  Stack,
  Button,
  Typography,
  useTheme,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import GroupItem from "@/components/groups/GroupItem";
import AppLoader from "@/components/common/AppLoader";
import GroupEditor from "@/components/groups/GroupEditor";

const Groups = () => {
  const { isMobile } = useResponsive();
  const theme = useTheme();
  const { groupsData, searchQuery, isLoading, isInitialized } =
    useAppSelector(groupsSelector);
  const { groups, pagination } = groupsData;
  const { page, limit, hasMore } = pagination;

  const dispatch = useDispatch();

  const fetchGroups = useCallback(async () => {
    dispatch(groupsActions.setIsLoading(true));
    await commonUtils.sleep(1);

    try {
      const response = await getAllGroups(1, limit);

      if (response) {
        dispatch(groupsActions.setGroupsData(response));
        dispatch(groupsActions.setIsInitialized(true));
      }
    } catch (error: any) {
      dispatch(groupsActions.setError(error.message));
    } finally {
      dispatch(groupsActions.setIsLoading(false));
    }
  }, [dispatch, limit]);

  const loadMoreGroups = useCallback(async () => {
    if (isLoading || !hasMore) return;

    dispatch(groupsActions.setIsLoading(true));
    await commonUtils.sleep(1);

    try {
      const response = await getAllGroups(page + 1, limit);

      if (response) {
        dispatch(groupsActions.appendGroupsData(response));
      }
    } catch (error: any) {
      dispatch(groupsActions.setError(error.message));
    } finally {
      dispatch(groupsActions.setIsLoading(false));
    }
  }, [dispatch, page, limit, isLoading, hasMore]);

  const handleSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) return;

      dispatch(groupsActions.setIsLoading(true));
      await commonUtils.sleep(1);

      try {
        const response = await searchGroups(query, 1, limit);

        if (response) {
          dispatch(groupsActions.setGroupsData(response));
        }
      } catch (error: any) {
        dispatch(groupsActions.setError(error.message));
      } finally {
        dispatch(groupsActions.setIsLoading(false));
      }
    },
    [dispatch, limit]
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    dispatch(groupsActions.setSearchQuery(value));

    if (!value.trim()) {
      fetchGroups();
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) return;

    const timer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, handleSearch]);

  useEffect(() => {
    return () => {
      dispatch(groupsActions.setSearchQuery(""));
      dispatch(groupsActions.setIsInitialized(false));
    };
  }, [dispatch]);

  if (!isInitialized && isLoading) {
    return <AppLoader />;
  }

  if (!isInitialized) {
    return null;
  }

  const groupElements = groups.map((group) => (
    <GroupItem key={group._id} {...group} />
  ));

  const isSearching = searchQuery.trim().length > 0;
  const hasNoGroups = groups.length === 0 && !isLoading;

  return (
    <Stack className="flex-1 w-full gap-6 p-6 md:p-8">
      <GroupEditor />

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
        placeholder="Search your groups"
        value={searchQuery}
        disabled={isLoading}
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

      {hasNoGroups && (
        <Stack className="flex-1 w-full gap-2 items-center justify-center text-center py-12">
          <Typography
            variant={isMobile ? "b_16" : "b_20"}
            sx={{ color: theme.palette.text.secondary }}
          >
            {isSearching
              ? "No groups found"
              : "Ready to make sharing expenses easier?"}
          </Typography>
          <Typography
            variant={isMobile ? "b_14" : "b_16"}
            sx={{ color: theme.palette.text.secondary }}
          >
            {isSearching
              ? "Try a different search term"
              : "Create your first group to start splitting expenses with friends, roommates or travel buddies."}
          </Typography>
        </Stack>
      )}

      {groups.length > 0 && (
        <>
          <div className="w-full grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {groupElements}
          </div>

          {hasMore && (
            <Stack className="w-full items-center justify-center">
              <Button
                className="!w-full !h-[60px]"
                size="large"
                onClick={loadMoreGroups}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Load More"}
              </Button>
            </Stack>
          )}
        </>
      )}
      {isLoading && (
        <Stack className="w-full items-center justify-center py-4">
          <AppLoader />
        </Stack>
      )}
    </Stack>
  );
};

export default Groups;
