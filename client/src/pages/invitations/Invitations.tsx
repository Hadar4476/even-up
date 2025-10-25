import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store";
import useResponsive from "@/hooks/useResponsive";

import {
  getInvitations,
  updateInvitationStatus,
} from "@/services/group-invitation";
import { groupsActions, groupsSelector } from "@/store/reducers/groups";

import { GroupInvitationStatus, IGroupInvitationPopulated } from "@/types";

import { Box, Button, Stack, Typography, useTheme } from "@mui/material";

const Invitations = () => {
  const { isMobile } = useResponsive();
  const theme = useTheme();
  const { groupInvitations, isLoading } = useAppSelector(groupsSelector);
  const dispatch = useDispatch();

  const handleUpdateInvitationStatus = async (
    invitationId: IGroupInvitationPopulated["_id"],
    status: GroupInvitationStatus
  ) => {
    dispatch(groupsActions.setIsLoading(true));

    try {
      const response = await updateInvitationStatus({ invitationId, status });

      dispatch(
        groupsActions.updateGroupInvitation({
          invitationId: invitationId,
          group: response,
          status,
        })
      );
    } catch (error: any) {
      dispatch(groupsActions.setError(error.message));
    } finally {
      dispatch(groupsActions.setIsLoading(false));
    }
  };

  useEffect(() => {
    const loadInvitations = async () => {
      dispatch(groupsActions.setIsLoading(true));

      try {
        const response = await getInvitations();

        if (response) {
          dispatch(groupsActions.initGroupInvitations(response));
        }
      } catch (error: any) {
        dispatch(groupsActions.setError(error.message));
      } finally {
        dispatch(groupsActions.setIsLoading(false));
      }
    };

    loadInvitations();
  }, []);

  const invitationElements = groupInvitations.map((invitation) => {
    const { _id, group, from } = invitation;
    const hash = _id.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    const avatarColor =
      theme.palette.avatar?.[Math.abs(hash) % theme.palette.avatar?.length];

    return (
      <Stack
        key={_id}
        className="!flex-row gap-8 border-b p-4"
        sx={{
          borderColor: theme.palette.border?.default,
        }}
      >
        <Box
          className="!w-[40px] !h-[40px] flex items-center justify-center rounded-full"
          sx={{
            backgroundColor: avatarColor,
          }}
        >
          <Typography
            className="uppercase"
            color="secondary"
            variant="b_20"
            sx={{
              color: theme.palette.common.white,
            }}
          >
            {from.name[0]}
          </Typography>
        </Box>
        <Stack className="flex-1 w-full gap-4">
          <Box className="flex flex-wrap items-center gap-1">
            <Typography variant="b_16">{from.name}</Typography>
            <Typography>invited you to join</Typography>
            <Typography className="capitalize" color="primary.main">
              {group.title}
            </Typography>
          </Box>
          <Stack className="flex-1 w-full !flex-row gap-3">
            <Button
              fullWidth
              onClick={() =>
                handleUpdateInvitationStatus(
                  _id,
                  GroupInvitationStatus.ACCEPTED
                )
              }
            >
              Accept
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() =>
                handleUpdateInvitationStatus(
                  _id,
                  GroupInvitationStatus.DECLINED
                )
              }
            >
              Decline
            </Button>
          </Stack>
        </Stack>
      </Stack>
    );
  });

  return (
    <Stack className="flex-1 w-full m-auto md:p-8 max-w-[500px]">
      {invitationElements}
    </Stack>
  );
};

export default Invitations;
