import * as Yup from "yup";
import { useFormik } from "formik";
import { useToast } from "@/context/ToastContext";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { createGroup, updateGroup } from "@/services/group";
import { groupsActions } from "@/store/reducers/groups";

import config from "@/config";
import commonUtils from "@/utils/common";

import { IGroup, IGroupFormData, IToast } from "@/types";

export const useGroupEditor = (group?: IGroup) => {
  const { showToast } = useToast();
  const dispatch = useDispatch();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const reset = async () => {
    setIsSuccess(false);

    if (group?.img) {
      const imgUrl = `${config.uploadsUrl}/${group.img}`;
      const filename = group.img;
      const file = await commonUtils.urlToFile(imgUrl, filename);

      if (file) {
        setImagePreview(imgUrl);
        formik.setFieldValue("img", file);
      }
    }
  };

  const initialValues: IGroupFormData = {
    title: "",
    description: "",
    img: null,
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .trim()
      .required("Title is required")
      .max(100, "Title must be between 1 and 100 characters"),
    description: Yup.string()
      .trim()
      .required("Description is required")
      .max(1000, "Description must be between 1 and 1000 characters"),
    img: Yup.mixed<File>()
      .nullable()
      .test("fileType", "Only image files are allowed", (value) => {
        if (!value) return true;

        if (value instanceof File) {
          return value.type.startsWith("image/");
        }

        return false;
      })
      .test("fileSize", "File size must be less than 5MB", (value) => {
        if (!value) return true;

        if (value instanceof File) {
          return value.size <= 5 * 1024 * 1024; // 5MB
        }

        return false;
      }),
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
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);

        if (values.img) {
          // New file selected - upload it
          formData.append("img", values.img);
        } else if (!values.img && group?.img) {
          // Image was explicitly removed
          formData.append("removeImg", "true");
        }

        let response: IGroup;

        if (group) {
          response = await updateGroup(group._id, formData);

          dispatch(groupsActions.updateGroup(response));
        } else {
          response = await createGroup(formData);

          dispatch(groupsActions.addGroup(response));
        }

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

  useEffect(() => {
    const loadGroupData = async () => {
      if (group) {
        setIsLoadingImage(true);

        const updatedValues: IGroupFormData = {
          title: group.title,
          description: group.description,
          img: null,
        };

        if (group.img) {
          const imgUrl = `${config.uploadsUrl}/${group.img}`;
          const filename = group.img;
          const file = await commonUtils.urlToFile(imgUrl, filename);

          if (file) {
            updatedValues.img = file;
          }
        }

        formik.setValues(updatedValues);
        setIsLoadingImage(false);
      }
    };

    loadGroupData();
  }, [group?._id]);

  return {
    formik,
    isPending,
    isSuccess,
    imagePreview,
    isLoadingImage,
    error,
    reset,
    setImagePreview,
  };
};
