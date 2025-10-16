import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useResponsive from "@/hooks/useResponsive";
import { useAppSelector } from "@/store";

import { getAllGroups } from "@/services/group";
import commonUtils from "@/utils/common";

import { groupsSelector } from "@/store/reducers/groups";
import { groupsActions } from "@/store/reducers/groups";

import { Stack, Button, Typography } from "@mui/material";
import GroupItem from "@/components/GroupItem";
import AppLoader from "@/components/common/AppLoader";
import AddGroup from "@/components/AddGroup";

const Groups = () => {
  const { isMobile } = useResponsive();
  const { groups, page, hasMore, isLoading } = useAppSelector(groupsSelector);
  const dispatch = useDispatch();

  const [isInitialized, setIsInitialized] = useState(false);

  const isFirstPage = page === 1;
  const limit = isFirstPage ? 11 : 12;

  const fetchGroups = async () => {
    dispatch(groupsActions.setIsLoading(true));
    await commonUtils.sleep(1);

    try {
      const response = await getAllGroups(page, limit);
      const skip = (page - 1) * limit;

      dispatch(groupsActions.setGroups(response.groups));

      const hasMoreGroups = skip + response.groups.length < response.total;

      if (hasMoreGroups) {
        dispatch(groupsActions.setPage(page + 1));
      }

      dispatch(groupsActions.setHasMore(hasMoreGroups));
    } catch (error: any) {
      dispatch(groupsActions.setError(error.message));
    } finally {
      setIsInitialized(true);
      dispatch(groupsActions.setIsLoading(false));
    }
  };

  useEffect(() => {
    if (!groups.length) {
      fetchGroups();
    }
  }, []);

  const groupElements = groups.map((group) => {
    return <GroupItem key={group._id} {...group} />;
  });

  return (
    <Stack className="flex-1 w-full gap-6">
      {isLoading && <AppLoader />}
      {isMobile && <AddGroup />}
      {!isLoading && isInitialized && !groups.length && (
        <Stack className="flex-1 w-full gap-2 md:gap-6 items-center justify-center text-center">
          <Typography variant={isMobile ? "b_16" : "b_24"}>
            Ready to make sharing expenses easier?
          </Typography>
          <Typography variant={isMobile ? "b_14" : "b_20"}>
            Create your first group to start splitting expenses with friends,
            roommates, or travel buddies.
          </Typography>
          {!isMobile && <AddGroup className="w-96" hasGroups={false} />}
        </Stack>
      )}
      {groups.length > 0 && (
        <>
          <div className="w-full grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {!isMobile && <AddGroup />}
            {groupElements}
          </div>
          {hasMore && (
            <Stack className="w-full items-center justify-center">
              <Button
                className="!w-full !h-[60px]"
                size="large"
                onClick={fetchGroups}
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
