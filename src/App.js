import 'react-native-gesture-handler';
import React,{useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import {Provider} from "react-redux"
import GlobalFont from 'react-native-global-font'
import Routes from './Routes'
import store from "./store/index"
export default function App() {
  useEffect(()=>{
    SplashScreen.hide()
    GlobalFont.applyGlobal("Poppins-Regular")
  },[])
  return (
    <Provider store={store}>
      <Routes/>
    </Provider>
  )
}

const styles = StyleSheet.create({})
