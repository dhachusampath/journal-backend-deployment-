import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "./Articleapi";

const initialState = {
  articles: [],
  currentArticle: null,

  page: 1,
  totalPages: 1,
  category: "all",
  search: "",

  loading: false,
  error: null,

  actionLoading: false, // for create/update/delete
  actionError: null,
};

export const fetchArticles = createAsyncThunk(
  "article/fetchAll",
  async ({ page = 1, category = "all", search = "" } = {}, thunkAPI) => {
    try {
      const res = await API.get("/", {
        params: { page, category, search },
      });
      return res.data; // expected: { articles, page, totalPages }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch articles",
      );
    }
  },
);

// GET /articles/:id
export const fetchArticleById = createAsyncThunk(
  "article/fetchOne",
  async (id, thunkAPI) => {
    try {
      const res = await API.get(`/${id}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch article",
      );
    }
  },
);

// POST /articles  (formData if it includes an image)
export const createArticle = createAsyncThunk(
  "article/create",
  async (formData, thunkAPI) => {
    try {
      const res = await API.post("/", formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to create article",
      );
    }
  },
);

// PUT /articles/:id
export const updateArticle = createAsyncThunk(
  "article/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await API.put(`/${id}`, formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to update article",
      );
    }
  },
);

// DELETE /articles/:id
export const deleteArticle = createAsyncThunk(
  "article/delete",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete article",
      );
    }
  },
);

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
      state.page = 1;
    },
    setSearch(state, action) {
      state.search = action.payload;
      state.page = 1;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    clearCurrentArticle(state) {
      state.currentArticle = null;
    },
    clearActionError(state) {
      state.actionError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.articles;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch one
      .addCase(fetchArticleById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentArticle = null;
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentArticle = action.payload;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // create
      .addCase(createArticle.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.articles.unshift(action.payload);
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      })

      // update
      .addCase(updateArticle.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.articles = state.articles.map((a) =>
          a._id === action.payload._id ? action.payload : a,
        );
        if (state.currentArticle?._id === action.payload._id) {
          state.currentArticle = action.payload;
        }
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      })

      // delete
      .addCase(deleteArticle.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.articles = state.articles.filter((a) => a._id !== action.payload);
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      });
  },
});

export const {
  setCategory,
  setSearch,
  setPage,
  clearCurrentArticle,
  clearActionError,
} = articleSlice.actions;

export default articleSlice.reducer;