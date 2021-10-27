import {
    LOGIN, LOGOUT, PROFILES
} from "./types"
import {api} from "../../config/config.json";
import axios,{AxiosError} from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getToken(){
    const token=await AsyncStorage.getItem('token')
    return token
}

const sbs=axios.create({
    baseURL:api
})

export const login=(data)=>async(dispatch)=>{
    try{
        const res=await sbs.post('/api/v1/customer/login',data);
        if(res.data.success){
            await AsyncStorage.setItem('password',data.password)
            await AsyncStorage.setItem('email',data.email)
            await AsyncStorage.setItem('id',res.data.data.userData.id.toString())
            await AsyncStorage.setItem('token',res.data.data.token)
        }
        dispatch({
            type:LOGIN,
            payload:res.data
        })
    }catch(err){
        dispatch({
            type:LOGIN,
            payload:err.response.data
        })

    }
}

export const logOut=()=>async(dispatch)=>{
    await AsyncStorage.removeItem('password')
    await AsyncStorage.removeItem('email')
    await AsyncStorage.removeItem('id')
    await AsyncStorage.removeItem('token')
    dispatch({
        type:LOGOUT,
        payload:{}
    })
}

export const setUser=()=>async(dispatch)=>{

    const password=await AsyncStorage.getItem('password')
    const email=await AsyncStorage.getItem('email')
    const id=await AsyncStorage.getItem('id')
    if(id){
        try{
            const res=await sbs.post('/api/v1/customer/login',{
                email,
                password
            });
            dispatch({
                type:LOGIN,
                payload:res.data
            })
        }catch(err){
            await AsyncStorage.removeItem('password')
            await AsyncStorage.removeItem('email')
            await AsyncStorage.removeItem('id')
            await AsyncStorage.removeItem('token')
            dispatch({
                type:LOGOUT,
                payload:{}
            })
        }

    }
}


export const signUp=(data)=>async(dispatch)=>{
    try{
        const res=await sbs.post('/api/v1/customer/registration',data);
        if(res.data.success){
            await AsyncStorage.setItem('password',data.password)
            await AsyncStorage.setItem('email',data.email)
            await AsyncStorage.setItem('id',res.data.data.userData.id.toString())
            await AsyncStorage.setItem('token',res.data.data.token)
        }
        dispatch({
            type:LOGIN,
            payload:res.data
        })
    }catch(err){
        dispatch({
            type:LOGIN,
            payload:{
                ...err.response.data,
                message:{
                    errorMessgae:err.response.data.message
                }
            }
        })

    }
}

export const getProfiles=()=>async(dispatch)=>{

    const token=await AsyncStorage.getItem('token')
    const res=await sbs.get('/api/v1/profile',{
        headers:{
            Authorization:token
        }
    });
    dispatch({
        type:PROFILES,
        payload:res.data.data.results
    })
    
}