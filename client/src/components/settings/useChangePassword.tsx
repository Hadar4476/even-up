import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { useToast } from "@/context/ToastContext";

import commonUtils from "@/utils/common";
import { changePassword } from "@/services/user";

import { IToast } from "@/types";

const useChangePassword = () => {
  const { showToast } = useToast();

  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const initialValues: {
    currentPassword: "";
    newPassword: string;
    confirmPassword: string;
  } = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .trim()
      .required("Password is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number") // Add this
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .notOneOf(
        [Yup.ref("currentPassword")],
        "New password must be different from current password"
      )
      .trim()
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Please confirm your password"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      await commonUtils.sleep(1);

      try {
        const payload = {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        };
        const response = await changePassword(payload);

        if (response) {
          const toast: Omit<IToast, "id"> = {
            type: "success",
            message: "Password changed!",
            duration: 5000,
          };

          showToast(toast);
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
    isEditable,
    isLoading,
    error,
    setIsEditable,
  };
};

export default useChangePassword;
