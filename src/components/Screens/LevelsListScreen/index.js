import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import LevelsListContainer from '../../Containers/LevelsListContainer';
import * as colors from '../../../constants/colors';
import { moderateScale } from '../../../utilits/scalable';
import HeaderTitle from '../../Common/HeaderTitle';
import SplashScreen from 'react-native-splash-screen';
import { PADDING_HORIZONTAL } from '../../../constants/commonConstants';
import BG from '../../Common/SvgComponents/BG';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { connect } from 'react-redux';
import { levelsReset } from '../../../actions'

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
        headerRight: (<View style={styles.rightButtonContainer}>
                <TouchableOpacity
                    onPress = { navigation.getParam("onLevelsReset") }
                    style={styles.rightButtonTouch}
                >
                    <Icon 
                        name='refresh'
                        size={24}
                        color={colors.titleText}
                    />
               </TouchableOpacity>
            </View>
        ), 
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
        const { onLevelsReset } = this.props;
        console.log('cdm', this.props)
        this.props.navigation.setParams({
            onLevelsReset: onLevelsReset
        })
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
    },
    rightButtonContainer: {
        width: moderateScale(30),
        height: moderateScale(30),
        marginRight: PADDING_HORIZONTAL,
    },
    rightButtonTouch: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

const mapStateToProps = state => (state)
  
const mapDispatchToProps = dispatch => {
    console.log('map dispatch to props')
    return ({
       onLevelsReset: () => dispatch(levelsReset())
    })
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LevelsListScreen);

