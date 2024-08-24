import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    action: false,
    play: false,
    tracks: [],
    currentIndex : 0
};

const player = createSlice({
    name: 'player',
    initialState,
    reducers: {
        showAudioPlay(state, action) {            
            const { play, tracks, currentIndex } = action.payload;
            state.action = !state.action;
            state.play = play;
            state.tracks = tracks;
            state.currentIndex = currentIndex;
        },

        hideAudioPlay(state) {
            state.play = false;
            state.tracks = [];
            state.currentIndex = 0;
        }
    }
});

export default player.reducer;

export const { showAudioPlay, hideAudioPlay } = player.actions;
