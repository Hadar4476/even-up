import apiClient from "@/api-client";

import { IPost, ICreatePostRequest } from "@/types";

const route = "/posts";

export const fetchPosts = async (): Promise<IPost[]> => {
  const response = await apiClient.get<IPost[]>(route);

  return response.data;
};

export const fetchPostById = async (postId: IPost["_id"]): Promise<IPost> => {
  const response = await apiClient.get<IPost>(`${route}/${postId}`);

  return response.data;
};

export const createPost = async (
  postData: ICreatePostRequest
): Promise<IPost> => {
  const response = await apiClient.post<IPost>(route, postData);

  return response.data;
};

export const updatePost = async (postData: IPost): Promise<IPost> => {
  const response = await apiClient.put<IPost>(
    `${route}/${postData._id}`,
    postData
  );

  return response.data;
};

export const deletePost = async (
  postId: IPost["_id"]
): Promise<IPost["_id"]> => {
  const response = await apiClient.delete<IPost["_id"]>(`${route}/${postId}`);

  return response.data;
};
