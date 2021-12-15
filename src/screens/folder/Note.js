import React,{useEffect, useLayoutEffect, useState} from 'react'
import { StyleSheet, Text, View ,TouchableOpacity, Image,FlatList, Touchable} from 'react-native'
import { responsiveFontSize, responsiveScreenFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import BackIcon from "react-native-vector-icons/AntDesign"
import SearchIcon from "react-native-vector-icons/AntDesign"
import CreateIcon from "react-native-vector-icons/Ionicons"
import MoreIcon from "react-native-vector-icons/Feather"
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import Note from '../../components/Note';
import { connect } from 'react-redux';
import * as actions from "../../store/actions"
import Loader from '../../components/Loader';
import removeTags from '../../utils/removeTags';

function Notes({navigation,getNotes,notes,route,currentProfile}) {

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: props => <Text style={{marginLeft:responsiveWidth(5),textAlign:'center',color:'white',fontSize:responsiveFontSize(2.5),textTransform:'uppercase',includeFontPadding:false,textAlignVertical:'center'}}>january Notes</Text>,
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

    function renderNote({item,index}){
        const {
            id,
            notes_type,
            title,
            description,
            created_date,
            profileId,
            updated_date,
            status
        }=item
        return(
            <Note
            call={()=>navigation.push('noteDetail',{id})}
            title={title.length>15?title.slice(0,15)+"...":title}
            des={removeTags(description).length>50?removeTags(description).slice(0,50)+"...":removeTags(description)}
            date={new Date(created_date).toDateString()}
            time={new Date(created_date).toTimeString().slice(0,5)}
            select={false}
            />
        )
    }

    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        return navigation.addListener('focus',()=>{
            getNotes(currentProfile.id,route.params.month).then(()=>setLoading(false))
        })
    },[navigation])
    
    if(!loading){
        return (
            <View style={{flex:1}}>
                <FlatList
                showsVerticalScrollIndicator={false}
                data={notes}
                renderItem={renderNote}
                contentContainerStyle={{
                    flex:1,
                    marginTop:responsiveFontSize(1.5),
                    paddingHorizontal:responsiveFontSize(0.75)
                }}
                ListEmptyComponent={()=>(
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Text>No Result Found</Text>
                    </View>
                )}
                keyExtractor={(item,i)=>i.toString()}
                numColumns={2}
                />
                <TouchableOpacity
                style={styles.createCon}
                onPress={()=>navigation.push('noteCreate')}
                >
                    <CreateIcon
                    name="create-outline"
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

function mapStateToProps({notes,currentProfile}){
    return {notes,currentProfile}
}

export default connect(mapStateToProps,actions)(Notes)