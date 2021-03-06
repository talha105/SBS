import React from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions"
  
export default function Btn({text,call,loading}) {
    return (
        <TouchableOpacity
        disabled={loading}
        onPress={call}
        style={styles.con}
        >
            {loading?(
                <ActivityIndicator color="white" size={responsiveFontSize(3.5)}/>
            ):(
                <Text
                style={styles.txt}
                >
                    {text}
                </Text>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    con:{
        backgroundColor:'#7A448D',
        borderRadius:responsiveFontSize(1.5),
        justifyContent:'center',
        height:responsiveHeight(9),
        alignItems:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        
        elevation: 7,
    },
    txt:{
        color:'white'
    }
})
