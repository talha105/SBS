import React,{useEffect, useLayoutEffect, useState} from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { responsiveFontSize ,responsiveWidth} from 'react-native-responsive-dimensions';
import MenuIcon from "react-native-vector-icons/Entypo"
import { connect } from 'react-redux';
import Subscription from "../../components/SubBox";
import * as action from "../../store/actions"
import Loader from "../../components/Loader"
import Payment from '../../components/Payment';

function Subscribtion({navigation,packages,getPackages}) {
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
            headerTitle: props => <Text style={{marginLeft:responsiveWidth(5),textAlign:'center',color:'white',fontSize:responsiveFontSize(2.5),textTransform:'uppercase',includeFontPadding:false,textAlignVertical:'center'}}>Subscribtions</Text>
          });
    },[navigation])

    const [loading,setLoading]=useState(true)
    const [currentItem,setCurrentItem]=useState({})
    const [payModal,setPayModal]=useState(false)
    useEffect(()=>{
        getPackages().then(()=>setLoading(false))
    },[])

    function renderSub({item}){
        const {
            id,
            name,
            price,
            package_expiry,
            status,
            created_date
        }=item
        return(
            <Subscription
            title={name}
            price={price}
            packageExpiry={package_expiry}
            call={()=>{
                setCurrentItem(item)
                setPayModal(true)
            }}
            auto={true}
            />
        )
    }

    if(!loading){
        return (
            <View style={{flex:1}}>
                <Payment
                data={currentItem}
                visible={payModal} 
                closeModle={()=>setPayModal(false)}
                />
                <FlatList
                showsVerticalScrollIndicator={false}
                data={packages}
                renderItem={renderSub}
                contentContainerStyle={{
                    alignItems:'center',
                    paddingHorizontal:responsiveFontSize(0.75),
                    flex:1
                }}
                keyExtractor={(item,i)=>i.toString()}
                numColumns={2}
                ListEmptyComponent={()=>(
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Text>No Result Found</Text>
                    </View>
                )}
                />
            </View>
        )
    }else{
        return <Loader/>
    }
}

const styles = StyleSheet.create({})

function mapStateToProps({packages}){
    return {packages}
}

export default connect(mapStateToProps,action)(Subscribtion)