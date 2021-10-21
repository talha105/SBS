import React,{useEffect, useLayoutEffect,useState} from 'react'
import { StyleSheet, Text, View ,TouchableOpacity, Image,NativeModules} from 'react-native'
import { responsiveFontSize, responsiveScreenFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import MoreIcon from "react-native-vector-icons/Feather"
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import NoteDetailBox from '../../components/NoteDetailBox';
import Voice from '@react-native-voice/voice';
import VoiceModal from "../../components/voiceModal"
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


export default function CreateNote({navigation}) {
    const [voiceModal,setVoiceModal]=useState(false)
    const [content,setContent]=useState("")
    useEffect(()=>{
        Voice.onSpeechResults=onSpeechResults
        Voice.onSpeechEnd=onSpeechEnd
    },[])

    const onSpeechResults=(e)=>{
        const text=e.value.reduce((acc,item)=>{
            return acc+" "+item
        },"")
        console.log("sdfsdaf",text)
        setContent(text)
    }
    const onSpeechEnd=()=>{
        setVoiceModal(false)
    }
    const onImageSelect = async (media) => {
        if (!media.didCancel) {
            const { MLkitModule } = NativeModules;
            const result =await MLkitModule.imageToText(media.uri);
            console.log('result',result)
        }
      };

    const onTakePhoto = () => launchCamera({ mediaType: 'image' }, onImageSelect);
    const onSelectImagePress = () => launchImageLibrary({ mediaType: 'image' }, onImageSelect);
    

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: props => <Text style={{marginLeft:responsiveWidth(5),textAlign:'center',color:'white',fontSize:responsiveFontSize(2.5),textTransform:'uppercase',includeFontPadding:false,textAlignVertical:'center'}}>Create Note</Text>,
            headerRight: () => (
                <View style={{
                    flexDirection:'row',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <TouchableOpacity
                    style={{marginLeft:responsiveFontSize(0.5)}}
                    >
                        <Menu>
                            <MenuTrigger>
                                <MoreIcon
                                name="more-vertical"
                                color="white"
                                size={responsiveFontSize(3)}
                                />
                            </MenuTrigger>
                            <MenuOptions
                            optionsContainerStyle={{
                                backgroundColor:'rgba(101,124,137,0.58)',
                                width:responsiveWidth(40),
                                borderRadius:responsiveScreenFontSize(2),
                                padding:responsiveFontSize(1)
                            }}
                            >
                                <MenuOption
                                onSelect={onTakePhoto}
                                customStyles={{
                                    optionWrapper:{
                                        padding:0,
                                        backgroundColor:'white',
                                        borderRadius:responsiveFontSize(1),
                                        marginVertical:responsiveFontSize(0.75)
                                    }
                                }}
                                >
                                    <View style={{
                                        flexDirection:'row',
                                        padding:responsiveScreenFontSize(1),
                                        alignItems:'center'}}>
                                        <Image
                                        style={{
                                            width:responsiveFontSize(3),
                                            height:responsiveFontSize(3)
                                        }}
                                        source={require("../../../assets/cameraIcon.png")}
                                        />
                                        <Text style={{marginLeft:responsiveFontSize(1)}}>Camera</Text>
                                    </View>
                                </MenuOption>
                                <MenuOption
                                customStyles={{
                                    optionWrapper:{
                                        padding:0,
                                        backgroundColor:'white',
                                        borderRadius:responsiveFontSize(1),
                                        marginVertical:responsiveFontSize(0.75)
                                    }
                                }}
                                >
                                    <View style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                        padding:responsiveScreenFontSize(1)
                                        }}>
                                        <Image
                                        style={{
                                            width:responsiveFontSize(3),
                                            height:responsiveFontSize(3)
                                        }}
                                        source={require("../../../assets/textIcon.png")}
                                        />
                                        <Text style={{marginLeft:responsiveFontSize(1)}}>Text</Text>
                                    </View>
                                </MenuOption>
                                <MenuOption
                                onSelect={onSelectImagePress}
                                customStyles={{
                                    optionWrapper:{
                                        padding:0,
                                        backgroundColor:'white',
                                        borderRadius:responsiveFontSize(1),
                                        marginVertical:responsiveFontSize(0.75)
                                    }
                                }}
                                >
                                    <View style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                        padding:responsiveScreenFontSize(1),
                                        }}>
                                        <Image
                                        style={{
                                            width:responsiveFontSize(3),
                                            height:responsiveFontSize(3)
                                        }}
                                        source={require("../../../assets/imageIcon.png")}
                                        />
                                        <Text style={{marginLeft:responsiveFontSize(1)}}>Image</Text>
                                    </View>
                                </MenuOption>
                                <MenuOption
                                onSelect={()=>{
                                    Voice.destroy().then(async()=>{
                                        setVoiceModal(false)
                                        Voice.removeAllListeners()
                                        await Voice.start('en-US')
                                        setVoiceModal(true)
                                    })
                                }}
                                customStyles={{
                                    optionWrapper:{
                                        padding:0,
                                        backgroundColor:'white',
                                        borderRadius:responsiveFontSize(1),
                                        marginVertical:responsiveFontSize(0.75)
                                    }
                                }}
                                >
                                    <View style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                        padding:responsiveFontSize(1)
                                        }}>
                                        <Image
                                        style={{
                                            width:responsiveFontSize(3),
                                            height:responsiveFontSize(3)
                                        }}
                                        source={require("../../../assets/voiceIcon.png")}
                                        />
                                        <Text style={{marginLeft:responsiveFontSize(1)}}>Voice</Text>
                                    </View>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </TouchableOpacity>
                </View>
            )
            
          });
    },[navigation])



    return (
        <View style={{flex:1}}>
            <VoiceModal
            visible={voiceModal}
            voiceCancel={async()=>await Voice.cancel()}
            stop={async()=>await Voice.stop()}
            closeModle={()=>setVoiceModal(false)}
            />
           <NoteDetailBox
           content={content}
           />
        </View>
    )
}

const styles = StyleSheet.create({})

