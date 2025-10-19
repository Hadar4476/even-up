import {
  GroupInvitationStatus,
  IExpense,
  IExpenseWithSettlement,
  IGroup,
  IGroupInvitation,
  IGroupState,
  IGroupWithPagination,
  IGroupWithSettlement,
  IPagination,
  IRootState,
  ISettlementResult,
} from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialPagination: IPagination = {
  page: 0,
  limit: 12,
  hasMore: false,
};

const defaultGroupsState: IGroupState = {
  selectedGroup: null,
  groupsData: {
    groups: [],
    pagination: initialPagination,
  },
  searchQuery: "",
  groupInvitations: [],
  isLoading: false,
  isInitialized: false,
  error: null,
};

const groups = createSlice({
  name: "groups",
  initialState: defaultGroupsState,
  reducers: {
    // GENERAL
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    // SELECTED GROUP
    setSelectedGroup: (state, action: PayloadAction<IGroupWithSettlement>) => {
      state.selectedGroup = action.payload;
    },
    updateGroup: (state, action: PayloadAction<IGroup>) => {
      const group = action.payload;

      if (state.selectedGroup) {
        state.selectedGroup = {
          ...state.selectedGroup,
          group,
        };

        const groupIndex = state.groupsData.groups.findIndex(
          (g) => g._id === state.selectedGroup?.group._id
        );

        if (groupIndex >= 0) {
          state.groupsData.groups[groupIndex] = {
            ...state.groupsData.groups[groupIndex],
            title: group.title,
            description: group.description,
            img: group.img,
            updatedAt: group.updatedAt,
          };
        }
      }
    },
    deleteGroup: (state, action: PayloadAction<IGroup["_id"]>) => {
      const groupId = action.payload;

      state.groupsData.groups = state.groupsData.groups.filter(
        (g) => g._id !== groupId
      );

      if (state.selectedGroup) {
        const isSelectedGroup = state.selectedGroup.group._id === groupId;

        if (isSelectedGroup) {
          state.selectedGroup = null;
        }
      }
    },
    // GROUPS
    setGroupsData: (state, action: PayloadAction<IGroupWithPagination>) => {
      const { groups, pagination } = action.payload;

      state.groupsData = {
        groups,
        pagination,
      };
    },
    appendGroupsData: (state, action: PayloadAction<IGroupWithPagination>) => {
      const { groups, pagination } = action.payload;

      state.groupsData = {
        groups: [...state.groupsData.groups, ...groups],
        pagination,
      };
    },
    addGroup: (state, action: PayloadAction<IGroup>) => {
      state.groupsData.groups.unshift(action.payload);
    },
    // GROUP INVITATIONS
    initGroupInvitations: (
      state,
      action: PayloadAction<IGroupInvitation[]>
    ) => {
      state.groupInvitations = [...action.payload];
    },
    addGroupInvitation: (state, action: PayloadAction<IGroupInvitation>) => {
      state.groupInvitations.push(action.payload);
    },
    updateGroupInvitation: (
      state,
      action: PayloadAction<{
        groupInvitationId: IGroupInvitation["_id"];
        group: IGroup;
        status: IGroupInvitation["status"];
      }>
    ) => {
      const { groupInvitationId, group, status } = action.payload;

      if (status === GroupInvitationStatus.ACCEPTED) {
        if (state.selectedGroup) {
          const isSelectedGroup = state.selectedGroup.group._id === group._id;

          if (isSelectedGroup) {
            state.selectedGroup = {
              ...state.selectedGroup,
              group,
            };
          }
        }

        const groupIndex = state.groupsData.groups.findIndex(
          (g) => g._id === group._id
        );

        if (groupIndex >= 0) {
          state.groupsData.groups[groupIndex] = {
            ...state.groupsData.groups[groupIndex],
            users: group.users,
            updatedAt: group.updatedAt,
          };
        }
      }

      state.groupInvitations = state.groupInvitations.filter(
        (i) => i._id !== groupInvitationId
      );
    },
    // EXPENSES
    addExpense: (state, action: PayloadAction<IExpenseWithSettlement>) => {
      const { expense, settlementResult } = action.payload;

      if (state.selectedGroup) {
        state.selectedGroup.group.expenses?.push(expense);
        state.selectedGroup.settlementResult = { ...settlementResult };
      }
    },
    updateExpense: (state, action: PayloadAction<IExpenseWithSettlement>) => {
      const { expense, settlementResult } = action.payload;

      if (state.selectedGroup && state.selectedGroup.group.expenses) {
        const expenseIndex = state.selectedGroup.group.expenses.findIndex(
          (e) => e._id === expense._id
        );

        if (Number.isInteger(expenseIndex) && expenseIndex >= 0) {
          state.selectedGroup.group.expenses[expenseIndex] = {
            ...state.selectedGroup.group.expenses[expenseIndex],
            description: expense.description,
            amount: expense.amount,
            updatedAt: expense.updatedAt,
          };
        }

        state.selectedGroup.settlementResult = { ...settlementResult };
      }
    },
    deleteExpense: (
      state,
      action: PayloadAction<{
        expenseId: IExpense["_id"];
        settlementResult: ISettlementResult;
      }>
    ) => {
      const { expenseId, settlementResult } = action.payload;

      if (state.selectedGroup && state.selectedGroup.group.expenses) {
        const expenseIndex = state.selectedGroup.group.expenses.findIndex(
          (e) => e._id === expenseId
        );

        if (Number.isInteger(expenseIndex) && expenseIndex >= 0) {
          state.selectedGroup.group.expenses =
            state.selectedGroup.group.expenses.filter(
              (e) => e._id !== expenseId
            );
        }

        state.selectedGroup.settlementResult = { ...settlementResult };
      }
    },
    // SETTLE UP
    settleUp: (state) => {
      if (state.selectedGroup) {
        state.selectedGroup.settlementResult = null;
      }
    },
  },
});

export const groupsActions = groups.actions;

export const groupsSelector = (state: IRootState) => state.groups;

export default groups.reducer;
