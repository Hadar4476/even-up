import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useToast } from "@/context/ToastContext";

import { authActions } from "@/store/reducers/auth";
import { login } from "@/services/auth";
import commonUtils from "@/utils/common";

import { IToast, ROUTE_NAMES } from "@/types";

interface LoginFormValues {
  email: string;
  password: string;
}

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { showToast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      await commonUtils.sleep(1);

      try {
        const response = await login(values);

        if (response) {
          const { token, user } = response;

          localStorage.setItem("token", token);
          localStorage.setItem("userId", user._id);

          // will expire in 1 hour
          const remainingMilliseconds = 60 * 60 * 1000;
          const expiryDate = new Date(
            new Date().getTime() + remainingMilliseconds
          );

          localStorage.setItem("expiryDate", expiryDate.toISOString());

          dispatch(
            authActions.setLoggedInUser({
              isLoggedIn: true,
              token,
              expiryDate: expiryDate.toISOString(),
              user,
            })
          );

          navigate(ROUTE_NAMES.HOME, { replace: true });
        }
      } catch (error: any) {
        const toast: Omit<IToast, "id"> = {
          type: "error",
          message: error.message,
          duration: 5000,
        };

        showToast(toast);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return {
    formik,
    isLoading,
    error,
  };
};

export default useLogin;
