import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pools: [],
    bets: [],
    pool: {}
};

const p2p = createSlice({
    name: "p2p",
    initialState,
    reducers: {
        savePools(state, action) {
            state.pools = action.payload;
        },
        saveBets(state, action) {
            state.bets = action.payload;
        },
        choosePool(state, action) {
            state.pool = action.payload;
        },
    },
});

export default p2p.reducer;

export const {
    savePools,
    saveBets,
    choosePool
} = p2p.actions;
