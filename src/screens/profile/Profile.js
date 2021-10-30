import React, { useEffect, useState } from 'react'
import {ScrollView, StyleSheet, TouchableOpacity, View, Image,Text } from 'react-native'
import Input from '../../components/Input'
import Icon from "react-native-vector-icons/Ionicons"
import Btn from '../../components/Btn'
import { responsiveFontSize, responsiveHeight,responsiveWidth } from 'react-native-responsive-dimensions'
import ValidateEmail from '../../utils/validateEmail'
import CameraIcon from "react-native-vector-icons/AntDesign"
import PickerModal from '../../components/PickerModal'
import {launchCamera,launchImageLibrary} from "react-native-image-picker"
import { connect } from 'react-redux'
import * as actions from "../../store/actions"
import SuccessModel from '../../components/SuccessModal'

function Profile({ navigation,createProfile ,currentProfile}) {
    const [fields, setFields] = useState({
        email: "",
        name: "",
        img:""
    })
    const [submit, setSubmit] = useState(false)
    const [modal,setModal]=useState(false)
    const [sucModal,setSucModal]=useState(false)
    const [loading,setLoading]=useState(false)
    const getValue = (k, v) => setFields({ ...fields, [k]: v })
    useEffect(()=>{
        if(currentProfile.id){
            setFields({
                email:currentProfile.profile_email,
                name:currentProfile.profile_name
            })
        }
    },[])
    function onSubmit() {
        setSubmit(true)
        if (ValidateEmail(fields.email) && fields.name && (fields.img || currentProfile.id)) {
            setLoading(true)
            createProfile({...fields,id:currentProfile.id})
            .then((res)=>{
                setLoading(false)
                setSucModal(true)
            })
            .catch((err)=>{
                setLoading(false)
                console.log("sdafsdaf",err.response.data)
            })
        }
    }

    function openCamera(){
        launchCamera({mediaType:'photo'},(media)=>{
            getValue('img',media.assets[0])
            setModal(false)
        })
    }
    function openGallary(){
        launchImageLibrary({mediaType:'photo'},(media)=>{
            getValue('img',media.assets[0])
            setModal(false)
        })
    }
    return (
        <ScrollView
            contentContainerStyle={{ ...styles.scr }}
        >
            <SuccessModel
            closeModle={()=>setSucModal(false)}
            reDirect={()=>currentProfile.id?null:navigation.push("profiles")}
            visible={sucModal}
            title={currentProfile.id?"Successfully Updated":"Successfully Created"}
            />
            <PickerModal
            closeModle={()=>setModal(false)}
            goToCamera={openCamera}
            goToGallery={openGallary}
            visible={modal}
            />
            <View
                style={{
                    backgroundColor: '#7A448D',
                    height: responsiveHeight(18)
                }}
            />
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: responsiveHeight(11),
                left: responsiveWidth(36)
            }}>
                <Image
                    style={{
                        width: responsiveFontSize(14),
                        height: responsiveFontSize(14),
                        borderRadius: responsiveFontSize(7)
                    }}
                    source={fields.img?{uri:fields.img.uri}:require('../../../assets/pro.png')}
                />
                <TouchableOpacity
                onPress={()=>setModal(true)}
                style={{
                    backgroundColor:'lightgrey',
                    width:responsiveFontSize(3.5),
                    height:responsiveFontSize(3.5),
                    borderRadius:responsiveFontSize(2),
                    justifyContent:'center',
                    alignItems:'center',
                    position:'absolute',
                    top:responsiveFontSize(9),
                    left:responsiveFontSize(11)
                }}
                >
                    <CameraIcon
                    size={responsiveFontSize(2)}
                    color="white"
                    name="camera"/>
                </TouchableOpacity>
            </View>
            <View style={{width:'100%',marginTop:responsiveHeight(9)}}>
                {submit && !fields.img?<Text style={{color:'red',textAlign:'center'}}>please upload image</Text>:null}
            <View style={{width:'95%',alignSelf:'center'}}>
            <Input
                name="Full Name"
                icon={fields.name ? (
                    () => (
                        <Icon
                            name="checkmark-circle-outline"
                            size={20}
                            color="green"
                        />
                    )
                ) : null}
                value={fields.name}
                getValue={(v) => getValue('name', v)}
                error={submit && !fields.name ? true : false}
            />
            </View>
            <View style={{width:'95%',alignSelf:'center'}}>
            <Input
                name="Email Address"
                icon={ValidateEmail(fields.email) ? (
                    () => (
                        <Icon
                            name="checkmark-circle-outline"
                            size={20}
                            color="green"
                        />
                    )
                ) : null}
                value={fields.email}
                getValue={(v) => getValue('email', v)}
                error={submit && !ValidateEmail(fields.email) ? true : false}
            />
            </View>
            <View style={styles.btn}>
                <Btn
                    text="Save"
                    call={onSubmit}
                    loading={loading}
                />
            </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scr: {
        alignSelf: 'center',
        width: '100%',
        justifyContent: 'center',
        paddingBottom: responsiveFontSize(5)
    },
    imgSrc: {
        width: responsiveFontSize(18),
        height: responsiveFontSize(18)
    },
    str: {
        width: '80%'
    },
    pStr: {
        fontSize: responsiveFontSize(1.5)
    },
    line: {
        width: '15%',
        backgroundColor: 'grey',
        height: responsiveHeight(0.75),
        borderRadius: 2
    },
    bStr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: responsiveFontSize(1)
    },
    btn: {
        width:'95%',
        alignSelf:'center',
        marginVertical: responsiveFontSize(2)
    }
})
function mapStateToProps({currentProfile}){
    return {currentProfile}
}
export default connect(mapStateToProps,actions)(Profile)