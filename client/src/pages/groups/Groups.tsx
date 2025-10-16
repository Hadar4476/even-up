import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useResponsive from "@/hooks/useResponsive";
import { useAppSelector } from "@/store";

import { getAllGroups } from "@/services/group";
import commonUtils from "@/utils/common";

import { groupsSelector } from "@/store/reducers/groups";
import { groupsActions } from "@/store/reducers/groups";

import { Stack, Button } from "@mui/material";
import GroupItem from "@/components/GroupItem";
import AppLoader from "@/components/common/AppLoader";
import AddGroup from "@/components/AddGroup";

const Groups = () => {
  const { isMobile } = useResponsive();
  const { groups, page, hasMore, isLoading } = useAppSelector(groupsSelector);
  const dispatch = useDispatch();

  const isFirstPage = page === 1;
  const limit = isFirstPage ? 11 : 12;

  const fetchGroups = async () => {
    dispatch(groupsActions.setIsLoading(true));
    await commonUtils.sleep(1);

    try {
      const response = await getAllGroups(page, limit);
      const skip = (page - 1) * limit;

      dispatch(groupsActions.setGroups(response.groups));
      dispatch(groupsActions.setPage(page + 1));
      dispatch(
        groupsActions.setHasMore(skip + response.groups.length < response.total)
      );
    } catch (error: any) {
      dispatch(groupsActions.setError(error.message));
    } finally {
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
    <Stack className="gap-6">
      {isLoading && <AppLoader />}
      {isMobile && <AddGroup />}
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {!isMobile && !isFirstPage && <AddGroup />}
        {groupElements}
      </div>
      {hasMore && (
        <Stack className="items-center justify-center">
          <Button
            className="!w-full md:!rounded-full"
            size="large"
            onClick={fetchGroups}
          >
            Load More
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default Groups;
