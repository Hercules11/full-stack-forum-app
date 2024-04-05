import { legacy_createStore as createStore } from "redux";
import { rootReducer } from "./AppState";


const configureStore = () => {
    return createStore(rootReducer, {})
}

export default configureStore;