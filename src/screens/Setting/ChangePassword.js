/**
 * Signup Screen
 */

import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
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
import Validation from "../../utilities/validations";
import { string } from "../../utilities/languages/i18n";

import { Header } from "../Auth/Templates/BackHeader";
import { SafeAreaViewCustome } from "../../components/SafeAreaView";
export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
    oldPasswordSecureText:true,
    newPasswordSecureText:true,
    confirmPasswordSecureText:true
 };
    this.checkUserIsLoggedIn();
  }
  ValidationRules = () => {
    let { oldPassword,newPassword ,confirmPassword} = this.state;
    let { lang } = this.props.screenProps.user;
    return [
      {
        field: oldPassword,
        name: 'OldPassword',
        rules: 'required|no_space',
        lang: lang?lang:'en'
      },
      {
        field: newPassword,
        name: 'New Password',
        rules: 'required|no_space',
        lang: lang?lang:'en'
      },
      {
        field: confirmPassword,
        name: 'Confrim New Password',
        rules: 'required|no_space',
        lang: lang?lang:'en'
      }
    ];
  };
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
      errors: { ...this.state.errors, [name]: false }
    });
  };
  SignIn = () => {
    let { OldPassword } = this.state;
    let { netStatus } = this.props.screenProps.user;
    let {
      setToastMessage,
      setLoggedUserData,
      setIndicator
    } = this.props.screenProps.actions;
    let { toastRef } = this.props.screenProps;
    let validation = Validation.validate(this.ValidationRules());
    if (validation.length != 0) {
      setToastMessage(true, colors.danger);
      return toastRef.show(validation[0].message);
    } else {
      if (!netStatus) {
        return toastRef.show(string("NetAlert"));
      } else {
       
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
        fontSize={18}
        color={"#FFFFFF"}
        onPress={() => this.SignIn()}
        title={title}
      />
    );
  };
  render() {
    let { errors } = this.state;
    return (
      <SafeAreaViewCustome>
        <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 8 }}>
          <Header
            goBack={() => this.props.navigation.goBack()}
            title={"Back"}
          />
          <ScrollView showsVerticalScrollIndicator={false}> 
          <View style={{height:25}}/>
          <View style={{ flex: 1, justifyContent: "flex-start", }}>
            <View style={{ flex: 0.2, alignItems: "flex-start" }}>
              <Text h4 style={[styles.RalewayBold]}>
                Change Password 
              </Text>
            </View>
            <View style={{height:20}}/>

            <View style={[{ paddingVertical: 8 }]}>
              <TextFieldInput
                refs={ref => (this.passwordRef = ref)}
                secureTextEntry={this.state.oldPasswordSecureText}
                onShowPassword={() =>
                  this.setState({
                    oldPasswordSecureText: !this.state.oldPasswordSecureText
                  })
                }
                autoCapitalize="none"
                placeholder={"Old Password"}
                autoCorrect={false}
                value={this.state.oldPassword}
                enablesReturnKeyAutomatically={true}
                clearTextOnFocus={true}
                showPassword
                isFocused={this.state.oldPasswordFieldFocus}
                // onBlur={() => this.onBlur('passwordFieldFocus')}
                onFocus={() => this.onFocus("oldPasswordFieldFocus")}
                onChangeText={text => this.onChangeText(text, "oldPassword")}
                onSubmitEditing={() => {
                  this.newPasswordRef.focus();
                }}
                returnKeyType="next"
              />
            </View>
            <View style={[{ paddingVertical: 8 }]}>
              <TextFieldInput
                refs={ref => (this.newPasswordRef = ref)}
                secureTextEntry={this.state.newPasswordSecureText}
                onShowPassword={() =>
                  this.setState({
                    newPasswordSecureText: !this.state.newPasswordSecureText
                  })
                }
                autoCapitalize="none"
                placeholder={"New Password"}
                autoCorrect={false}
                value={this.state.newPassword}
                enablesReturnKeyAutomatically={true}
                clearTextOnFocus={true}
                showPassword
                isFocused={this.state.newPasswordFieldFocus}
                // onBlur={() => this.onBlur('passwordFieldFocus')}
                onFocus={() => this.onFocus("newPasswordFieldFocus")}
                onChangeText={text => this.onChangeText(text, "newPassword")}
                onSubmitEditing={() => {
                  this.confirmPasswordRef.focus();
                }}
                returnKeyType="next"
              />
            </View>
            <View style={[{ paddingVertical: 8 }]}>
              <TextFieldInput
                refs={ref => (this.confirmPasswordRef = ref)}
                secureTextEntry={this.state.confirmPasswordSecureText}
                onShowPassword={() =>
                  this.setState({
                    confirmPasswordSecureText: !this.state
                      .confirmPasswordSecureText
                  })
                }
                autoCapitalize="none"
                placeholder={"Confirm Password"}
                autoCorrect={false}
                value={this.state.confirmPassword}
                enablesReturnKeyAutomatically={true}
                clearTextOnFocus={true}
                showPassword
                isFocused={this.state.confirmPasswordFieldFocus}
                // onBlur={() => this.onBlur('passwordFieldFocus')}
                onFocus={() => this.onFocus("confirmPasswordFieldFocus")}
                onChangeText={text =>
                  this.onChangeText(text, "confirmPassword")
                }
                onSubmitEditing={() => {
                  Keyboard.dismiss()
                }}
                returnKeyType="done"
              />
            </View>
            
          </View>
          <View style={{ height: 85 }} />
            {this.renderButton("CHANGE PASSWORD")}
          </ScrollView>

        </View>

      </SafeAreaViewCustome>
    );
  }
}
