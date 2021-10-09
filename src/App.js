import React,{useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import {Provider} from "react-redux"
import Routes from './routes'
import store from "./store/index"
export default function App() {
  useEffect(()=>{
    SplashScreen.hide()
  },[])
  return (
    <Provider store={store}>
      <Routes/>
    </Provider>
  )
}

const styles = StyleSheet.create({})
