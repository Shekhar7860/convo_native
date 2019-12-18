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
import { Header } from './Templates/header'
import { string } from "../../utilities/languages/i18n";
import TextFieldInput from "../../components/TextInput";
import { SafeAreaViewCustome } from '../../components/SafeAreaView'
import { Images } from "../../utilities/images";
import Validation from "../../utilities/validations";
import colors from "../../utilities/config/colors";
const { width, height } = Dimensions.get('window')
const addNewConvoLink = '/user/v1/convo'
import * as fetchApi from '../../utilities/ApiMethods'

export default class Addacontact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: '',
            convoTo: '',
            email: '',
            sendInviteValue: false,
            isdropdown: false,
            convoType: '',
            convoId: '',
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
                    !this.state.sendInviteValue ?
                        this.sendInvite(title) : null
                }
                title={title}
            />
        );
    };
    ValidationRules = () => {
        let {
            contact,
            convoType
        } = this.state;
        debugger
        let { lang } = this.props.screenProps.user;
        return [
            {
                field: contact.trim(),
                name: "Contact",
                rules: "required",
                lang: lang
            },
            {
                field: convoType.trim(),
                name: "convoType",
                rules: "required",
                lang: lang
            },
        ];
    };
    sendInvite = () => {
        let {
            convoTo,
            convoId,
            email,
        } = this.state;
        this.setState({ sendInviteValue: true })
        let data = {};
        data["convoTo"] = convoTo;
        data["convoType"] = convoId;
        data["email"] = email;
        let { netStatus } = this.props.screenProps.user;
        let { setToastMessage, setIndicator, loginSignupUser, tokenLogOutUserSuccess } = this.props.screenProps.actions;
        let { toastRef } = this.props.screenProps;
        let validation = Validation.validate(this.ValidationRules());
        if (validation.length != 0) {
            this.setState({ sendInviteValue: false })
            setToastMessage(true, colors.danger);
            return toastRef.show(validation[0].message);
        } else {
            if (!netStatus) {
                this.setState({ sendInviteValue: false })
                setToastMessage(true, colors.danger);
                return toastRef.show(string("NetAlert"));
            } else {
                setIndicator(true)
                fetchApi.createNewConvoUser(addNewConvoLink, data, this.props.screenProps.user.user.accessToken)
                    .then(res => {
                        this.setState({ sendInviteValue: false })
                        debugger
                        if (res.status == 200) {
                            setIndicator(false);
                            setToastMessage(true, "green");
                            toastRef.show("You have successfully add contact", "green");
                            this.props.refreshHome()
                            this.props.navigation.navigate('Dashboard')
                            // this.props.navigation.navigate("HomeNavigatorStack");
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
                        return toastRef.show("Something went wrong", "red");
                    });
                // debugger
                // ..
                Keyboard.dismiss();
                this.setState({ isVisible: true });
            }
        }
    }
    selectCovoType(item, name) {
        this.setState({
            [name]: item.relation,
            convoId: item._id,
            isdropdown: false
        });
    }
    getContact(item) {
        debugger
        this.setState({ contact: item.firstName + ' ' + item.lastName, convoTo: item._id, email: item.email })
    }
    render() {
        return (
            <SafeAreaViewCustome>
                <Text h3 style={{ color: colors.primary, marginTop: 32, alignSelf: 'center' }}>{string("Addacontact")}</Text>
                <View style={{ paddingVertical: 8 }}>
                    <TextFieldInput
                        // label={string('searchConvo')}
                        style={{ width: width - 120, fontSize: 16, color: colors.black }}
                        refs={ref => (this.searchRef = ref)}
                        // selectItem={(item) => this.selectCovoType(item, "convoType")}
                        autoCorrect={false}
                        onPress={() => this.props.navigation.navigate('ContactList', { getBack: (item) => { this.getContact(item) } })}
                        //  this.props.navigation.navigate('ContactList',{getBack:(item)=>{this.getContact(item)}))}
                        // openDropDown={this.state.isdropdown}
                        enablesReturnKeyAutomatically={true}
                        lists={this.state.data}
                        // onFocus={() => this.onFocus("contactFieldFocus")}
                        // onChangeText={text => this.onChangeText(text, "contact")}
                        // onSubmitEditing={event => {
                        //   this.passwordRef.focus();
                        // }}
                        // isFocused={this.state.contactFieldFocus}
                        pointerEvents="none"
                        editable={false}
                        returnKeyType="next"
                        placeholder={string('searchContacts')}
                        placehlderTxtColor
                        value={this.state.contact}
                    // onBlur={() => this.onBlur("searchFieldFocus")}

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
            </SafeAreaViewCustome>
        );
    }
}