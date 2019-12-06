
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import BackgroundFull from '../../Common/SvgComponents/BackgroundFull';
import Tree from '../../Common/SvgComponents/Tree';

const { height, width } = Dimensions.get('window');

export default function BackgroundPage(props){
    return (
        <View style={styles.bgContainer}>
            <BackgroundFull
                startColor = {props.startColor}
                stopColor = {props.stopColor}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    bgContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: width,
        height: height,
        alignItems: 'center'
    },
})