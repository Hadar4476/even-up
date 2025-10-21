import React, { useCallback, useEffect, useState } from "react";

import commonUtils from "@/utils/common";
import { searchUsers } from "@/services/user";

import { IUserSearchResult } from "@/types";
import { InputAdornment, Stack, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<IUserSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    await commonUtils.sleep(1);

    try {
      const response = await searchUsers(query);

      if (response) {
        setSearchResults(response);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    setSearchQuery(value);
  };

  useEffect(() => {
    if (!searchQuery.trim()) return;

    const timer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, handleSearch]);

  return (
    <Stack>
      <TextField
        sx={{
          "> .MuiInputBase-root": {
            borderRadius: 100,

            "> input": {
              paddingX: "20px",
            },
          },
        }}
        fullWidth
        variant="outlined"
        placeholder="Search members to invite"
        value={searchQuery}
        onChange={handleQueryChange}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end" sx={{ paddingX: "6px" }}>
                <Search />
              </InputAdornment>
            ),
          },
        }}
      />
    </Stack>
  );
};

export default SearchUsers;
