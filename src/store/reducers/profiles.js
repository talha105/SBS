import { PROFILES } from "../actions/types";

const initialState=[];

export default function profiles(state=initialState,action){
    switch(action.type){
        case PROFILES:
            return action.payload;
        default:
            return state
    }
}