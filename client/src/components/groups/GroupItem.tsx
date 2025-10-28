import { useMemo } from "react";
import useResponsive from "@/hooks/useResponsive";
import { useNavigate } from "react-router";

import config from "@/config";
import commonUtils from "@/utils/common";

import { GroupWithoutExpenses, ROUTE_NAMES } from "@/types";

import { Avatar, Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";

const GroupItem = ({ _id, title, img, users }: GroupWithoutExpenses) => {
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const theme = useTheme();

  const imgUrl = img ? `${config.uploadsUrl}/${img}` : "";

  const avatarColor = useMemo(
    () => commonUtils.generateAvatarColor(_id),
    [_id]
  );

  const handleClick = () => {
    navigate(`/${ROUTE_NAMES.GROUPS}/${_id}`);
  };

  return (
    <Paper
      className="cursor-pointer !rounded-xl flex items-center justify-between md:items-start md:p-0 overflow-hidden h-[72px] md:h-60"
      onClick={handleClick}
      sx={{
        backgroundColor: theme.palette.background.paper,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: theme.palette.background.hover,
        },
      }}
    >
      <Box className="flex items-center gap-4 p-2 md:p-0 md:flex-col md:items-start md:justify-between md:gap-0 md:w-full md:h-full">
        <Avatar
          className="!rounded-xl !w-[50px] !h-[50px] object-contain md:!rounded-none md:!w-full md:flex-1"
          src={imgUrl}
          alt={title}
        >
          {!img && (
            <Box
              className="flex items-center justify-center w-full h-full"
              sx={{
                backgroundColor: avatarColor,
              }}
            >
              <Typography
                className="uppercase"
                variant={isMobile ? "b_20" : "b_64"}
                sx={{
                  color: theme.palette.common.white,
                }}
              >
                {title[0]}
              </Typography>
            </Box>
          )}
        </Avatar>

        <Stack className="gap-2 md:p-4 md:w-full">
          <Typography
            className="truncate capitalize"
            variant={isMobile ? "b_16" : "b_18"}
            sx={{
              color: theme.palette.text.primary,
            }}
          >
            {title}
          </Typography>
          {users && users.length > 0 && (
            <Typography
              variant={isMobile ? "regular_12" : "regular_14"}
              sx={{
                color: theme.palette.text.secondary,
              }}
            >
              {users.length} {users.length === 1 ? "member" : "members"}
            </Typography>
          )}
        </Stack>
      </Box>

      {isMobile && (
        <Box className="flex-shrink-0 px-2">
          <ChevronRight
            className="w-6 h-6"
            sx={{ color: theme.palette.text.secondary }}
          />
        </Box>
      )}
    </Paper>
  );
};

export default GroupItem;
