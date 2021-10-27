import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

export default function Loader() {
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator color={"#7A448D"} size={responsiveFontSize(3)}/>
        </View>
    )
}

const styles = StyleSheet.create({})
