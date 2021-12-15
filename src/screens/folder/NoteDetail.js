import React,{useEffect, useLayoutEffect, useState} from 'react'
import { StyleSheet, Text, View ,TouchableOpacity, Image,NativeModules} from 'react-native'
import { responsiveFontSize, responsiveScreenFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import MenuIcon from "react-native-vector-icons/Entypo"
import SearchIcon from "react-native-vector-icons/AntDesign"
import MoreIcon from "react-native-vector-icons/Feather"
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import FolderBox from '../../components/FolderBox';
import NoteDetailBox from '../../components/NoteDetailBox';
import * as action from "../../store/actions"
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import RNPrint from 'react-native-print';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from "react-native-share"
import VoiceModal from "../../components/voiceModal"
import Voice from '@react-native-voice/voice';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

function NoteDetail({navigation,route,getNote,note}) {
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: props => <Text style={{marginLeft:responsiveWidth(5),textAlign:'center',color:'white',fontSize:responsiveFontSize(2.5),textTransform:'uppercase',includeFontPadding:false,textAlignVertical:'center'}}>Note Details</Text>,
            headerRight: () => (
                <View style={{
                    flexDirection:'row',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <TouchableOpacity
                    style={{marginRight:responsiveFontSize(1)}}
                    >
                        <SearchIcon
                        name="search1"
                        color="white"
                        size={responsiveFontSize(3)}
                        />
                    </TouchableOpacity>
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
                                <MenuOption
                                onSelect={downloadPDF}
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
                                        source={require("../../../assets/pdf.png")}
                                        />
                                        <Text style={{marginLeft:responsiveFontSize(1)}}>PDF</Text>
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
                                        padding:responsiveFontSize(1)
                                        }}>
                                        <Image
                                        style={{
                                            width:responsiveFontSize(3),
                                            height:responsiveFontSize(3)
                                        }}
                                        source={require("../../../assets/share.png")}
                                        />
                                        <Text style={{marginLeft:responsiveFontSize(1)}}>Share</Text>
                                    </View>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </TouchableOpacity>
                </View>
            ) 
          });
    },[navigation])

    const [data,setData]=useState({
        description:"",
        title:""
    })
    const [voiceModal,setVoiceModal]=useState(false)
    const [loading,setLoading]=useState(false)

    const onSpeechResults=(e)=>{
        const text=e.value.reduce((acc,item)=>{
            return acc+" "+item
        },"")
        console.log("sdfsdaf",text)
        setData({...data,description:text})
    }
    const onSpeechEnd=()=>{
        setVoiceModal(false)
    }
    const onImageSelect = async (media) => {
        if (!media.didCancel) {
            const { TextRecognitionModule } = NativeModules;
            setLoading(true)
            const result =await TextRecognitionModule.recognizeImage(media.assets[0].uri);
            const uResult=result.blocks.reduce((ac,item)=>{
                ac=ac+`<p>${item.text}</p>`
                return ac
            },"")
            setData({...data,description:uResult})
            setLoading(false)
        }
      };

    const onTakePhoto = () => launchCamera({ mediaType: 'photo',cameraType:'back' }, onImageSelect);
    const onSelectImagePress = () => launchImageLibrary({ mediaType: 'image' }, onImageSelect);

    useEffect(()=>{
        Voice.onSpeechResults=onSpeechResults
        Voice.onSpeechEnd=onSpeechEnd
        getNote(route.params.id)
        .then(()=>{
            setLoading(false)
        })
    },[])

    useEffect(()=>{
        setData(note)
    },[note])

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
                <View style={{
                    flexDirection:'row',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <TouchableOpacity
                    style={{marginRight:responsiveFontSize(1)}}
                    >
                        <SearchIcon
                        name="search1"
                        color="white"
                        size={responsiveFontSize(3)}
                        />
                    </TouchableOpacity>
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
                                <MenuOption
                                onSelect={downloadPDF}
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
                                        source={require("../../../assets/pdf.png")}
                                        />
                                        <Text style={{marginLeft:responsiveFontSize(1)}}>PDF</Text>
                                    </View>
                                </MenuOption>
                                <MenuOption
                                onSelect={onShare}
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
                                        source={require("../../../assets/share.png")}
                                        />
                                        <Text style={{marginLeft:responsiveFontSize(1)}}>Share</Text>
                                    </View>
                                </MenuOption>
                            </MenuOptions>
                        </Menu>
                    </TouchableOpacity>
                </View>
            ) 
          });
    },[note])

    async function downloadPDF(){
        let options = {
            html: `
            <h1>${note.title}</h1>
            <div>${note.description}</div>
            `,
            fileName: note.title.split(" ")[0],
        }
        let file = await RNHTMLtoPDF.convert(options)
        await RNPrint.print({ filePath: file.filePath })
        // navigation.push('PDFview',{uri:file.filePath});
    }
    async function onShare(){
        let options = {
            html: `
            <h1>${note.title}</h1>
            <div>${note.description}</div>
            `,
            fileName: note.title,
        }
        let file = await RNHTMLtoPDF.convert(options)
        Share.open({
            filename:note.title,
            saveToFiles:true,
            url:`file://${file.filePath}`
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            err && console.log(err);
        });
    }

    if(!loading){
        return (
            <View style={{flex:1}}>
                <VoiceModal
                visible={voiceModal}
                voiceCancel={async()=>await Voice.cancel()}
                stop={async()=>await Voice.stop()}
                closeModle={()=>setVoiceModal(false)}
                />
               <NoteDetailBox
               content={data.description}
               title={data.title}
               id={note.id}
               update={true}
               />
            </View>
        )
    }else{
        return <Loader/>
    }
}

const styles = StyleSheet.create({})

function mapStateToProps({note}){
    return {note}
}
export default connect(mapStateToProps,action)(NoteDetail)

