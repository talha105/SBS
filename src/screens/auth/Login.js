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
import {connect} from "react-redux"

function Login({navigation,login,user}) {
    const [fields,setFields]=useState({
        email:"",
        password:""
    })
    const [submit,setSubmit]=useState(false)
    const [show,setShow]=useState(true)
    const [loading,setLoading]=useState(false)
    const getValue=(k,v)=>setFields({...fields,[k]:v})

    function onSubmit(){
        setSubmit(true)
        if(fields.password && ValidateEmail(fields.email)){
            setLoading(true)
            login(fields)
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
                <View style={styles.img}>
                    <Image
                    style={styles.imgSrc}
                    source={require('../../../assets/logo.png')}
                    />
                </View>
                <Input
                name="Email Address"
                icon={ValidateEmail(fields.email)?(
                    ()=>(
                        <Icon
                        name="checkmark-circle-outline"
                        size={responsiveFontSize(3)}
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
                value={fields.password}
                icon={()=>(
                    <PassordIcon
                    name={show?"eye-with-line":"eye"}
                    size={20}
                    color="grey"
                    />
                )}
                password={show}
                

                getValue={(v)=>getValue('password',v)}
                error={submit && !fields.password?true:false}
                />
                <TouchableOpacity 
                onPress={()=>navigation.push('forgetPassword')}
                style={styles.forgetPass}>
                    <Text style={styles.text}>Forget Password</Text>
                </TouchableOpacity>
                {user.message?.errorMessgae?(
                    <Text style={{color:'red',textAlign:'center'}}>
                        {user.message?.errorMessgae}
                    </Text>
                ):null}
                <Btn
                loading={loading}
                text="Sign In"
                call={onSubmit}
                />
                <View style={styles.signIn}>
                    <Text style={styles.text}>Or Sign in With</Text>
                </View>
                <View style={styles.bottom}>
                    <TouchableOpacity>
                        <Image
                        style={styles.bottomImg}
                        source={require('../../../assets/thumb.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.signUpCon}>
                    <Text>You Don't have an acount?</Text>
                    <TouchableOpacity 
                    onPress={()=>navigation.push('signUp')}
                    style={styles.signUp}>
                        <Text style={{marginRight:responsiveFontSize(1)}}>Sign Up</Text>
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
        height:responsiveHeight(30),
        justifyContent:'center',
        alignItems:'center'
    },
    imgSrc:{
        width:responsiveFontSize(18),
        height:responsiveFontSize(18)
    },
    forgetPass:{
        marginVertical:responsiveFontSize(2),
        alignSelf:'flex-end'
    },
    signIn:{
        alignSelf:'center',
        marginVertical:responsiveFontSize(2)
    },
    text:{
        fontFamily:'Poppins-Medium'
    },
    bottomImg:{
        width:responsiveFontSize(15),
        height:responsiveFontSize(15)
    },
    bottom:{
        flexDirection:'row',
        justifyContent:'space-around'
    },
    signUp:{
        flexDirection:'row'
    },
    signUpCon:{
        flexDirection:'row',
        justifyContent:'space-between'
    }
})

function mapStateToProps({user}){
    return {user}
}

export default connect(mapStateToProps,actions)(Login)