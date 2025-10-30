import { Stack } from "@mui/material";
import ExpensesList from "./expenses/ExpensesList";
import { useAppSelector } from "@/store";
import { groupsSelector } from "@/store/reducers/groups";

const GroupInformation = () => {
  const { selectedGroup } = useAppSelector(groupsSelector);

  if (!selectedGroup) {
    return null;
  }

  return (
    <Stack>
      {selectedGroup.group.expenses && (
        <ExpensesList expenses={selectedGroup.group.expenses} />
      )}
    </Stack>
  );
};

export default GroupInformation;
