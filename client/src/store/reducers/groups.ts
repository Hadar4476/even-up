import {
  IGroup,
  IGroupFormData,
  IGroupInvitation,
  IGroupState,
  IGroupWithSettlement,
  IRootState,
} from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const defaultGroupsState: IGroupState = {
  selectedGroup: null,
  groups: [],
  groupInvitations: [],
};

const groups = createSlice({
  name: "groups",
  initialState: defaultGroupsState,
  reducers: {
    // SELECTED GROUP
    selectGroup: (state, action: PayloadAction<IGroupWithSettlement>) => {
      state.selectedGroup = action.payload;
    },
    updateGroup: (state, action: PayloadAction<IGroupWithSettlement>) => {
      const { group } = action.payload;

      if (state.selectedGroup) {
        state.selectedGroup = {
          ...state.selectedGroup,
          group,
        };

        const groupIndex = state.groups.findIndex(
          (g) => g._id === state.selectedGroup?.group._id
        );
      }
    },
    deleteGroup: (state, action: PayloadAction<IGroup["_id"]>) => {
      const groupId = action.payload;

      state.groups = state.groups.filter((g) => g._id !== groupId);

      if (state.selectedGroup) {
        const isSelectedGroup = state.selectedGroup.group._id === groupId;

        if (isSelectedGroup) {
          state.selectedGroup = null;
        }
      }
    },
    // GROUPS
    initGroups: (state, action: PayloadAction<IGroup[]>) => {
      state.groups = [...action.payload];
    },
    addGroup: (state, action: PayloadAction<IGroup>) => {
      state.groups.push(action.payload);
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
    deleteGroupInvitation: (
      state,
      action: PayloadAction<IGroupInvitation["_id"]>
    ) => {
      state.groupInvitations = state.groupInvitations.filter(
        (i) => i._id !== action.payload
      );
    },
  },
});

export const groupsActions = groups.actions;

export const groupsSelector = (state: IRootState) => state.groups;

export default groups.reducer;
