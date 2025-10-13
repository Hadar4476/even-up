import { useAppSelector } from "@/store";
import { useDispatch } from "react-redux";
import { groupsActions, groupsSelector } from "@/store/reducers/groups";
import { useEffect } from "react";

import { getAllGroups } from "@/services/group";

import { Stack } from "@mui/material";

const Groups = () => {
  const { groups } = useAppSelector(groupsSelector);
  const disptach = useDispatch();

  useEffect(() => {
    if (!groups.length) {
      const initGroups = async () => {
        try {
          const response = await getAllGroups();

          disptach(groupsActions.initGroups(response));
        } catch (error: any) {
          disptach(groupsActions.setError(error.message));
        }
      };

      initGroups();
    }
  }, []);

  const groupElements = [];

  return (
    <Stack className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      Groups
    </Stack>
  );
};

export default Groups;
