import React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/auth/Login';
import SignUp from "./screens/auth/SignUp"
import ForgetPassword from './screens/auth/ForgetPassword';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Folder from './screens/folder/Folder';
import Subscribtion from './screens/subscribtion/Subscribtion';

const Drawer = createDrawerNavigator();
const Stack=createNativeStackNavigator();

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
        </Stack.Navigator>
    )
}

function FolderRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="folder" component={Folder}/>
        </Stack.Navigator>
    )
}

function drawer(){
    return(
        <Drawer.Navigator>
            <Drawer.Screen
            name="folder"
            component={FolderRoutes}
            />
            <Drawer.Screen
            name="subscription"
            component={Subscribtion}
            />
        </Drawer.Navigator>
    )
}

export default function Routes() {
    return (
        <NavigationContainer>
            {true?AuthRoutes():drawer()}
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({})
