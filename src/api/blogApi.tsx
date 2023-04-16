import { baseURL } from "@/constants/constants";
import axios from "axios";

export const getAllPosts = async () => {
  const data = await axios.get(`${baseURL}/posts`)
  return data;
};

export const addPost = async (body: String, userID: Number) => {
  const data = await axios
    .post(`${baseURL}/post`, { body, userID })
    .then((res) => res.data);
  return data;
};

export const getLogin = async (
  email: string,
  password: string,
  type: string
) => {
  const data = await axios
    .post(`${baseURL}/login`, { email, password, type })
    .then((res) => res.data);
  return data;
};

export const register = async (
  username: string,
  email: string,
  password: string,
  type: string
) => {
  const data = await axios
    .post(`${baseURL}/register`, { username, email, password, type })
    .then((res) => res.data);
  return data;
};

export const googleLogin = async () => {
  const data = await axios
    .get(`${baseURL}/auth/google/success`, { withCredentials: true })
    .then((res) => res.data);
  return data;
};

export const getPostById = async (id: number) => {
  const data = await axios.get(`${baseURL}/post/${id}`)
  return data;
};

export const getPostByUserId = async (id: number, ...params: any) => {
  const sortBy = params[0]?.sortBy || "DESC";
  const data = await axios.get(`${baseURL}/users/${id}/posts?sortBy=${sortBy}`);
  return data;
};

export const deletePostById = async (id: number) => {
  const data = await axios
    .delete(`${baseURL}/post/${id}`)
    .then((res) => res.data);
  return data;
};

export const follow = async (userId: number, postId: number) => {
  const data = await axios.post(`${baseURL}/users/${userId}/follow/${postId}`);
  return data;
};

export const getPostUserFollow = async (userId: number, ...params: any) => {
  const sortBy = params[0]?.sortBy || "DESC";
  const data = await axios.get(
    `${baseURL}/users/${userId}/follow?sortBy=${sortBy}`
  );
  return data;
};

export const unfollow = async (userId: number, postId: number) => {
  const data = await axios.delete(
    `${baseURL}/users/${userId}/follow/${postId}`
  );
  return data;
};

export const getCommentsByPostId = async (postId: number) => {
  const data = await axios.get(`${baseURL}/comments/${postId}`)
  return data;
}

export const addNewComment = async (userID: number, postID: number, content: string) => {
  const data = await axios.post(`${baseURL}/comment`, {userID, postID, content});
  return data;
}


