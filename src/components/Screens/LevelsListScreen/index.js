import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import LevelsList from '../../LevelsList';
import * as colors from '../../../constants/colors';
import { moderateScale } from '../../../utilits/scalable';
import HeaderTitle from '../../Common/HeaderTitle';
import BackgroundPage from '../../Common/SvgComponents/BackgroundFull';
import SplashScreen from 'react-native-splash-screen';
import { PADDING_HORIZONTAL } from '../../../constants/commonConstants';
import { connect } from 'react-redux';
import { getThemeColor } from '../../../utilits/themeColorFunctions';

class LevelsListScreen extends Component{
    constructor(props){
        super(props);

        this._getThemeColor = getThemeColor;
    }

    static navigationOptions = ({ navigation }) => ({
        headerTitle: (<HeaderTitle
            text={'WELCOME!'}
            paddingLeft={PADDING_HORIZONTAL}
            textColor={colors.titleText}
            />),
        headerStyle: {
            height: moderateScale(90),
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
        },
        headerTransparent: true,
    });

    componentDidMount() {
//       SplashScreen.hide();
    }

    render(){
        const { themeColor } = this.props;
        const { startColor, stopColor } = this._getThemeColor(themeColor);

        return (
            <View
                style={styles.container}
            >
                <BackgroundPage
                    startColor={startColor}
                    stopColor={stopColor}
                />
                <LevelsList
                    navigation = {this.props.navigation}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
});

const mapStateToProps = state => {
    return ({
        themeColor: state.settings.themeColor,
    });
};

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LevelsListScreen);

