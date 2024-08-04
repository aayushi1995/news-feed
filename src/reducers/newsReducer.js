import { createSlice } from "@reduxjs/toolkit";

const StoredPreferences = localStorage.getItem("news-preferences");
const StoredFilters = localStorage.getItem("news-filters");


export const emptyBaseFilter = {
  category: null,
  source: null,
}
export const emptyPreferenceState = {
  ...emptyBaseFilter,
  author: null
}

export const emptyFilterState =  {
  ...emptyBaseFilter,
  date: null,
}

const initialState = {
  loading: false,
  news: [],
  error: null,
  filters: JSON.parse(StoredFilters) ||{
    category: null,
    source: null,
    date: null,
  },
  preferences: JSON.parse(StoredPreferences) || {
    category: null,
    source: null,
    author: null
  },
  pageNumber: 1,
  searchQuery: "",
  filteredNews: [],
};



const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    fetchNewsRequest: (state) => {
      state.loading = true;
    },
    fetchNewsSuccess: (state, action) => {
      state.loading = false;
      state.filteredNews = action.payload;
    },
    fetchNewsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  
    applyFilters: (state, action) => {
      state.filters = action.payload;
    },
    savePreferences: (state, action) => {
      state.preferences = action.payload;
    },
    resetFilters: (state) => {
      state.filters = {
        category: null,
        source: null,
        date: null,
      }
    },
    resetPreferences: (state) => {
      state.preferences = {
        category: null,
        source: null,
        author: null,
      }
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { fetchNewsRequest, fetchNewsSuccess, fetchNewsFailure, applyFilters, setSearchQuery, resetFilters, savePreferences, resetPreferences, updatePageNumber} = newsSlice.actions;

export default newsSlice.reducer;
