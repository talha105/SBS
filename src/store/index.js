import {combineReducers,compose,createStore,applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import user from "./reducers/user"
import profiles from "./reducers/profiles";
import currentProfile from "./reducers/currentProfile";
import notes from "./reducers/notes";

const reducers =combineReducers({
    user,
    profiles,
    currentProfile,
    notes
})


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store =createStore(reducers,{},composeEnhancers(applyMiddleware(ReduxThunk)));


export default store