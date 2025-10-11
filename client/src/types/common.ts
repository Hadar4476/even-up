import { icons } from "@/theme";
import { IAuthState, IGroupState } from "./";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export enum ROUTE_NAMES {
  HOME = "/",
  LOGIN = "login",
  REGISTER = "register",
  GROUPS = "groups",
  INVITATIONS = "invitations",
  SETTINGS = "settings",
  SHOWCASE = "showcase",
  NOT_FOUND = "not-found",
}

export interface INavigationTab {
  to: ROUTE_NAMES;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

export interface IDocument {
  _id: string;
}
export interface ISystemState {
  isAppLoaded: boolean;
  language: string;
}

export interface IRootState {
  system: ISystemState;
  auth: IAuthState;
  groups: IGroupState;
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
