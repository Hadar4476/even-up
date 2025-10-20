import { Stack, useTheme } from "@mui/material";

const AccountSettings = () => {
  const theme = useTheme();

  return (
    <Stack
      className="p-6 md:px-8"
      sx={{
        borderBottom: "1px solid",
        borderColor: theme.palette.border?.default,
      }}
    >
      Account Settings
    </Stack>
  );
};

export default AccountSettings;
