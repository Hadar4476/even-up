import { IGroup } from "@/types";
import { ChevronRight } from "@mui/icons-material";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";

const GroupItem = ({
  _id,
  title,
  description,
  img,
  users,
  createdAt,
  updatedAt,
}: Omit<IGroup, "expenses">) => {
  return (
    <Paper
      elevation={1}
      className="cursor-pointer flex items-center justify-between p-2 hover:shadow-md transition-shadow"
      sx={{
        border: "1px solid",
        borderColor: "grey.100",
      }}
    >
      <Box className="flex flex-row items-center gap-4 flex-1 min-w-0">
        {/* Group Avatar */}
        <Avatar
          src={img}
          alt={title}
          variant="rounded"
          sx={{
            width: 64,
            height: 64,
            bgcolor: "primary.50",
            color: "primary.600",
            fontSize: "1.5rem",
            fontWeight: 600,
          }}
        >
          {!img && title.charAt(0).toUpperCase()}
        </Avatar>

        {/* Group Info */}
        <Box className="flex-1 min-w-0">
          <Typography
            variant="h6"
            component="h3"
            className="truncate"
            sx={{
              fontWeight: 600,
              fontSize: "1rem",
              color: "text.primary",
            }}
          >
            {title}
          </Typography>
          {users && users.length > 0 && (
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mt: 0.5,
              }}
            >
              {users.length} {users.length === 1 ? "member" : "members"}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Chevron Icon */}
      <Box className="flex-shrink-0 ml-3">
        <ChevronRight className="w-6 h-6 text-gray-400" />
      </Box>
    </Paper>
  );
};

export default GroupItem;
