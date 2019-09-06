import React, { Component } from 'react';
import {Text, View, StyleSheet } from 'react-native';
import * as fonts from '../../../constants/fonts';
import { moderateScale } from '../../../utilits/scalable';
import { useTranslation } from 'react-i18next';

const HeaderTitle = (props) => {
    return (
        <View style={styles.container}>
            <Text
                numberOfLines={1}
                ellipsizeMode='tail' 
                style={[styles.headerText, {color: props.textColor}]}
            >
                {props.text}
            </Text>
        </View>
    )
}

export default HeaderTitle;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingLeft: moderateScale(16),
        paddingRight: 0,
        marginHorizontal: 0
    },
    headerText: {
        fontSize: moderateScale(24),
        lineHeight: moderateScale(26),
        fontFamily: fonts.HelveticaNeueBold,
    }
})