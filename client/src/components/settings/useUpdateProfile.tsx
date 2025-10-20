import * as Yup from "yup";
import { useFormik } from "formik";
import { useAppSelector } from "@/store";
import { useEffect, useState } from "react";
import { useToast } from "@/context/ToastContext";
import { useDispatch } from "react-redux";

import { authActions, authSelector } from "@/store/reducers/auth";

import commonUtils from "@/utils/common";
import { updateProfile } from "@/services/user";

import { IProfileData, IToast } from "@/types";

const useUpdateProfile = () => {
  const { user } = useAppSelector(authSelector);
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const initialValues: IProfileData = {
    name: "",
    phoneNumber: "",
    email: "",
  };

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
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setIsPending(true);
      setError("");
      await commonUtils.sleep(1);

      try {
        const response = await updateProfile(values);

        if (response) {
          dispatch(authActions.updateProfile(response));
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

  useEffect(() => {
    const loadProfileData = async () => {
      if (user) {
        const updatedValues: IProfileData = {
          name: user.name,
          phoneNumber: user.phoneNumber,
          email: user.email,
        };

        formik.setValues(updatedValues);
      }
    };

    loadProfileData();
  }, [user]);

  return {
    formik,
    isPending,
    isSuccess,
    error,
  };
};

export default useUpdateProfile;
