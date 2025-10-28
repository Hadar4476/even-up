import { IDocument, IPagination } from "./";

export interface IUser extends IDocument {
  name: string;
  phoneNumber: string;
  email: string;
}

export type ProfileData = Omit<IUser, "_id">;

export type UserSearchResult = Omit<IUser, "phoneNumber">;

export interface IUsersSearchResultsState {
  users: UserSearchResult[];
  searchQuery: string;
  pagination: IPagination;
  isLoading: boolean;
  error: string | null;
}
