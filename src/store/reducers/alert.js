import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    action: false,
    open: false,
    message: 'Note archived',
    type: "info"};

const alert = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        openAlert(state, action) {            
            const { message, type, open} = action.payload;
            state.action = !state.action;
            state.message = message || initialState.message;
            state.type = type || initialState.type;
            state.open = open || initialState.open;
        },

        closeAlert(state) {
            state.open = false;
        }
    }
});

export default alert.reducer;

export const { openAlert, closeAlert } = alert.actions;
