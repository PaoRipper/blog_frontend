import { baseURL } from "@/constants/constants";
import axios from "axios";

export const getAllPosts = async () => {
  const data = await axios.get(`${baseURL}/posts`).then((res) => res.data);
  return data;
};

export const addPost = async (
  title: String,
  content: String,
  userID: Number
) => {
  const data = await axios
    .post(`${baseURL}/post`, { title, content, userID })
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
  const data = await axios.get(`${baseURL}/post/${id}`).then(res => res.data);
  return data;
};
