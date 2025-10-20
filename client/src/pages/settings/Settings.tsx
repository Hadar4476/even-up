import useLogout from "@/hooks/useLogout";
import useTrans from "@/hooks/useTrans";
import { Stack } from "@mui/material";

const Settings = () => {
  const t = useTrans();
  const logout = useLogout();

  return (
    <Stack className="gap-4">
      {/* <LanguageSelector />
      <ThemeSelector className="!w-full" />
      <Button className="!w-full" color="error" onClick={logout}>
        {t("system.logout")}
      </Button> */}
    </Stack>
  );
};

export default Settings;
