import React from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation';
import MainScreen from '../components/Screens/MainScreen';
import ResultsScreen from '../components/Screens/ResultsScreen';

const MainStack = createStackNavigator(
  {
    Main: { screen: MainScreen },
    Results: { screen: ResultsScreen },
  }, 
  {
    initialRouteName: 'Main',
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