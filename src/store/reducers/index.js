import { combineReducers } from 'redux';

import authReducer from './auth';
import menuReducer from './menu';
import sportsReducer from './sports';
import p2pReducer from './p2p';
import alertReducer from './alert';
import loadReducer from './load';
import playerReducer from './player';

const reducer = combineReducers({
    auth: authReducer,
    menu: menuReducer,
    sports: sportsReducer,
    p2p: p2pReducer,
    alert: alertReducer,
    load: loadReducer,
    player : playerReducer,
});

export default reducer;
