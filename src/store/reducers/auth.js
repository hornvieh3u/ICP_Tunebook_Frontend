import { createSlice } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import _ from "lodash";
import { instruments } from '../../const/variable';

const initialCurrency = {
    _id: '',
    icon: process.env.REACT_APP_CURRENCY_ICON,
    symbol: process.env.REACT_APP_CURRENCY,
    minBet: 1000,
    maxBet: 100000,
    price: 0.1
};

const initialUser = {
    principal: '',
    username: '',
    avatar: '',
    instruments: '',
    placeOfBirth: '',
    isInitialized: false,
};

const initialState = {
    isInitialized: true,
    isLoggedIn: false,
    code: '',
    betsId: '',
    headerTitle: 'Celtic Crossroads',
    principal: null,
    user: initialUser,
    identity: '',
    songListUpdated : 0,
    adminAddress: '',
    nowpayMinAmount: 0,
    orgTunes: [],
    currentTune:  {}
};

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        Login(state, action) {
            const { userInfo } = action.payload;
            state.isLoggedIn = true;
            state.isInitialized = true;    
            state.user = userInfo;
       },

        UpdateInfo(state, action) {
            const {userInfo} = action.payload;

            state.user = _.merge({}, state.user, userInfo);
        },

        SetIdentity(state, action) {
            const {identity} = action.payload;

            state.identity = identity;
        },

        SetPrincipal(state, action) {
            const {principal} = action.payload;

            state.principal = principal;
        },

        UpdateBalance(state, action) {
            state.balance = action.payload;
        },

        UpdateBalances(state, action) {
            const balance = action.payload;
            state.balance = balance.balance;
            state.balanceId = balance._id;
            state.currency = balance.currency;
            state.currencyId = balance.currency._id;
            state = { ...state };
        },

        SetNowpayMinAmount(state, action) {
            state.nowpayMinAmount = action.payload.minAmount;
        },

        SetBalances(state, action) {
            state.balances = action.payload
        },

        SetCode(state, action) {
            state.code = action.payload;
        },

        SetBetsId(state, action) {
            state.betsId = action.payload;
        },

        Logout(state, action) {
            state.user = initialUser;
            state.isLoggedIn = false;
            state.isInitialized = true;
            state = { ...state };
        },

        UpdateToken(state, action) {
            state.token = action.payload
        },

        UpdateSongList(state, action) {
            state.songListUpdated = state.songListUpdated + 1;
        },

        SetTitle(state, action) {
            state.headerTitle = action.payload;
        },

        SetOrgTunes(state, action) {
            state.orgTunes = action.payload;
        },

        SetCurrentTune(state, action) {
            state.currentTune = action.payload;
        }
    }
});

export default auth.reducer;

export const { Login, Logout, SetIdentity, UpdateSongList, SetPrincipal, UpdateInfo, UpdateBalances, SetTitle, SetOrgTunes, SetCurrentTune, SetBalances, UpdateBalance, SetCode, SetBetsId, UpdateToken, SetNowpayMinAmount } = auth.actions;
