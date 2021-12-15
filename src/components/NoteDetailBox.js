import React, { useMemo, useRef, useState } from 'react'
import { StyleSheet, View,ScrollView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import {RichEditor,RichToolbar,actions} from "react-native-pell-rich-editor"
import Btn from './Btn'
import * as action from "../store/actions"
import { connect } from 'react-redux'
import SuccessModel from './SuccessModal'
import {useNavigation} from "@react-navigation/native"
import PickerModal from './PickerModal'
import {launchCamera,launchImageLibrary} from "react-native-image-picker"

function NoteDetailBox({content,createNote,currentProfile,title,update,id,saveImage}) {
    const navigation=useNavigation();
    const text=useRef("");
    const [submit,setSubmit]=useState(false)
    const [loading,setLoading]=useState(false)
    const [modal,setModal]=useState(false)
    const [sucModal,setSucModal]=useState(false)
    const [fields,setFields]=useState({
        title:"",
        des:""
    })

    const getValue=(k,v)=>setFields({...fields,[k]:v})

    function openCamera(){
        launchCamera({mediaType:'photo'},(media)=>{
            text.current?.insertImage(
                media.assets[0].uri
              );
            setModal(false)
        })
    }
    function openGallary(){
        launchImageLibrary({mediaType:'photo'},(media)=>{
            setModal(false)
            setLoading(true)
            saveImage(media.assets[0]).then((res)=>{
                console.log(res.data)
                text.current?.insertImage(
                    res.data.data.fullPath
                  );
                  setLoading(false)
            })
        })
    }

    function onPressAddImage() {
        setModal(true)
        }    

    const contentMemo=useMemo(()=>{
        if(title && content){
            setFields({
                title:title,
                des:content
            })
            return
        }
        if(content){
            getValue('des',content)
        }
        
        if(content?.indexOf('<p>')==-1 && content.length>0){
            text.current.insertHTML(content)
        }
    },[content])

    function onSubmit(){
        setSubmit(true)
        if(fields.title && fields.des){
            setLoading(true)
            createNote({...fields,id:currentProfile.id},update,id)
            .then(()=>{
                setLoading(false)
                setSucModal(true)
            })
            .catch((err)=>{
                setLoading(false)
                console.log(err.response)
            })
        }
    }

    return (
        <View style={{flex:1}}>
            <PickerModal
            closeModle={()=>setModal(false)}
            goToCamera={openCamera}
            goToGallery={openGallary}
            visible={modal}
            />
            <SuccessModel
            title={update?"update successfully":"Successfully created"}
            reDirect={()=>navigation.goBack()}
            visible={sucModal}
            closeModle={()=>setSucModal(false)}
            />
            <View style={{...styles.titleCon,borderWidth:1,borderColor:submit && !fields.title?"red":"white"}}>
                <TextInput
                value={fields.title}
                onChangeText={v=>getValue('title',v)}
                placeholder="Your Title here"
                placeholderTextColor="black"
                />
            </View>
            <View style={{backgroundColor:'white',marginVertical:responsiveFontSize(1),borderRadius:responsiveFontSize(1),width:'95%',alignSelf:'center',flex:1}}>
            <RichEditor
            initialContentHTML={fields.des}
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
                actions.insertImage,
                actions.undo,
                actions.redo
            ]}
            onPressAddImage={onPressAddImage}
            />
            <View style={styles.btn}>
                <Btn
                call={onSubmit}
                loading={loading}
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

function mapStateToProps({currentProfile}){
    return {currentProfile}
}

export default connect(mapStateToProps,action)(NoteDetailBox)