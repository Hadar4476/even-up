import { IAuthState } from "@/types";

import { useDispatch } from "react-redux";
import { authActions } from "@/store/reducers/auth";
import { systemActions } from "@/store/reducers/system";

import { useTranslation } from "react-i18next";

const useLogout = () => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("language");

    const authState: IAuthState = {
      isLoggedIn: false,
      token: null,
      expiryDate: null,
      user: null,
    };

    const defaultLanguage = "en";

    dispatch(authActions.setLoggedInUser(authState));

    i18n.changeLanguage(defaultLanguage);
    dispatch(systemActions.setLanguage(defaultLanguage));
  };

  return logout;
};

export default useLogout;
