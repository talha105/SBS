import {
    CURRENT_PROFILE,
    GET_NOTES,
    LOGIN, LOGOUT, PROFILES,
    GET_PACKAGES,
    GET_NOTE,
    SEARCH,
    SUBSCRIBE,
    GET_REMINDERS,
    CREATE_PROFILE
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

export const login=(data,fb)=>async(dispatch)=>{
    try{
        if(fb){
            const res=await sbs.post('/api/v1/customer/social-login',data);
            if(res.data.success){
                await AsyncStorage.setItem('fb',JSON.stringify(data))
                await AsyncStorage.setItem('id',res.data.data.userData.id.toString())
                await AsyncStorage.setItem('token',res.data.data.token)
            }
            dispatch({
                type:LOGIN,
                payload:res.data
            })
        }else{
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
        }

    }catch(err){
        dispatch({
            type:LOGIN,
            payload:err.response.data
        })

    }
}

export const logOut=()=>async(dispatch)=>{
    // await AsyncStorage.removeItem('password')
    // await AsyncStorage.removeItem('email')
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
        dispatch({
            type:CREATE_PROFILE,
            payload:1
        })
        return res
    }
    
}

export const setProfile=(data)=>async(dispatch)=>{
    dispatch({
        type:CURRENT_PROFILE,
        payload:data
    })
}


export const createNote=(data,update,id)=>async(dispatch)=>{
    const updatedData={
        notes_type: "text",
        title:data.title,
        description:data.des,
        profileId:data.id
    }
    const token=await AsyncStorage.getItem('token')
    if(update){
        const res=await sbs.put(`/api/v1/notes/${id}`,updatedData,{
            headers:{
                Authorization:token
            }
        });
        console.log(res.data)
        return res
    }else{
        const res=await sbs.post(`/api/v1/notes`,updatedData,{
            headers:{
                Authorization:token
            }
        });
    
        return res
    }
    
}

export const getNotes=(id,month)=>async(dispatch)=>{
    console.log(id,month,"profile")
    const token=await AsyncStorage.getItem('token')
    const res=await sbs.get('/api/v1/notes',{
        headers:{
            Authorization:token
        },
        params:{
            profileId:id,
            month
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
    console.log(data)
    const token=await AsyncStorage.getItem('token')
    const res=await sbs.post(`/api/v1/customer/payment`,data,{
        headers:{
            Authorization:token
        }
    });
    if(res.data.success){
        dispatch({
            type:SUBSCRIBE,
            payload:data.subId
        })
    }
    return res
}

export const search=(profileId,q)=>async(dispatch)=>{
    const token=await AsyncStorage.getItem('token')
    const res=await sbs.get(`/api/v1/customer/notes/search`,{
        headers:{
            Authorization:token
        },
        params:{
            profileId,
            q
        }
    });
   dispatch({
       type:SEARCH,
       payload:res.data.data
   })
}

export const getReminders=(profileId)=>async(dispatch)=>{
    console.log(profileId,"reminderget")
    const token=await AsyncStorage.getItem('token')
    const res=await sbs.get(`/api/v1/remainder`,{
        headers:{
            Authorization:token
        },
        params:{
            profileId,
        }
    });
   dispatch({
       type:GET_REMINDERS,
       payload:res.data.data.results
   })
}

export const createReminder=(data)=>async(dispatch)=>{
    console.log(data)
    const token=await AsyncStorage.getItem('token')
    const res=await sbs.post(`/api/v1/remainder`,data,{
        headers:{
            Authorization:token
        }
    });
    return res
}

export const saveImage=(data)=>async(dispatch)=>{
    const body=new FormData()
    var file={
        uri:data.uri,
        name:data.fileName,
        type:data.type
    }
    body.append("file",file)
    const token=await AsyncStorage.getItem('token')
    const res=await sbs.post(`/api/v1/attachment`,body,{
        headers:{
            Authorization:token
        }
    });
    return res
}