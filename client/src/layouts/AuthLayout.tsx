import { Container, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main
      className="min-h-screen w-full flex flex-col justify-center items-center"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Container className="!max-w-xl">
        <Paper
          className="p-8 !rounded-lg"
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
