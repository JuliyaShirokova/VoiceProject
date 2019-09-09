import React, { Component } from 'react';
import { 
    View,
    StyleSheet,
    Text,
    TouchableOpacity 
} from 'react-native';
import MicrophoneContainer from '../Common/Microphone';
import * as colors from '../../constants/colors';
import { moderateScale } from '../../utilits/scalable';
import { HelveticaNeueBold } from '../../constants/fonts';

export default class Level extends Component{
    constructor(props){
        super(props);   
    }

    render(){
        const { displayData } = this.props;
        return (
            <View
                style={styles.container}
            >

                <View style={styles.wordContainer}>
                    <Text style={styles.wordText}>{displayData}</Text>
                </View>
                <MicrophoneContainer />
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

