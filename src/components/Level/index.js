import React, { Component } from 'react';
import { 
    View,
    StyleSheet,
    Text,
    Alert,
    TouchableOpacity 
} from 'react-native';
import Microphone from '../Common/Microphone';
import * as colors from '../../constants/colors';
import { moderateScale } from '../../utilits/scalable';
import { HelveticaNeueBold } from '../../constants/fonts';

export default class Level extends Component{
   
    getSyllableWord = () => {
        const { displayData } = this.props;
        return displayData["syllable"];
    }
    render(){
        const { onLevelUp, onSublevelUp, displayData, levels } = this.props;
        console.log('Level props', JSON.stringify(levels))
        return (
            <View
                style={styles.container}
            >

                <View style={styles.wordContainer}>
                    <Text style={styles.wordText}>{this.getSyllableWord()}</Text>
                </View>
                <Microphone
                    levels = {levels}
                    displayData = {displayData}
                    onLevelUp = {onLevelUp}
                    onSublevelUp = {onSublevelUp}
                     />
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wordContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wordText: {
        fontSize: moderateScale(30),
        lineHeight: moderateScale(32),
        fontFamily: HelveticaNeueBold,
        color: colors.black
    }
})

