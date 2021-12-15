import React, { Component,useState } from 'react'
import { Text, View,Modal ,StyleSheet,Dimensions, TouchableOpacity,ActivityIndicator} from 'react-native'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import IconSuccess from "react-native-vector-icons/AntDesign"
import { CardField, useStripe ,StripeProvider} from '@stripe/stripe-react-native';
import CrossIcon from "react-native-vector-icons/Entypo"
import * as actions from "../store/actions"
import { connect } from 'react-redux';
import {useNavigation} from "@react-navigation/native"

const {width,height}=Dimensions.get('window')

function Payment({visible,closeModle,data,reDirect,subscribe,currentProfile}){
    const navigation=useNavigation()
    const {createToken } = useStripe();
    const [paid,setPaid]=useState(false)
    const [loading,setLoading]=useState(false)
    const [token,setToken]=useState("")
    function onPay(){
        if(token){
            setLoading(true)
            subscribe({
                amount:data.price,
                packageId:data.id.toString(),
                token:token,
                // proId:currentProfile.id
            })
            .then(()=>{
                setPaid(true)
                setLoading(false)
                navigation.goBack()
            })
        }
    }

    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        style={{flex:1,justifyContent:'center',elevation:5}}
        >
            <View style={{flex:1,justifyContent:'center',alignItems:'center',height:height,backgroundColor:'rgba(0,0,0,0.7)'}}>
                <View style={styles.con}>
                    {
                        paid?(
                            <View style={{flex:1,width:'100%',alignItems:'center',justifyContent:'center'}}>
                            <IconSuccess name="checkcircle" color="green" size={35}/>
                            <Text style={{color:'gray',marginTop:20,textAlign:'center',width:'90%'}}>Subscribe Package Successfully</Text>
                        </View>
                        ):(
                            <View style={{flex:1,width:'100%',alignItems:'center'}}>
                           <View style={{flexDirection:'row',alignItems:'center',width:'90%'}}>
                            <TouchableOpacity
                            onPress={closeModle}
                            >
                            <CrossIcon
                            name="cross"
                            color="lightgrey"
                            size={responsiveFontSize(3)}
                            />
                            </TouchableOpacity>
                           <Text style={{width:'80%',textAlign:'center',marginVertical:responsiveFontSize(2.5),fontSize:responsiveFontSize(2.5),fontFamily:"Poppins-Medium",color:'black'}}>Payment Information</Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',width:'90%'}}>
                                <Text>Package: </Text>
                                <Text>{data.name}</Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',width:'90%'}}>
                                <Text>Amount: </Text>
                                <Text>${data.price}</Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',width:'90%'}}>
                                <Text>Subscribetion: </Text>
                                <Text>${data.package_expiry}</Text>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',width:'90%',marginTop:responsiveFontSize(1)}}>
                                <Text style={{color:'black'}}>Card Info </Text>
                            </View>
                            <StripeProvider publishableKey="pk_test_sliuxBpjnkv3uAhoIWxfhHbZ">
                                    <CardField
                                    autofocus
    
                                    postalCodeEnabled={false}
                                    placeholder={{
                                        number: 'card number',
                                    }}
                                    
                                    cardStyle={{
                                        backgroundColor: '#FFFFFF',
                                        textColor: '#000000',
                                    }}
                                    style={{
                                        width: '100%',
                                        height: 50,
                                        marginVertical: responsiveFontSize(1),
                                    }}
                                    onCardChange={(cardDetails) => {
                                        if(cardDetails.complete){
                                            createToken(cardDetails).then(res=>{
                                                console.log(res)
                                                if(res.token){
                                                    setToken(res.token.id)
                                                }
                                                
                                            })
                                        }
                                        
                                    }}
    
                                    />
                            </StripeProvider>
                        </View>
                        )
                    }
                    {paid?(
                        <TouchableOpacity style={styles.btn} onPress={()=>{
                            reDirect?reDirect():null
                            closeModle()
                            setPaid(false)
                        }}>
                            <Text style={styles.btnText}>OK</Text>
                        </TouchableOpacity>
                    ):(
                        <TouchableOpacity 
                        onPress={onPay}
                        style={styles.btn}>
                            {
                                loading?(
                                    <ActivityIndicator
                                    color="white"
                                    size={responsiveFontSize(3)}
                                    />
                                ):(
                                    <Text style={styles.btnText}>OK</Text>
                                )
                            }
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </Modal>
    )
}
const styles=StyleSheet.create({
    con:{
        backgroundColor:'white',
        justifyContent:'space-between',
        alignItems:'center',
        width:width/1.1,
        height:height/2.5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        borderRadius:responsiveFontSize(2)
    },
    iconCon:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    btn:{
        marginTop:15,
        height:40,
        backgroundColor:'#7A448D',
        borderBottomLeftRadius:responsiveFontSize(2),
        borderBottomRightRadius:responsiveFontSize(2),
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    btnText:{
        color:'white',
        fontFamily:'Poppins-Regular',
        fontSize:17,
        textAlign:'center',
        textAlignVertical:'center',
        marginTop:2
    },
    icon:{
        backgroundColor:'white',
        borderWidth:4,
        borderColor:'#001441',
        width:'18%',
        height:'18%',
        borderRadius:'18%'/2,
        justifyContent:'center',
        alignItems:'center'
    }
})

function mapStateToProps({currentProfile}){
    return {currentProfile}
}

export default connect(mapStateToProps,actions)(Payment);