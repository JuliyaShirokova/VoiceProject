import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import * as colors from '../../../constants/colors';
import { moderateScale } from '../../../utilits/scalable';
import HeaderTitle from '../../Common/HeaderTitle';
import Icon from 'react-native-vector-icons/Ionicons';
import { PADDING_HORIZONTAL } from '../../../constants/commonConstants';
import LevelContainer from '../../Containers/LevelContainer';
import { lastInArray } from '../../../utilits/lastInArray';
import { connect } from 'react-redux';


class LevelScreen extends Component{
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
        headerTitle: (<HeaderTitle text={"Level " + ( navigation.getParam('currLevel') || '') } paddingLeft={0} textColor={colors.titleText} />),
        headerStyle: { 
            height: moderateScale(90),
            paddingTop: moderateScale(30),
            backgroundColor: colors.mainContrast,
            elevation: 0,
            shadowOpacity: 0,
        }
    });
    
    componentDidMount = () => {
        this.props.navigation.setParams({
            currLevel: this.props.currLevel
        })
    }  
    componentDidCatch(error, info) {
        console.log('ERROR. Component did catch.', error, info.componentStack);
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

const getCurrentLevel = (levels) => {
    const level = levels.level;
    const currLevel = lastInArray(level) || 1;
    console.log('get current level ', currLevel)
    return currLevel;
}

const mapStateToProps = state => {
    console.log('Level screen', JSON.stringify(state))
    return ({
      currLevel: getCurrentLevel(state.levels),
    })
}
  
  
const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LevelScreen)
