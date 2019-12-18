/**
 * Home Screen
 */

import React, { Component, Fragment } from "react";
import {
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Keyboard,
    Image
} from "react-native";
import Button from "../../components/Button";
import { styles } from "../../styles";
import Text from "../../components/Text";
// import firebase from 'react-native-firebase'
import * as fetchApi from '../../utilities/ApiMethods'

import { Header } from './Templates/header'
import { string } from "../../utilities/languages/i18n";
import TextFieldInput from "../../components/TextInput";
import { SafeAreaViewCustome } from '../../components/SafeAreaView'
import { Images } from "../../utilities/images";
import Validation from "../../utilities/validations";
import colors from "../../utilities/config/colors";
const { width, height } = Dimensions.get('window')

const addNewConvoLink = '/user/v1/convo'

export default class CreateNewContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: '',
            isdropdown: false,
            convoType: '',
            convoId: '',
            FirstName: '',
            LastName: '',
            Email: '',
            data: [
                {
                    name: 'Chandan',
                }, {
                    name: 'Amit',
                }, {
                    name: 'Ranjit',
                }, {
                    name: 'Ankit',
                }
            ]
        }
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
                    this.sendInvite(title)
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
            convoType
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
                field: convoType.trim(),
                name: "convoType",
                rules: "required",
                lang: lang
            },
        ];
    };
    sendInvite = () => {
        debugger
        let {
            FirstName,
            LastName,
            Email,
            convoId,
        } = this.state;
        let data = {};
        data["firstName"] = FirstName;
        data["lastName"] = LastName;
        data["email"] = Email;
        data["convoType"] = convoId;
        let { netStatus } = this.props.screenProps.user;
        let { setToastMessage, setIndicator, loginSignupUser, tokenLogOutUserSuccess } = this.props.screenProps.actions;
        let { toastRef } = this.props.screenProps;
        let validation = Validation.validate(this.ValidationRules());
        if (validation.length != 0) {
            setToastMessage(true, colors.danger);
            return toastRef.show(validation[0].message);
        }
        else {
            if (!netStatus) {
                setToastMessage(true, colors.danger);
                return toastRef.show(string("NetAlert"));
            } else {
                setIndicator(true)
                // const link =
                //     new firebase.links.DynamicLink(`https://convo.com?param1=${JSON.stringify(data)}`, 'convos.page.link')
                //         .android.setPackageName('com.convo')
                //         .ios.setBundleId('com.convos');
                // firebase.links()
                //     .createDynamicLink(link)
                //     .then((url) => {
                //         data['appLink'] = url
                //         data['appLink'] = ''

                fetchApi.createNewConvoUser(addNewConvoLink, data, this.props.screenProps.user.user.accessToken)
                    .then(res => {
                        debugger
                        if (res.status == 200) {
                            setIndicator(false);
                            setToastMessage(true, colors.green);
                            toastRef.show("Invitation has been sent sucessfully", "green");
                            this.props.refreshHome()
                            this.props.navigation.navigate('Dashboard');
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
                    .catch(err => {
                        setIndicator(false);
                        setToastMessage(true, colors.danger);
                        return toastRef.show("Something went wrong", colors.danger);
                    });
                // 
                // ...
                // });

                Keyboard.dismiss();
                this.setState({ isVisible: true });
            }
        }
    };
    selectCovoType(item, name) {

        this.setState({
            [name]: item.relation,
            convoId: item._id,
            isdropdown: false
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
    render() {
        return (
            <SafeAreaViewCustome>
                {/* <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}> */}
                <Text h3 style={{ color: colors.primary, marginTop: 32, alignSelf: 'center' }}>{string("Createnew")}</Text>
                <View style={{ paddingVertical: 8 }}>
                    <TextFieldInput
                        // label={string('searchConvo')}
                        style={{ width: width - 120, fontSize: 16 }}
                        refs={ref => (this.firstNameRef = ref)}
                        // selectItem={(item) => this.selectCovoType(item, "convoType")}
                        autoCorrect={false}
                        // onPress={() => this.setState({ isdropdown: !this.state.isdropdown })}
                        // openDropDown={this.state.isdropdown}
                        enablesReturnKeyAutomatically={true}
                        lists={this.state.data}
                        onFocus={() => this.onFocus("firstNameFieldFocus")}
                        onChangeText={text => this.onChangeText(text, "FirstName")}
                        onSubmitEditing={event => {
                            this.lastNameRef.focus();
                        }}
                        isFocused={this.state.firstNameFieldFocus}
                        returnKeyType="next"
                        placeholder={string('firstName')}
                        placehlderTxtColor
                        value={this.state.firstName}
                        onBlur={() => this.onBlur("firstNameFieldFocus")}

                    />
                </View>
                <View style={{ paddingVertical: 8 }}>
                    <TextFieldInput
                        // label={string('searchConvo')}
                        style={{ width: width - 120, fontSize: 16 }}
                        refs={ref => (this.lastNameRef = ref)}
                        // selectItem={(item) => this.selectCovoType(item, "convoType")}
                        autoCorrect={false}
                        // onPress={() => this.setState({ isdropdown: !this.state.isdropdown })}
                        // openDropDown={this.state.isdropdown}
                        enablesReturnKeyAutomatically={true}
                        lists={this.state.data}
                        onFocus={() => this.onFocus("lastNameFieldFocus")}
                        onChangeText={text => this.onChangeText(text, "LastName")}
                        onSubmitEditing={event => {
                            this.emailRef.focus();
                        }}
                        isFocused={this.state.lastNameFieldFocus}

                        returnKeyType="next"
                        placeholder={string('lastName')}
                        placehlderTxtColor
                        value={this.state.lastName}
                        onBlur={() => this.onBlur("lastNameFieldFocus")}

                    />
                </View>
                <View style={{ paddingVertical: 8 }}>
                    <TextFieldInput
                        // label={string('searchConvo')}
                        style={{ width: width - 120, fontSize: 16 }}
                        refs={ref => (this.emailRef = ref)}
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        lists={this.state.data}
                        onFocus={() => this.onFocus("EmailFieldFocus")}
                        onChangeText={text => this.onChangeText(text, "Email")}
                        onSubmitEditing={event => {
                            //   this.passwordRef.focus();
                        }}
                        isFocused={this.state.EmailFieldFocus}

                        returnKeyType="next"
                        placeholder={string('Email')}
                        placehlderTxtColor
                        value={this.state.Email}
                        onBlur={() => this.onBlur("EmailFieldFocus")}

                    />
                </View>
                <View style={{ paddingVertical: 8 }}>
                    <TextFieldInput
                        // label={string('searchConvo')}
                        style={{ width: width - 120, fontSize: 16, color: colors.black }}
                        refs={ref => (this.searchRef = ref)}
                        selectItem={(item) => this.selectCovoType(item, "convoType")}
                        autoCorrect={false}
                        onPress={() => this.setState({ isdropdown: !this.state.isdropdown })}
                        openDropDown={this.state.isdropdown}
                        enablesReturnKeyAutomatically={true}
                        lists={this.props.data}
                        pointerEvents="none"

                        rightIcon={"arrow-drop-down"}
                        editable={false}
                        // onFocus={() => this.onFocus("searchFieldFocus")}
                        // onChangeText={text => this.onChangeText(text, "search")}
                        // onSubmitEditing={event => {
                        //   this.passwordRef.focus();
                        // }}
                        // isFocused={this.state.searchFieldFocus}

                        returnKeyType="next"
                        placeholder={string('convoType')}
                        placehlderTxtColor
                        value={this.state.convoType}
                    // onBlur={() => this.onBlur("searchFieldFocus")}

                    />
                </View>
                <View style={{ justifyContent: "flex-end", marginVertical: 20 }}>
                    {this.renderButton("Send Invite")}
                </View>
                {/* <TouchableOpacity style={styles.homeScreenButton} onPress={() => this.props.navigation.navigate('StackNavigator')}>
                    <Image source={Images.ic_Add} />
                </TouchableOpacity> */}
                {/* </ScrollView> */}
            </SafeAreaViewCustome>
        );
    }
}
