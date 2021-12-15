import { CURRENT_PROFILE, LOGOUT } from "../actions/types";

const initialState={};

export default function currentProfile(state=initialState,action){
    switch(action.type){
        case CURRENT_PROFILE:
            return action.payload;
        case LOGOUT:
            return {}
        default:
            return state
    }
}