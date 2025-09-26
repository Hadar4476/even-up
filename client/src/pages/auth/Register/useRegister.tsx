import * as Yup from "yup";
import { useFormik } from "formik";
// import { useRegisterApi } from "@/api/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "@/services/auth";

interface RegisterFormValues {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useRegister = () => {
  const navigate = useNavigate();

  // const { mutate, isPending, error } = useRegisterApi();

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
  });

  const initialValues: RegisterFormValues = {
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
          navigate("/login");
        }
      } catch (error: any) {
        setError(() => error.response.data.message);
      } finally {
        setIsPending(false);
      }
    },
    // onSubmit: (values) => {
    //   mutate(values, {
    //     onSuccess: (data) => {
    //       const userId = data;

    //       console.log("Register successful:", userId);

    //       navigate("/login");
    //     },
    //     onError: (error) => {
    //       console.error("Register failed:", error);
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
