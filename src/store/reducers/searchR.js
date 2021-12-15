import { SEARCH } from "../actions/types";

const initialState=[];

export default function searchR(state=initialState,action){
    switch(action.type){
        case SEARCH:
            return action.payload;
        default:
            return state
    }
}