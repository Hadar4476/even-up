import {
  GroupInvitationStatus,
  IExpense,
  IExpenseWithSettlement,
  IGroup,
  IGroupInvitation,
  IGroupInvitationsData,
  IGroupState,
  IGroupData,
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
  groupInvitationsData: {
    invitations: [],
    pagination: initialPagination,
  },
  searchQuery: "",
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
    setGroupsData: (state, action: PayloadAction<IGroupData>) => {
      const { groups, pagination } = action.payload;

      state.groupsData = {
        groups,
        pagination,
      };
    },
    appendGroupsData: (state, action: PayloadAction<IGroupData>) => {
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
    setGroupInvitationsData: (
      state,
      action: PayloadAction<IGroupInvitationsData>
    ) => {
      const { invitations, pagination } = action.payload;

      state.groupInvitationsData = {
        invitations,
        pagination,
      };
    },
    appendGroupInvitationData: (
      state,
      action: PayloadAction<IGroupInvitationsData>
    ) => {
      const { invitations, pagination } = action.payload;

      state.groupInvitationsData = {
        invitations: [
          ...state.groupInvitationsData.invitations,
          ...invitations,
        ],
        pagination,
      };
    },
    updateGroupInvitation: (
      state,
      action: PayloadAction<{
        invitationId: IGroupInvitation["_id"];
        group: IGroup | null;
        status: IGroupInvitation["status"];
      }>
    ) => {
      const { invitationId, group, status } = action.payload;

      if (status === GroupInvitationStatus.ACCEPTED && group) {
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

      state.groupInvitationsData.invitations =
        state.groupInvitationsData.invitations.filter(
          (i) => i._id !== invitationId
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
