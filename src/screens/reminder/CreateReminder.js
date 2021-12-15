import React, { useState } from 'react'
import { StyleSheet, TextInput, View,TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {
    responsiveFontSize,
} from "react-native-responsive-dimensions"
import * as actions from "../../store/actions"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Btn from "../../components/Btn"

function CreateReminder({navigation,createReminder,currentProfile,getReminders}) {
    const [fields, setFields] = useState({
        title:"",
        date:"",
        time:""
    })
    const [submit,setSubmit]=useState(false)
    const [loading,setLoading]=useState(false)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setFields({...fields,date})
        hideDatePicker();
      };

    const getValue=(k,v)=>setFields({...fields,[k]:v})

    function onSubmit(){
        setSubmit(true)
        if(fields.date && fields.title){
            console.log(fields.date.toISOString().substring(0, 10)+" "+fields.date.toISOString().substring(11, 19))
            setLoading(true)
            createReminder({
                remainder_name:fields.title,
                remainder_time:fields.date.toISOString().substring(0, 10)+" "+fields.date.toISOString().substring(11, 19),
                profileId:currentProfile.id.toString()
            })
            .then(()=>{
                getReminders()
                setLoading(false)
                navigation.goBack()
            })
        }
    }
    return (
        <View>
            <View style={{ ...styles.titleCon, borderWidth: 1, borderColor: submit && !fields.title ? "red" : "white" }}>
                <TextInput
                    value={fields.title}
                    onChangeText={v => getValue('title', v)}
                    placeholder="Your Title here"
                    placeholderTextColor="black"
                />
            </View>
            <TouchableOpacity 
            onPress={showDatePicker}
            style={{ ...styles.titleCon, borderWidth: 1, borderColor: submit && !fields.date ? "red" : "white" }}>
                    <TextInput
                        value={fields.date.toString()}
                        editable={false}
                        placeholder="Select Date and Time"
                        placeholderTextColor="black"
                    />
                </TouchableOpacity>
            <View style={{width:'95%',alignSelf:'center',marginTop:15}}>
            <Btn
            text="Create"
            call={onSubmit}
            loading={loading}
            />
            </View>
            <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    titleCon:{
        backgroundColor:'white',
        width:'95%',
        alignSelf:'center',
        padding:responsiveFontSize(0.5),
        borderRadius:responsiveFontSize(1.5),
        marginTop:responsiveFontSize(2)
    }
})
function mapStateToProps({currentProfile}){
    return {currentProfile}
}
export default connect(mapStateToProps, actions)(CreateReminder)
