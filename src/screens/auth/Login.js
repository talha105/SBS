import React, { useEffect, useRef, useState } from 'react'
import { ImageBackground, ScrollView, StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import Input from '../../components/Input'
import Icon from "react-native-vector-icons/Ionicons"
import PassordIcon from "react-native-vector-icons/Entypo"
import ArrowIcon from "react-native-vector-icons/AntDesign"
import Btn from '../../components/Btn'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import ValidateEmail from '../../utils/validateEmail'
import TouchID from 'react-native-touch-id';
import * as actions from "../../store/actions"
import {connect} from "react-redux"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoginManager,Profile } from "react-native-fbsdk-next";
import InstagramLogin from 'react-native-instagram-login';
import CookieManager from '@react-native-community/cookies';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const optionalConfigObject = {
    title: 'Authentication Required', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };

function Login({navigation,login,user}) {

    GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
        webClientId: '723946557285-2eavre3ace3upp9blei49685mtni4g3b.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        hostedDomain: '', // specifies a hosted domain restriction
        forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        accountName: '', // [Android] specifies an account name on the device that should be used
        iosClientId: '723946557285-2eavre3ace3upp9blei49685mtni4g3b.apps.googleusercontent.com', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
        googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
        openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
        profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
      });

    const [instagramLogin,setInstagramLogin]=useState({})
    const [fields,setFields]=useState({
        email:"",
        password:""
    })
    const [submit,setSubmit]=useState(false)
    const [show,setShow]=useState(true)
    const [loading,setLoading]=useState(false)
    const [id,setId]=useState(false)
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

    useEffect(()=>{
        AsyncStorage.getItem('email')
        .then((email)=>{
            if(email){
                TouchID.isSupported(optionalConfigObject)
                .then(biometryType => {
                    console.log(biometryType,"type")
                // Success code
                if (biometryType === 'TouchID') {
                    setId(true)
                }else{
                    setId(true)
                }
                })
                .catch(error => {
                // Failure code
                console.log(error,"dsf");
                });
            }
            })
    },[])

    const setIgToken = (data) => {
        console.log('data', data)
      }

    function authTouch(){
        TouchID.authenticate('To login SBS', optionalConfigObject)
        .then(async success => {
            const password=await AsyncStorage.getItem('password')
            const email=await AsyncStorage.getItem('email')
            setFields({password,email})
            setLoading(true)
            login({email,password}).then(()=>setLoading(false))
        })
        .catch(error => {
            console.log(error)
        });
            }

    function fbLogin(){
        LoginManager.logInWithPermissions(["public_profile"]).then(
            function(result) {
              if (result.isCancelled) {
                console.log(result,"Login cancelled");
              } else {
                Profile.getCurrentProfile().then((user)=>{
                    console.log(user)
                })
              }
            },
            function(error) {
              console.log("Login fail with error: " + error);
            }
          );
    }
    const googleLogin= async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log({ userInfo });
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
          }
        }
      };
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
                <View style={styles.btnCon}>
                    <TouchableOpacity 
                    onPress={fbLogin}
                    style={{...styles.btn,borderWidth:1,borderColor:'blue'}}>
                        <Image
                        style={{width:responsiveFontSize(4),height:responsiveFontSize(4)}}
                        source={require('../../../assets/fb.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={googleLogin}
                    style={{...styles.btn,borderWidth:1,borderColor:'red'}}>
                    <Image
                        style={{width:responsiveFontSize(4),height:responsiveFontSize(4)}}
                        source={require('../../../assets/google.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={()=>instagramLogin.show()}
                    style={{...styles.btn,borderWidth:1,borderColor:'purple'}}>
                    <Image
                        style={{width:responsiveFontSize(4),height:responsiveFontSize(4)}}
                        source={require('../../../assets/insta.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.signIn}>
                    <Text style={styles.text}>Or Sign in With</Text>
                </View>
                <View style={styles.bottom}>
                    {id?(
                        <TouchableOpacity
                        onPress={authTouch}
                        >
                        <Image
                        style={styles.bottomImg}
                        source={require('../../../assets/thumb.png')}
                        />
                    </TouchableOpacity>
                    ):null}
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
                <InstagramLogin
                ref={(ref)=>setInstagramLogin(ref)}
                appId='3161585820726865'
                appSecret='0607f4e01162bff944c27ff99c8efd55'
                redirectUrl='https://www.google.com'
                scopes={['user_profile', 'user_media']}
                onLoginSuccess={setIgToken}
                onLoginFailure={(data) => console.log(data)}
                />
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
    },
    btn:{
        height:responsiveHeight(7),
        borderRadius:responsiveFontSize(1),
        justifyContent:'center',
        width:responsiveWidth(30),
        alignItems:'center'
    },
    btnCon:{
        justifyContent:'space-between',
        marginTop:responsiveFontSize(2),
        flexDirection:'row'
    }
})

function mapStateToProps({user}){
    return {user}
}

export default connect(mapStateToProps,actions)(Login)