import { IPost } from "@/types";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchPosts,
  fetchPostById,
  createPost,
  updatePost,
  deletePost,
} from "@/services/posts";

export const useFetchPostsApi = () => {
  return useQuery<IPost[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    // refetches posts to make sure users get the most updated posts
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useFetchPostByIdApi = (postId: IPost["_id"]) => {
  return useQuery<IPost>({
    queryKey: ["post", postId], // Add postId to the queryKey to make it unique for each post
    queryFn: () => fetchPostById(postId), // Pass the postId to the query function
    enabled: !!postId, // Ensure the query only runs when postId is defined
  });
};

export const useCreatePostApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.log(error);
    },
    mutationFn: createPost,
  });
};

export const useUpdatePostApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.log(error);
    },
    mutationFn: updatePost,
  });
};

export const useDeletePostApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.log(error);
    },
    mutationFn: deletePost,
  });
};
