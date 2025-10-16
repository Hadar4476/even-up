import { useState, useMemo } from "react";
import useResponsive from "@/hooks/useResponsive";

import config from "@/config";

import { IGroup, ROUTE_NAMES } from "@/types";

import { ChevronRight } from "@mui/icons-material";
import { Avatar, Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router";

const GroupItem = ({ _id, title, img, users }: Omit<IGroup, "expenses">) => {
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const theme = useTheme();

  const [elevation, setElevation] = useState(1);

  const imgUrl = img ? `${config.uploadsUrl}/${img}` : "";

  // Generate a consistent color based on the group ID
  const avatarColor = useMemo(() => {
    // Use the _id to generate a consistent index
    const hash = _id.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    return theme.palette.avatar?.[
      Math.abs(hash) % theme.palette.avatar?.length
    ];
  }, [_id, theme.palette.avatar]);

  const handleClick = () => {
    navigate(`/${ROUTE_NAMES.GROUPS}/${_id}`, { replace: true });
  };

  return (
    <Paper
      className="cursor-pointer !rounded-xl flex items-center justify-between md:items-start p-2 md:p-0 overflow-hidden md:h-60"
      elevation={elevation}
      onMouseEnter={() => setElevation(2)}
      onMouseLeave={() => setElevation(1)}
      onClick={handleClick}
      sx={{
        backgroundColor: theme.palette.background.paper,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: theme.palette.background.hover,
        },
      }}
    >
      <Box className="flex items-center gap-4 md:flex-col md:items-start md:justify-between md:gap-0 md:w-full md:h-full">
        <Avatar
          className="!rounded-xl !w-[50px] !h-[50px] md:!rounded-none md:!w-full md:flex-1"
          src={imgUrl}
          alt={title}
          variant="rounded"
        >
          {!img && (
            <Box
              className="flex items-center justify-center w-full h-full"
              sx={{
                backgroundColor: avatarColor,
              }}
            >
              <Typography
                variant={isMobile ? "b_38" : "b_64"}
                sx={{
                  color: theme.palette.common.white,
                  fontWeight: 600,
                }}
              >
                {title.charAt(0).toUpperCase()}
              </Typography>
            </Box>
          )}
        </Avatar>

        <Stack className="gap-2 md:p-4 md:w-full">
          <Typography
            className="truncate capitalize"
            variant={isMobile ? "b_18" : "b_22"}
            sx={{
              color: theme.palette.text.primary,
            }}
          >
            {title}
          </Typography>
          {users && users.length > 0 && (
            <Typography
              variant={isMobile ? "regular_12" : "regular_16"}
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
        <Box className="flex-shrink-0">
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
