import { Stack } from "@mui/material";

const GridShowcase = () => {
  return (
    <div className="flex-1 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 12 }, (_, index) => (
        <Stack
          key={index}
          alignItems="center"
          justifyContent="center"
          className="p-4 rounded-md bg-blue-200"
        >
          Item {index + 1}
        </Stack>
      ))}
    </div>
  );
};

export default GridShowcase;
