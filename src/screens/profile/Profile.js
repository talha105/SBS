import React, { useState } from 'react'
import {ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import Input from '../../components/Input'
import Icon from "react-native-vector-icons/Ionicons"
import Btn from '../../components/Btn'
import { responsiveFontSize, responsiveHeight,responsiveWidth } from 'react-native-responsive-dimensions'
import ValidateEmail from '../../utils/validateEmail'

export default function Profile({ navigation }) {
    const [fields, setFields] = useState({
        email: "talha@yahoo.com",
        name: "Muhammad talha"
    })
    const [submit, setSubmit] = useState(false)
    const getValue = (k, v) => setFields({ ...fields, [k]: v })

    function onSubmit() {
        setSubmit(true)
        if (fields.password && ValidateEmail(fields.email) && fields.name) {

        }
    }
    return (
        <ScrollView
            contentContainerStyle={{ ...styles.scr }}
        >
            <View
                style={{
                    backgroundColor: '#7A448D',
                    height: responsiveHeight(18)
                }}
            />
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: responsiveHeight(11),
                left: responsiveWidth(36)
            }}>
                <Image
                    style={{
                        width: responsiveFontSize(14),
                        height: responsiveFontSize(14),
                        borderRadius: responsiveFontSize(7)
                    }}
                    source={require('../../../assets/pro.png')}
                />
            </View>
            <View style={{width:'100%'}}>
            <View style={{width:'95%',alignSelf:'center',marginTop:responsiveHeight(9)}}>
            <Input
                name="Full Name"
                icon={fields.name ? (
                    () => (
                        <Icon
                            name="checkmark-circle-outline"
                            size={20}
                            color="green"
                        />
                    )
                ) : null}
                value={fields.name}
                getValue={(v) => getValue('name', v)}
                error={submit && !fields.name ? true : false}
            />
            </View>
            <View style={{width:'95%',alignSelf:'center'}}>
            <Input
                name="Email Address"
                icon={ValidateEmail(fields.email) ? (
                    () => (
                        <Icon
                            name="checkmark-circle-outline"
                            size={20}
                            color="green"
                        />
                    )
                ) : null}
                value={fields.email}
                getValue={(v) => getValue('email', v)}
                error={submit && !fields.email ? true : false}
            />
            </View>
            <View style={styles.btn}>
                <Btn
                    text="Save"
                    call={onSubmit}
                />
            </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scr: {
        alignSelf: 'center',
        width: '100%',
        justifyContent: 'center',
        paddingBottom: responsiveFontSize(5)
    },
    imgSrc: {
        width: responsiveFontSize(18),
        height: responsiveFontSize(18)
    },
    str: {
        width: '80%'
    },
    pStr: {
        fontSize: responsiveFontSize(1.5)
    },
    line: {
        width: '15%',
        backgroundColor: 'grey',
        height: responsiveHeight(0.75),
        borderRadius: 2
    },
    bStr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: responsiveFontSize(1)
    },
    btn: {
        width:'95%',
        alignSelf:'center',
        marginVertical: responsiveFontSize(2)
    }
})
