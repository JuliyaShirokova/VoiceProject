import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import Speaker from '../Common/Speaker';

import Microphone from '../Common/Microphone';
import * as colors from '../../constants/colors';
import { moderateScale } from '../../utilits/scalable';
import { HelveticaNeueBold } from '../../constants/fonts';
import { levelUp, sublevelUp, levelsReset } from '../../actions';
import { levelsSource } from '../../sources/levelsSource';
import { lastInArray } from '../../utilits/lastInArray';

class Level extends Component{
    constructor(props){
        super(props);

        this.state = {
                
        };
    }

    componentDidMount() {
    }

    getSyllableWord = () => {
        const { displayData } = this.props;
        console.log('get syllable word props', this.props);
        const syllableWord = displayData.syllable;
        return syllableWord || '';
    }

    render(){
        const { onLevelUp, onSublevelUp, displayData, levels } = this.props;
        const syllableWord = this.getSyllableWord();
        console.log('Level props', JSON.stringify(levels));
        return (
            <View
                style={styles.container}
            >
                <View style={styles.wordContainer}>
                    <Speaker
                        speakedWord={syllableWord}
                        levels = {levels}
                    />
                </View>
                <View style={styles.microphoneContainer}>
                    <Microphone
                        levels = {levels}
                        displayData = {displayData}
                        onLevelUp = {onLevelUp}
                        onSublevelUp = {onSublevelUp}
                     />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    speakerLetterContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'red',
    },
    wordContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'cyan',
        borderWidth: 1,
    },
    syllableText: {
        fontSize: moderateScale(30),
        lineHeight: moderateScale(32),
        fontFamily: HelveticaNeueBold,
        color: colors.black,
    },
    microphoneContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'orange',
    },
});

const getDisplayData = ( level, sublevel ) => {
    console.log('get display data', level, sublevel);
    const currLevel = 'level-' + lastInArray(level);
    const currSublevel = lastInArray(sublevel);
    const dataLevel = levelsSource[currLevel];
    const data = dataLevel[currSublevel - 1];
    return data || {'word': '', 'syllable' : ''};
};


const mapStateToProps = state => {
    const _level = state.levels.level;
    const _sublevel = state.levels.sublevel;
    const displayData = getDisplayData(_level, _sublevel);
    console.log('Level map state to props', JSON.stringify(state));
    return ({
      levels: state.levels,
      displayData: displayData,
    });
  };


const mapDispatchToProps = dispatch => ({
    onSublevelUp : () => dispatch(sublevelUp()),
    onLevelUp : () => dispatch(levelUp()),
    onlevelsReset: () => dispatch(levelsReset()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Level);
