import { store } from "../store";
import { openAlert } from "../store/reducers/alert";

const alert = (type = 'info', message, open = 'true') => {
    store.dispatch(
        openAlert({
            message,
            type,
            open
        })
    );
};

export default alert;
