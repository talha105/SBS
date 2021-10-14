import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import DateIcon from "react-native-vector-icons/Fontisto"
import TimeIcon from "react-native-vector-icons/Ionicons"
import MarkIcon from "react-native-vector-icons/Ionicons"

export default function Note({title,des,date,time,select,call}) {
    return (
        <View style={{width:'50%',padding:responsiveFontSize(1)}}>
        <TouchableOpacity
        onPress={call}
        style={{...styles.con,borderColor:select?'#44C4A1':'white'}}
        >
            {select?(
                <View style={styles.mark}>
                    <MarkIcon
                    name="checkmark-circle-sharp"
                    size={responsiveFontSize(3)}
                    color="#44C4A1"
                    />
                </View>
            ):null}
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.des}>{des}</Text>
            <View style={styles.bottom}>
                <View style={styles.box}>
                    <DateIcon
                    name="date"
                    color="lightgrey"
                    size={responsiveFontSize(1.8)}
                    />
                    <Text style={styles.dt}>{date}</Text>
                </View>
                <View style={styles.box}>
                    <TimeIcon
                    color="lightgrey"
                    name="md-time-outline"
                    size={responsiveFontSize(2)}
                    />
                    <Text style={styles.dt}>{time}</Text>
                </View>
            </View>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    con:{
        backgroundColor:"white",
        borderWidth:1,
        borderRadius:responsiveFontSize(1.5),
        padding:responsiveFontSize(1)
    },
    title:{
        color:'#2C4248',
        fontFamily:'Poppins-Bold',
        fontSize:responsiveFontSize(1.5)
    },
    des:{
        color:'#2C4248',
        fontSize:responsiveFontSize(1.3),
        textAlign:'justify'
    },
    bottom:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:responsiveFontSize(1)
    },
    box:{
        flexDirection:'row',
    },
    dt:{
        color:'lightgrey',
        marginLeft:responsiveFontSize(1),
        fontSize:responsiveFontSize(1.3)
    },
    mark:{
        position:'absolute',
        left:-10,
        top:-10
    }
})
