import { icons } from "@/theme";
import { IAuthState } from "./user";
import React from "react";

export enum ROUTE_NAMES {
  HOME = "/",
  LOGIN = "login",
  REGISTER = "register",
  DASHBOARD = "dashboard",
  POSTS = "posts",
  SHOWCASE = "showcase",
  NOT_FOUND = "not-found",
}

export interface IDocument {
  _id: string;
}
export interface ISystemState {
  isAppLoaded: boolean;
  language: string;
}

export interface IRootState {
  auth: IAuthState;
  system: ISystemState;
}

export interface ISelectOption {
  value: string;
  label: string;
  icon?: keyof typeof icons;
}

export type ToastType = "info" | "success" | "warning" | "error";

export interface IToast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export type AppTextFieldType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "tel"
  | "url"
  | "search";
