import React,{useEffect, useLayoutEffect, useState} from 'react'
import { StyleSheet, Text, View ,TouchableOpacity, Image,FlatList, Touchable} from 'react-native'
import { responsiveFontSize, responsiveScreenFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import MenuIcon from "react-native-vector-icons/Entypo"
import SearchIcon from "react-native-vector-icons/AntDesign"
import CreateIcon from "react-native-vector-icons/Ionicons"
import Note from '../../components/Note';
import * as actions from "../../store/actions"
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import removeTags from '../../utils/removeTags';

function AllNotes({navigation,notes,getNotes}) {

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
                </View>
            )
            
          });
    },[navigation])

    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        return navigation.addListener('focus',()=>{
            getNotes().then(()=>setLoading(false))
        })
    },[navigation])
    function renderNote({item}){
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

    if(!loading){
        return (
            <View style={{flex:1}}>
                <FlatList
                showsVerticalScrollIndicator={false}
                data={notes}
                renderItem={renderNote}
                contentContainerStyle={{
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

function mapStateToProps({notes}){
    return {notes}
}

export default connect(mapStateToProps,actions)(AllNotes)