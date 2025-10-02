import { Container, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main
      className="min-h-screen w-full flex flex-col justify-center items-center"
      // style={{
      //   background: "linear-gradient(135deg, #daf8e3 0%, #97ebdb 100%)",
      // }}
    >
      <Container className="!max-w-xl">
        <Paper
          className="p-8 !rounded-xl"
          elevation={8}
          sx={{
            backdropFilter: "blur(10px)",
          }}
        >
          <Outlet />
        </Paper>
      </Container>
    </main>
  );
};

export default AuthLayout;
