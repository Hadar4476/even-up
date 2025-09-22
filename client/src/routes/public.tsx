import { Navigate } from "react-router-dom";

import { ROUTE_NAMES } from "@/types";

import Login from "@/pages/auth/Login/Login";
import Register from "@/pages/auth/Register/Register";
import AuthLayout from "@/layouts/AuthLayout";

const publicRoutes = [
  {
    path: "",
    element: <AuthLayout />,
    children: [
      { path: "", element: <Navigate to={ROUTE_NAMES.LOGIN} /> },
      { path: ROUTE_NAMES.LOGIN, element: <Login /> },
      { path: ROUTE_NAMES.REGISTER, element: <Register /> },
    ],
  },
  { path: "*", element: <Navigate to={ROUTE_NAMES.LOGIN} replace /> },
];

export default publicRoutes;
