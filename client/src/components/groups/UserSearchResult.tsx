import { useMemo } from "react";

import commonUtils from "@/utils/common";

import { UserSearchResult } from "@/types";

import {
  Box,
  ButtonBase,
  Checkbox,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

interface UserSearchResultProps {
  result: UserSearchResult;
  isChecked: boolean;
  emitToggleInvitation: (user: UserSearchResult) => void;
}

const UserSearchResultItem = ({
  result,
  isChecked = false,
  emitToggleInvitation,
}: UserSearchResultProps) => {
  const theme = useTheme();

  const avatarColor = useMemo(
    () => commonUtils.generateAvatarColor(result._id),
    [result._id]
  );

  const handleToggle = () => {
    emitToggleInvitation(result);
  };

  return (
    <ButtonBase
      className="!w-full !flex !flex-row !items-center !justify-start !px-2 !py-4 md:!px-4"
      onClick={handleToggle}
      sx={{
        borderBottom: "1px solid",
        borderColor: theme.palette.border?.default,
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
        transition: "background-color 0.2s",
      }}
      aria-label={`${isChecked ? "Deselect" : "Select"} ${result.name}`}
    >
      <Checkbox
        checked={isChecked}
        color="primary"
        tabIndex={-1} // Remove from tab order since parent is focusable
        inputProps={{
          "aria-hidden": "true", // Hide from screen readers since parent has label
        }}
      />
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
          {result.name[0]}
        </Typography>
      </Box>
      <Stack className="px-3 items-start">
        <Typography variant="b_16">{result.name}</Typography>
        <Typography variant="regular_16" color="textDisabled">
          {result.email}
        </Typography>
      </Stack>
    </ButtonBase>
  );
};

export default UserSearchResultItem;
