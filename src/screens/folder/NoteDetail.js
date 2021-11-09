import React,{useEffect, useLayoutEffect, useState} from 'react'
import { StyleSheet, Text, View ,TouchableOpacity, Image,FlatList} from 'react-native'
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
                            </MenuOptions>
                        </Menu>
                    </TouchableOpacity>
                </View>
            )
            
          });
    },[navigation])

    const [data,setData]=useState({})
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        getNote(route.params.id)
        .then(()=>setLoading(false))
    },[])


    if(!loading){
        return (
            <View style={{flex:1}}>
               <NoteDetailBox
               content={note.description}
               title={note.title}
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

