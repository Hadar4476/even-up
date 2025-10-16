import { useState } from "react";
import useResponsive from "@/hooks/useResponsive";

import { Add } from "@mui/icons-material";
import { Box, Button, Paper, Typography, useTheme } from "@mui/material";

const AddGroup = () => {
  const theme = useTheme();
  const { isMobile } = useResponsive();

  const [elevation, setElevation] = useState(1);

  const AddGroupButton = (
    <Button
      className="!w-[48px] !h-[48px] !rounded-full !p-0"
      disableRipple={!isMobile}
      sx={{
        backgroundColor: theme.palette.primary.main,
        color:
          theme.palette.mode === "dark"
            ? theme.palette.background.default
            : theme.palette.common.white,
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
        },
      }}
    >
      <Add className="md:!text-2xl" />
    </Button>
  );

  const AddGroupMobile = (
    <Box className="flex items-end justify-end">{AddGroupButton}</Box>
  );

  const AddGroupDesktop = (
    <Paper
      className="cursor-pointer h-[240px] flex flex-col items-center justify-center gap-2 !rounded-xl border border-dashed"
      elevation={elevation}
      onMouseEnter={() => setElevation(2)}
      onMouseLeave={() => setElevation(1)}
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderColor: theme.palette.border?.default,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: theme.palette.background.hover,
          borderColor: theme.palette.border?.hover,
        },
      }}
    >
      {AddGroupButton}
      <Typography
        variant="b_22"
        sx={{
          color: theme.palette.text.primary,
        }}
      >
        Create New Group
      </Typography>
    </Paper>
  );

  return isMobile ? AddGroupMobile : AddGroupDesktop;
};

export default AddGroup;
