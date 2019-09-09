import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import * as colors from '../../../constants/colors';
import { moderateScale } from '../../../utilits/scalable';
import HeaderTitle from '../../Common/HeaderTitle';
import Icon from 'react-native-vector-icons/Ionicons';
import { PADDING_HORIZONTAL } from '../../../constants/commonConstants';
import LevelContainer from '../../Containers/LevelContainer';

class MainScreen extends Component{
    constructor(props){
        super(props);   
    }
    
    static navigationOptions = ({ navigation }) => ({
        headerLeft: (<TouchableOpacity
                onPress={ () => { navigation.goBack() }}
                style={{paddingLeft: PADDING_HORIZONTAL}}
            >
            <Icon 
                name={'ios-arrow-back'}
                size={moderateScale(24)}
                color={colors.white}
            />
            </TouchableOpacity>
            ),
        headerTitle: (<HeaderTitle text={"Level " + navigation.getParam('key')} paddingLeft={0} textColor={colors.titleText} />),
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
                <LevelContainer />
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

