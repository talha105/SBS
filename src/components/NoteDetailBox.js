import React, { useRef } from 'react'
import { StyleSheet, View,ScrollView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import {RichEditor,RichToolbar} from "react-native-pell-rich-editor"
import Btn from './Btn'

export default function NoteDetailBox() {
    const text=useRef("");
    return (
        <View style={{flex:1}}>
            <View style={styles.titleCon}>
                <TextInput
                placeholder="Your Title Here"
                placeholderTextColor="black"
                />
            </View>
            <View style={{backgroundColor:'white',marginVertical:responsiveFontSize(1),borderRadius:responsiveFontSize(1),width:'95%',alignSelf:'center',height:responsiveHeight(50),}}>
            <RichEditor
            useContainer={false}
            placeholder="Your Describtion here"
            style={{
                height:responsiveHeight(50)
            }}
            ref={text}
            />
            </View>
            <RichToolbar
            disabled
            editor={text}
            />
            <View style={styles.btn}>
                <Btn
                text="Save"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btn:{
        width:'95%',
        marginVertical:responsiveFontSize(1),
        alignSelf:'center'
    },
    titleCon:{
        backgroundColor:'white',
        width:'95%',
        alignSelf:'center',
        padding:responsiveFontSize(0.5),
        borderRadius:responsiveFontSize(1),
        marginTop:responsiveFontSize(2)
    }
})
