import React,{useLayoutEffect} from 'react'
import { StyleSheet, Text, View ,TouchableOpacity, Image,FlatList} from 'react-native'
import { responsiveFontSize, responsiveScreenFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import MenuIcon from "react-native-vector-icons/Entypo"
import SearchIcon from "react-native-vector-icons/AntDesign"
import MoreIcon from "react-native-vector-icons/Feather"
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import FolderBox from '../../components/FolderBox';

export default function Folder({navigation}) {

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
            headerTitle: props => <Text style={{marginLeft:responsiveWidth(5),textAlign:'center',color:'white',fontSize:responsiveFontSize(2.5),textTransform:'uppercase',includeFontPadding:false,textAlignVertical:'center'}}>Folders</Text>,
            headerRight: () => (
                <View style={{
                    flexDirection:'row',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <TouchableOpacity
                    onPress={()=>navigation.push("search")}
                    style={{marginRight:responsiveFontSize(1)}}
                    >
                        <SearchIcon
                        name="search1"
                        color="white"
                        size={responsiveFontSize(3)}
                        />
                    </TouchableOpacity>
                </View>
            )
            
          });
    },[navigation])

    function renderFolder({item,index}){
        return(
            <FolderBox
            call={()=>navigation.push('notes',{month:index+1})}
            month={item}
            />
        )
    }

    return (
        <View>
            <FlatList
            showsVerticalScrollIndicator={false}
            data={["January","February","March","April","May","June","July","August","September","October","November","December"]}
            renderItem={renderFolder}
            contentContainerStyle={{
                alignItems:'center',
                marginTop:responsiveFontSize(1.5),
                paddingHorizontal:responsiveFontSize(0.75)
            }}
            keyExtractor={(item,i)=>i.toString()}
            numColumns={4}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
