import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, FlatList,TouchableOpacity } from 'react-native'
import Input from '../../components/Input'
import Icon from "react-native-vector-icons/Ionicons"
import Btn from '../../components/Btn'
import { responsiveFontSize, responsiveHeight,responsiveWidth } from 'react-native-responsive-dimensions'
import ValidateEmail from '../../utils/validateEmail'
import CreateIcon from "react-native-vector-icons/AntDesign"
import ProfileBox from "../../components/ProfileBox"

export default function Profiles({ navigation }) {
    function renderProfile(){
        return(
            <ProfileBox
            call={()=>navigation.push('drawer')}
            img={require('../../../assets/subPro.png')}
            name="Hassan Sarwar"
            email="journal@support.com"
            />
        )
    }
    return (
        <View
            contentContainerStyle={{ ...styles.scr }}
        >
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
                    source={require('../../../assets/pro.png')}
                />
            </View>
            <View style={{justifyContent:'center',alignItems:'center',marginTop:responsiveHeight(9)}}>
            <Text style={{fontSize:responsiveFontSize(1.5)}}>Muhammad Talha</Text>
            <Text style={{fontSize:responsiveFontSize(1.5)}}>talhanaser71@gmail.com</Text>
            </View>
            <FlatList
            showsVerticalScrollIndicator={false}
            data={[1,1,1,1,1]}
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
            onPress={()=>navigation.push('profile')}
            >
                <CreateIcon
                name="plus"
                size={responsiveFontSize(4)}
                color="white"
                />
            </TouchableOpacity>
        </View>
    )
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
