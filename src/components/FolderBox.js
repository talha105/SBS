import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { responsiveFontSize } from 'react-native-responsive-dimensions'

export default function FolderBox({month,call}) {
    return (
        <View style={{width:'25%',marginVertical:responsiveFontSize(2)}}>
        <TouchableOpacity 
        onPress={call}
        style={{
            justifyContent:'center',
            alignItems:'center'
        }}>
            <Image
            style={{
                width:responsiveFontSize(6),
                height:responsiveFontSize(8)
            }}
            source={require('../../assets/folderIcon.png')}
            />
            <Text
            style={{textTransform:'capitalize',fontFamily:'Poppins-Bold',fontSize:responsiveFontSize(1.5)}}
            >{month}</Text>
        </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({})
