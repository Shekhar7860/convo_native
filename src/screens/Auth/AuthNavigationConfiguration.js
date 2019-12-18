"use strict";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import { Easing, Animated } from "react-native";

import Signup from "./Signup";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import ThanksRegistration from "./ThanksRegistration";

const AuthStack = createStackNavigator(
  {
    Signup: { screen: Signup},
    Login: { screen: Login},
    ForgotPassword: { screen: ForgotPassword},
  },
  {
    initialRouteName: "Login",
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);
const SwitchStack = createSwitchNavigator(
  {
    AuthStack: { screen: AuthStack},
    ThanksRegistration: { screen: ThanksRegistration},
  },
  {
    initialRouteName: "AuthStack",
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

export const AuthNavigator = createStackNavigator(
  {
    SwitchStack: { screen: SwitchStack },
  },
  {
    initialRouteName: "SwitchStack",
    headerMode: "none",
    mode: "card",
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(8)),
        timing: Animated.timing
      }
    })
  }
);

export const AuthNavigatorStack = createAppContainer(AuthNavigator);
