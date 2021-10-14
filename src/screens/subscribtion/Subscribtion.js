import React,{useLayoutEffect} from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { responsiveFontSize ,responsiveWidth} from 'react-native-responsive-dimensions';
import MenuIcon from "react-native-vector-icons/Entypo"
import Subscription from "../../components/SubBox"
export default function Subscribtion({navigation}) {
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

    function renderSub(){
        return(
            <Subscription
            title="One Profile"
            price={3.99}
            auto={true}
            />
        )
    }
    return (
        <View>
            <FlatList
            showsVerticalScrollIndicator={false}
            data={[1,1,1,1,1,1,1,1,1,1,1,1]}
            renderItem={renderSub}
            contentContainerStyle={{
                alignItems:'center',
                paddingHorizontal:responsiveFontSize(0.75)
            }}
            keyExtractor={(item,i)=>i.toString()}
            numColumns={2}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
