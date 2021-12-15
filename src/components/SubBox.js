import React from 'react'
import { StyleSheet, Text, TextInput, View,TouchableOpacity } from 'react-native'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import MarkIcon from "react-native-vector-icons/Ionicons"

export default function SubBox({title,price,auto,packageExpiry,call,disable}) {
    return (
        <View style={{width:'50%',padding:responsiveFontSize(0.75)}}>
            <TouchableOpacity 
            disabled={disable}
            onPress={call}
            style={{...styles.con,backgroundColor:!disable?'white':'#e6e6e6'}}>
            <Text>{title}</Text>
            <Text><Text style={styles.price}>${price}</Text> {packageExpiry}</Text>
            <View style={styles.box}>
                <MarkIcon
                name="checkmark-circle-sharp"
                size={responsiveFontSize(3)}
                color="#A5DC69"
                />
                <Text style={{marginLeft:responsiveFontSize(1)}}>
                    Auto re-new
                </Text>
            </View>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    con:{
        backgroundColor:"white",
        borderRadius:responsiveFontSize(1.5),
        padding:responsiveFontSize(1)
    },
    price:{
        fontFamily:'Poppins-Bold',
        color:'black',
        fontSize:responsiveFontSize(3)
    },
    box:{
        borderTopWidth:1,
        borderColor:'lightgrey',
        marginVertical:responsiveFontSize(1),
        paddingTop:responsiveFontSize(1),
        flexDirection:'row',
        alignItems:'center'
    }
})
