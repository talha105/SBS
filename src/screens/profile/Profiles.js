import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, FlatList,TouchableOpacity } from 'react-native'
import Input from '../../components/Input'
import Icon from "react-native-vector-icons/Ionicons"
import Btn from '../../components/Btn'
import { responsiveFontSize, responsiveHeight,responsiveWidth } from 'react-native-responsive-dimensions'
import ValidateEmail from '../../utils/validateEmail'
import CreateIcon from "react-native-vector-icons/AntDesign"
import ProfileBox from "../../components/ProfileBox"
import * as actions from "../../store/actions"
import { connect } from 'react-redux'
import Loader from '../../components/Loader'
import {imgBase} from "../../config/config.json"

function Profiles({ navigation,getProfiles,profiles,setProfile,user,logOut }) {

    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        return navigation.addListener('focus',()=>{
            getProfiles()
            .then(()=>setLoading(false))
        })
    },[navigation])
    console.log(user)
    function renderProfile({item}){
        const {
            id,
            profile_name,
            profile_email,
            profile_picture
        }=item
        return(
            <ProfileBox
            call={()=>setProfile(item)}
            img={profile_picture?{uri:imgBase+profile_picture}:require('../../../assets/subPro.png')}
            name={profile_name}
            email={profile_email}
            />
        )
    }
    
    if(!loading){
        return (
            <View
                style={{ ...styles.scr }}
            >
                <View
                    style={{
                        backgroundColor: '#7A448D',
                        height: responsiveHeight(18)
                    }}
                >
                <TouchableOpacity 
                onPress={logOut}
                style={{backgroundColor:'rgba(255, 255, 255, 0.2)',paddingHorizontal:5,borderRadius:5,width:'20%',alignSelf:'flex-end',marginTop:10,marginRight:10}}>
                    <Text style={{textAlign:'center',color:'white'}}>logout</Text>
                </TouchableOpacity>
                </View>
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
                        source={profiles[0]?.profile_picture?{uri:imgBase+profiles[0]?.profile_picture}:require('../../../assets/pro.png')}
                    />
                </View>
                <View style={{justifyContent:'center',alignItems:'center',marginTop:responsiveHeight(9)}}>
                <Text style={{fontSize:responsiveFontSize(1.5)}}>{user.data?.userData?.full_name}</Text>
                <Text style={{fontSize:responsiveFontSize(1.5)}}>{user.data?.userData?.email}</Text>
                </View>
                <FlatList
                showsVerticalScrollIndicator={false}
                data={profiles}
                renderItem={renderProfile}
                contentContainerStyle={{
                    marginTop:responsiveFontSize(1.5),
                    height:responsiveHeight(65),
                    paddingHorizontal:responsiveFontSize(0.75)
                }}
                keyExtractor={(item,i)=>i.toString()}
                numColumns={3}
                />
                <TouchableOpacity
                style={styles.createCon}
                onPress={()=>{
                    if(user.data?.userData?.packageId>user.data?.userData?.profileCount){
                        navigation.push('profile')
                    }else{
                        navigation.push('subscribtion',{second:true})
                    }
                }}
                >
                    <CreateIcon
                    name="plus"
                    size={responsiveFontSize(4)}
                    color="white"
                    />
                </TouchableOpacity>
            </View>
        )
    }else{
        return <Loader/>
    }
}

const styles = StyleSheet.create({
    scr: {
        flex:1,
        alignSelf: 'center',
        width: '100%',
        justifyContent: 'center',
        paddingBottom: responsiveFontSize(5)
    },
    createCon:{
        backgroundColor:'#7633FF',
        position:'absolute',
        width:responsiveFontSize(8),
        height:responsiveFontSize(8),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:responsiveFontSize(8),
        bottom:responsiveFontSize(4),
        right:responsiveFontSize(4)
    }
})

function mapStateToProps({profiles,user}){
    return {profiles,user}
}
export default connect(mapStateToProps,actions)(Profiles)