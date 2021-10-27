import React, { useState } from 'react'
import { ImageBackground, ScrollView, StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import Input from '../../components/Input'
import Icon from "react-native-vector-icons/Ionicons"
import PassordIcon from "react-native-vector-icons/Entypo"
import ArrowIcon from "react-native-vector-icons/AntDesign"
import Btn from '../../components/Btn'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import ValidateEmail from '../../utils/validateEmail'
import * as actions from "../../store/actions"
import { connect } from 'react-redux'

function SignUp({navigation,signUp,user}) {
    const [fields,setFields]=useState({
        email:"",
        fullName:"",
        password:"",
        confirmPassword:""
    })
    const [submit,setSubmit]=useState(false)
    const [show,setShow]=useState(true)
    const [show1,setShow1]=useState(true)
    const [loading,setLoading]=useState(false)
    const getValue=(k,v)=>setFields({...fields,[k]:v})

    function onSubmit(){
        setSubmit(true)
        if(
            fields.password.length>5
            && fields.password==fields.confirmPassword
            && ValidateEmail(fields.email) 
            && fields.fullName){
            setLoading(true)
            signUp(fields)
            .then(()=>setLoading(false))
            .catch(()=>setLoading(false))
        }
    }
    return (
        <ImageBackground 
        source={require('../../../assets/login.png')}
        style={styles.con}>
            <ScrollView
            contentContainerStyle={{...styles.scr}}
            >
                <View style={styles.back}>
                    <TouchableOpacity
                    onPress={()=>navigation.goBack()}
                    >
                        <ArrowIcon
                        name="arrowleft"
                        color="grey"
                        size={responsiveFontSize(4)}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.img}>
                    <Image
                    style={styles.imgSrc}
                    source={require('../../../assets/logo.png')}
                    />
                </View>
                <Input
                name="Full Name"
                icon={fields.name?(
                    ()=>(
                        <Icon
                        name="checkmark-circle-outline"
                        size={20}
                        color="green"
                        />
                    )
                ):null}
                value={fields.name}
                getValue={(v)=>getValue('fullName',v)}
                error={submit && !fields.fullName?true:false}
                />
                <Input
                name="Email Address"
                icon={ValidateEmail(fields.email)?(
                    ()=>(
                        <Icon
                        name="checkmark-circle-outline"
                        size={20}
                        color="green"
                        />
                    )
                ):null}
                value={fields.email}
                getValue={(v)=>getValue('email',v)}
                error={submit && !ValidateEmail(fields.email)?true:false}
                />
                <Input
                name="Password"
                show={()=>setShow(!show)}
                icon={()=>(
                    <PassordIcon
                    name={fields.password?"eye-with-line":"eye"}
                    size={20}
                    color="grey"
                    />
                )}
                error={submit && !fields.password?true:false}
                password={show}
                getValue={(v)=>getValue('password',v)}
                value={fields.password}
                />
                <Input
                name="Confirm Password"
                show={()=>setShow1(!show1)}
                icon={fields.confirmPassword?(
                    ()=>(
                        <PassordIcon
                        name={show1?"eye-with-line":"eye"}
                        size={20}
                        color="grey"
                        />
                    )
                ):null}
                password={show1}
                value={fields.confirmPassword}
                error={submit && !fields.confirmPassword?true:false}
                getValue={(v)=>getValue('confirmPassword',v)}
                />
                <View style={styles.str}>
                    <Text style={styles.pStr}>PASSWORD STRENGTH</Text>
                    <View style={styles.bStr}>
                        <View style={{...styles.line,backgroundColor:fields.password.length>1?"green":"grey"}}/>
                        <View style={{...styles.line,backgroundColor:fields.password.length>2?"green":"grey"}}/>
                        <View style={{...styles.line,backgroundColor:fields.password.length>3?"green":"grey"}}/>
                        <View style={{...styles.line,backgroundColor:fields.password.length>4?"green":"grey"}}/>
                        <View style={{...styles.line,backgroundColor:fields.password.length>5?"green":"grey"}}/>
                    </View>
                </View>
                {
                    fields.password!=fields.confirmPassword && fields.password?(
                        <Text style={{color:'red',textAlign:'center'}}>
                            password not match
                        </Text>
                    ):(user.message?.errorMessgae?(
                        <Text style={{color:'red',textAlign:'center'}}>
                            {user.message?.errorMessgae}
                        </Text>
                    ):null)
                }
                <View style={styles.btn}>
                    <Btn
                    loading={loading}
                    text="Sign Up"
                    call={onSubmit}
                    />
                </View>
                <View style={styles.signUpCon}>
                    <Text>You Don't have an acount?</Text>
                    <TouchableOpacity 
                    onPress={()=>navigation.push('signIn')}
                    style={styles.signUp}>
                        <Text style={{marginRight:responsiveFontSize(1)}}>Sign In</Text>
                        <ArrowIcon
                        name="arrowright"
                        size={responsiveFontSize(3)}
                        color="grey"
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    con:{
        flex:1
    },
    scr:{
        alignSelf:'center',
        width:'95%',
        justifyContent:'flex-end',
        paddingBottom:responsiveFontSize(5)
    },
    img:{
        height:responsiveHeight(20),
        justifyContent:'flex-start',
        alignItems:'center'
    },
    imgSrc:{
        width:responsiveFontSize(18),
        height:responsiveFontSize(18)
    },
    signIn:{
        alignSelf:'center',
        marginVertical:responsiveFontSize(2)
    },
    signUp:{
        flexDirection:'row'
    },
    signUpCon:{
        flexDirection:'row',
        justifyContent:'space-between',
        height:responsiveHeight(3),
        alignItems:'flex-end'
    },
    back:{
        height:responsiveFontSize(10),
        justifyContent:'center'
    },
    str:{
        width:'80%'
    },
    pStr:{
        fontSize:responsiveFontSize(1.5)
    },
    line:{
        width:'15%',
        backgroundColor:'grey',
        height:responsiveHeight(0.75),
        borderRadius:2
    },
    bStr:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:responsiveFontSize(1)
    },
    btn:{
        marginVertical:responsiveFontSize(2)
    }
})

function mapStateToProps({user}){
    return {user}
}

export default connect(mapStateToProps,actions)(SignUp)