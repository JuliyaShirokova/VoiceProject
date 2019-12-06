import React from 'react'
import { 
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Dimensions,
    Animated
} from 'react-native';
import * as colors from '../../../constants/colors';
import BackgroundFull from '../SvgComponents/BackgroundFull';
import AnimatedActivityIndicator from '../AnimatedActivityIndicator';

const { width, height } = Dimensions.get('window');
 
const Preloader = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.bgContainer}>
                <BackgroundFull
                    startColor={props.startColor}
                    stopColor={props.stopColor}
                />
            </View>
            <AnimatedActivityIndicator />
            <View style={styles.preloaderTextContainer}>
                <Text style={[styles.preloaderText, {color: props.colorIndicator}]}>Пожалуйста, подождите</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bgContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height
    },
    preloaderTextContainer: {
        marginVertical: 20,
    },
    preloaderText: {
        fontSize: 18,
        lineHeight: 20,
        fontWeight: '600',
    }
});

export default Preloader;