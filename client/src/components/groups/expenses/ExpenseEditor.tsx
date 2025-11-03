import useResponsive from "@/hooks/useResponsive";
import useExpenseEdtior from "./useExpenseEdtior";

import { IExpense } from "@/types";

import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Add, ArrowBack, CheckCircle } from "@mui/icons-material";
import AppModal from "@/components/common/AppModal";
import AppLoader from "@/components/common/AppLoader";

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
  const { formik, isOpen, isLoading, isSuccess, handleOpen, handleClose } =
    useExpenseEdtior(isInitiallyOpen, expense);

  let content = (
    <form
      className="w-full flex-1 flex flex-col gap-6 p-6 md:p-8"
      onSubmit={formik.handleSubmit}
    >
      <Stack className="gap-2">
        <Typography
          className="block text-center"
          component="label"
          variant="regular_16"
          htmlFor="expenseAmount"
          color={
            formik.touched.amount && Boolean(formik.errors.amount)
              ? "error"
              : ""
          }
        >
          Amount
        </Typography>
        <TextField
          id="expenseAmount"
          name="amount"
          type="number"
          placeholder="0.00"
          fullWidth
          value={formik.values.amount || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.amount && Boolean(formik.errors.amount)}
          helperText={formik.touched.amount && formik.errors.amount}
          slotProps={{
            htmlInput: {
              "aria-label": "Amount",
              step: "0.01",
              min: "0.01",
              max: "999999.99",
            },
          }}
          sx={{
            "& .MuiInputBase-input": {
              textAlign: "center",
              fontSize: "38px",
            },
            "& fieldset": {
              border: "none",
              borderBottom: "1px solid",
              borderRadius: "unset",
            },
          }}
        />
      </Stack>

      <Stack className="gap-2">
        <Typography
          component="label"
          variant="regular_16"
          htmlFor="expenseDescription"
          color={
            formik.touched.description && Boolean(formik.errors.description)
              ? "error"
              : ""
          }
        >
          Description
        </Typography>
        <TextField
          id="expenseDescription"
          fullWidth
          multiline
          rows={4}
          name="description"
          placeholder="What did you spend on?"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          slotProps={{
            htmlInput: {
              "aria-label": "Description",
              maxLength: 100,
            },
          }}
        />
      </Stack>

      <Button
        size="large"
        sx={{ height: "56px" }}
        fullWidth
        type="submit"
        disabled={isLoading}
      >
        Confirm
      </Button>
    </form>
  );

  if (isSuccess) {
    content = (
      <Box className="flex-1 w-full h-full flex flex-col items-center justify-center">
        <Box className="flex flex-row items-center gap-2">
          <Typography variant="b_38" color="success">
            Success
          </Typography>
          <CheckCircle color="success" fontSize="large" />
        </Box>
        <Typography variant="md_22">
          {expense ? "Changes have been saved!" : "Expense created!"}
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {isLoading && <AppLoader />}
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
        {content}
      </AppModal>
    </>
  );
};

export default ExpenseEditor;
