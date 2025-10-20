import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { useToast } from "@/context/ToastContext";

import commonUtils from "@/utils/common";
import { changePassword } from "@/services/user";

import { IToast } from "@/types";

const useChangePassword = () => {
  const { showToast } = useToast();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const initialValues: { password: string; confirmPassword: string } = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .trim()
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setIsPending(true);
      await commonUtils.sleep(1);

      try {
        const response = await changePassword(values.password);

        if (response) {
          setIsSuccess(true);
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
        setIsPending(false);
      }
    },
  });

  return {
    formik,
    isPending,
    isSuccess,
    error,
  };
};

export default useChangePassword;
