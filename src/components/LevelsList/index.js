import React, { Component } from 'react';
import { 
    View,
    Text, 
    SectionList, 
    TouchableOpacity, 
    StyleSheet 
} from 'react-native';

export default class LevelsList extends Component{
    render(){
        return (
            <View style={styles.container}>
                <Text>Hello</Text>

            </View>
        )
    }
} 

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})