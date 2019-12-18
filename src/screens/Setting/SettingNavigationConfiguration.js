'use strict'
import {
  createAppContainer,
    createStackNavigator,
} from 'react-navigation';
import { Easing, Animated } from 'react-native'
import Setting from './Setting';
import ChangePassword from './ChangePassword'

export const SettingNavigator = createStackNavigator({
    Setting: { screen: Setting},
    ChangePassword :{screen:ChangePassword}

},{
  initialRouteName:'Setting',
  headerMode:'none',
  mode:'modal',
  transitionConfig: () => ({
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(8)),
      timing: Animated.timing,
    }
  })
})
export const SettingNavigatorStack = createAppContainer(SettingNavigator)
