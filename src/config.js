export const BASE_URL =
    process.env.REACT_APP_API_URL || "http://localhost:3030";
export const BASE_SOCKET_URL = process.env.REACT_APP_SOCKET_API_URL || "http://localhost:4000";
export const BASE_PATH = "";

const config = {
    fontFamily: 'Roboto',
    borderRadius: 8,
    boxShadow:
        "rgba(0, 0, 0, 0.2) 0px 1px 3px 0px, rgba(0, 0, 0, 0.12) 0px 1px 2px 0px, rgba(255, 255, 255, 0.04) 0px 1px 0px 0px inset",
    outlinedFilled: true,
    navType: "dark",
    presetColor: "default",
    locale: "en",
    rtlLayout: false,
    timer1: 5000,
    timer2: 900000
}

export default config;