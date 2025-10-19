import { useAppSelector } from "@/store";
import { useParams } from "react-router-dom";

import { groupsActions, groupsSelector } from "@/store/reducers/groups";

import { IGroup } from "@/types";
import { useEffect } from "react";
import AppLoader from "@/components/common/AppLoader";
import { useDispatch } from "react-redux";
import commonUtils from "@/utils/common";
import { getGroup } from "@/services/group";
import { Stack } from "@mui/material";
import GroupEditor from "@/components/groups/GroupEditor";

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
    <Stack>
      <GroupEditor group={selectedGroup.group} />
    </Stack>
  );
};

export default SingleGroup;
