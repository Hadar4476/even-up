import { IPagination } from "../group";
import { IUser, UserSearchResult } from "../user";

export interface ILoginResponse {
  token: string;
  user: IUser;
}

export interface ISearchUsersResponse {
  users: UserSearchResult[];
  pagination: IPagination;
}
