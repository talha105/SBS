import {
    CURRENT_PROFILE,
    GET_NOTES,
    LOGIN, LOGOUT, PROFILES,
    GET_PACKAGES,
    GET_NOTE
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

export const createProfile=(data)=>async(dispatch)=>{
    console.log(data)
    const token=await AsyncStorage.getItem('token')
    const body=new FormData()

    if(data.img?.uri){
        var file={
            uri:data.img.uri,
            name:data.img.fileName,
            type:data.img.type
        }
        body.append("file",file)
    }

    body.append("profile_name",data.name);
    body.append("profile_email",data.email)

    if(data.id){
        const res=await sbs.put(`/api/v1/form/profile/${data.id}`,body,{
            headers:{
                Authorization:token
            }
        });
        return res
    }else{
        const res=await sbs.post('/api/v1/form/profile',body,{
            headers:{
                Authorization:token
            }
        });
        return res
    }
    
}

export const setProfile=(data)=>async(dispatch)=>{
    dispatch({
        type:CURRENT_PROFILE,
        payload:data
    })
}


export const createNote=(data)=>async(dispatch)=>{
    const updatedData={
        notes_type: "text",
        title:data.title,
        description:data.des,
        profileId:data.id
    }
    const token=await AsyncStorage.getItem('token')
    const res=await sbs.post('/api/v1/notes',updatedData,{
        headers:{
            Authorization:token
        }
    });

    return res
    
}

export const getNotes=(id)=>async(dispatch)=>{
    const token=await AsyncStorage.getItem('token')
    const res=await sbs.get('/api/v1/notes',{
        headers:{
            Authorization:token
        },
        params:{
            profileId:id
        }
    });
    dispatch({
        type:GET_NOTES,
        payload:res.data.data.results
    })
    
}

export const getPackages=()=>async(dispatch)=>{
    const token=await AsyncStorage.getItem('token')
    const res=await sbs.get('/api/v1/package',{
        headers:{
            Authorization:token
        }
    });
    dispatch({
        type:GET_PACKAGES,
        payload:res.data.data.results
    })
}


export const getNote=(id)=>async(dispatch)=>{
    const token=await AsyncStorage.getItem('token')
    const res=await sbs.get(`/api/v1/notes/${id}`,{
        headers:{
            Authorization:token
        }
    });
    dispatch({
        type:GET_NOTE,
        payload:res.data.data[0]
    })
}

export const subscribe=(data)=>async(dispatch)=>{
    const token=await AsyncStorage.getItem('token')
    const res=await sbs.post(`/api/v1/customer/payment`,data,{
        headers:{
            Authorization:token
        }
    });
    return res
}