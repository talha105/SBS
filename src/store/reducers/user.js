import { LOGIN, LOGOUT } from "../actions/types";

const initialState={}

export default function user(state=initialState,action){
    switch(action.type){
        case LOGIN:
            return action.payload;
        case LOGOUT:
            return action.payload;
        default:
            return state
    }
}