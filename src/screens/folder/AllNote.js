import React,{useLayoutEffect} from 'react'
import { StyleSheet, Text, View ,TouchableOpacity, Image,FlatList, Touchable} from 'react-native'
import { responsiveFontSize, responsiveScreenFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import MenuIcon from "react-native-vector-icons/Entypo"
import SearchIcon from "react-native-vector-icons/AntDesign"
import CreateIcon from "react-native-vector-icons/Ionicons"
import MoreIcon from "react-native-vector-icons/Feather"
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import Note from '../../components/Note';

export default function AllNotes({navigation}) {

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
            headerTitle: props => <Text style={{marginLeft:responsiveWidth(5),textAlign:'center',color:'white',fontSize:responsiveFontSize(2.5),textTransform:'uppercase',includeFontPadding:false,textAlignVertical:'center'}}>All Notes</Text>,
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

    function renderNote(){
        return(
            <Note
            call={()=>navigation.push('noteDetail')}
            title="Aenean pulvinar nunc."
            des="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lobortis ipsum"
            date="02 Dec 2021"
            time="02 : 05 PM"
            select={false}
            />
        )
    }

    return (
        <View>
            <FlatList
            showsVerticalScrollIndicator={false}
            data={[1,1,1,1,1,1,1,1,1,1,1,1]}
            renderItem={renderNote}
            contentContainerStyle={{
                alignItems:'center',
                marginTop:responsiveFontSize(1.5),
                paddingHorizontal:responsiveFontSize(0.75)
            }}
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
