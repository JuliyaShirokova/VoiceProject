import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import MicrophoneContainer from '../../Containers/MicrophoneContainer';
import * as colors from '../../../constants/colors';
import { moderateScale } from '../../../utilits/scalable';
import HeaderTitle from '../../Common/HeaderTitle';

class MainScreen extends Component{
    constructor(props){
        super(props);   
    }
    
    static navigationOptions = ({ navigation }) => ({
        headerTitle: (<HeaderTitle text={"Level " + navigation.getParam('key')} textColor={colors.titleText} />),
        headerStyle: { 
            height: moderateScale(90),
            paddingTop: moderateScale(30),
            backgroundColor: colors.mainContrast,
            elevation: 0,
            shadowOpacity: 0,
        }
    });
    
    componentDidMount() {
    }  

    render(){
        return (
            <View
                style={styles.container}
            >
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
})
export default MainScreen;

