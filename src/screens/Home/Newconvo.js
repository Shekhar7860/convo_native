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
import Addcontact from './AddContact'
import CreateNewContact from './CreateNewConvo'
import * as fetchApi from '../../utilities/ApiMethods'
import colors from "../../utilities/config/colors";
const { width, height } = Dimensions.get('window')

const getRelations = '/app/v1/relations'
export default class CreateConvo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: '',
            isdropdown: false,
            convoType: '',
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
            ],
            initialRender: 1
        }
    }
    componentDidMount() {
        let { setToastMessage, getConvoType, setIndicator, tokenLogOutUserSuccess } = this.props.screenProps.actions
        setIndicator(true)
        let { toastRef } = this.props.screenProps
        let { netStatus } = this.props.screenProps.user;
        if (!netStatus) {
            this.setState({ sendInviteValue: false })
            setToastMessage(true, colors.danger);
            return toastRef.show(string("NetAlert"));
        } else {
            fetchApi.getConvoType(getRelations, this.props.screenProps.user.user.accessToken)
                .then(res => {

                    if (res.status == 200) {
                        setIndicator(false)
                        //   setToastMessage(true, "green");
                        //   toastRef.show("You have successfully login", "green");
                        this.setState({ data: res.success })
                        //   this.props.navigation.navigate("HomeNavigatorStack");
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

                    // this.props.navigation.navigate("HomeNavigatorStack");
                })
                .catch(err => {
                    setIndicator(false)
                    return toastRef.show("Something went wrong", "green");
                });
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
                onPress={() => console.log('')
                    //      this.props.navigation.navigate('DashBoardDelivery', {
                    //     isToast: true
                    // })
                }
                title={title}
            />
        );
    };
    selectCovoType(item, name) {
        this.setState({
            [name]: item.name,
            isdropdown: false
        });
    }
    refreshHome() {
        this.props.navigation.state.params.onNavigatioBack()
    }
    renderView() {
        if (this.state.initialRender == 1) {
            return (
                <Addcontact refreshHome={() => this.refreshHome()} data={this.state.data} screenProps={this.props.screenProps} navigation={this.props.navigation} />
            )
        } else {
            return (
                <CreateNewContact refreshHome={() => this.refreshHome()} data={this.state.data} screenProps={this.props.screenProps} navigation={this.props.navigation} />
            )
        }

    }
    render() {
        return (
            <SafeAreaViewCustome>
                <Header
                    goBack={() => this.props.navigation.goBack()}
                    hideIcon
                    title={string('newConvo')}
                    rightAction={() => this.props.navigation.navigate('Setting')}
                    rightIcon={"ios-more"}
                />
                <View style={{ flex: 1, paddingHorizontal: 32, alignItems: 'center' }}>
                    <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => this.setState({ initialRender: 1 })}
                            style={{ marginRight: 10, paddingHorizontal: 20, borderRadius: 20, paddingVertical: 5, borderWidth: 1, borderColor: colors.primary, backgroundColor: (this.state.initialRender == 1) ? colors.primary : colors.white }}>
                            <Text p style={{ color: (this.state.initialRender == 1) ? colors.white : colors.primary }} >
                                {string("Addcontact")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ initialRender: 2 })}
                            style={{ paddingHorizontal: 20, borderRadius: 20, paddingVertical: 5, borderWidth: 1, borderColor: colors.themeColor, backgroundColor: (this.state.initialRender == 2) ? colors.themeColor : colors.white }}>
                            <Text p style={{ color: (this.state.initialRender == 2) ? colors.white : colors.themeColor }}>
                                {string("Createnew")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {
                        this.renderView()
                    }
                    {/* <View style={{ justifyContent: "flex-end" }}>
                        {this.renderButton("Send Invite")}
                    </View> */}
                    <TouchableOpacity style={styles.homeScreenButton} onPress={() => this.props.navigation.goBack()}>
                        <Image source={Images.ic_Chat_FAB} />
                    </TouchableOpacity>
                </View>
            </SafeAreaViewCustome>
        );
    }
}