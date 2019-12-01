import React from 'react'
import { 
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
} from 'react-native';
import * as colors from '../../../constants/colors';

const Preloader = (props) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator
                size='large'
                color={props.colorIndicator}
            />
            <View style={styles.preloaderTextContainer}>
                <Text style={[styles.preloaderText, {color: props.colorIndicator}]}>Пожалуйста, подождите</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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