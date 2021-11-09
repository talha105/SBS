import { GET_NOTE } from "../actions/types";

const initialState={};

export default function note(state=initialState,action){
    switch(action.type){
        case GET_NOTE:
            return action.payload;
        default:
            return state
    }
}