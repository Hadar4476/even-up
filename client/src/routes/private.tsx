import { Navigate } from "react-router-dom";

import { ROUTE_NAMES } from "@/types";

import MainLayout from "@/layouts/MainLayout";

import Groups from "@/pages/groups/Groups";
import SingleGroup from "@/pages/groups/SingleGroup";
import Invitations from "@/pages/invitations/Invitations";
import Settings from "@/pages/settings/Settings";
import Showcase from "@/pages/showcase/Showcase";

const privateRoutes = [
  {
    path: "",
    element: <MainLayout />,
    children: [
      { path: "", element: <Navigate to={ROUTE_NAMES.GROUPS} /> },
      {
        path: ROUTE_NAMES.GROUPS,
        element: <Groups />,
      },
      {
        path: `${ROUTE_NAMES.GROUPS}/:groupId`,
        element: <SingleGroup />,
      },
      {
        path: ROUTE_NAMES.INVITATIONS,
        element: <Invitations />,
      },
      {
        path: ROUTE_NAMES.SETTINGS,
        element: <Settings />,
      },
      {
        path: ROUTE_NAMES.SHOWCASE,
        element: <Showcase />,
      },
    ],
  },
  { path: "*", element: <Navigate to={ROUTE_NAMES.GROUPS} replace /> },
];

export default privateRoutes;
