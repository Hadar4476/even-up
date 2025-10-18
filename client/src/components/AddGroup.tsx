import useResponsive from "@/hooks/useResponsive";

import { Add } from "@mui/icons-material";
import { Box, Button, useTheme } from "@mui/material";

interface AddGroupProps {
  className?: string;
}

const AddGroup = ({ className }: AddGroupProps) => {
  const theme = useTheme();
  const { isMobile } = useResponsive();

  return (
    <Box className={`flex items-end justify-end ${className}`}>
      <Button
        className="!w-[40px] !p-0 md:!px-4 !rounded-full"
        disableRipple={!isMobile}
        size="medium"
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
        <Add className="md:!text-lg" />
        {!isMobile && "New Group"}
      </Button>
    </Box>
  );
};

export default AddGroup;
