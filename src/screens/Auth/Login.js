/**
 * Signup Screen
 */

import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  ImageBackground,
  Platform,
  Image,
  Dimensions
} from "react-native";
import DeviceInfo from "react-native-device-info";

// Components
import TextFieldInput from "../../components/TextInput";
import { normalize } from "../../utilities/helpers/normalizeText";
import { SafeAreaViewCustome } from "../../components/SafeAreaView";

import Button from "../../components/Button";
import colors from "../../utilities/config/colors";
import Validation from '../../utilities/validations';
import { string } from '../../utilities/languages/i18n'
import { Images } from '../../utilities/images'
import Text from "../../components/Text";
import { styles } from "../../styles";

import { Colors } from "react-native/Libraries/NewAppScreen";
const { height } = Dimensions.get("window");
const loginurl = '/user/v1/login'
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Password: "",
      passwordSecureText: true,

    };
    this.checkUserIsLoggedIn();

  }
  ValidationRules = () => {
    let { Email, Password } = this.state;
    let { lang } = this.props.screenProps.user;
    return [
      {
        field: Email,
        name: 'Email',
        rules: 'required|email|no_space',
        lang: lang ? lang : 'en'
      },
      {
        field: Password,
        name: 'Password',
        rules: 'required|no_space',
        lang: lang ? lang : 'en'
      }
    ]
  }
  checkUserIsLoggedIn = () => {
    let { setToastMessage, setLoggedUserData, setIndicator } = this.props.screenProps.actions
    setIndicator(false)
    let { user } = this.props.screenProps.user;
    if (user) {
      if (user.accessToken) {
        this.props.navigation.navigate('HomeNavigatorStack')
      } else {
        // this.props.navigation.navigate('ThanksRegistration')
      }
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
      errors: { ...this.state.errors, [name]: true }
    });
  };
  onBlur = name => {
    this.setState({
      [name]: false
    });
  };
  SignIn = () => {
    let { Email, Password } = this.state;
    let { netStatus } = this.props.screenProps.user;
    let { setToastMessage, setLoggedUserData, setIndicator, loginSignupUser } = this.props.screenProps.actions
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
        let data = {};
        data["email"] = Email;
        data["password"] = Password;
        // data["acceptPolicy"] = Password;
        loginSignupUser(loginurl, data)
          .then(res => {
            if (res.status == 200) {
              setIndicator(false)
              setToastMessage(true, colors.green);
              toastRef.show(string("Youhavesuccessfullylogin"), colors.green);
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

            // this.props.navigation.navigate("HomeNavigatorStack");
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
          alignItems: "center",
        }}
        fontSize={18}
        backColor
        color={colors.themeColor}
        onPress={() => this.SignIn()}
        title={title}
      />
    );
  };
  render() {
    let { errors } = this.state;
    return (
      <SafeAreaViewCustome>

        <ImageBackground
          source={Images.backgroundImage}
          style={{ flex: 1, paddingHorizontal: 32 }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }} showsVerticalScrollIndicator={false}>
              {/* <View style={{ height: 24 }} /> */}

              <View style={{ flex: 0.8, justifyContent: "center",marginTop:24 }}>

                <View style={{ alignItems: "center", marginBottom: 16 }}>
                  <Image source={Images.ic_logo_big} />
                </View>
                <Text h3 textAlign style={{ color: colors.white, }}>{string('Login')}</Text>
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
                </View>
                <View style={[{ paddingVertical: 8 }]}>
                  <TextFieldInput
                    label={string('Password')}
                    refs={ref => (this.passwordRef = ref)}
                    secureTextEntry={this.state.passwordSecureText}
                    onShowPassword={() => this.setState({
                      passwordSecureText: !this.state.passwordSecureText
                    })}
                    autoCapitalize="none"
                    // placeholder={"Password"}
                    autoCorrect={false}
                    value={this.state.Password}
                    enablesReturnKeyAutomatically={true}
                    clearTextOnFocus={true}  // comment this you want to close label when empty
                    showPassword
                    isFocused={this.state.passwordFieldFocus}
                    // onBlur={() => this.onBlur('passwordFieldFocus')}
                    onFocus={() => this.onFocus("passwordFieldFocus")}
                    onBlur={() => this.onBlur("passwordFieldFocus")}
                    isFocused={this.state.passwordFieldFocus}
                    onChangeText={text => this.onChangeText(text, "Password")}
                    onSubmitEditing={() => Keyboard.dismiss()}
                    returnKeyType="done"
                  />
                </View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("ForgotPassword")}
                  style={{ alignItems: "flex-end", paddingTop: 12 }}
                >
                  <Text h5 style={{ color: colors.white, fontSize: 16 }}>
                    {string('Forgotyourpassword')}

                  </Text>
                </TouchableOpacity>
                <View style={{ height: 16 }} />

                <View style={{ justifyContent: "flex-end" }}>
                  {this.renderButton("LOGIN")}
                </View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Signup")}
                  style={{ alignSelf: "center", paddingVertical: 16 }}
                >
                  <Text h5 style={{ color: colors.white }}>
                    {string('Register')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.2, marginTop: 40, alignItems: 'center' }}>
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

            {/* <View style={{ height: height >= 812 && Platform.OS == 'ios' ? 32 : 16 }} /> */}
          </View>

        </ImageBackground>
      </SafeAreaViewCustome>



      // <SafeAreaViewCustome>
      //   <ImageBackground
      //     source={Images.backgroundImage}
      //     style={{ flex: 1, paddingHorizontal: 16 }}>
      //     <View style={{ flex: 1, paddingHorizontal: 32, }}>
      //       <ScrollView contentContainerStyle={{ justifyContent: 'center', flex: 1 }} showsVerticalScrollIndicator={false}>
      //         <View style={{ height: 24 }} />
      //         <View style={{flex:0.8,justifyContent:'center'}}>

      //           <View style={{ alignItems: "center", marginBottom: 16 }}>
      //             <Image source={Images.ic_logo_big} />
      //           </View>
      //           {/* <View style={{ height: "3%" }} /> */}
      //           <Text h3 textAlign style={{ color: colors.white, }}>{string('Login')}</Text>
      //           <View style={[{ paddingVertical: 8 }]}>
      //             <TextFieldInput
      //               label={string('Email')}
      //               refs={ref => (this.emailRef = ref)}
      //               autoCorrect={false}
      //               enablesReturnKeyAutomatically={true}
      //               onFocus={() => this.onFocus("EmailFieldFocus")}
      //               onChangeText={text => this.onChangeText(text, "Email")}
      //               onSubmitEditing={event => {
      //                 this.passwordRef.focus();
      //               }}
      //               isFocused={this.state.EmailFieldFocus}

      //               returnKeyType="next"
      //               // placeholder={"Email"}
      //               value={this.state.Email}
      //               onBlur={() => this.onBlur("EmailFieldFocus")}

      //             />
      //           </View>
      //           <View style={[{ paddingVertical: 8 }]}>
      //             <TextFieldInput
      //               label={string('Password')}
      //               refs={ref => (this.passwordRef = ref)}
      //               secureTextEntry={this.state.passwordSecureText}
      //               onShowPassword={() => this.setState({
      //                 passwordSecureText: !this.state.passwordSecureText
      //               })}
      //               autoCapitalize="none"
      //               // placeholder={"Password"}
      //               autoCorrect={false}
      //               value={this.state.Password}
      //               enablesReturnKeyAutomatically={true}
      //               clearTextOnFocus={true}  // comment this you want to close label when empty
      //               showPassword
      //               isFocused={this.state.passwordFieldFocus}
      //               // onBlur={() => this.onBlur('passwordFieldFocus')}
      //               onFocus={() => this.onFocus("passwordFieldFocus")}
      //               onBlur={() => this.onBlur("passwordFieldFocus")}
      //               isFocused={this.state.passwordFieldFocus}
      //               onChangeText={text => this.onChangeText(text, "Password")}
      //               onSubmitEditing={() => Keyboard.dismiss()}
      //               returnKeyType="done"
      //             />
      //           </View>
      //           <TouchableOpacity
      //             onPress={() => this.props.navigation.navigate("ForgotPassword")}
      //             style={{ alignItems: "flex-end", paddingTop: 12 }}
      //           >
      //             <Text h5 style={{ color: colors.white, fontSize: 16 }}>
      //               {string('Forgotyourpassword')}

      //             </Text>
      //           </TouchableOpacity>
      //           <View style={{ height: 16 }} />

      //           <View style={{ justifyContent: "flex-end" }}>
      //             {this.renderButton("LOGIN")}
      //           </View>
      //           <TouchableOpacity
      //             onPress={() => this.props.navigation.navigate("Signup")}
      //             style={{ alignSelf: "center", paddingVertical: 16 }}
      //           >
      //             <Text h5 style={{ color: colors.white }}>
      //               {string('Register')}
      //             </Text>
      //           </TouchableOpacity>
      //         </View>


      //       </ScrollView>
      //       <View style={{ position:'absolute',bottom:20, alignItems: 'center' }}>
      //           <Text h2 style={{ color: colors.white }}>
      //             {string("CONVOS")}
      //           </Text>
      //           <Text h5 style={{ color: colors.white, fontSize: 14, letterSpacing: 2 }}>
      //             {string("LETSTALK")}
      //           </Text>
      //           <Text p style={{ color: colors.white, fontSize: 14, marginTop: 8 }}>
      //             {string("allrightsreserved")}
      //           </Text>
      //           <Text p style={{ color: colors.white, fontSize: 14 }}>
      //             {string("V1")}
      //           </Text>
      //         </View>
      //       {/* {this.state.isVisible && this.renderPrivacyModal()} */}
      //     </View>
      //   </ImageBackground>
      // </SafeAreaViewCustome>


    );
  }
}
