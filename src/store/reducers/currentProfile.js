import { CURRENT_PROFILE } from "../actions/types";

const initialState={};

export default function currentProfile(state=initialState,action){
    switch(action.type){
        case CURRENT_PROFILE:
            return action.payload;
        default:
            return state
    }
}