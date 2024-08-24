import { store } from "../store";
import { showLoading } from "../store/reducers/load";

const loading = (open = true) => {
    store.dispatch(
        showLoading({
            open
        })
    );
};

export default loading;
