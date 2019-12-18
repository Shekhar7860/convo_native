/**
 * Home Screen
 */

import React, { Component, Fragment } from "react";
import {
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    ImageBackground,
    Image
} from "react-native";
import Button from "../../components/Button";
import { styles } from "../../styles"
import Text from "../../components/Text"
import CountryPicker, {
    getAllCountries
} from "react-native-country-picker-modal";
import DeviceInfo from "react-native-device-info";
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet'
import { HeaderBack } from '../Auth/Templates/BackHeader'
import { string } from "../../utilities/languages/i18n"
import TextFieldInput from "../../components/TextInput";
import { SafeAreaViewCustome } from '../../components/SafeAreaView'
import { Images } from "../../utilities/images";
import Validation from "../../utilities/validations";
import colors from "../../utilities/config/colors";
const { width, height } = Dimensions.get('window')
import * as fetchApi from '../../utilities/ApiMethods'
let optionsPic = {
    mediaType: "photo",
    includeBase64: true,
    // compressVideoPreset:0.7
    compressImageQuality: 0.4,
    forceJpg: true,
};
const uploadImageLink = "/app/v1/uploadImage"
const updateProfileLink = "/user/v1/updateProfile"


export default class MyProfile extends Component {
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
            isVisible: false,
            FirstName: "",
            LastName: "",
            Email: "",
            Password: "",
            ConfirmPassword: "",
            PhoneNumber: "",
            confirmPasswordSecureText: true,
            passwordSecureText: true,
            profileImage: '',
            change: false,
            cca2,
            callingCode
        }
    }
    componentDidMount() {
        let userInfo = this.props.screenProps.user.user
        debugger
        this.setState({
            FirstName: userInfo.firstName,
            LastName: userInfo.lastName,
            Email: userInfo.email,
            PhoneNumber: userInfo.phoneNumber ? userInfo.phoneNumber : this.state.PhoneNumber,
            callingCode: userInfo.isoCode ? userInfo.isoCode : this.state.callingCode,
            cca2: userInfo.countryCode ? userInfo.countryCode : this.state.cca2,
            profileImage:userInfo.profileImage?userInfo.profileImage.thumbnail:''
        })
    }
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
                onPress={() =>
                    this.updateProfile(title)
                }
                title={title}
            />
        );
    };
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
        if (Password.trim() !== '' && ConfirmPassword.trim() !== '') {
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
                    field: PhoneNumber,
                    name: "PhoneNumber",
                    rules: "required|numeric|no_space|min:10|max:10",
                    lang: lang
                },
                {
                    field: Email,
                    name: "Email",
                    rules: "required|email|no_space",
                    lang: lang
                },
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
        } else {
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
                    field: PhoneNumber,
                    name: "PhoneNumber",
                    rules: "required|numeric|no_space|min:10|max:10",
                    lang: lang
                },
                {
                    field: Email,
                    name: "Email",
                    rules: "required|email|no_space",
                    lang: lang
                },
            ];
        }

    };
    updateProfile = () => {
        debugger
        let {
            FirstName,
            LastName,
            Email,
            Password,
            callingCode,
            ConfirmPassword,
            PhoneNumber,
            cca2
        } = this.state;
        let data = {};
        data["firstName"] = FirstName;
        data["lastName"] = LastName;
        data["email"] = Email;
        if (Password.trim() != '' && ConfirmPassword.trim() != '') {
            data["password"] = Password;
            data["confirmPassword"] = ConfirmPassword;
        }
        data["phoneNumber"] = PhoneNumber
        data["isoCode"] = callingCode;
        data["countryCode"] = cca2;

        // data["acceptPolicy"] = this.state.isVisible;
        let { netStatus } = this.props.screenProps.user;
        let { setToastMessage, setIndicator, loginSignupUser, updateLoggedUserData, tokenLogOutUserSuccess } = this.props.screenProps.actions;
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
                setIndicator(true);
                if (this.state.change) {
                    this.updateProfileWithImage(data)
                } else {
                    this.updateProfileWithoutImage(data)
                }
            }
        }
    }
    updateProfileWithoutImage(data) {
        let { netStatus } = this.props.screenProps.user;
        delete data['confirmPassword']
        let { setToastMessage, setIndicator, loginSignupUser, updateLoggedUserData, tokenLogOutUserSuccess } = this.props.screenProps.actions;
        let { toastRef } = this.props.screenProps;
        fetchApi.updateProfile(updateProfileLink, data, this.props.screenProps.user.user.accessToken)
            .then(result => {
                setIndicator(false);
                debugger
                if (result.status == 200) {
                    updateLoggedUserData(data)
                    Keyboard.dismiss();
                    this.setState({ isVisible: true });
                    setToastMessage(true, colors.green);
                    return toastRef.show(string("updatesuccessfully"));
                } else if (res.status == 401) {
                    setIndicator(false);
                    tokenLogOutUserSuccess()
                    setTimeout(() => this.props.navigation.navigate('AuthNavigatorStack'), 10)
                    setToastMessage(true, colors.danger);
                    return toastRef.show(res.failure, colors.danger);
                } else {
                    setIndicator(false);
                    setToastMessage(true, colors.danger);
                    return toastRef.show(res.failure, colors.danger);
                }
            })
            .catch(error => {
                setIndicator(false);
                setToastMessage(true, colors.danger);
                return toastRef.show("Something went wrong", colors.danger);
            });
        // }))
    }


    updateProfileWithImage(data) {
        delete data['confirmPassword']
        let { netStatus } = this.props.screenProps.user;
        let { setToastMessage, setIndicator, loginSignupUser, updateLoggedUserData, tokenLogOutUserSuccess } = this.props.screenProps.actions;
        let { toastRef } = this.props.screenProps;
        fetchApi.uploadImage(uploadImageLink, this.state.profileImage, this.props.screenProps.user.user.accessToken)
            .then(result => {
                debugger
                setIndicator(false);
                if (result.status == 200) {
                    data['profileImage'] = result.success
                    fetchApi.updateProfile(updateProfileLink, data, this.props.screenProps.user.user.accessToken)
                        .then(result => {
                            debugger
                            delete data['password']
                            if (result.status == 200) {
                                updateLoggedUserData(data)
                                Keyboard.dismiss();
                                this.setState({ isVisible: true });
                                setToastMessage(true, colors.green);
                                return toastRef.show(string("updatesuccessfully"));
                            } else if (res.status == 401) {
                                setIndicator(false);
                                tokenLogOutUserSuccess()
                                setTimeout(() => this.props.navigation.navigate('AuthNavigatorStack'), 10)
                                setToastMessage(true, colors.danger);
                                return toastRef.show(res.failure, colors.danger);
                            } else {
                                setIndicator(false);
                                setToastMessage(true, colors.danger);
                                return toastRef.show(res.failure, colors.danger);
                            }
                        })
                        .catch(error => {
                            setIndicator(false);
                            setToastMessage(true, colors.danger);
                            return toastRef.show("Something went wrong", colors.danger);
                        });
                    // }))
                } else if (res.status == 401) {
                    setIndicator(false);
                    tokenLogOutUserSuccess()
                    setTimeout(() => this.props.navigation.navigate('AuthNavigatorStack'), 10)
                    setToastMessage(true, colors.danger);
                    return toastRef.show(res.failure, colors.danger);
                } else {
                    setIndicator(false);
                    setToastMessage(true, colors.danger);
                    return toastRef.show(res.failure, colors.danger);
                }
            })
            .catch(error => {
                setIndicator(false);
                setToastMessage(true, colors.danger);
                return toastRef.show("Something went wrong", colors.danger);
            });
    }
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
    selectImage() {
        this.ActionSheet.show()
    }
    openPicker(index) {
        if (index == 0) {
            ImagePicker.openPicker(optionsPic).then(async (response) => {
                this.setState({
                    change: true,
                    profileImage: (Platform.OS == 'ios') ? response.sourceURL : response.path,
                });
            })
        } else {
            ImagePicker.openCamera(optionsPic).then(async (response) => {
                // Same code as in above section!
                debugger
                this.setState({
                    change: true,
                    profileImage: response.path,
                });
            })
        }
    }
    render() {
        return (
            <SafeAreaViewCustome>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS == 'ios' ? "padding" : ''} enabled>
                    <ImageBackground source={Images.appbar} style={{ width: width, paddingHorizontal: 16, paddingVertical: 8 }}>
                        <HeaderBack
                            goBack={() => this.props.navigation.goBack()}
                            rightAction={() => this.props.navigation.navigate('Setting')}
                            title={'Back'}
                            centerTitle={'My Profile'}
                            rightIcon={"ios-more"}
                        />
                    </ImageBackground>
                    <View style={{ flex: 1, paddingHorizontal: 32 }}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <TouchableOpacity onPress={() => this.selectImage()} style={{ marginTop: 32, alignItems: 'center', borderWidth: 5, borderColor: colors.white, }}>
                                <Image source={(this.state.profileImage != '') ? { uri: this.state.profileImage } : Images.backgroundImage} style={{ opacity: 0.7, height: 130, width: 130, borderRadius: 65 }} />
                                <Image source={Images.ic_camera_white} style={{ position: "absolute", top: 53 }} />
                            </TouchableOpacity>
                            <View style={[{ paddingVertical: 8, marginTop: 32 }]}>
                                <TextFieldInput
                                    label={"First Name"}
                                    profile
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
                                    profile
                                    refs={ref => (this.lastNameRef = ref)}
                                    autoCorrect={false}
                                    enablesReturnKeyAutomatically={true}
                                    onFocus={() => this.onFocus("lastNameFieldFocus")}
                                    onChangeText={text => this.onChangeText(text, "LastName")}
                                    onSubmitEditing={event => {
                                        this.phoneRef.focus();
                                    }}
                                    returnKeyType="next"
                                    value={this.state.LastName}
                                    isFocused={this.state.lastNameFieldFocus}
                                    onBlur={() => this.onBlur("lastNameFieldFocus")}
                                />
                            </View>
                            <View style={[{ paddingVertical: 8 }]}>
                                <TextFieldInput
                                    label={"Phone Number"}
                                    profile
                                    refs={ref => (this.phoneRef = ref)}
                                    autoCorrect={false}
                                    enablesReturnKeyAutomatically={true}
                                    onFocus={() => this.onFocus("phoneFieldFocus")}
                                    onChangeText={text => this.onChangeText(text, "PhoneNumber")}
                                    onSubmitEditing={event => {
                                        this.emailRef.focus();
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
                            </View>
                            <View style={[{ paddingVertical: 8 }]}>
                                <TextFieldInput
                                    label={"Email"}
                                    profile
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
                            <View style={[{ paddingVertical: 8, paddingTop: 32 }]}>
                                <TextFieldInput
                                    label={"New Password"}
                                    profile
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
                                    onFocus={() => this.setState({ Password: '' }, () => {
                                        this.onFocus("passwordFieldFocus")
                                    })}
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
                                    profile
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
                                    onFocus={() =>
                                        this.onFocus("confirmPasswordFieldFocus")}
                                    onChangeText={text =>
                                        this.onChangeText(text, "ConfirmPassword")
                                    }
                                    onSubmitEditing={() => Keyboard.dismiss()}
                                    returnKeyType="done"
                                />
                            </View>
                            <View style={{ paddingVertical: 48 }}>
                                {this.renderButton(string('updateProfile'))}
                                <View style={{ paddingVertical: 12 }} />
                            </View>
                        </ScrollView>
                        <ActionSheet
                            ref={o => this.ActionSheet = o}
                            options={['Choose From Library', 'Take Picture', 'Cancel']}
                            cancelButtonIndex={2}
                            destructiveButtonIndex={2}
                            onPress={(index) => { this.openPicker(index) }}
                        />
                    </View>
                </KeyboardAvoidingView>

            </SafeAreaViewCustome>
        );
    }
}