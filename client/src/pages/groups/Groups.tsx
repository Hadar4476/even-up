import { useCallback, useEffect, useState } from "react";
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
import GroupItem from "@/components/GroupItem";
import AppLoader from "@/components/common/AppLoader";
import AddGroup from "@/components/AddGroup";

const Groups = () => {
  const { isMobile } = useResponsive();
  const theme = useTheme();
  const { groups, page, hasMore, isLoading } = useAppSelector(groupsSelector);
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  const limit = page === 1 ? 11 : 12;
  const skip = (page - 1) * limit;

  const fetchGroups = async (shouldAppend?: boolean) => {
    dispatch(groupsActions.setIsLoading(true));
    await commonUtils.sleep(1);

    try {
      const response = await getAllGroups(page, limit);

      if (shouldAppend) {
        dispatch(groupsActions.appendGroups(response.groups));
      } else {
        dispatch(groupsActions.setGroups(response.groups));
      }

      const hasMoreGroups = skip + response.groups.length < response.total;

      if (hasMoreGroups) {
        dispatch(groupsActions.setPage(page + 1));
      }

      dispatch(groupsActions.setHasMore(hasMoreGroups));
    } catch (error: any) {
      dispatch(groupsActions.setError(error.message));
    } finally {
      dispatch(groupsActions.setIsLoading(false));
    }
  };

  const handleSearchGroups = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      return;
    }

    dispatch(groupsActions.setIsLoading(true));
    await commonUtils.sleep(1);

    try {
      const response = await searchGroups(searchQuery, page, limit);

      console.log({ response });

      // dispatch(groupsActions.setGroups(response.groups));

      const hasMoreGroups = skip + response.groups.length < response.total;

      if (hasMoreGroups) {
        dispatch(groupsActions.setPage(page + 1));
      }

      dispatch(groupsActions.setHasMore(hasMoreGroups));
    } catch (error: any) {
      dispatch(groupsActions.setError(error.message));
    } finally {
      dispatch(groupsActions.setIsLoading(false));
    }
  }, []);

  useEffect(() => {
    if (!groups.length) {
      fetchGroups();
    }
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearchGroups(query);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [query, handleSearchGroups]);

  const groupElements = groups.map((group) => {
    return <GroupItem key={group._id} {...group} />;
  });

  return (
    <Stack className="flex-1 w-full gap-6">
      {isLoading && <AppLoader />}
      {isMobile && <AddGroup />}
      {!isLoading && !groups.length && (
        <Stack className="flex-1 w-full gap-2 md:gap-6 items-center justify-center text-center">
          <Typography
            variant={isMobile ? "b_16" : "b_24"}
            sx={{
              color: theme.palette.primary.main,
            }}
          >
            Ready to make sharing expenses easier?
          </Typography>
          <Typography variant={isMobile ? "b_14" : "b_16"}>
            Create your first group to start splitting expenses with friends,
            roommates, or travel buddies.
          </Typography>
          {!isMobile && <AddGroup className="w-96" />}
        </Stack>
      )}
      {groups.length > 0 && (
        <>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search your groups"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                ),
              },
            }}
          />
          <div className="w-full grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {!isMobile && <AddGroup hasGroups />}
            {groupElements}
          </div>
          {hasMore && (
            <Stack className="w-full items-center justify-center">
              <Button
                className="!w-full !h-[60px]"
                size="large"
                onClick={() => fetchGroups(true)}
              >
                Load More
              </Button>
            </Stack>
          )}
        </>
      )}
    </Stack>
  );
};

export default Groups;
