import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { useAppSelector } from "@/store";

import { groupsSelector } from "@/store/reducers/groups";
import {
  initialUsersSearchResultsState,
  usersSearchResultsActions,
  usersSearchResultsReducer,
} from "@/reducers/usersSearchResultsReducer";
import { searchUsers } from "@/services/group";
import { sendInvitations } from "@/services/group-invitation";
import commonUtils from "@/utils/common";

import { UserSearchResult } from "@/types";

const useInviteUsers = () => {
  const { selectedGroup } = useAppSelector(groupsSelector);
  const [state, dispatch] = useReducer(
    usersSearchResultsReducer,
    initialUsersSearchResultsState
  );
  const stateRef = useRef(state);

  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [members, setMembers] = useState<UserSearchResult[]>([]);

  const hasSelectedAll = useMemo(() => {
    const memberIds = new Set(members.map((member) => member._id));

    return state.users.every((user) => memberIds.has(user._id));
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
    setIsSuccess(false);
    dispatch(usersSearchResultsActions.reset());

    document.body.style.overflow = "unset";
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    if (!value.trim()) {
      dispatch(usersSearchResultsActions.setSearchResults(members));
    }

    dispatch(usersSearchResultsActions.setSearchQuery(value));
  };

  const handleSearch = useCallback(async () => {
    const currentState = stateRef.current;

    if (!selectedGroup?.group._id || !currentState.searchQuery.trim()) return;

    dispatch(usersSearchResultsActions.setIsLoading(true));
    dispatch(usersSearchResultsActions.resetResults());
    await commonUtils.sleep(1);

    try {
      const response = await searchUsers(
        selectedGroup.group._id,
        currentState.searchQuery,
        1,
        currentState.pagination.limit
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
  }, [selectedGroup?.group._id]);

  const loadMoreResults = useCallback(async () => {
    const currentState = stateRef.current;

    if (
      !selectedGroup?.group._id ||
      !currentState.searchQuery.trim() ||
      currentState.isLoading ||
      !currentState.pagination.hasMore
    ) {
      return;
    }

    dispatch(usersSearchResultsActions.setIsLoading(true));
    await commonUtils.sleep(1);

    try {
      const response = await searchUsers(
        selectedGroup.group._id,
        currentState.searchQuery,
        currentState.pagination.page + 1,
        currentState.pagination.limit
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
  }, [selectedGroup?.group._id]);

  const handleSendInvitations = async () => {
    if (!selectedGroup?.group._id) {
      return;
    }

    dispatch(usersSearchResultsActions.setIsLoading(true));
    await commonUtils.sleep(1);

    try {
      const membersIds = members.map((member) => member._id);

      const response = await sendInvitations({
        groupId: selectedGroup.group._id,
        members: membersIds,
      });

      if (response) {
        setIsSuccess(true);
      }
    } catch (error: any) {
      dispatch(usersSearchResultsActions.setError(error.message));
    } finally {
      dispatch(usersSearchResultsActions.setIsLoading(false));
    }
  };

  const handleToggleInvitation = (user: UserSearchResult) => {
    setMembers((prevState) => {
      const isChecked = prevState.some((member) => member._id === user._id);

      if (isChecked) {
        return prevState.filter((member) => member._id !== user._id);
      }

      return [...prevState, user];
    });
  };

  const handleToggleSelectAll = useCallback(() => {
    setMembers((prevState) => {
      // Filter out users that are already in members
      if (hasSelectedAll) {
        return prevState.filter(
          (member) => !state.users.some((user) => user._id === member._id)
        );
      }

      // Add all users that aren't already in members
      const newUsers = state.users.filter(
        (user) => !prevState.some((member) => member._id === user._id)
      );

      return [...prevState, ...newUsers];
    });
  }, [state.users, hasSelectedAll]);

  useEffect(() => {
    if (!state.searchQuery.trim()) return;

    const timer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timer);
  }, [state.searchQuery, handleSearch]);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  return {
    isOpen,
    isSuccess,
    state,
    members,
    hasSelectedAll,
    handleOpen,
    handleClose,
    handleQueryChange,
    handleSearch,
    handleToggleInvitation,
    handleToggleSelectAll,
    handleSendInvitations,
    loadMoreResults,
  };
};

export default useInviteUsers;
