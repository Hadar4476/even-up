import { useEffect } from "react";
import { useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import useResponsive from "@/hooks/useResponsive";

import commonUtils from "@/utils/common";
import { getAllGroups } from "@/services/group";
import { groupsActions, groupsSelector } from "@/store/reducers/groups";

import GroupItem from "@/components/GroupItem";
import AppLoader from "@/components/common/AppLoader";
import { Stack } from "@mui/material";
import AddGroup from "@/components/AddGroup";

const Groups = () => {
  const { isMobile } = useResponsive();
  const { groups, isLoading } = useAppSelector(groupsSelector);
  const disptach = useDispatch();

  useEffect(() => {
    if (!groups.length) {
      const initGroups = async () => {
        disptach(groupsActions.setIsLoading(true));
        await commonUtils.sleep(1);

        try {
          const response = await getAllGroups();

          disptach(groupsActions.initGroups(response));
        } catch (error: any) {
          disptach(groupsActions.setError(error.message));
        } finally {
          disptach(groupsActions.setIsLoading(false));
        }
      };

      initGroups();
    }
  }, []);

  const groupElements = groups.map((group) => {
    return <GroupItem key={group._id} {...group} />;
  });

  if (isLoading) {
    return <AppLoader />;
  }

  return (
    <Stack className="gap-6 md:gap-0">
      {isMobile && <AddGroup />}
      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {!isMobile && <AddGroup />}
        {groupElements}
      </div>
    </Stack>
  );
};

export default Groups;
