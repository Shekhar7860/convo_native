/**
 * Signup Screen
 */

import React, { Component } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Image,
  ImageBackground,
  Platform
} from "react-native";
import CountryPicker, {
  getAllCountries
} from "react-native-country-picker-modal";
// Components
import Ionicons from "react-native-vector-icons/Ionicons";
import DeviceInfo from "react-native-device-info";

import TextFieldInput from "../../components/TextInput";
import { normalize } from "../../utilities/helpers/normalizeText";
import Button from "../../components/Button";
import colors from "../../utilities/config/colors";
import Text from "../../components/Text";
import CustomModal from "../../components/Modal";
import { SafeAreaViewCustome } from "../../components/SafeAreaView";
import Validation from "../../utilities/validations";
import { string } from "../../utilities/languages/i18n";
import { Images } from '../../utilities/images'
import { styles } from "../../styles";
const NORTH_AMERICA = ["CA", "MX", "US"];
const signupLink = '/user/v1/register'
export default class Signup extends Component {
  constructor(props) {
    super(props);
    let userLocaleCountryCode = DeviceInfo.getDeviceCountry();
    const userCountryData = getAllCountries()
      .filter(country => country.cca2 === userLocaleCountryCode)
      .pop();
    let callingCode = null;
    let cca2 = userLocaleCountryCode;
    if (!cca2 || !userCountryData) {
      cca2 = "US";
      callingCode = "1";
    } else {
      callingCode = userCountryData.callingCode;
    }
    this.state = {
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
      PhoneNumber: "",
      isVisible: false,
      confirmPasswordSecureText: true,
      passwordSecureText: true,
      cca2,
      callingCode
    };
    this.checkUserIsLoggedIn();
  }
  // Validation rule
  ValidationRules = () => {
    let {
      FirstName,
      LastName,
      Email,
      PhoneNumber,
      Password,
      ConfirmPassword
    } = this.state;
    let { lang } = this.props.screenProps.user;
    return [
      {
        field: FirstName.trim(),
        name: "FirstName",
        rules: "required",
        lang: lang
      },
      {
        field: LastName.trim(),
        name: "LastName",
        rules: "required",
        lang: lang
      },
      {
        field: Email,
        name: "Email",
        rules: "required|email|no_space",
        lang: lang
      },
      // {
      //   field: PhoneNumber,
      //   name: "PhoneNumber",
      //   rules: "required|numeric|no_space|min:10|max:10",
      //   lang: lang
      // },

      {
        field: Password,
        name: "Password",
        rules: "required|no_space",
        lang: lang
      },
      {
        field: ConfirmPassword,
        name: "ConfirmPassword",
        rules: "required|no_space",
        lang: lang
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
      [name]: true
    });
  };
  onBlur = name => {
    this.setState({
      [name]: false
    });
  };
  pressButton = title => {
    if (title == "ACCEPT") {
      this.closeModal();
      this.setRegisterUser();
    } else {
      this.SignUp();
    }
  };
  setRegisterUser = () => {
    let {
      FirstName,
      LastName,
      Email,
      Password,
      // callingCode,
      ConfirmPassword,
      // PhoneNumber
    } = this.state;
    let {
      setToastMessage,
      setIndicator,
      setLoggedUserData,
      loginSignupUser
    } = this.props.screenProps.actions;
    let { toastRef } = this.props.screenProps;
    let data = {};
    data["firstName"] = FirstName;
    data["lastName"] = LastName;
    data["email"] = Email;
    data["password"] = Password;
    // data["confirmPassword"] = ConfirmPassword;
    // data["phoneNumber"] = PhoneNumber;
    // data["callingCode"] = callingCode;
    // data["acceptPolicy"] = this.state.isVisible;
    debugger
    setLoggedUserData(signupLink, data)
      .then(res => {
        setIndicator(false);
        setToastMessage(true, "green");
        toastRef.show("You have successfully register", "green");
        // this.props.navigation.navigate("ThanksRegistration");
      })
      .catch(err => {
        setIndicator(false);
        return toastRef.show("Something went wrong", "green");
      });
  };
  SignUp = () => {
    let {
      FirstName,
      LastName,
      Email,
      Password,
      ConfirmPassword,
    } = this.state;
    let data = {};
    data["firstName"] = FirstName;
    data["lastName"] = LastName;
    data["email"] = Email;
    data["password"] = Password;
    let { netStatus } = this.props.screenProps.user;
    let { setToastMessage, setIndicator, loginSignupUser } = this.props.screenProps.actions;
    let { toastRef } = this.props.screenProps;
    let validation = Validation.validate(this.ValidationRules());
    if (validation.length != 0) {
      setToastMessage(true, colors.danger);
      return toastRef.show(validation[0].message);
    } else if (Password != ConfirmPassword) {
      setToastMessage(true, colors.danger);
      return toastRef.show(string("Confirmpassowrdnotmatched"));
    } else {
      if (!netStatus) {
        setToastMessage(true, colors.danger);
        return toastRef.show(string("NetAlert"));
      } else {
        setIndicator(true)
        loginSignupUser(signupLink, data)
          .then(res => {
            debugger
            if (res.status == 200) {
              setIndicator(false);
              setToastMessage(true, colors.green);
              toastRef.show(string("Youhavesuccessfullyregister"), "green");
              this.props.navigation.navigate("HomeNavigatorStack");
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
            setIndicator(false);
            setToastMessage(true, colors.danger)
            return toastRef.show(string("Somethingwentwrong"), colors.danger);
          });
        Keyboard.dismiss();
        this.setState({ isVisible: true });
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
        backColor
        color={colors.themeColor}
        onPress={() => this.pressButton(title)}
        title={title}
      />
    );
  };
  closeModal = () => {
    this.setState({
      isVisible: false
    });
  };
  
  render() {
    let { errors } = this.state;
    return (
      <SafeAreaViewCustome>
        <ImageBackground
          source={Images.backgroundImage}
          style={{ flex: 1, paddingHorizontal: 16 }}>
          <View style={{ flex: 1, paddingHorizontal: 32 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ height: 24 }} />
              <View style={{ alignItems: "center", marginBottom: 16 }}>
                <Image source={Images.ic_logo_big} />
              </View>
              <View style={{ marginBottom: 24 }}>
                <Text h4 textAlign style={{ color: colors.white, }}>{string('createanaccount')}</Text>

              </View>
              {/* <View style={{ height: "3%" }} /> */}

              <View style={[{ paddingVertical: 8 }]}>
                <TextFieldInput
                  label={"First Name"}
                  refs={ref => (this.firstNameRef = ref)}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onFocus={() => this.onFocus("firstNameFieldFocus")}
                  onChangeText={text => this.onChangeText(text, "FirstName")}
                  onSubmitEditing={event => {
                    this.lastNameRef.focus();
                  }}
                  returnKeyType="next"
                  value={this.state.FirstName}
                  isFocused={this.state.firstNameFieldFocus}
                  onBlur={() => this.onBlur("firstNameFieldFocus")}
                />
              </View>
              <View style={[{ paddingVertical: 8 }]}>
                <TextFieldInput
                  label={"Last Name"}
                  refs={ref => (this.lastNameRef = ref)}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onFocus={() => this.onFocus("lastNameFieldFocus")}
                  onChangeText={text => this.onChangeText(text, "LastName")}
                  onSubmitEditing={event => {
                    this.emailRef.focus();
                  }}
                  returnKeyType="next"
                  value={this.state.LastName}
                  isFocused={this.state.lastNameFieldFocus}
                  onBlur={() => this.onBlur("lastNameFieldFocus")}
                />
              </View>

              <View style={[{ paddingVertical: 8 }]}>
                <TextFieldInput
                  label={"Email"}
                  refs={ref => (this.emailRef = ref)}
                  autoCorrect={false}
                  enablesReturnKeyAutomatically={true}
                  onFocus={() => this.onFocus("emailFieldFocus")}
                  onChangeText={text => this.onChangeText(text, "Email")}
                  onSubmitEditing={event => {
                    this.passwordRef.focus();
                  }}
                  returnKeyType="next"
                  value={this.state.Email}
                  isFocused={this.state.emailFieldFocus}
                  onBlur={() => this.onBlur("emailFieldFocus")}
                />
              </View>
              {/* <View style={[{ paddingVertical: 8 }]}>
              <TextFieldInput
                label={"Phone Number"}
                refs={ref => (this.phoneRef = ref)}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={() => this.onFocus("phoneFieldFocus")}
                onChangeText={text => this.onChangeText(text, "PhoneNumber")}
                onSubmitEditing={event => {
                  this.passwordRef.focus();
                }}
                setState={value => {
                  this.setState({
                    cca2: value.cca2,
                    callingCode: value.callingCode
                  });
                }}
                callingCode={this.state.callingCode}
                cca2={this.state.cca2}
                returnKeyType="next"
                value={this.state.PhoneNumber}
                isFocused={this.state.phoneFieldFocus}
                onBlur={() => this.onBlur("phoneFieldFocus")}
              />
            </View> */}
              <View style={[{ paddingVertical: 8 }]}>
                <TextFieldInput
                  label={"Password"}
                  refs={ref => (this.passwordRef = ref)}
                  secureTextEntry={this.state.passwordSecureText}
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={this.state.Password}
                  enablesReturnKeyAutomatically={true}
                  clearTextOnFocus={true}
                  showPassword
                  isFocused={this.state.passwordFieldFocus}
                  onShowPassword={() =>
                    this.setState({
                      passwordSecureText: !this.state.passwordSecureText
                    })
                  }
                  onBlur={() => this.onBlur("passwordFieldFocus")}
                  onFocus={() => this.onFocus("passwordFieldFocus")}
                  onChangeText={text => this.onChangeText(text, "Password")}
                  onSubmitEditing={event => {
                    this.confirmPasswordRef.focus();
                  }}
                  returnKeyType="next"
                  maxLength={20}
                />
              </View>

              <View style={[{ paddingVertical: 8 }]}>
                <TextFieldInput
                  label={"Confirm Password"}
                  refs={ref => (this.confirmPasswordRef = ref)}
                  secureTextEntry={this.state.confirmPasswordSecureText}
                  onShowPassword={() =>
                    this.setState({
                      confirmPasswordSecureText: !this.state
                        .confirmPasswordSecureText
                    })
                  }
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={this.state.ConfirmPassword}
                  enablesReturnKeyAutomatically={true}
                  clearTextOnFocus={true}
                  showPassword
                  isFocused={this.state.confirmPasswordFieldFocus}
                  onBlur={() => this.onBlur("confirmPasswordFieldFocus")}
                  onFocus={() => this.onFocus("confirmPasswordFieldFocus")}
                  onChangeText={text =>
                    this.onChangeText(text, "ConfirmPassword")
                  }
                  onSubmitEditing={() => Keyboard.dismiss()}
                  returnKeyType="done"
                />
              </View>
              <View style={{ paddingVertical: 48 }}>
                {this.renderButton(string('createmyaccount'))}
                <View style={{ paddingVertical: 12 }} />

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Login")}
                  style={{ alignSelf: "center" }}
                >
                  <View>
                    <Text h5 style={{ color: colors.white }}>
                      {string('Ihavealreadyaccount')}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
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
            </ScrollView>
            {/* {this.state.isVisible && this.renderPrivacyModal()} */}
          </View>
        </ImageBackground>
      </SafeAreaViewCustome>
    );
  }
}
