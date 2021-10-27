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

function CustomDrawerContent({logOut,props}) {
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
          source={require('../../assets/pro.png')}
          />
          <Text style={{color:'white',fontFamily:'Poppins-Bold',fontSize:responsiveFontSize(2),marginTop:responsiveFontSize(3)}}>Muhammad talha</Text>
          <Text style={{color:'white',fontSize:responsiveFontSize(1.5)}}>talha@gmail.com</Text>
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

  export default connect(null,actions)(CustomDrawerContent)