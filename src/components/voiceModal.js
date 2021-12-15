import React, { Component, useEffect } from 'react'
import { Text, View,Modal ,StyleSheet,Dimensions, TouchableOpacity, Image} from 'react-native'
import IconSuccess from "react-native-vector-icons/AntDesign"
import { useTheme } from '@react-navigation/native'
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const {width,height}=Dimensions.get('window')
function VoiceModal({visible,closeModle,voiceCancel,reDirect}){
    const {colors}=useTheme()
    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        style={{flex:1,justifyContent:'center',elevation:5}}
        >
            <View style={{flex:1,justifyContent:'center',alignItems:'center',height:height,backgroundColor:'rgba(0,0,0,0.7)'}}>
                <View style={{...styles.con,backgroundColor:colors.background}}>
                    <View style={{justifyContent:'center',width:'100%',alignItems:'center',marginTop:responsiveFontSize(5)}}>
                        <Image
                        style={{
                            width:responsiveFontSize(15),
                            height:responsiveFontSize(15)
                        }}
                        source={require('../../assets/mike.png')}
                        />
                        <Text style={{marginTop:responsiveFontSize(1),fontSize:responsiveFontSize(2)}}>Speak Now</Text>
                    </View>
                    <TouchableOpacity style={{...styles.btn,backgroundColor:colors.card}} onPress={()=>{
                        reDirect?reDirect():null
                        voiceCancel?voiceCancel():null
                        closeModle()
                    }}>
                        <Text style={styles.btnText}>cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}
const styles=StyleSheet.create({
    con:{
        justifyContent:'space-between',
        alignItems:'center',
        width:width/1.5,
        height:height/3,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        borderRadius:20,
    },
    iconCon:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    btn:{
        marginTop:15,
        height:40,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderBottomRightRadius:20,
        borderBottomLeftRadius:20
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
export default VoiceModal;