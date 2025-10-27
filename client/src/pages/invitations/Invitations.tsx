import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store";
import useResponsive from "@/hooks/useResponsive";

import {
  getInvitations,
  updateInvitationStatus,
} from "@/services/group-invitation";
import { groupsActions, groupsSelector } from "@/store/reducers/groups";
import commonUtils from "@/utils/common";

import { GroupInvitationStatus, IGroupInvitationPopulated } from "@/types";

import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import AppLoader from "@/components/common/AppLoader";

const Invitations = () => {
  const { isMobile } = useResponsive();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { groupInvitationsData, isLoading } = useAppSelector(groupsSelector);
  const { invitations, pagination } = groupInvitationsData;
  const { page, limit, hasMore } = pagination;

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

    if (bottom) {
      loadMoreInvitations();
    }
  };

  const handleUpdateInvitationStatus = async (
    invitationId: IGroupInvitationPopulated["_id"],
    status: GroupInvitationStatus
  ) => {
    dispatch(groupsActions.setIsLoading(true));
    await commonUtils.sleep(1);

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

  const fetchInvitations = useCallback(async () => {
    dispatch(groupsActions.setIsLoading(true));
    await commonUtils.sleep(1);

    try {
      const response = await getInvitations(1, limit);

      if (response) {
        dispatch(groupsActions.setGroupInvitationsData(response));
      }
    } catch (error: any) {
      dispatch(groupsActions.setError(error.message));
    } finally {
      dispatch(groupsActions.setIsLoading(false));
    }
  }, [dispatch, limit]);

  const loadMoreInvitations = useCallback(async () => {
    if (isLoading || !hasMore) return;

    dispatch(groupsActions.setIsLoading(true));
    await commonUtils.sleep(1);

    try {
      const response = await getInvitations(page + 1, limit);

      if (response) {
        dispatch(groupsActions.appendGroupInvitationData(response));
      }
    } catch (error: any) {
      dispatch(groupsActions.setError(error.message));
    } finally {
      dispatch(groupsActions.setIsLoading(false));
    }
  }, [dispatch, page, limit, isLoading, hasMore]);

  useEffect(() => {
    fetchInvitations();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  const invitationElements = invitations.map((invitation) => {
    const { _id, group, from } = invitation;

    const avatarColor = commonUtils.generateAvatarColor(from._id);

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
              disabled={isLoading}
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
              disabled={isLoading}
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
      {isLoading && (
        <Stack className="w-full items-center justify-center">
          <AppLoader />
        </Stack>
      )}

      {invitations.length === 0 && !isLoading && (
        <Stack className="flex-1 w-full gap-2 items-center justify-center text-center py-12">
          <Typography
            variant={isMobile ? "b_16" : "b_20"}
            sx={{ color: theme.palette.text.secondary }}
          >
            Your invitation inbox is empty
          </Typography>
          <Typography
            variant={isMobile ? "b_14" : "b_16"}
            sx={{ color: theme.palette.text.secondary }}
          >
            You haven't received any invitations yet.
          </Typography>
          <Typography
            variant={isMobile ? "b_14" : "b_16"}
            sx={{ color: theme.palette.text.secondary }}
          >
            Check back later!
          </Typography>
        </Stack>
      )}

      {invitations.length > 0 && (
        <Box
          className="flex flex-wrap items-center gap-1 border-b p-4"
          sx={{
            borderColor: theme.palette.border?.default,
          }}
        >
          <Typography variant={isMobile ? "regular_16" : "regular_18"}>
            You have
          </Typography>
          <Typography
            variant={isMobile ? "regular_16" : "regular_18"}
            color="primary.main"
          >
            {invitations.length +
              " pending " +
              (invitations.length === 1 ? "invitation" : "invitations")}
          </Typography>
        </Box>
      )}
      {invitationElements}
    </Stack>
  );
};

export default Invitations;
