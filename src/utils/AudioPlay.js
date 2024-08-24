import { store } from "../store";
import { showAudioPlay } from "../store/reducers/player";

const audioPlay = (tracks, currentIndex, play = 'true') => {
    store.dispatch(
        showAudioPlay({
            tracks,
            currentIndex,
            play
        })
    );
};

export default audioPlay;
