import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from  'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import LevelScreen from '../components/Screens/LevelScreen';
import LevelsListScreen from '../components/Screens/LevelsListScreen';
import SettingsScreen from '../components/Screens/SettingsScreen';
import Icons from 'react-native-vector-icons/FontAwesome';
import * as colors from '../constants/colors';

const LevelsStack = createStackNavigator(
  {
    LevelsList: { screen: LevelsListScreen },
    Level: { screen: LevelScreen },
  }, 
  {
    initialRouteName: 'LevelsList',
  }
);
const SettingsStack = createStackNavigator(
  {
    Settings: {screen: SettingsScreen}
  }
)

const TabNavigator = createBottomTabNavigator(
  {
    LevelList: { screen: LevelsStack },
    Settings: { screen: SettingsScreen }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'LevelList') {
          iconName = `list-alt`;
        } else if (routeName === 'Settings') {
          iconName = `gears`;
        }
        // You can return any component that you like here!
        return <Icons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: colors.mainContrast,
      inactiveTintColor: 'gray',
    },
  }
);

const AppNavigator = createAppContainer(TabNavigator);

export default AppNavigator;