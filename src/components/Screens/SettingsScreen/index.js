import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import * as colors from '../../../constants/colors';
import { moderateScale } from '../../../utilits/scalable';
import HeaderTitle from '../../Common/HeaderTitle';
import { PADDING_HORIZONTAL } from '../../../constants/commonConstants';
import BG from '../../Common/SvgComponents/BG';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { connect } from 'react-redux';
import Settings from '../../Settings';

class SettingsScreen extends Component{
    constructor(props){
        super(props);   
    }
    render(){
        return (
            <View
                style={styles.container}
            >
                <View style={styles.bgContainer}>
                    <BG />
                </View>
                <Settings />
                
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
    },
    bgContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    rightButtonContainer: {
        width: moderateScale(30),
        height: moderateScale(30),
        marginRight: PADDING_HORIZONTAL,
    },
    rightButtonTouch: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default SettingsScreen;

