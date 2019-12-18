/**
 * Home Screen
 */

import React, { Component, Fragment } from "react";
import {
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    FlatList,
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
import * as fetchApi from '../../utilities/ApiMethods'

import Validation from "../../utilities/validations";
import colors from "../../utilities/config/colors";
const { width, height } = Dimensions.get('window')
const fetchUserLink = '/app/v1/users'
export default class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: '',
            isdropdown: false,
            indicator1: false,
            convoType: '',
            skip: 0,
            count: 0,
            limit: 10,
            data: []
        }
    }

    componentDidMount() {
        this.fetchData(this.state.contact, this.state.skip, this.state.limit)
    }

    fetchData(seacth, skip, limit) {
        let { netStatus } = this.props.screenProps.user;
        let { setToastMessage, setIndicator, loginSignupUser,tokenLogOutUserSuccess } = this.props.screenProps.actions;
        let { toastRef } = this.props.screenProps;
        if (!netStatus) {
            setToastMessage(true, colors.danger);
            return toastRef.show(string("NetAlert"));
        } else {
            setIndicator(true)
            fetchApi.getUserList(fetchUserLink, seacth, skip, limit, this.props.screenProps.user.user.accessToken)
                .then(res => {
                    debugger
                    if (res.status == 200) {
                        setIndicator(false);
                        if (skip == 0) {
                            this.setState({ data: res.success.data, count: res.success.count, indicator1: false })
                        } else {
                            this.setState({ data: this.state.data.concat(res.success.data), count: res.success.count, indicator1: false })
                        }
                        // setToastMessage(true, "green");
                        // toastRef.show("You have successfully created", "green");
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
                    return toastRef.show("Something went wrong", "red");
                });
        }
    }

    selectCovoType(item, name) {
        this.setState({
            [name]: item.name,
            isdropdown: false
        });
    }
    getBack(item) {
        this.props.navigation.state.params.getBack(item)
        this.props.navigation.goBack()
    }
    convoListUsers = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => this.getBack(item)} style={{ width: width - 64, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.grey3 }} >
                <Text style={{ fontSize: 14 }}>{item.firstName + ' ' + item.lastName}</Text>
            </TouchableOpacity>
        )
    }
    onChangeText = (text, name) => {
        this.setState({
            [name]: text,
        }, () => {
            this.fetchData(text, 0, this.state.limit)
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
    paginationFunction() {
        let { setToastMessage, setIndicator } = this.props.screenProps.actions
        debugger
        if (this.state.indicator1 == false) {
            if (this.state.data.length < this.state.count) {
                // skip = this.state.data.length
                this.setState({ skip: this.state.data.length,indicator1:true  }, () => {
                    this.fetchData(this.state.contact, this.state.skip, this.state.limit);
                })
            }
        }
    }
    render() {
        return (
            <SafeAreaViewCustome>
                <Header
                    goBack={() => this.props.navigation.goBack()}
                    hideIcon
                    title={string('Addacontact')}
                    rightAction={()=>this.props.navigation.navigate('Setting')}
                    rightIcon={"ios-more"}
                />
                <View style={{ flex: 1, paddingHorizontal: 32, alignItems: 'flex-start' }}>
                    {/* <Text h3 style={{ color: colors.primary, marginTop: 32, alignSelf: 'center' }}>{string("Addacontact")}</Text> */}
                    <View style={{ paddingVertical: 8 }}>
                        <TextFieldInput
                            style={{ width: width - 120, fontSize: 16 }}
                            refs={ref => (this.searchRef = ref)}
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onFocus={() => this.onFocus("contactFieldFocus")}
                            onChangeText={text => this.onChangeText(text, "contact")}
                            returnKeyType="next"
                            placeholder={string('searchContacts')}
                            placehlderTxtColor
                            value={this.state.contact}
                            onBlur={() => this.onBlur("contactFieldFocus")}
                        />
                    </View>
                    <View style={{ paddingVertical: 8 }}>
                        <FlatList
                            style={{ flex: 1 }}
                            extraData={this.state.data}
                            data={this.state.data}
                            renderItem={this.convoListUsers}
                            onEndReachedThreshold={0.5}
                            showsVerticalScrollIndicator={false}
                            onEndReached={({ distanceFromEnd }) => this.paginationFunction()}
                        />
                    </View>
                    {/* <View style={{ justifyContent: "flex-end", marginVertical: 20 }}>
                    {this.renderButton("Send Invite")}
                </View> */}
                    <TouchableOpacity style={[styles.homeScreenButton, { alignSelf: 'center' }]} onPress={() => this.props.navigation.navigate('Dashboard')}>
                        <Image source={Images.ic_Chat_FAB} />
                    </TouchableOpacity>
                </View>
            </SafeAreaViewCustome>
        );
    }
}