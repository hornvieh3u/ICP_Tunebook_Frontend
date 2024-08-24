import axios from "./Axios";

export const checkAddress = async (publicAddress) => {
    const res = await axios.post("api/v2/users/a-check", { publicAddress });
    return res;
};

export const signInAddress = async (publicAddress, signature) => {
    const res = await axios.post("api/v2/users/a-signin", {
        publicAddress,
        signature,
    });
    return res;
};

export const signInSolana = async (publicAddress, signature) => {
    const res = await axios.post('api/v2/users/s-signin', {
        publicAddress,
        signature
    });
    return res;
};

export const getCurrency = async () => {
    const res = await axios.post("api/v2/payments/get-currency", {});
    return res;
};
