import React,{useLayoutEffect, useState} from 'react'
import { StyleSheet, Text, View,TextInput, TouchableOpacity ,FlatList} from 'react-native'
import {responsiveWidth,responsiveFontSize, responsiveHeight} from "react-native-responsive-dimensions"
import SearchIcon from "react-native-vector-icons/AntDesign"
import Loader from '../../components/Loader'
import Note from "../../components/Note"
import * as actions from "../../store/actions"
import {connect} from "react-redux"
import removeTags from '../../utils/removeTags'

function Search({navigation,searchR,search,currentProfile}) {
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: props => <Text style={{marginLeft:responsiveWidth(5),textAlign:'center',color:'white',fontSize:responsiveFontSize(2.5),textTransform:'uppercase',includeFontPadding:false,textAlignVertical:'center'}}>SEARCH NOW</Text>
          });
    },[navigation])

    const [loading,setLoading]=useState(false)
    const [submit,setSubmit]=useState(false)
    const [text,setText]=useState("")

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

    function onSearch(){
        setSubmit(true)
        if(text){
            setLoading(true)
            search(currentProfile.id,text).then(()=>setLoading(false))
        }
    }
    return (
        <View style={{flex:1}}>
            <View style={styles.con}>
                <TextInput
                style={{...styles.input,borderColor:'red',borderWidth:submit && !text?1:0}}
                onChangeText={v=>setText(v)}
                placeholder="Search"
                />
                <TouchableOpacity
                onPress={onSearch}
                style={styles.btn}
                >
                    <SearchIcon
                    name="search1"
                    size={responsiveFontSize(2)}
                    color="white"
                    />
                </TouchableOpacity>
            </View>
            {
                submit?(
                    loading?(
                        <Loader/>
                    ):(
                        <FlatList
                        showsVerticalScrollIndicator={false}
                        data={searchR}
                        renderItem={renderNote}
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
                    )
                ):(
                    <View 
                    style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <SearchIcon
                        name="search1"
                        size={responsiveFontSize(10)}
                        color="lightgrey"
                        />
                        <Text style={{fontSize:22,color:'lightgrey'}}>Search Now</Text>
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    btn:{
        backgroundColor:'#7A448D',
        width:'20%',
        height:responsiveHeight(6),
        justifyContent:'center',
        alignItems:'center',
        borderBottomRightRadius:responsiveFontSize(0.5),
        borderTopRightRadius:responsiveFontSize(0.5)
    },
    input:{
        backgroundColor:'white',
        height:responsiveHeight(6),
        width:'75%',
        borderTopLeftRadius:responsiveFontSize(0.5),
        borderBottomLeftRadius:responsiveFontSize(0.5)
    },
    con:{
        marginTop:responsiveFontSize(1),
        alignSelf:'center',
        flexDirection:'row'
    }
})

function mapStateToProps({searchR,currentProfile}){
    return{searchR,currentProfile}
}

export default connect(mapStateToProps,actions)(Search)
