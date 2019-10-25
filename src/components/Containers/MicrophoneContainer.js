import React, {Component} from 'react';
import Microphone from '../Common/Microphone';
import { sublevelUp, levelUp } from '../../actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
 // console.log('state levels', JSON.stringify(state.levels));
  return ({
    levels: state.levels,
  })
};

  const mapDispatchToProps = dispatch => ({
 //   onSublevelUp : () => dispatch(sublevelUp()),
 //   onLevelUp : () => dispatch(levelUp()),
  });

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Microphone);
