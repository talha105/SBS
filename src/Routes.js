import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/auth/Login';
import SignUp from "./screens/auth/SignUp"
import ForgetPassword from './screens/auth/ForgetPassword';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Folder from './screens/folder/Folder';
import Subscribtion from './screens/subscribtion/Subscribtion';
import CustomDrawer from "./components/CustomDrawer"
import Notes from './screens/folder/Note';
import NoteDetail from './screens/folder/NoteDetail';
import CreateNote from "./screens/folder/CreateDetail"
import AllNotes from './screens/folder/AllNote';
import Profile from './screens/profile/Profile';
import Profiles from './screens/profile/Profiles';
import { connect } from 'react-redux';
import * as actions from "./store/actions"
import Loader from './components/Loader';
import Search from './screens/search/Search';
import Reminder from './screens/reminder/reminder';
import CreateReminder from './screens/reminder/CreateReminder';

const Drawer = createDrawerNavigator();
const Stack=createNativeStackNavigator();
const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      card:'#7A448D',
    //   background:'white',
    //   text:'#000000'
    }
}  
function AuthRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen
            options={{
                headerShown:false
            }}
            name="signIn"
            component={Login}
            />
            <Stack.Screen
            options={{
                headerShown:false
            }}
            name="signUp"
            component={SignUp}
            />
            <Stack.Screen
            options={{
                headerShown:false
            }}
            name="forgetPassword"
            component={ForgetPassword}
            />
            <Stack.Screen 
            name="secondStep" 
            options={{
                headerShown:false
            }}
            component={SecondStep}/>
        </Stack.Navigator>
    )
}

function FolderRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name="folderScreen" 
            component={Folder}/>
            <Stack.Screen 
            name="notes" 
            options={{
                headerTintColor:'white'
            }}
            component={Notes}/>
            <Stack.Screen 
            name="search" 
            options={{
                headerTintColor:'white'
            }}
            component={Search}/>
            <Stack.Screen 
            name="noteDetail" 
            options={{
                headerTintColor:'white'
            }}
            component={NoteDetail}/>
            <Stack.Screen 
            name="noteCreate" 
            options={{
                headerTintColor:'white'
            }}
            component={CreateNote}/>
        </Stack.Navigator>
    )
}

function AllNotesRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name="allNotesScreen" 
            options={{
                headerTintColor:'white'
            }}
            component={AllNotes}/>
            <Stack.Screen 
            name="search" 
            options={{
                headerTintColor:'white'
            }}
            component={Search}/>
            <Stack.Screen 
            name="noteDetail" 
            options={{
                headerTintColor:'white'
            }}
            component={NoteDetail}/>
            <Stack.Screen 
            name="noteCreate" 
            options={{
                headerTintColor:'white'
            }}
            component={CreateNote}/>
        </Stack.Navigator>
    )
}
function SubscribtionRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name="subscribtions" 
            component={Subscribtion}/>
        </Stack.Navigator>
    )
}

function ReminderRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name="reminder" 
            component={Reminder}/>
            <Stack.Screen 
            name="createReminder" 
            options={{
                headerTintColor:'white',
                title:'Create Reminder'
            }}
            component={CreateReminder}/>
        </Stack.Navigator>
    )
}

function drawer(){
    return(
        <Drawer.Navigator
        drawerContent={(props)=><CustomDrawer props={props}/>}
        screenOptions={{
            drawerActiveTintColor:'#7A448D',
            headerTintColor:'white',
            headerShown:false
        }}
        >
            <Drawer.Screen
            name="folder"
            options={{
                title:"Folder"
            }}
            component={FolderRoutes}
            />
            <Drawer.Screen
            name="allNotes"
            options={{
                title:"All Notes"
            }}
            component={AllNotesRoutes}
            />
            <Drawer.Screen
            options={{
                title:"Subscriptions"
            }}
            name="subscription"
            component={SubscribtionRoutes}
            />
            <Drawer.Screen
            options={{
                title:"Reminders"
            }}
            name="reminders"
            component={ReminderRoutes}
            />
            <Drawer.Screen
            options={{
                title:"Profile",
                headerShown:true
            }}
            name="profile"
            component={Profile}
            />
        </Drawer.Navigator>
    )
}

function SecondStep(currentProfile){
    if(currentProfile.id){
        return drawer()
    }else{
        return(
            <Stack.Navigator>
                <Stack.Screen 
                name="profiles" 
                options={{headerShown:false}}
                component={Profiles}/>
                <Stack.Screen
                options={{
                    title:"Profile",
                    headerTintColor:'white',
                    headerShown:true
                }}
                name="profile"
                component={Profile}
                />
                <Stack.Screen
                options={{
                    title:"Subscribtion",
                    headerTintColor:'white',
                    headerShown:true
                }}
                name="subscribtion"
                component={Subscribtion}
                />
            </Stack.Navigator>
        )
    }

}

function Routes({user,setUser,currentProfile}) {
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        if(!user.data?.userData){
            setUser().then(()=>{
                setLoading(false)
            })
        }else{
            setLoading(false)
        }
    },[])
    
    if(!loading){
        return (
            <NavigationContainer theme={MyTheme}>
                {user.data?.userData?SecondStep(currentProfile):AuthRoutes()}
            </NavigationContainer>
        )
    }else{
        return <Loader/>
    }
}

function mapStateToProps({user,currentProfile}){
    return {user,currentProfile}
}

export default connect(mapStateToProps,actions)(Routes)
