import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useToast } from "@/context/ToastContext";
import { useAppSelector } from "@/store";
import { useDispatch } from "react-redux";

import { groupsActions, groupsSelector } from "@/store/reducers/groups";
import commonUtils from "@/utils/common";

import {
  IExpense,
  IExpenseFormData,
  IExpenseWithSettlement,
  IToast,
} from "@/types";
import { addExpense, updateExpense } from "@/services/expense";

const useExpenseEdtior = (
  isInitiallyOpen?: boolean,
  expense?: IExpense | null
) => {
  const { selectedGroup } = useAppSelector(groupsSelector);
  const { showToast } = useToast();
  const dispatch = useDispatch();

  if (!selectedGroup) {
    throw new Error(
      "useExpenseEditor can only be used when a group is selected"
    );
  }

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleOpen = () => {
    setIsOpen(true);

    document.body.style.overflow = "hidden";
  };

  const handleClose = async () => {
    if (isLoading) return;

    setIsOpen(false);

    await commonUtils.sleep(1);
    setIsSuccess(false);
    formik.resetForm();

    document.body.style.overflow = "unset";
  };

  const initialValues: IExpenseFormData = {
    group: selectedGroup.group._id,
    description: "",
    amount: 0,
  };

  const validationSchema = Yup.object().shape({
    group: Yup.string()
      .required("Field must be a valid MongoDB ID")
      .matches(/^[a-f\d]{24}$/i, "Field must be a valid MongoDB ID"),
    description: Yup.string()
      .trim()
      .required("Description must be between 1 and 100 characters")
      .max(100, "Description must be between 1 and 100 characters"),
    amount: Yup.number()
      .required("Amount is required")
      .min(0.01, "Amount must be between 0.01 and 999,999.99")
      .max(999999.99, "Amount must be between 0.01 and 999,999.99")
      .test(
        "max-decimals",
        "Amount can have at most 2 decimal places",
        (value) => {
          if (value === undefined || value === null) return true;
          return /^\d+(\.\d{1,2})?$/.test(value.toString());
        }
      ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setIsLoading(true);
      setError("");
      await commonUtils.sleep(1);

      try {
        let response: IExpenseWithSettlement;

        if (expense) {
          response = await updateExpense({ expenseId: expense._id, ...values });
          dispatch(groupsActions.updateExpense(response));
        } else {
          response = await addExpense(values);
          dispatch(groupsActions.addExpense(response));
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
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    if (isInitiallyOpen) {
      setIsOpen(isInitiallyOpen);
    }
  }, [isInitiallyOpen]);

  useEffect(() => {
    const loadExpenseData = () => {
      if (expense) {
        const updatedValues: IExpenseFormData = {
          group: expense.group,
          description: expense.description,
          amount: expense.amount,
        };

        formik.setValues(updatedValues);
      }
    };

    loadExpenseData();
  }, [expense]);

  return {
    formik,
    isOpen,
    isLoading,
    isSuccess,
    error,
    handleOpen,
    handleClose,
  };
};

export default useExpenseEdtior;
