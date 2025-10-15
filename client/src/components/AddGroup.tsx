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
    >
      <Add
        className="md:!text-2xl"
        sx={{ color: theme.palette.text.primary }}
      />
    </Button>
  );

  const AddGroupMobile = (
    <Box className="flex items-end justify-end">{AddGroupButton}</Box>
  );

  const AddGroupDesktop = (
    <Paper
      className="cursor-pointer h-[200px] flex flex-col items-center justify-center gap-2 !rounded-xl border border-dashed"
      elevation={elevation}
      onMouseEnter={() => setElevation(2)}
      onMouseLeave={() => setElevation(1)}
    >
      {AddGroupMobile}
      <Typography variant="b_22">Create New Group</Typography>
    </Paper>
  );

  return isMobile ? AddGroupMobile : AddGroupDesktop;
};

export default AddGroup;
