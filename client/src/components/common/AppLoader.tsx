import { zIndex } from "@/common";
import { Backdrop, CircularProgress } from "@mui/material";

const AppLoader = () => {
  return (
    <Backdrop
      open
      sx={{
        zIndex: zIndex.primary, // Keep it above other elements
        color: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CircularProgress color="inherit" size={60} />
    </Backdrop>
  );
};

export default AppLoader;
