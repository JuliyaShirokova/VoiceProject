import React, {Component} from 'react';
import {Alert} from 'react-native';
import { levelUp, sublevelUp, levelsReset } from '../../actions';
import { connect } from 'react-redux';
import Level from '../Level';
import { levelsSource } from '../../sources/levelsSource';
import { lastInArray } from '../../utilits/lastInArray';

  