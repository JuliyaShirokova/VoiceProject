import React, {Component} from 'react';
import {Alert} from 'react-native';
import { levelUp, sublevelUp, levelsReset } from '../../actions';
import { connect } from 'react-redux';
import Level from '../Level';
import { levelsSource } from '../../sources/levelsSource';
import { lastInArray } from '../../utilits/lastInArray';

const getDisplayData = ( level, sublevel ) => {
    console.log('get display data', level, sublevel)
    const currLevel = "level-" + lastInArray(level);
    const currSublevel = lastInArray(sublevel);
    const dataLevel = levelsSource[currLevel];
    const data = dataLevel[currSublevel];
    return data || {"word": "", "syllable" : ""};
}


const mapStateToProps = state => {
    const _level = state.levels.level;
    const _sublevel = state.levels.sublevel;
    const displayData = getDisplayData(_level, _sublevel);
    console.log('Level container', JSON.stringify(state))
    return ({
      levels: state.levels,
      displayData: displayData
    })
  }
  
  
const mapDispatchToProps = dispatch => ({
    onSublevelUp : () => dispatch(sublevelUp()),
    onLevelUp : () => dispatch(levelUp()),
    onlevelsReset: () => dispatch(levelsReset())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Level)
  