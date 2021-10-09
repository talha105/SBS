import React from 'react'
import {StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import ErrorIcon from "react-native-vector-icons/MaterialIcons"

export default function Input({name,icon,getValue,error,password,value,show}) {
    return (
        <View style={{...styles.con,borderColor:error?"red":"white"}}>
            <View style={{width:'80%'}}>
                <Text>{name}</Text>
                <TextInput
                value={value}
                onChangeText={v=>getValue(v)}
                secureTextEntry={password}
                style={styles.input}
                />
            </View>
            {
                icon && !error?(
                    <TouchableOpacity
                    onPress={show}
                    style={styles.icn}
                    >
                        {icon()}
                    </TouchableOpacity>
                ):null
            }
            {
                error?(
                    <View
                    style={styles.icn}
                    >
                        <ErrorIcon
                        name="error-outline"
                        color="red"
                        size={responsiveFontSize(3)}
                        />
                    </View>
                ):null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    con:{
        backgroundColor:'white',
        borderRadius:responsiveFontSize(1.5),
        flexDirection:'row',
        alignItems:'center',
        padding:responsiveFontSize(1),
        borderWidth:1,
        marginVertical:responsiveFontSize(1)
    },
    icn:{
        width:'20%',
        justifyContent:'center',
        alignItems:'center'
    },
    input:{
        paddingVertical:responsiveFontSize(0.2)
    }
})
