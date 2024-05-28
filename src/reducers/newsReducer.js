import { createSlice } from "@reduxjs/toolkit";

const StoredPreferences = localStorage.getItem("news-prefrences");

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
  filters: {
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

// const filterNews = (news, filters, searchQuery) => {
//   return news.filter((item) => {
//     const matchesCategory = filters.category ? item.category === filters.category : true;
//     const matchesDate = filters.date ? new Date(item.date) >= new Date(filters.date) : true;
//     const matchesAuthor = filters.author ? item.author === filters.author : true;
//     const matchesSource = filters.source ? item.source === filters.source : true;
//     const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesDate && matchesAuthor && matchesSource && matchesSearch;
//   });
// };



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
      // state.filteredNews = filterNews(state.news, action.payload, state.searchQuery);
    },
    savePreferences: (state, action) => {
      state.preferences = action.payload;
      // state.filteredNews = filterNews(state.news, action.payload, state.searchQuery);
    },
    resetFilters: (state) => {
      state.filters = {
        category: null,
        source: null,
        date: null,
      }
      // state.filteredNews = filterNews(state.news, action.payload, state.searchQuery);
    },
    resetPreferences: (state) => {
      state.preferences = {
        category: null,
        source: null,
        author: null,
      }
      // state.filteredNews = filterNews(state.news, action.payload, state.searchQuery);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      // state.filteredNews = filterNews(state.news, state.filters, action.payload);
    },
  },
});

export const { fetchNewsRequest, fetchNewsSuccess, fetchNewsFailure, applyFilters, setSearchQuery, resetFilters, savePreferences, resetPreferences, updatePageNumber} = newsSlice.actions;

export default newsSlice.reducer;
