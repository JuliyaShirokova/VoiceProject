import React, {Component} from 'react';
import LevelsList from '../LevelsList';
import { levelUp, levelsReset } from '../../actions';
import {connect} from "react-redux";
import { MAX_LEVEL } from '../../constants/commonConstants';

const getListData = ( levels ) => {
  let arr = [];
  let arrLevels=levels.level;

  const arrLength = arrLevels.length;
  const curr = arrLevels[ arrLength - 1];
  for (let i=1; i<=MAX_LEVEL; i++ ){
      if( arrLevels.find( el => el==i ) && ( curr != i ) ){
        arr.push({key: i, status: 'done'})
      }else if (curr == i ){
        arr.push({key: i, status: 'current'})
      }else {
        arr.push({key: i, status: 'future'})
      }
  }

  return arr;
}

const mapStateToProps = state => ({
    levels : state.levels,
    listData: getListData(state.levels)
  })
  
  const mapDispatchToProps = dispatch => ({
    onLevelUp: ( res ) => dispatch(levelUp( res )),
    onlevelsReset: ( ) => dispatch(levelsReset( ))
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LevelsList)