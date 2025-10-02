import * as Yup from "yup";
import { useFormik } from "formik";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useToast } from "@/context/ToastContext";

import { authActions } from "@/store/reducers/auth";

import { login } from "@/services/auth";

import { IToast } from "@/types";

// Define the shape of your form fields
interface LoginFormValues {
  email: string;
  password: string;
}

// Define the hook
export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { showToast } = useToast();

  // const { mutate, isPending, error } = useLoginApi();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  // Yup validation schema
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

  // Initial values
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  // Formik for managing form state and validation
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await login(values);

        const { token, user } = response;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", user._id);

        // will expire in 1 hour
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );

        localStorage.setItem("expiryDate", expiryDate.toISOString());

        // save in store
        dispatch(
          authActions.setLoggedInUser({
            isLoggedIn: true,
            token,
            expiryDate: expiryDate.toISOString(),
            user,
          })
        );
        navigate("/");
      } catch (error: any) {
        const toast: Omit<IToast, "id"> = {
          type: "error",
          message: error.message,
          duration: 5000,
        };

        showToast(toast);
        setError(error.message);
      } finally {
        setIsPending(false);
      }
    },
    // onSubmit: (values) => {
    //   mutate(values, {
    //     onSuccess: (data) => {
    //       const { token, user } = data;

    //       console.log("Login successful:", data);

    //       localStorage.setItem("token", token);
    //       localStorage.setItem("userId", user._id);

    //       // will expire in 1 hour
    //       const remainingMilliseconds = 60 * 60 * 1000;
    //       const expiryDate = new Date(
    //         new Date().getTime() + remainingMilliseconds
    //       );

    //       localStorage.setItem("expiryDate", expiryDate.toISOString());

    //       // save in store

    //       dispatch(
    //         authActions.setLoggedInUser({
    //           isLoggedIn: true,
    //           token,
    //           expiryDate: expiryDate.toISOString(),
    //           user,
    //         })
    //       );

    //       navigate("/");
    //     },
    //     onError: (error) => {
    //       console.error("Login failed:", error);
    //       // Handle error (e.g., show a message)
    //     },
    //   });
    // },
  });

  return {
    formik,
    isPending,
    error,
  };
};
