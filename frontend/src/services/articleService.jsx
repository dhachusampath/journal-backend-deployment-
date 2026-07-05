import axios from "axios";

const API = "https://journal-backend-2i4l.onrender.com/api/articles";

export const getArticles = async () => {
  return await axios.get(`${API}`);
};

export const getArticleById = async (id) => {
  return await axios.get(`${API}/${id}`);
};

export const createArticle = async (formData, token) => {
  return await axios.post(`${API}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateArticle = async (id, formData, token) => {
  return await axios.put(`${API}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteArticle = async (id, token) => {
  return await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
