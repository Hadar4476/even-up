import {
  IPagination,
  IUsersSearchResultsState,
  UserSearchResult,
} from "@/types";

export type UsersSearchResultsAction =
  | {
      type: "SET_SEARCH_RESULTS";
      payload: UserSearchResult[];
    }
  | {
      type: "SET_PAGINATION";
      payload: IPagination;
    }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_IS_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "RESET_SEARCH" };

const initialPagination: IPagination = {
  page: 0,
  limit: 12,
  hasMore: false,
};

export const initialUsersSearchResultsState: IUsersSearchResultsState = {
  users: [],
  pagination: initialPagination,
  searchQuery: "",
  isLoading: false,
  error: null,
};

export const usersSearchResultsReducer = (
  state: IUsersSearchResultsState,
  action: UsersSearchResultsAction
): IUsersSearchResultsState => {
  switch (action.type) {
    case "SET_SEARCH_RESULTS":
      return { ...state, users: action.payload, isLoading: false };
    case "SET_PAGINATION":
      return { ...state, pagination: action.payload };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    case "RESET_SEARCH":
      return { ...state, searchQuery: "" };
    default:
      return state;
  }
};

export const usersSearchResultsActions = {
  setSearchResults: (
    payload: UserSearchResult[]
  ): UsersSearchResultsAction => ({
    type: "SET_SEARCH_RESULTS",
    payload,
  }),
  setPagination: (payload: IPagination): UsersSearchResultsAction => ({
    type: "SET_PAGINATION",
    payload,
  }),
  setSearchQuery: (payload: string): UsersSearchResultsAction => ({
    type: "SET_SEARCH_QUERY",
    payload,
  }),
  setIsLoading: (payload: boolean): UsersSearchResultsAction => ({
    type: "SET_IS_LOADING",
    payload,
  }),
  setError: (payload: string | null): UsersSearchResultsAction => ({
    type: "SET_ERROR",
    payload,
  }),
  resetSearch: (): UsersSearchResultsAction => ({
    type: "RESET_SEARCH",
  }),
};
