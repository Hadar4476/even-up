import { zIndex } from "@/common";
import { Backdrop, CircularProgress } from "@mui/material";

const AppLoader = () => {
  const storedMode = localStorage.getItem("theme") as "light" | "dark";
  const isDarkMode = storedMode === "dark";

  return (
    <Backdrop
      className="flex flex-col"
      sx={{
        zIndex: zIndex.primary, // Keep it above other elements
      }}
      open
    >
      <CircularProgress
        sx={{ ...(!isDarkMode && { color: "#fff" }) }}
        size={60}
      />
    </Backdrop>
  );
};

export default AppLoader;
