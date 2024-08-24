import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    betslipData: [],
    betAmount: 0,
    betslipOpen: false,
    search: '',
    league: 'England Premier League',
};

const sports = createSlice({
    name: 'sports',
    initialState,
    reducers: {
        setBetslip(state, action) {
            const innerWidth = window.innerWidth;
            if (innerWidth > 767 && action.payload.length > state.betslipData.length) {
                state.betslipOpen = true;
            }
            state.betslipData = [...action.payload];
        },

        setLeague(state, action) {
            state.league = action.payload;
        },

        clearAll(state) {
            state.betslipData = [];
        },

        setBetAmount(state, action) {
            state.betAmount = action.payload;
        },

        openBetslip(state, action) {
            state.betslipOpen = action.payload;
        },

        updateSearch(state, action) {
            state.search = action.payload;
        }
    }
});

export default sports.reducer;

export const { setBetslip, setBetAmount, clearAll, openBetslip, updateSearch, setLeague } = sports.actions;
