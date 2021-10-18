import React, { useRef, useState } from 'react'
import { StyleSheet, View,ScrollView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import {RichEditor,RichToolbar,actions} from "react-native-pell-rich-editor"
import Btn from './Btn'

export default function NoteDetailBox() {
    const text=useRef("hi how are you");
    const [submit,setSubmit]=useState(false)
    const [fields,setFields]=useState({
        title:"",
        des:""
    })

    const getValue=(k,v)=>setFields({...fields,[k]:v})

    function onSubmit(){
        setSubmit(true)
        if(fields.title && fields.des){
            alert("submit")
        }
    }

    return (
        <View style={{flex:1}}>
            <View style={{...styles.titleCon,borderWidth:1,borderColor:submit && !fields.title?"red":"white"}}>
                <TextInput
                onChangeText={v=>getValue('title',v)}
                placeholder="Your Title Here"
                placeholderTextColor="black"
                />
            </View>
            <View style={{backgroundColor:'white',marginVertical:responsiveFontSize(1),borderRadius:responsiveFontSize(1),width:'95%',alignSelf:'center',flex:1}}>
            <RichEditor
            containerStyle={{borderRadius:responsiveFontSize(1),borderWidth:1,borderColor:submit && !fields.des?"red":"white"}}
            useContainer={false}
            placeholder="Your Describtion here"
            style={{
                height:responsiveHeight(50)
            }}
            onChange={t=>getValue('des',t)}
            ref={text}
            />
            </View>
            <RichToolbar
            disabled={false}
            editor={text}
            selectedIconTint={"#7A448D"}
            actions={[
                actions.setBold,
                actions.setItalic,
                actions.setStrikethrough,
                actions.setUnderline,
                actions.insertBulletsList,
                actions.insertOrderedList,
                actions.keyboard,
                actions.undo,
                actions.checkboxList,
                actions.redo
            ]}
            />
            <View style={styles.btn}>
                <Btn
                call={onSubmit}
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
        alignSelf:'center',
        position:'relative'
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
