/**
 * Home Screen
 */

import React, { Component, Fragment } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
  Image,
  Dimensions
} from "react-native";
import Button from "../../components/Button";
import { styles } from "../../styles";
import Text from "../../components/Text";
import { Images } from '../../utilities/images'
const { width, height } = Dimensions.get("window");
import colors from "../../utilities/config/colors";
import { HeaderBack } from '../Auth/Templates/BackHeader'
import { string } from '../../utilities/languages/i18n'

import { SafeAreaViewCustome } from '../../components/SafeAreaView'

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: [{
        name: 'Convos',
        icon: require('../../assets/images/thin0632SecurityLock.png')
      },
      {
        name: 'My profile',
        icon: require('../../assets/images/thin0040ExitLogoutDoorEmergencyOutside.png')
      },
      {
        name: 'Logout',
        icon: require('../../assets/images/thin0040ExitLogoutDoorEmergencyOutside.png')
      }
      ]
    };
  }
  /************ Log Out function  ***************/
  logout = () => {
    let { toastRef } = this.props.screenProps;
    let { logOutUserSuccess, setIndicator, setToastMessage } = this.props.screenProps.actions;
    let { netStatus, user } = this.props.screenProps.user;
    if (!netStatus) {
      return toastRef.show(string('NetAlert'))
    } else {
      let data = {}
      setIndicator(true)
      logOutUserSuccess().then((res) => {
        if (res) {
          setIndicator(false)
          setToastMessage(true, 'green')
          toastRef.show('Log out successfully')
          setTimeout(() => this.props.navigation.navigate('AuthNavigatorStack'), 10)
        } else {
          setToastMessage(true, colors.danger)
          toastRef.show('Something wrong')
        }
      }).catch((err) => {
        setIndicator(false)
      })
    }
  }
  confirmLogOutUserDialoge = () => {
    return Alert.alert(
      '',
      `Are you sure want to log out?`,
      [
        { text: 'Close', onPress: () => null, style: 'cancel', },
        {

          text: 'Ok',
          onPress: () => {
            this.logout()
          }
        }
      ],
      { cancelable: false }
    )
  }
  /************ Log Out function  ***************/
  pressButton = (title) => {
    if (title == 'Sign out') {
      this.confirmLogOutUserDialoge()
    } else if (title == 'Change Password') {
      this.props.navigation.navigate('ChangePassword')
    }
  }
  action(index) {
    if (index == 0) {
      this.props.navigation.navigate('HomeNavigatorStack')
    } else if (index == 1) {
      this.props.navigation.navigate('Dashboard')
    } else if (index == 2) {
      this.confirmLogOutUserDialoge()
    }
  }
  renderSettingList = () => {
    return this.state.settings.map((res, index) => {
      return <TouchableOpacity onPress={() => this.action(index)}
      >
        <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center', paddingVertical: 8 }}>
          <Text h3 style={[styles.WsRegular, {
            color: colors.white
          }]}>
            {res.name}
          </Text>
        </View>
      </TouchableOpacity>
    })
  }
  render() {
    return (
      <ImageBackground
        source={Images.backgroundImage}
        style={{ flex: 1 }}>
        <SafeAreaViewCustome style={{ flex: 1 }}>
          <View style={{ flex: 1, paddingHorizontal: 16 }}>
            <View style={{
              height: 10
            }} />
            <HeaderBack
              goBack={() => this.setState({ isVisible: !this.state.isVisible })}
              title={'Back'}
              centerTitle={'Menu'}
              rightIcon={"ios-more"}
            />
            <ScrollView
              style={{ flex: 1, paddingTop: 8, paddingHorizontal: 16 }}
              showsVerticalScrollIndicator={false}
            >
              <View style={{ alignItems: 'center', zIndex: 1, paddingTop: 24 }}>
                <Image source={Images.ic_userplaceholder} style={{ height: 130, width: 130, borderRadius: 65, }} />
              </View>
              <View style={{ height: 20 }} />

              {this.renderSettingList()}
            </ScrollView>
            <View style={{ justifyContent: "center", alignItems: 'center' }}>
              <Text h2 style={{ color: colors.white }}>
                {string("CONVOS")}
              </Text>
              <Text h5 style={{ color: colors.white, fontSize: 14, letterSpacing: 2 }}>
                {string("LETSTALK")}
              </Text>
              <Text p style={{ color: colors.white, fontSize: 14, marginTop: 8 }}>
                {string("allrightsreserved")}
              </Text>
              <Text p style={{ color: colors.white, fontSize: 14 }}>
                {string("V1")}
              </Text>
            </View>
            <View style={{
              height: 24
            }} />

          </View>
        </SafeAreaViewCustome>
      </ImageBackground>
    );
  }
}
