import { useEffect } from "react";
import useResponsive from "@/hooks/useResponsive";
import { useAppSelector } from "@/store";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import commonUtils from "@/utils/common";
import { groupsActions, groupsSelector } from "@/store/reducers/groups";
import { getGroup } from "@/services/group";

import { IGroup, ROUTE_NAMES } from "@/types";

import { Button, Stack, useTheme } from "@mui/material";
import AppLoader from "@/components/common/AppLoader";
import GroupEditor from "@/components/groups/GroupEditor";
import { ArrowBack } from "@mui/icons-material";
import InviteUsers from "@/components/groups/InviteUsers";

const SingleGroup = () => {
  const { isMobile } = useResponsive();
  const theme = useTheme();
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: IGroup["_id"] }>();
  const { selectedGroup, isLoading } = useAppSelector(groupsSelector);
  const dispatch = useDispatch();

  const handleGoBack = () => {
    navigate(`/${ROUTE_NAMES.GROUPS}`);
  };

  useEffect(() => {
    const fetchGroup = async () => {
      dispatch(groupsActions.setIsLoading(true));
      await commonUtils.sleep(1);

      try {
        const response = await getGroup(groupId as string);

        if (response) {
          dispatch(groupsActions.setSelectedGroup(response));
          dispatch(groupsActions.setIsInitialized(true));
        }
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
    <Stack className="gap-6 p-6 md:p-8">
      {isMobile && (
        <Button
          className="!absolute top-4 left-0 !w-[40px] !h-[40px] !p-0 md:!px-4 !rounded-full"
          variant="text"
          onClick={handleGoBack}
        >
          <ArrowBack sx={{ color: theme.palette.text.primary }} />
        </Button>
      )}
      <Stack className="!flex-row items-center justify-end gap-4">
        <InviteUsers />
        <GroupEditor group={selectedGroup.group} />
      </Stack>
    </Stack>
  );
};

export default SingleGroup;
