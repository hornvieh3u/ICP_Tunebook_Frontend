import axios from 'axios';
import { BASE_URL } from '../config';
import { store } from '../store';
import { Logout } from '../store/reducers/auth';
import alert from "../utils/Alert";
import toast from 'react-hot-toast';

const axiosServices = axios.create();

axiosServices.interceptors.request.use(
    (config) => {
        config.baseURL = BASE_URL;
        const state = store.getState();
        const accessToken = state.auth.token;
        if (accessToken) {
            config.headers.authorization = accessToken;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosServices.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const { response } = error;

        console.log("error", response.data)

        if (response && response.status === 400) {
            alert("danger", response.data)
        } else if (response && response.status === 401) {
            store.dispatch(Logout({}));
        } else if (response && response.status === 413) {
            alert("danger", response.data)
        } else if (response && response.status === 429) {
            alert("danger", response.data)
        } else {
            console.log(response);
        }
        return Promise.reject(error);
    }
);

export default axiosServices;
