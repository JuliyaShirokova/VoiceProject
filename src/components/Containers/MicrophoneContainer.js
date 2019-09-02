import React, {Component} from 'react';
import Microphone from '../Common/Microphone';
import { levelUp } from '../../actions';
import {connect} from "react-redux";

const mapStateToProps = state => ({
    results : state.levels,
  })
  
  const mapDispatchToProps = dispatch => ({
    onLevelUp: ( res ) => dispatch(levelUp( res )),
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Microphone)