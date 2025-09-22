import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { ROUTE_NAMES } from "@/types";

import { useAppSelector } from "@/store";
import { authSelector } from "@/store/reducers/auth";
import { systemSelector } from "@/store/reducers/system";

const PrivateRoute = () => {
  const navigate = useNavigate();

  const { isLoggedIn } = useAppSelector(authSelector);
  const { isAppLoaded } = useAppSelector(systemSelector);

  useEffect(() => {
    if (isAppLoaded && !isLoggedIn) {
      navigate(ROUTE_NAMES.LOGIN, { replace: true });
    }
  }, [isAppLoaded, isLoggedIn]);

  // Render nothing until the app is loaded
  if (!isAppLoaded || !isLoggedIn) {
    return null;
  }

  // If not logged in, navigation will handle redirection
  return <Outlet />;
};

export default PrivateRoute;
