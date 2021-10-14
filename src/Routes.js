import React from 'react'
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

function drawer(){
    return(
        <Drawer.Navigator
        drawerContent={CustomDrawer}
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
                title:"Profile",
                headerShown:true
            }}
            name="profile"
            component={Profile}
            />
        </Drawer.Navigator>
    )
}

function SecondStep(){
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
            <Stack.Screen options={{headerShown:false}} name="drawer" component={drawer}/>
        </Stack.Navigator>
    )
}

export default function Routes() {
    return (
        <NavigationContainer theme={MyTheme}>
            {AuthRoutes()}
            {/* {false?AuthRoutes():SecondStep()} */}
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})
