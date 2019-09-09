import React, {Component} from 'react';
import { levelUp, levelsReset } from '../../actions';
import {connect} from "react-redux";
import Level from '../Level';
import levelsSource from '../../sources/levelsSource.JSON';

const getDisplayData = ( level, sublevel ) => {
  
    const levelLength = level.length;
    const currLevel = "level" + levelLength;
    const currSublevel = sublevel.length;
    const data = levelsSource[currLevel][currSublevel];
    return data["syllable"] || 'no display data';
}

const mapStateToProps = state => {
    const level = state.levels.level;
    const sublevel = state.levels.sublevel;
    const displayData = getDisplayData(level, sublevel) 
    
    return {
        level,
        sublevel,
        displayData
     }
}
  
const mapDispatchToProps = dispatch => ({
//    onLevelUp: ( res ) => dispatch(levelUp( res )),
//    onlevelsReset: ( ) => dispatch(levelsReset( ))
})
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Level)