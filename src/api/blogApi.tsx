import axios from "axios";

const baseURL = "http://localhost:8000";

export const getAllPosts = async () => {
  const data = await axios.get(`${baseURL}/posts`).then(res => res.data)
  return data
};

export const addPost = async (title: String, content: String, userID: Number) => {
  const data = await axios.post(`${baseURL}/post`, {title, content, userID}).then(res => res.data)
  return data;
}