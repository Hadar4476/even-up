import { useThemeContext } from "@/context/ThemeContext";
import { IExpense } from "@/types";
import commonUtils from "@/utils/common";
import { Circle } from "@mui/icons-material";
import { Box, ButtonBase, Stack, Typography, useTheme } from "@mui/material";

interface ExpenseItemProps {
  expense: IExpense;
  disabled: boolean;
  emitClick: (expense: IExpense) => void;
}

const ExpenseItem = ({
  expense,
  disabled = false,
  emitClick,
}: ExpenseItemProps) => {
  const { isDarkMode } = useThemeContext();
  const theme = useTheme();
  const { amount, description, user, updatedAt } = expense;

  const avatarColor = commonUtils.generateAvatarColor(user._id);
  const formattedUpdateAt = commonUtils.formatDate(updatedAt.toString());

  return (
    <ButtonBase
      className="cursor-pointer !p-4 outline-none !rounded-xl flex items-center gap-3 overflow-hidden"
      disableRipple
      disabled={disabled}
      onClick={() => emitClick(expense)}
      sx={{
        ...(!isDarkMode && {
          borderBottom: "1px solid",
          borderColor: theme.palette.border?.default,
        }),
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
      <Stack className="flex-1 items-start">
        <Typography>{description}</Typography>
        <Stack className="!flex-row gap-1 items-center justify-start">
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
    </ButtonBase>
  );
};

export default ExpenseItem;
