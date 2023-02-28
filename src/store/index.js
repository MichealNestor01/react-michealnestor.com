import { createSlice, configureStore } from "@reduxjs/toolkit";

// development = http://localhost:3000/; deployment = https://www.michealnestor.com;
export const domainName = "https://www.michealnestor.com/";

/*--------------------------------------------------------------------------*/
/*-----------------------UI SLICE-------------------------------------------*/
/*--------------------------------------------------------------------------*/

const initalUiState = {
  showPopup: false,
  popupTitle: "",
  popupMessage: "",
  screenWidth: 1920,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initalUiState,
  reducers: {
    show(state, action) {
      state.showPopup = true;
      state.popupTitle = action.payload.title;
      state.popupMessage = action.payload.message;
    },
    hidePopup(state) {
      state.showPopup = false;
    },
    setScreenWidth(state, action) {
      state.screenWidth = action.payload;
    },
  },
});

const uiShowPopup = (title, message) => {
  return async (dispatch) => {
    dispatch(uiActions.show({ title, message }));
    await new Promise((resolve) => setTimeout(resolve, 3000));
    dispatch(uiActions.hidePopup());
  };
};

/*--------------------------------------------------------------------------*/
/*--------------------STORE CONFIG------------------------------------------*/
/*--------------------------------------------------------------------------*/

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
});

export const uiActions = { showPopup: uiShowPopup, ...uiSlice.actions };

export default store;
