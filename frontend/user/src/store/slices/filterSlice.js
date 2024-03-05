import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    searchFilter: "",
    sortFilter: "",
    categoryFilter: [],
    levelFilter: [],
    typeFilter: [],
  },
  reducers: {
    setSearch: (state, action) => {
      state.searchFilter = action.payload;
    },
    setSort: (state, action) => {
      state.sortFilter = action.payload;
    },
    setCategory: (state, action) => {
      state.categoryFilter = action.payload;
    },
    setLevel: (state, action) => {
      state.levelFilter = action.payload;
    },
    setType: (state, action) => {
      state.typeFilter = action.payload;
    },
  },
});

export const { setSearch, setSort, setCategory, setLevel, setType } =
  filterSlice.actions;

export const selectSearchFilter = (state) => state.filter.searchFilter;
export const selectSortFilter = (state) => state.filter.sortFilter;
export const selectCategoryFilter = (state) => state.filter.categoryFilter;
export const selectLevelFilter = (state) => state.filter.levelFilter;
export const selectTypeFilter = (state) => state.filter.typeFilter;

export default filterSlice.reducer;
