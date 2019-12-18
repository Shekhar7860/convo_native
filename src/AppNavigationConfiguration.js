import React from "react";
import { Platform, Easing, Animated, Image } from "react-native";
import {
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";
import { styles } from "./styles";
// Import Navigation Stack
import { AuthNavigatorStack } from "./screens/Auth/AuthNavigationConfiguration";
import { HomeNavigatorStack } from "./screens/Home/HomeNavigationConfiguration";
import { SettingNavigatorStack } from "./screens/Setting/SettingNavigationConfiguration";

// Get Active route to particular screen
const getActiveRouteState = route => {
  if (
    !route.routes ||
    route.routes.length === 0 ||
    route.index >= route.routes.length
  ) {
    return route;
  }
  const childActiveRoute = route.routes[route.index];
  return getActiveRouteState(childActiveRoute);
};

// Hide Tab Bar On Perticular screen
HomeNavigatorStack.navigationOptions = ({ navigation }) => {
  const activeRoute = getActiveRouteState(navigation.state);
  let tabBarVisible = true;
  if (activeRoute.routeName == "Dashboard") {
    tabBarVisible = false;
  } else if (activeRoute.routeName == "QrScan") {
    tabBarVisible = false;
  } else if (activeRoute.routeName == "DeliverInfo") {
    tabBarVisible = false;
  } else if (activeRoute.routeName == "ThankuPage") {
    tabBarVisible = false;
  } else if (activeRoute.routeName == "ChangePassword") {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};

SettingNavigatorStack.navigationOptions = ({ navigation }) => {
  const activeRoute = getActiveRouteState(navigation.state);
  let tabBarVisible = true;
  if (activeRoute.routeName == "ChangePassword") {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};


export const MainNavigator = createSwitchNavigator(
  {
    AuthNavigatorStack: { screen: AuthNavigatorStack },
    HomeNavigatorStack: { screen: HomeNavigatorStack },
    // SettingNavigatorStack:{screen:SettingNavigatorStack}
    // TabNavigator: { screen: TabNavigator }
  },
  {
    initialRouteName: "AuthNavigatorStack",
    transitionConfig: () => ({
      transitionSpec: {
        duration: 200,
        easing: Easing.out(Easing.poly(8)),
        timing: Animated.timing
      }
    }),
    mode: Platform.OS === "ios" ? "modal" : "card",
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

// Main Stack Container
export const AppStack = createAppContainer(MainNavigator);
