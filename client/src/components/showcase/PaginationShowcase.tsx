import React, { useState } from "react";
import { Pagination, PaginationItem, Stack } from "@mui/material";

const PaginationShowcase = () => {
  const data = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  // Calculate current data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Stack
      flex={1}
      gap="32px"
      alignItems="center"
      justifyContent="space-between"
    >
      <div className="flex-1 w-full grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentData.map((item, index) => (
          <Stack
            key={index}
            alignItems="center"
            justifyContent="center"
            className="p-4 rounded-md bg-blue-200"
          >
            {item}
          </Stack>
        ))}
      </div>

      <Pagination
        count={Math.ceil(data.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem {...item} sx={{ borderRadius: "50%" }} />
        )}
      />
    </Stack>
  );
};

export default PaginationShowcase;
