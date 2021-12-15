import { GET_REMINDERS } from "../actions/types";

const initialState=[];

export default function reminders(state=initialState,action){
    switch(action.type){
        case GET_REMINDERS:
            return action.payload;
        default:
            return state
    }
}