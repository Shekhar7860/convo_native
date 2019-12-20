"use strict";
// React
import React, { Fragment } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform
} from "react-native";

// Navigation
import { AppStack } from "./AppNavigationConfiguration";
//Redux
import { connect } from "react-redux"; // Redux
import { bindActionCreators } from "redux";
import SplashScreen from 'react-native-splash-screen'
import firebase from 'react-native-firebase'

//Actions
import * as userActions from "./redux/actions/userActions";
import * as todoActions from "./redux/actions/todoActions";
import Indicator from './components/Indicator'
//Components
import Toast from "./components/Toast";

import { styles } from './styles'
class AppNavigation extends React.Component {
  static socket;
  constructor(props) {
    super(props);
    this.state = {
      isShowToast: false
    }
    this._bootStrapApp()
  }
  async componentDidMount() {
    // const enabled = await firebase.messaging().hasPermission();
    // if (enabled) {
    //   // user has permissions
    // } else {
    //   firebase.messaging().requestPermission()
    //     .then(() => {
    //       // User has authorised  
    //     })
    //     .catch(error => {
    //       // User has rejected permissions  
    //     });
    //   // user doesn't have permission
    // }

    const channel = new firebase.notifications.Android.Channel('insider', 'insider channel', firebase.notifications.Android.Importance.Max)
    firebase.notifications().android.createChannel(channel);
    this.checkPermission();
    this.createNotificationListeners();
  }


  async getToken() {
    // let fcmToken = await AsyncStorage.getItem('fcmToken');
    // if (!fcmToken) {
    //     fcmToken = await firebase.messaging().getToken();
    //     if (fcmToken) {
    //         // await AsyncStorage.setItem('fcmToken', fcmToken);
    //     }
    // }
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    firebase.notifications().onNotification(notification => {
     console.log("my notification")
      notification.android.setChannelId('insider').setSound('default')
     firebase.notifications().displayNotification(notification)
    });
  }


  _bootStrapApp = () => {
    (Platform.OS == 'android') ? SplashScreen.hide() : null;
  }
  /*********** Toast Method  *******************/
  showMessage = (text, color) => {

    this.setState(
      { errorMessage: text, errorColor: color, isShowToast: true },
      () => this.closeToast()
    );
  };
  closeToast = () => {
    setTimeout(
      () =>
        this.setState({
          isShowToast: false
        }),
      2000
    );
  };
  render() {
    return (
      <Fragment>
        {
          Platform.OS == 'ios' && <StatusBar barStyle="dark-content" translucent />
        }
        {this.props.loader && <Indicator />}

        <AppStack
          screenProps={{
            ...this.props,
            toastRef: { show: (text, color) => this.showMessage(text, color) },
          }}
        />
        {this.state.isShowToast && (
          <Toast
            message={this.state.errorMessage}
            color={this.props.errorColor}
          />
        )}
      </Fragment>
    );
  }
}

// Dispatch Store Method
const mapStateToProps = state => {
  return {
    user: state.user,
    errorColor: state.user.errorColor,
    loader: state.user.loader

  };
};
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(userActions, dispatch),
    todoActions: bindActionCreators(todoActions, dispatch),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppNavigation);
