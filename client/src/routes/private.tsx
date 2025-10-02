import { Navigate } from "react-router-dom";

import { ROUTE_NAMES } from "@/types";

import MainLayout from "@/layouts/MainLayout";

import Dashboard from "@/pages/dashboard/Dashboard";
import Showcase from "@/pages/dashboard/showcase/Showcase";

const privateRoutes = [
  {
    path: "",
    element: <MainLayout />,
    children: [
      // { path: "", element: <Navigate to={ROUTE_NAMES.DASHBOARD} /> },
      { path: "", element: <Navigate to={ROUTE_NAMES.DASHBOARD} /> },
      {
        path: ROUTE_NAMES.DASHBOARD,
        element: <Dashboard />,
      },
      // {
      //   path: `${ROUTE_NAMES.POSTS}/:postId`, // Dynamic route for postId.
      //   element: <SinglePost />,
      // },
      // {
      //   path: ROUTE_NAMES.POSTS,
      //   element: <Posts />,
      // },
      {
        path: ROUTE_NAMES.SHOWCASE,
        element: <Showcase />,
      },
    ],
  },
  { path: "*", element: <Navigate to={ROUTE_NAMES.DASHBOARD} replace /> },
];

export default privateRoutes;
