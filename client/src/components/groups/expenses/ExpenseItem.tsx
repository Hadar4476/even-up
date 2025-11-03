import { IExpense } from "@/types";
import commonUtils from "@/utils/common";
import { Circle } from "@mui/icons-material";
import {
  Box,
  ButtonBase,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

interface ExpenseItemProps {
  expense: IExpense;
  emitClick: (expense: IExpense) => void;
}

const ExpenseItem = ({ expense, emitClick }: ExpenseItemProps) => {
  const theme = useTheme();
  const { amount, description, user, updatedAt } = expense;

  const avatarColor = commonUtils.generateAvatarColor(user._id);
  const formattedUpdateAt = commonUtils.formatDate(updatedAt.toString());

  return (
    <Paper
      className="cursor-pointer p-4 outline-none !rounded-xl flex items-center gap-3 overflow-hidden"
      onClick={() => emitClick(expense)}
      sx={{
        backgroundColor: theme.palette.background.paper,
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          backgroundColor: theme.palette.background.hover,
        },
      }}
    >
      <Box
        className="!w-[40px] !h-[40px] flex items-center justify-center rounded-full"
        sx={{
          backgroundColor: avatarColor,
        }}
      >
        <Typography
          className="uppercase"
          color="secondary"
          variant="b_20"
          sx={{
            color: theme.palette.common.white,
          }}
        >
          {user.name[0]}
        </Typography>
      </Box>
      <Stack className="flex-1">
        <Typography>{description}</Typography>
        <Stack className="!flex-row gap-1 items-center">
          <Typography variant="regular_14" color="textSecondary">
            {formattedUpdateAt}
          </Typography>
          <Circle
            sx={{ fontSize: "6px", color: theme.palette.text.secondary }}
          />
          <Typography variant="regular_14" color="textSecondary">
            Paid by {user.name}
          </Typography>
        </Stack>
      </Stack>
      <Typography variant="md_18">{amount} ILS</Typography>
    </Paper>
  );
};

export default ExpenseItem;
