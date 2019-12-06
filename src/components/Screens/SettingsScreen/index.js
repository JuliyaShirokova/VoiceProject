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
    
    static navigationOptions = ({ navigation }) => ({
        headerTitle: (<HeaderTitle 
            text={"Settings"} 
            paddingLeft={PADDING_HORIZONTAL} 
            textColor={colors.titleText} 
            />), 
        headerStyle: { 
            height: moderateScale(90),
            paddingTop: moderateScale(30),
            elevation: 0,
            shadowOpacity: 0,
            position: 'absolute', 
            backgroundColor: 'transparent',
            zIndex: 100,
            top: 0,
            left: 0, 
            right: 0
        }
    });
    
    componentDidMount(){}

    render(){
        return (
            <View
                style={styles.container}
            >
                <Settings 
                    navigation = {this.props.navigation}      
                />
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default SettingsScreen;

