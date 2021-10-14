import React from 'react'
import { StyleSheet, Text, View, Image,TouchableOpacity} from 'react-native'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";

export default function ProfileBox({img,name,email,call}) {
    return (
        <View style={{width:'33.33%',alignItems:'center',marginVertical:responsiveFontSize(0.75)}}>
        <TouchableOpacity
        onPress={call}
        style={styles.con}
        >
            <Image
            style={styles.img}
            source={img}
            />
            <Text style={{...styles.txt,marginTop:responsiveHeight(1)}}>{name}</Text>
            <Text style={styles.txt}>{email}</Text>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    con:{
        backgroundColor:'white',
        justifyContent:'center',
        width:'95%',
        alignItems:'center',
        padding:responsiveFontSize(2),
        borderRadius:responsiveFontSize(1.5)
    },
    txt:{
        color:'#2C4248',
        fontFamily:'Poppins-Medium',
        fontSize:responsiveFontSize(1.2)
    },
    img:{
        width:responsiveFontSize(6.5),
        height:responsiveFontSize(6.5),
        borderRadius:responsiveFontSize((6.5)/2)
    }
})
