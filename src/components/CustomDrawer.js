import React from 'react';
import {
    DrawerItem,
    DrawerItemList,
} from '@react-navigation/drawer';
import {
  View,
  Image,
  Text
} from "react-native"
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { connect } from 'react-redux';
import * as actions from "../store/actions"
import {imgBase} from "../config/config.json"

function CustomDrawerContent({logOut,props,currentProfile}) {
    return (
      <View
      style={{
        backgroundColor:'white',
        flex:1
      }}
      >
        <View
        style={{
          backgroundColor:'#7A448D',
          justifyContent:'center',
          alignItems:'center',
          height:responsiveHeight(30)
        }}
        >
          <Image
          style={{
            width:responsiveFontSize(12),
            height:responsiveFontSize(12),
            borderWidth:responsiveFontSize(0.5),
            borderColor:'white',
            borderRadius:responsiveFontSize(6)
          }}
          source={currentProfile.profile_picture?{uri:imgBase+currentProfile.profile_picture}:require('../../assets/pro.png')}
          />
          <Text style={{color:'white',fontFamily:'Poppins-Bold',fontSize:responsiveFontSize(2),marginTop:responsiveFontSize(3)}}>{currentProfile.profile_name}</Text>
          <Text style={{color:'white',fontSize:responsiveFontSize(1.5)}}>{currentProfile.profile_email}</Text>
        </View>
        <DrawerItemList 
        {...props}

        />
        <DrawerItem
        label="LogOut"
        onPress={logOut}
      />
      </View>
    );
  }

  function mapStateToProps({currentProfile}){
    return{currentProfile}
  }

  export default connect(mapStateToProps,actions)(CustomDrawerContent)