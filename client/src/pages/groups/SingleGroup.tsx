import { useEffect, useMemo } from "react";
import useResponsive from "@/hooks/useResponsive";
import { useAppSelector } from "@/store";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import config from "@/config";
import commonUtils from "@/utils/common";
import { groupsActions, groupsSelector } from "@/store/reducers/groups";
import { getGroup } from "@/services/group";

import { IGroup, ROUTE_NAMES } from "@/types";

import {
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import AppLoader from "@/components/common/AppLoader";
import GroupEditor from "@/components/groups/GroupEditor";
import ExpenseEditor from "@/components/groups/expenses/ExpenseEditor";
import InviteUsers from "@/components/groups/InviteUsers";
import GroupInformation from "@/components/groups/GroupInformation";

const SingleGroup = () => {
  const { isMobile } = useResponsive();
  const theme = useTheme();
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: IGroup["_id"] }>();
  const { selectedGroup, isLoading } = useAppSelector(groupsSelector);
  const dispatch = useDispatch();

  const imgUrl = selectedGroup?.group.img
    ? `${config.uploadsUrl}/${selectedGroup?.group.img}`
    : "";

  const avatarColor = selectedGroup
    ? commonUtils.generateAvatarColor(selectedGroup?.group._id)
    : "";

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
        handleGoBack();
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
    <Stack className="relative flex-1 h-full">
      {isMobile && (
        <Stack
          className="!flex-row items-center justify-between py-4 px-0 border-b"
          sx={{
            borderColor: theme.palette.border?.default,
          }}
        >
          <Button
            className="!w-[40px] !h-[40px] md:!px-4 !rounded-full"
            variant="text"
            onClick={handleGoBack}
            disabled={isLoading}
          >
            <ArrowBack sx={{ color: theme.palette.text.primary }} />
          </Button>
          <Box className="px-4">
            <GroupEditor group={selectedGroup.group} />
          </Box>
        </Stack>
      )}
      <Stack className="absolute bottom-0 right-0 p-4 gap-4">
        <InviteUsers />
        <ExpenseEditor />
      </Stack>
      <Stack className="p-6 md:p-8 gap-4">
        <Stack className="!flex-row gap-4">
          <Avatar
            className="!rounded-xl !w-[60px] !h-[60px] object-contain"
            src={imgUrl}
            alt={selectedGroup.group.title}
          >
            {!selectedGroup.group.img && (
              <Box
                className="flex items-center justify-center w-full h-full"
                sx={{
                  backgroundColor: avatarColor,
                }}
              >
                <Typography
                  className="uppercase"
                  variant="b_38"
                  sx={{
                    color: theme.palette.common.white,
                  }}
                >
                  {selectedGroup.group.title[0]}
                </Typography>
              </Box>
            )}
          </Avatar>
          <Stack className="gap-1">
            <Typography variant="b_20">{selectedGroup.group.title}</Typography>
            <Typography
              variant="regular_16"
              color="textSecondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 6,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {selectedGroup.group.description}
            </Typography>
          </Stack>
        </Stack>
        <GroupInformation />
      </Stack>
    </Stack>
  );
};

export default SingleGroup;
