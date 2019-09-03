import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import LevelsListContainer from '../../Containers/LevelsListContainer';
import * as colors from '../../../constants/colors';
import { moderateScale } from '../../../utilits/scalable';
import SplashScreen from 'react-native-splash-screen';

class LevelsListScreen extends Component{
    constructor(props){
        super(props);   
    }
    
    static navigationOptions = ({ navigation }) => ({
        headerTitle: (<HeaderTitle text={"Levels list"} textColor={colors.titleText} />),
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
                <LevelsListContainer />
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
})
export default LevelsListScreen;

