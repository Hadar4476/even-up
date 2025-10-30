import useResponsive from "@/hooks/useResponsive";
import useExpenseEdtior from "./useExpenseEdtior";

import { IExpense } from "@/types";

import { Box, Button, Stack, useTheme } from "@mui/material";
import { Add, ArrowBack } from "@mui/icons-material";
import AppModal from "@/components/common/AppModal";

interface ExpenseEditorProps {
  showButton?: boolean;
  isInitiallyOpen?: boolean;
  expense?: IExpense | null;
  emitClose?: () => void;
}

const ExpenseEditor = ({
  showButton = true,
  isInitiallyOpen = false,
  expense,
  emitClose,
}: ExpenseEditorProps) => {
  const theme = useTheme();
  const { isMobile } = useResponsive();
  const { isOpen, isLoading, isSuccess, error, handleOpen, handleClose } =
    useExpenseEdtior(isInitiallyOpen, expense);

  return (
    <>
      {showButton && (
        <Box className="flex items-end justify-end">
          <Button
            className="!px-4 !w-fit gap-1 !rounded-lg"
            disableRipple={!isMobile}
            size="medium"
            onClick={handleOpen}
          >
            <Add className="!text-base" />
            Add Expense
          </Button>
        </Box>
      )}
      <AppModal
        className="w-full h-full !overflow-y-auto !rounded-none md:max-w-xl md:h-auto md:min-h-96 md:!rounded-xl"
        isOpen={isOpen}
        emitClose={() => {
          if (emitClose) {
            emitClose();
          }

          handleClose();
        }}
      >
        <Stack className="w-full h-full">
          {isMobile && (
            <Stack
              className="py-4 px-0 border-b"
              sx={{
                borderColor: theme.palette.border?.default,
              }}
            >
              <Button
                className="!w-[40px] !h-[40px] md:!px-4 !rounded-full"
                variant="text"
                onClick={() => {
                  if (emitClose) {
                    emitClose();
                  }

                  handleClose();
                }}
                disabled={isLoading}
              >
                <ArrowBack sx={{ color: theme.palette.text.primary }} />
              </Button>
            </Stack>
          )}
        </Stack>
      </AppModal>
    </>
  );
};

export default ExpenseEditor;
