import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { useAppSelector } from "@/store";

import { groupsSelector } from "@/store/reducers/groups";
import {
  initialUsersSearchResultsState,
  usersSearchResultsActions,
  usersSearchResultsReducer,
} from "@/reducers/usersSearchResultsReducer";
import { searchUsers } from "@/services/group";
import commonUtils from "@/utils/common";

import { IUser } from "@/types";

const useInviteUsers = () => {
  const { selectedGroup } = useAppSelector(groupsSelector);
  const [state, dispatch] = useReducer(
    usersSearchResultsReducer,
    initialUsersSearchResultsState
  );

  const [isOpen, setIsOpen] = useState(false);
  const [members, setMembers] = useState<IUser["_id"][]>([]);

  const hasSelectedAll = useMemo(() => {
    const userIds = state.users.map((user) => user._id);

    if (userIds.length !== members.length) return false;

    const membersSet = new Set(members);

    return userIds.every((id) => membersSet.has(id));
  }, [state.users, members]);

  const handleOpen = () => {
    setIsOpen(true);

    document.body.style.overflow = "hidden";
  };

  const handleClose = async () => {
    if (state.isLoading) return;

    setIsOpen(false);

    await commonUtils.sleep(1);
    setMembers([]);
    dispatch(usersSearchResultsActions.reset());

    document.body.style.overflow = "unset";
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    dispatch(usersSearchResultsActions.setSearchQuery(value));
  };

  const handleSearch = useCallback(async () => {
    if (!selectedGroup?.group._id || !state.searchQuery.trim()) return;

    dispatch(usersSearchResultsActions.setIsLoading(true));
    await commonUtils.sleep(1);

    try {
      const response = await searchUsers(
        selectedGroup.group._id,
        state.searchQuery,
        1,
        state.pagination.limit
      );

      if (response) {
        const { users, pagination } = response;

        dispatch(usersSearchResultsActions.setSearchResults(users));
        dispatch(usersSearchResultsActions.setPagination(pagination));
      }
    } catch (error: any) {
      dispatch(usersSearchResultsActions.setError(error.message));
    } finally {
      dispatch(usersSearchResultsActions.setIsLoading(false));
    }
  }, [selectedGroup?.group._id, state.searchQuery, state.pagination.limit]);

  const loadMoreResults = useCallback(async () => {
    if (
      !selectedGroup?.group._id ||
      !state.searchQuery.trim() ||
      state.isLoading ||
      !state.pagination.hasMore
    ) {
      return;
    }

    dispatch(usersSearchResultsActions.setIsLoading(true));
    await commonUtils.sleep(1);

    try {
      const response = await searchUsers(
        selectedGroup.group._id,
        state.searchQuery,
        state.pagination.page + 1,
        state.pagination.limit
      );

      if (response) {
        const { users, pagination } = response;

        dispatch(usersSearchResultsActions.setLoadMoreSearchResults(users));
        dispatch(usersSearchResultsActions.setPagination(pagination));
      }
    } catch (error: any) {
      dispatch(usersSearchResultsActions.setError(error.message));
    } finally {
      dispatch(usersSearchResultsActions.setIsLoading(false));
    }
  }, [
    selectedGroup?.group._id,
    state.isLoading,
    state.searchQuery,
    state.pagination.page,
    state.pagination.limit,
    state.pagination.hasMore,
  ]);

  const handleToggleInvitation = (id: IUser["_id"]) => {
    setMembers((prevState) => {
      const hasAdded = prevState.includes(id);

      if (hasAdded) {
        return prevState.filter((memberId) => memberId !== id);
      }

      return [...prevState, id];
    });
  };

  const handleToggleSelectAll = useCallback(() => {
    const usersIds = state.users.map((user) => user._id);

    setMembers(hasSelectedAll ? [] : [...usersIds]);
  }, [state.users, hasSelectedAll]);

  useEffect(() => {
    if (!state.searchQuery.trim()) return;

    const timer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timer);
  }, [state.searchQuery, handleSearch]);

  return {
    isOpen,
    state,
    members,
    hasSelectedAll,
    handleOpen,
    handleClose,
    handleQueryChange,
    handleSearch,
    handleToggleInvitation,
    handleToggleSelectAll,
    loadMoreResults,
  };
};

export default useInviteUsers;
