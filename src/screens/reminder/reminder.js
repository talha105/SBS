import React, { useEffect, useState ,useLayoutEffect} from 'react'
import { StyleSheet, Text, View, Image, FlatList,TouchableOpacity } from 'react-native'
import Input from '../../components/Input'
import Icon from "react-native-vector-icons/Ionicons"
import Btn from '../../components/Btn'
import { responsiveFontSize, responsiveHeight,responsiveWidth } from 'react-native-responsive-dimensions'
import MenuIcon from "react-native-vector-icons/Entypo"
import CreateIcon from "react-native-vector-icons/AntDesign"
import ProfileBox from "../../components/ProfileBox"
import * as actions from "../../store/actions"
import { connect } from 'react-redux'
import Loader from '../../components/Loader'
import ReminderIcon from "react-native-vector-icons/Ionicons"
import {imgBase} from "../../config/config.json"

function Profiles({ navigation,getReminders,reminders,currentProfile }) {

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerLeft:()=>(
                    <TouchableOpacity
                    onPress={()=>navigation.openDrawer()}
                    >
                        <MenuIcon
                        name="menu"
                        size={responsiveFontSize(4)}
                        color="white"
                        />
                    </TouchableOpacity>
                ),
            headerTitle: props => <Text style={{marginLeft:responsiveWidth(5),textAlign:'center',color:'white',fontSize:responsiveFontSize(2.5),textTransform:'uppercase',includeFontPadding:false,textAlignVertical:'center'}}>Reminders</Text>
          });
    },[navigation])

    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        return navigation.addListener('focus',()=>{
            setLoading(true)
            getReminders(currentProfile.id)
            .then(()=>setLoading(false))
        })
    },[navigation])

    function renderProfile({item}){
        const {
            id,
            remainder_name,
            remainder_time,
            profileId,
            created_date
        }=item
        return(
                <TouchableOpacity 
                key={id}
                style={{
                    backgroundColor:'white',
                    padding:responsiveFontSize(1),
                    marginTop:responsiveFontSize(0.7),
                    borderRadius:responsiveFontSize(1),
                    width:'48%',
                    margin:responsiveWidth(1)
                    }}>
                <View style={{
                justifyContent:'center',
                alignItems:'center',
                }}>
                    <Text>{remainder_name}</Text>
                    <ReminderIcon
                    name="alarm-outline"
                    color="#7A448D"
                    size={responsiveFontSize(5)}
                    />
                <Text style={{color:'black',fontFamily:'Poppins-Medium',fontSize:responsiveFontSize(2.5)}}>{new Date(created_date).toLocaleTimeString()}</Text>
                    <Text style={{fontSize:responsiveFontSize(1.5)}}>{new Date(created_date).toLocaleDateString()}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    
    if(!loading){
        return (
            <View
                style={{ ...styles.scr }}
            >
                <FlatList
                showsVerticalScrollIndicator={false}
                data={reminders}
                renderItem={renderProfile}
                contentContainerStyle={{
                    marginTop:responsiveFontSize(1.5),
                    paddingHorizontal:responsiveFontSize(0.75)
                }}
                keyExtractor={(item,i)=>i.toString()}
                numColumns={2}
                ListEmptyComponent={()=>(
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Text>No Result Found</Text>
                    </View>
                )}
                />
                <TouchableOpacity
                style={styles.createCon}
                onPress={()=>{
                        navigation.push('createReminder')
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

function mapStateToProps({reminders,currentProfile}){
    return {reminders,currentProfile}
}
export default connect(mapStateToProps,actions)(Profiles)