import * as Yup from "yup";
import { useFormik } from "formik";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/context/ToastContext";

import { register } from "@/services/auth";

import { IRegisterFormData, IToast, ROUTE_NAMES } from "@/types";

export const useRegister = () => {
  const navigate = useNavigate();

  const { showToast } = useToast();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Name is required"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .trim()
      .matches(
        /^\+[1-9]\d{1,14}$/,
        "Phone number must be in international format (+[country code][number])"
      )
      .min(8, "Phone number must be at least 8 characters")
      .max(16, "Phone number must be at most 16 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .trim()
      .required("Email is required"),
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

  const initialValues: IRegisterFormData = {
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setIsPending(true);

      try {
        const { confirmPassword, ...registerData } = values;

        const response = await register(registerData);

        if (response) {
          navigate(`/${ROUTE_NAMES.LOGIN}`);
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
    error,
  };
};
