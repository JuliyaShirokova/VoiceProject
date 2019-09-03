import React, {Component} from 'react';
import LevelsList from '../LevelsList';
import { levelUp, levelsReset } from '../../actions';
import {connect} from "react-redux";

const mapStateToProps = state => ({
    results : state.levels,
  })
  
  const mapDispatchToProps = dispatch => ({
    onLevelUp: ( res ) => dispatch(levelUp( res )),
    onlevelsReset: ( ) => dispatch(levelsReset( ))
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LevelsList)