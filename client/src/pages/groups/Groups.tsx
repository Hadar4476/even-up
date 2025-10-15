import { useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import { groupsActions, groupsSelector } from "@/store/reducers/groups";
import { useEffect } from "react";

import { getAllGroups } from "@/services/group";

import GroupItem from "@/components/GroupItem";
import AppLoader from "@/components/common/AppLoader";

const Groups = () => {
  const { groups, isLoading } = useAppSelector(groupsSelector);
  const disptach = useDispatch();

  useEffect(() => {
    if (!groups.length) {
      disptach(groupsActions.setIsLoading(true));

      const initGroups = async () => {
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
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {groupElements}
    </div>
  );
};

export default Groups;
