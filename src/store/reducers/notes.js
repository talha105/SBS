import { GET_NOTES } from "../actions/types";

const initialState=[];

export default function notes(state=initialState,action){
    switch(action.type){
        case GET_NOTES:
            return action.payload;
        default:
            return state
    }
}