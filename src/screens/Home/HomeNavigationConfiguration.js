"use strict";
import { createAppContainer, createStackNavigator, createSwitchNavigator } from "react-navigation";
import { Easing, Animated } from "react-native";
import Dashboard from "./Dashboard";
import CreateConvo from "./Newconvo";
import AddContact from "./AddContact";
import CreatenNewConvo from "./CreateNewConvo";
import ContactList from "./ContactList";
import ViewConvoProfile from "./ViewConvoProfile"
import GiftedChatModule from "./ChatModule"


import Setting from "./Setting"
import MyProfile from "./MyProfile"

export const StackNavigator = createStackNavigator(
  {
    Dashboard: { screen: Dashboard },
    CreateConvo: { screen: CreateConvo },
    AddContact: { screen: AddContact },
    CreatenNewConvo: { screen: CreatenNewConvo },
    ContactList: { screen: ContactList },
    ViewConvoProfile: { screen: ViewConvoProfile },
    GiftedChatModule: { screen: GiftedChatModule },
    Setting: { screen: Setting },
    MyProfile: { screen: MyProfile }
  },
  {
    initialRouteName: "Dashboard",
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false,
    }
  }
);


const SwitchStack = createSwitchNavigator(
  {
    Dashboard: { screen: Dashboard },
    StackNavigator: { screen: StackNavigator },
  },
  {
    initialRouteName: "Dashboard",
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false,
    }
  }
);
export const HomeNavigator = createStackNavigator(
  {
    SwitchStack: { screen: SwitchStack },
  },
  {
    initialRouteName: "SwitchStack",
    headerMode: "none",
    mode: "card",
    navigationOptions: {
      gesturesEnabled: false,

    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(8)),
        timing: Animated.timing
      }
    })
  }
);

export const HomeNavigatorStack = createAppContainer(HomeNavigator);
