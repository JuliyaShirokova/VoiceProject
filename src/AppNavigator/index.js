import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from  'react-navigation-stack';
import MainScreen from '../components/Screens/MainScreen';
import LevelsListScreen from '../components/Screens/LevelsListScreen';

const MainStack = createStackNavigator(
  {
    LevelsList: { screen: LevelsListScreen },
    Main: { screen: MainScreen },
  }, 
  {
    initialRouteName: 'LevelsList',
    cardStyle: {
      shadowColor: 'transparent',
    },
    header: {
      style: {
        elevation: 0, //remove shadow on Android
        shadowOpacity: 0, //remove shadow on iOS
      }
    }
  }
);

const AppNavigator = createAppContainer(MainStack);

export default AppNavigator;