import { useRef } from "react";
import config from "@/config";

import useLogout from "./useLogout";

import { fetchUser } from "@/services/user";

import { useDispatch } from "react-redux";
import { authActions } from "@/store/reducers/auth";

const useCheckAuth = () => {
  const dispatch = useDispatch();
  const logout = useLogout();
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");

    if (!token || !expiryDate) {
      return;
    }

    const isInDevelopment = config.enviroment === "development";
    const hasExpired = new Date(expiryDate) <= new Date();
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();

    if (!isInDevelopment && hasExpired) {
      logout();
      return;
    }

    await onGetUser();

    onAutoLogout(remainingMilliseconds);
  };

  const onAutoLogout = (milliseconds: number) => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(() => {
      logout();
    }, milliseconds);
  };

  const onGetUser = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");

    if (!userId) {
      return;
    }

    try {
      const user = await fetchUser();

      dispatch(
        authActions.setLoggedInUser({
          isLoggedIn: true,
          token,
          expiryDate,
          user,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  return checkAuth;
};

export default useCheckAuth;
