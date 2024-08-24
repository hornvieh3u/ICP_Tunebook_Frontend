import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    action: false,
    open: false,};

const load = createSlice({
    name: 'load',
    initialState,
    reducers: {
        showLoading(state, action) {            
            const { open} = action.payload;
            state.action = !state.action;
            state.open = open;
        },

        hideLoading(state) {
            state.open = false;
        }
    }
});

export default load.reducer;

export const { showLoading, hideLoading } = load.actions;
