import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItem: [],
  drawerOpen: true,
  sidebarOpen: false,
  page: "",
  modal: "",
  sportsmenu: true,
  chatOpen: false,
  isPlaying: false,
  isSports: false,
  isTable: false,
};

const menu = createSlice({
  name: "menu",
  initialState,
  reducers: {
    activeItem(state, action) {
      state.selectedItem = action.payload;
    },

    openDrawer(state, action) {
      state.drawerOpen = action.payload;
    },

    ChangePage(state, action) {
      state.page = action.payload;
    },

    ShowModal(state, action) {
      state.modal = action.payload;
    },

    openSidebar(state, action) {
      state.sidebarOpen = action.payload;
    },

    changeSportsMenu(state, action) {
      state.sportsmenu = action.payload;
    },

    changeChatOpen(state, action) {
      state.chatOpen = action.payload;
    },

    activeGame(state, action) {
      state.isPlaying = action.payload;
    },

    activeSports(state, action) {
      state.isSports = action.payload;
    },

    activeTable(state, action) {
      state.isTable = action.payload;
    }
  },
});

export default menu.reducer;

export const {
  activeItem,
  openDrawer,
  ChangePage,
  ShowModal,
  openSidebar,
  changeSportsMenu,
  changeChatOpen,
  activeGame,
  activeSports,
  activeTable
} = menu.actions;
