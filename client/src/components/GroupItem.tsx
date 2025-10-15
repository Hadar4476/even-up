import config from "@/config";
import { IGroup } from "@/types";

import { ChevronRight } from "@mui/icons-material";
import { Avatar, Box, Paper, Stack, Typography, useTheme } from "@mui/material";

const GroupItem = ({ title, img, users }: Omit<IGroup, "expenses">) => {
  const theme = useTheme();
  const imgUrl = img ? `${config.uploadsUrl}/${img}` : "";

  return (
    <Paper
      elevation={1}
      className="cursor-pointer !rounded-xl flex items-center justify-between p-2 hover:shadow-md transition-shadow"
    >
      <Box className="flex items-center gap-4 flex-1">
        <Avatar
          className="!rounded-xl !w-[50px] !h-[50px]"
          src={imgUrl}
          alt={title}
          variant="rounded"
        >
          {!img && (
            <Typography
              className="w-full h-full text-center"
              bgcolor={theme.palette.common.white}
              variant="b_38"
            >
              {title.charAt(0).toUpperCase()}
            </Typography>
          )}
        </Avatar>

        <Stack className="flex-1 gap-2">
          <Typography className="truncate capitalize" variant="b_18">
            {title}
          </Typography>
          {users && users.length > 0 && (
            <Typography
              variant="regular_12"
              sx={{
                color: "text.secondary",
              }}
            >
              {users.length} {users.length === 1 ? "member" : "members"}
            </Typography>
          )}
        </Stack>
      </Box>

      <Box className="flex-shrink-0">
        <ChevronRight className="w-6 h-6 text.secondary" />
      </Box>
    </Paper>
  );
};

export default GroupItem;
