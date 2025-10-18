import { useState } from "react";
import useResponsive from "@/hooks/useResponsive";

import { Box, Button } from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import AppModal from "./common/AppModal";

const AddGroup = () => {
  const { isMobile } = useResponsive();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGroupEditor = () => {
    setIsOpen(true);

    document.body.style.overflow = "hidden";
  };

  const handleCloseGroupEditor = () => {
    setIsOpen(false);

    document.body.style.overflow = "unset";
  };

  return (
    <>
      <AppModal
        className="w-full h-full md:max-w-xl md:h-auto md:min-h-0 !rounded-none"
        isOpen={isOpen}
        emitClose={handleCloseGroupEditor}
      >
        {isMobile && (
          <Box className="flex items-end justify-end">
            <Button
              className="!w-[40px] !p-0 md:!px-4 !rounded-full"
              onClick={handleCloseGroupEditor}
              variant="outlined"
            >
              <Close className="md:!text-lg" />
            </Button>
          </Box>
        )}
      </AppModal>
      <Box className="flex items-end justify-end">
        <Button
          className="!w-[40px] !p-0 md:!px-4 !rounded-full"
          disableRipple={!isMobile}
          size="medium"
          onClick={handleOpenGroupEditor}
        >
          <Add className="md:!text-lg" />
          {!isMobile && "New Group"}
        </Button>
      </Box>
    </>
  );
};

export default AddGroup;
