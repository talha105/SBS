import { CREATE_PROFILE, LOGIN, LOGOUT, SUBSCRIBE } from "../actions/types";

const initialState={}

export default function user(state=initialState,action){
    switch(action.type){
        case LOGIN:
            return action.payload;
        case LOGOUT:
            return action.payload;
        case SUBSCRIBE:
            return {...state,data:{...state.data,userData:{...state.data.userData,packageId:state.data.userData.packageId+1}}}
            case CREATE_PROFILE:
                return {...state,data:{...state.data,userData:{...state.data.userData,profileCount:state.data.userData.profileCount+1}}}
        default:
            return state
    }
}