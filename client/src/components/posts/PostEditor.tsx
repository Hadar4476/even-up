import React, { useState } from "react";
import { useCreatePostApi } from "@/api/usePosts";
import { IPost, ICreatePostRequest } from "@/types";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

interface PostEditorProps {
  id?: string;
}

const PostEditor = ({ id }: PostEditorProps) => {
  const { mutateAsync, isPending, isError, error } = useCreatePostApi();

  const [postData, setPostData] = useState<ICreatePostRequest>({
    title: "",
    content: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger the mutation
    await mutateAsync(postData, {
      onSuccess: (data: IPost) => {
        console.log("Post created successfully:", data);
        setPostData({ title: "", content: "" }); // Reset form
      },
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 bg-white shadow-md rounded-lg max-w-md mx-auto"
    >
      <Typography
        variant="h5"
        className="text-center font-semibold text-gray-800"
      >
        Create a New Post
      </Typography>

      <TextField
        label="Title"
        name="title"
        value={postData.title}
        onChange={handleInputChange}
        required
        fullWidth
        className="bg-gray-100 rounded-md"
      />

      <TextField
        label="Content"
        name="content"
        value={postData.content}
        onChange={handleInputChange}
        required
        fullWidth
        multiline
        rows={4}
        className="bg-gray-100 rounded-md"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isPending}
        className="mt-4"
      >
        {isPending ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Create Post"
        )}
      </Button>

      {isError && (
        <Typography variant="body2" className="text-red-600 text-center">
          Error: {(error as Error).message}
        </Typography>
      )}
    </Box>
  );
};

export default PostEditor;
