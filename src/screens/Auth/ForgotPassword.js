/**
 * Signup Screen
 */

import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  Platform
} from "react-native";

// Components
import TextFieldInput from "../../components/TextInput";
import { normalize } from "../../utilities/helpers/normalizeText";
import Button from "../../components/Button";
import colors from "../../utilities/config/colors";
import Text from "../../components/Text";
import { styles } from "../../styles";
import Validation from '../../utilities/validations';
import { string } from '../../utilities/languages/i18n'
import * as fetchApi from '../../utilities/ApiMethods'
import { HeaderBack } from './Templates/BackHeader'
import { SafeAreaViewCustome } from '../../components/SafeAreaView'
import { Images } from "../../utilities/images";
var forgoturl = '/user/v1/forget_password'
export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: ""
    };
    this.checkUserIsLoggedIn();
  }
  ValidationRules = () => {
    let { Email } = this.state;
    let { lang } = this.props.screenProps.user;
    return [
      {
        field: Email,
        name: 'Email',
        rules: 'required|email|no_space',
        lang: lang ? lang : 'en'
      },
    ]
  }
  checkUserIsLoggedIn = () => {
    let { user } = this.props.screenProps.user;
    if (user && user.Username) {
      // this.props.navigation.navigate('Login')
    }
  };
  onChangeText = (text, name) => {
    this.setState({
      [name]: text
    });
  };
  onFocus = name => {
    this.setState({
      [name]: true,
      errors: { ...this.state.errors, [name]: false }
    });
  };
  SignIn = () => {
    let { Email } = this.state;
    let data = {};
    data["email"] = Email;
    let { netStatus } = this.props.screenProps.user;
    let { setToastMessage, setLoggedUserData, setIndicator } = this.props.screenProps.actions
    let { toastRef } = this.props.screenProps
    let validation = Validation.validate(this.ValidationRules());
    if (validation.length != 0) {
      setToastMessage(true, colors.danger)
      return toastRef.show(validation[0].message)
    }
    else {
      if (!netStatus) {
        return toastRef.show(string('NetAlert'))
      } else {
        setIndicator(true)
       fetchApi.forgotPassword(forgoturl, data)
          .then(res => {
            debugger
            if (res.status == 200) {
              setToastMessage(true, "green");
              toastRef.show("Reset link successfuly sent to your email", "green");
              this.props.navigation.goBack();
              setIndicator(false)
            } else if (res.status == 401) {
              setIndicator(false);
              setToastMessage(true, colors.danger)
              return toastRef.show(res.failure, colors.danger);
            } else {
              setIndicator(false);
              setToastMessage(true, colors.danger)
              return toastRef.show(res.failure, colors.danger);
            }
          })
          .catch(err => {
            setIndicator(false)
            setToastMessage(true, colors.danger)
            return toastRef.show(string("Somethingwentwrong"), colors.danger);
          });
      }
    }
  };
  renderButton = title => {
    return (
      <Button
        buttonStyle={{
          height: 48,
          justifyContent: "center",
          alignItems: "center"
        }}
        backColor
        fontSize={18}
        color={colors.themeColor}
        onPress={() => this.SignIn()}
        title={title}
      />
    );
  };
  onBlur = name => {
    this.setState({
      [name]: false
    });
  };
  render() {
    let { errors } = this.state;
    return (
      <SafeAreaViewCustome>
        <ImageBackground
          source={Images.backgroundImage}
          style={{ flex: 1 }}>
          <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 8 }}>
            <HeaderBack
              goBack={() => this.props.navigation.goBack()}
              title={'Back'}
            />
            <View style={{ flex: 1, justifyContent: "center" }}>
              <View style={{ flex: 0.3, alignItems: "flex-start" }}>
                <Text h4 style={[styles.RalewayBold,{color:colors.white}]}>
                  {string('ForgotPassword')}
                </Text>
              </View>
              <View style={{ alignItems: "flex-start" }}>
                <Text p tyle={[styles.WSRegular,{color:colors.white}]}>
                  {`Please enter your email to forgot password reset link`}
                </Text>
              </View>
              <View style={{ height: "10%" }} />
              <View style={[{ paddingVertical: 8 }]}>
                <TextFieldInput
                  label={string('Email')}
                  refs={ref => (this.emailRef = ref)}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onFocus={() => this.onFocus("EmailFieldFocus")}
                  onChangeText={text => this.onChangeText(text, "Email")}
                  onSubmitEditing={event => {
                    this.passwordRef.focus();
                  }}
                  isFocused={this.state.EmailFieldFocus}

                  returnKeyType="next"
                  // placeholder={"Email"}
                  value={this.state.Email}
                  onBlur={() => this.onBlur("EmailFieldFocus")}

                />
                {/* <TextFieldInput
                  // label={"Email"}
                  refs={ref => (this.emailRef = ref)}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onFocus={() => this.onFocus("Email")}
                  onChangeText={text => this.onChangeText(text, "Email")}
                  onSubmitEditing={event => {
                    Keyboard.dismiss()
                  }}
                  returnKeyType="done"
                  placeholder={"Email"}
                  value={this.state.Email}
                /> */}
              </View>
            </View>
            <View style={{ height: "10%" }} />

            <View style={{ flex: 0.1, justifyContent: "flex-start" }}>
              {this.renderButton(string("FORGOT"))}
            </View>
            <View style={{ height: "4%" }} />

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Signup")}
              style={{ flex: 0.6, alignSelf: "center", paddingVertical: 16 }}
            >
              {/* <Text p style={{ color: colors.primary }}>
                Register
          </Text> */}
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </SafeAreaViewCustome>
    );
  }
}
