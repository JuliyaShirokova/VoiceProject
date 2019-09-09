import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import LevelsListContainer from '../../Containers/LevelsListContainer';
import * as colors from '../../../constants/colors';
import { moderateScale } from '../../../utilits/scalable';
import HeaderTitle from '../../Common/HeaderTitle';
import SplashScreen from 'react-native-splash-screen';
import { PADDING_HORIZONTAL } from '../../../constants/commonConstants';
import BG from '../../Common/SvgComponents/BG';

class LevelsListScreen extends Component{
    constructor(props){
        super(props);   
    }
    
    static navigationOptions = ({ navigation }) => ({
        headerTitle: (<HeaderTitle 
            text={"WELCOME!"} 
            paddingLeft={PADDING_HORIZONTAL} 
            textColor={colors.titleText} 
            />),
        headerStyle: { 
            height: moderateScale(90),
            paddingTop: moderateScale(30),
            backgroundColor: colors.mainContrast,
            elevation: 0,
            shadowOpacity: 0,
        }
    });
    
    componentDidMount() {
//       SplashScreen.hide();
    }  

    render(){
        return (
            <View
                style={styles.container}
            >
                <View style={styles.bgContainer}>
                    <BG />
                </View>
                <LevelsListContainer
                    navigation = {this.props.navigation}
                />
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    bgContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    }
})
export default LevelsListScreen;

