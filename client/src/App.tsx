import { useEffect } from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ROUTE_NAMES } from "./types";

import PublicRoute from "@/components/PublicRoute";
import PrivateRoute from "@/components/PrivateRoute";

import publicRoutes from "@/routes/public";
import privateRoutes from "@/routes/private";

import { ThemeContextProvider } from "@/context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import CssBaseline from "@mui/material/CssBaseline";

import useCheckAuth from "./hooks/useCheckAuth";
import useCheckLanguage from "./hooks/useCheckLanguage";

import { useAppSelector } from "./store";
import { systemActions, systemSelector } from "./store/reducers/system";

import { useDispatch } from "react-redux";
import AppLoader from "./components/common/AppLoader";

const App = () => {
  const dispatch = useDispatch();

  const { isAppLoaded } = useAppSelector(systemSelector);

  const checkLanguage = useCheckLanguage();
  const checkAuth = useCheckAuth();

  useEffect(() => {
    const initializeApp = async () => {
      checkLanguage(); // This is synchronous
      await checkAuth(); // Wait for the async function to complete

      // Mark the app as loaded
      dispatch(systemActions.setIsAppLoaded(true));
    };

    initializeApp();
  }, []);

  if (!isAppLoaded) {
    return <AppLoader />;
  }

  const router = createBrowserRouter(
    [
      {
        path: ROUTE_NAMES.HOME,
        element: <PublicRoute />, // Wrapper for public routes
        children: publicRoutes,
      },
      {
        path: ROUTE_NAMES.HOME,
        element: <PrivateRoute />, // Wrapper for private routes
        children: privateRoutes,
      },
    ],
    {
      future: {
        v7_startTransition: true, // Opt-in to startTransition wrapping
        v7_relativeSplatPath: true, // Opt-in to relative splat path resolution
      },
    }
  );

  return (
    <ThemeContextProvider>
      <ToastProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </ToastProvider>
    </ThemeContextProvider>
  );
};

export default App;
