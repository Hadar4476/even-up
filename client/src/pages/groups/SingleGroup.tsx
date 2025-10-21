import { useEffect } from "react";
import { useAppSelector } from "@/store";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import commonUtils from "@/utils/common";
import { groupsActions, groupsSelector } from "@/store/reducers/groups";
import { getGroup } from "@/services/group";

import { IGroup } from "@/types";

import { Stack } from "@mui/material";
import AppLoader from "@/components/common/AppLoader";
import GroupEditor from "@/components/groups/GroupEditor";
import SearchUsers from "@/components/groups/SearchUsers";

const SingleGroup = () => {
  const { groupId } = useParams<{ groupId: IGroup["_id"] }>();
  const { selectedGroup, isLoading } = useAppSelector(groupsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGroup = async () => {
      dispatch(groupsActions.setIsLoading(true));
      await commonUtils.sleep(1);

      try {
        const response = await getGroup(groupId as string);

        dispatch(groupsActions.setSelectedGroup(response));
        dispatch(groupsActions.setIsInitialized(true));
      } catch (error: any) {
        dispatch(groupsActions.setError(error.message));
      } finally {
        dispatch(groupsActions.setIsLoading(false));
      }
    };

    if (groupId) {
      fetchGroup();
    }
  }, []);

  if (isLoading) {
    return <AppLoader />;
  }

  if (!selectedGroup) {
    return null;
  }

  return (
    <Stack className="p-6 md:p-8">
      <GroupEditor group={selectedGroup.group} />
      <SearchUsers />
    </Stack>
  );
};

export default SingleGroup;
