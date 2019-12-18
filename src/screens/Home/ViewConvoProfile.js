/**
 * Home Screen
 */

import React, { Component, Fragment } from "react";
import {
    View,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    TextInput,
    Dimensions,
    Keyboard,
    ImageBackground,
    Image,
    FlatList,
    Platform
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import Button from "../../components/Button";
import { styles } from "../../styles"
import Text from "../../components/Text"
import { Header } from './Templates/header'
import { HeaderBack } from '../Auth/Templates/BackHeader'
import { string } from "../../utilities/languages/i18n"
import CustomModal from "../../components/Modal";
import { SafeAreaViewCustome } from '../../components/SafeAreaView'
import { Images } from "../../utilities/images";
import Validation from "../../utilities/validations";
import colors from "../../utilities/config/colors";
const { width, height } = Dimensions.get('window')
const addNewConvoLink = '/user/v1/convo'
import * as fetchApi from '../../utilities/ApiMethods'
// import { FlatList } from "react-native-gesture-handler";
let submitAnswerIndex = null
const getAddQuestionlink = '/user/v1/question'
const sendAnswerLink = '/user/v1/question_answer'
export default class ViewConvoProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: [],
            isVisible: false,
            question: '',
            skip: 0,
            count: 0,
            indicator1: false,
            limit: 10,
            data: this.props.navigation.state.params.data,
            chatWindow: [
                { name: string('Createyourownquestionfor') },
            ],
            questions: []
        }
    }
    componentDidMount() {
        this.fetchData(this.state.skip, this.state.limit)
    }
    fetchData(skip, limit) {
        debugger
        let { netStatus } = this.props.screenProps.user;
        let { setToastMessage, setIndicator, loginSignupUser,tokenLogOutUserSuccess } = this.props.screenProps.actions;
        let { toastRef } = this.props.screenProps;
        if (!netStatus) {
            setToastMessage(true, colors.danger);
            return toastRef.show(string("NetAlert", colors.danger));
        } else {
            // setIndicator(true)
            let convoId = (this.state.data && this.state.data._id) ? this.state.data._id : ''
            fetchApi.getQuestionList(getAddQuestionlink, convoId, skip, limit, this.props.screenProps.user.user.accessToken)
                .then(res => {
                    debugger
                    if (res.status == 200) {
                        setIndicator(false);
                        if (skip == 0) {
                            this.setState({ questions: res.success.data, count: res.success.count, indicator1: false })
                        } else {
                            this.setState({ questions: this.state.questions.concat(res.success.data), count: res.success.count, indicator1: false })
                        }
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
        }
    }
    renderButton = title => {
        return (
            <Button
                buttonStyle={{
                    height: 32,
                    width: width - (width - 140),
                    justifyContent: "center",
                    alignItems: "center"
                }}
                fontSize={16}
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
            question,
            answer
        } = this.state;
        debugger
        let { lang } = this.props.screenProps.user;
        if (question.trim() != '') {
            return [
                {
                    field: question.trim(),
                    name: "Question",
                    rules: "required",
                    lang: lang
                },
            ];
        } else if (answer.length) {
            return [
                {
                    field: answer[submitAnswerIndex].trim(),
                    name: "Answer",
                    rules: "required",
                    lang: lang
                },
            ];

        } else {
            return [
                {
                    field: '',
                    name: "Answer",
                    rules: "required",
                    lang: lang
                },
            ];
        }

    }
    addQuestion = () => {
        debugger
        let {
            question,
        } = this.state;
        let data = {};
        data["text"] = question;
        let { netStatus } = this.props.screenProps.user;
        let { setToastMessage, setIndicator, loginSignupUser,tokenLogOutUserSuccess } = this.props.screenProps.actions;
        let { toastRef } = this.props.screenProps;
        let validation = Validation.validate(this.ValidationRules());
        if (validation.length != 0) {
            setToastMessage(true, colors.danger);
            return toastRef.show(validation[0].message);
        } else {
            if (!netStatus) {
                setToastMessage(true, colors.danger);
                return toastRef.show(string("NetAlert"));
            } else {
                data['convoId'] = (this.state.data && this.state.data && this.state.data._id) ? this.state.data._id : ''
                data['questionTo'] = (this.state.data && this.state.data.convoTo && this.state.data.convoTo._id) ? this.state.data.convoTo._id : ''
                fetchApi.addQuestion(getAddQuestionlink, data, this.props.screenProps.user.user.accessToken)
                    .then(res => {
                        debugger
                        if (res.status == 200) {
                            setIndicator(false);
                            setToastMessage(true, colors.danger);
                            this.state.questions.push(res.success)
                            this.setState({ question: '' })
                            this.props.navigation.state.params.onNavigatioBack()
                            setToastMessage(true, colors.green);

                            return toastRef.show(string("Questionadded", colors.green));
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
                Keyboard.dismiss();
                this.setState({ isVisible: false });
            }
        }
    }
    sendAnswer = (id, text, index) => {
        debugger
        let {
            answer,
        } = this.state;
        let data = {};
        data["text"] = text;
        submitAnswerIndex = index
        let { netStatus } = this.props.screenProps.user;
        let { setToastMessage, setIndicator, loginSignupUser,tokenLogOutUserSuccess } = this.props.screenProps.actions;
        let { toastRef } = this.props.screenProps;
        let validation = Validation.validate(this.ValidationRules());
        if (validation.length != 0) {
            setToastMessage(true, colors.danger);
            return toastRef.show(validation[0].message);
        } else {
            if (!netStatus) {
                setToastMessage(true, colors.danger);
                return toastRef.show(string("NetAlert"));
            } else {
                data['convoId'] = (this.state.data && this.state.data && this.state.data._id) ? this.state.data._id : ''
                data['questionId'] = id
                fetchApi.sendAnswer(sendAnswerLink, data, this.props.screenProps.user.user.accessToken)
                    .then(res => {
                        debugger
                        if (res.status == 200) {
                            setIndicator(false);
                            this.props.navigation.state.params.onNavigatioBack()
                            this.state.questions[submitAnswerIndex].unAnsweredQuestion=false
                            // .splice(submitAnswerIndex, 1)
                            this.setState({ answer: [] }, () => {
                            })
                            setToastMessage(true, colors.green);
                            return toastRef.show(string('answerSuccessfully'), colors.danger);
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
                        return toastRef.show(string("Somethingwentwrong"), colors.danger);
                    });
                Keyboard.dismiss();
            }
        }
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
    closeModal = () => {
        this.setState({
            isVisible: false
        });
    };
    renderNotificationModal = () => {
        return (

            <CustomModal
                isVisible={this.state.isVisible}
                closeModal={() => this.closeModal()}
            >
                <KeyboardAvoidingView style={styles.modalRadius} behavior={(Platform.OS == 'ios') ? "padding" : ''} enabled>
                    <HeaderBack
                        goBack={() => this.setState({ isVisible: !this.state.isVisible })}
                        title={'Back'}
                    />
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }} >
                        {/* <View style={{ height: "5%" }} /> */}

                        <View style={{ marginVertical: 16, alignItems: 'center', paddingHorizontal: 24 }}>
                            {/* <TouchableOpacity onPress={() => this.setState({ isVisible: !this.state.isVisible })}>
                                <Image source={Images.ic_add_white} />
                            </TouchableOpacity> */}
                            <Text h4 style={{ color: colors.white, marginTop: 16 }}>{string('Createyourownquestionfor')}</Text>
                        </View>
                        <View style={{ alignItems: 'center', zIndex: 1, }}>
                            <Image source={(this.state.data.convoTo && this.state.data.convoTo.profileImage &&
                                        this.state.data.convoTo.profileImage.thumbnail) ? {uri:this.state.data.convoTo.profileImage.thumbnail} : Images.ic_userplaceholder} style={{ height: 130, width: 130, borderWidth: 5, borderColor: colors.white, borderRadius: 65, backgroundColor: colors.white }} />
                        </View>
                        <View style={{ zIndex: 0, backgroundColor: colors.white, height: height - (height - 375), borderRadius: 32, marginTop: -65, alignItems: 'center' }}>
                            <Text h4 style={{ color: colors.primary, paddingTop: 70, marginBottom: 16 }}>{this.state.data.convoTo.firstName + this.state.data.convoTo.lastName}</Text>
                            <TextInput
                                style={{
                                    height: height - (height - 264),
                                    width: width - 32,
                                    borderRadius: 30,
                                    fontSize: 14,
                                    borderTopWidth: 1,
                                    borderColor: colors.grey6,
                                    paddingHorizontal: 24,
                                    paddingTop: 10,
                                    paddingBottom: 10
                                }}
                                blurOnSubmit={false}
                                textAlignVertical={'top'}
                                multiline={true}
                                // {...this.props}
                                placeholder={string('Typeyourquestionhere')}
                                placeholderTextColor={colors.grey6}
                                value={this.state.question}
                                onChangeText={(text) => { this.setState({ question: text }) }}
                            />
                        </View>
                        <View style={{ backgroundColor: colors.white, marginTop: -15, borderWidth: 2, borderColor: colors.primary, borderRadius: 24, overflow: 'hidden' }}>
                            <TouchableOpacity onPress={() =>
                                this.addQuestion()
                            } style={{ backgroundColor: colors.white, paddingHorizontal: 24, paddingVertical: 4, alignItems: 'center' }}>
                                <Text h4 style={{ color: colors.primary, fontSize: 16 }}>{string("submit")}</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
            </CustomModal >
        );
    };
    chatWindowList = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('GiftedChatModule', { question: item })} style={{ paddingVertical: 8, justifyContent: 'space-between', paddingHorizontal: 16, flexDirection: 'row' }}>
                <Text h4 style={{ color: colors.primary, marginRight: 8 }}>{item.text.trim()}</Text>
                <Ionicons name="ios-arrow-forward" size={28} color={colors.grey3} />
            </TouchableOpacity>
        )
    }
    questionList = ({ item, index }) => {
        let userId = this.props.screenProps.user.user._id
        return (
            <View>
                {userId == item.questionFrom || !item.unAnsweredQuestion ? <View /> : <View style={{ alignItems: 'center', paddingVertical: 12 }}>
                    <Text h5 style={{ color: colors.primary, marginBottom: 16 }}>{item.text}</Text>
                    <View >
                        <TextInput
                            style={{
                                height: 150,
                                width: width - 64,
                                borderRadius: 30,
                                fontSize: 14,
                                borderWidth: 1,
                                borderColor: colors.grey6,
                                paddingHorizontal: 24,
                                paddingTop: 10,
                                paddingBottom: 10
                            }}
                            blurOnSubmit={false}
                            textAlignVertical={'top'}
                            multiline={true}
                            editable={userId == item.questionFrom ? false : true}
                            // {...this.props}
                            placeholder={string('Typeyouranswerhere')}
                            placeholderTextColor={colors.grey6}
                            value={this.state.answer[index]}
                            onChangeText={(text) => {
                                let answer = this.state.answer;
                                answer[index] = text;
                                this.setState({ answer }, () => {
                                    console.log(this.state, "this.statthis.stat")

                                })
                            }}
                        />
                    </View>
                    <TouchableOpacity onPress={() =>
                        userId == item.questionFrom ? null : this.sendAnswer(item._id, this.state.answer[index], index)
                    } style={{ marginTop: -17, backgroundColor: colors.primary, paddingHorizontal: 24, paddingVertical: 8, borderRadius: 24 }}>
                        <Text h4 style={{ color: colors.white, fontSize: 16 }}>{string("saveanswer")}</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('GiftedChatModule')} style={{ paddingVertical: 8, alignItems: 'center' }}>
                <Text h4 style={{ color: colors.primary, }}>{item.text}</Text>
            </TouchableOpacity> */}
                </View>
                }
            </View>


        )
    }
    render() {
        return (
            <SafeAreaViewCustome>
                <KeyboardAvoidingView style={{ flex: 1, alignItems: "center" }} behavior={(Platform.OS == 'ios') ? "padding" : ''} enabled>
                    <ScrollView >
                        <View style={{ flex: 1, alignItems: 'center', }}>
                            <ImageBackground
                                source={Images.backgroundImage}
                                style={{ height: 110, width: width, marginBottom: 80 }}>
                                <Header
                                    goBack={() => this.props.navigation.goBack()}
                                    // title={string('newConvo')}
                                    backTitle={'Back'}
                                    heightSet
                                    rightAction={() => this.props.navigation.navigate('Setting')}
                                    rightIcon={"ios-more"}
                                />
                                <View style={{ position: 'absolute', top: 50 }}>
                                    <Image source={(this.state.data.convoTo && this.state.data.convoTo.profileImage &&
                                        this.state.data.convoTo.profileImage.thumbnail) ? {uri:this.state.data.convoTo.profileImage.thumbnail} : Images.ic_userplaceholder} style={{ borderWidth: 5, borderColor: colors.white, height: 130, width: 130, borderRadius: 65, left: width / 2 - 65 }} />
                                </View>
                            </ImageBackground>
                            <Text h3 style={{ color: colors.primary }}>{this.state.data.convoTo.firstName + ' ' + this.state.data.convoTo.lastName}</Text>
                            <Text p style={{ color: colors.grey3, fontSize: 14 }}>last responded on 8/12/19 @ 3:43pm</Text>
                            <TouchableOpacity style={{ marginVertical: 16 }} onPress={() => this.setState({ isVisible: !this.state.isVisible })}>
                                <Image source={Images.ic_add_blue} />
                            </TouchableOpacity>
                            <FlatList
                                extraData={this.state}
                                data={this.state.questions}
                                // onRefresh={() => this.onRefresh()}
                                renderItem={this.questionList}
                                showsVerticalScrollIndicator={false}
                            // onEndReachedThreshold={0.2}
                            // onEndReached={({ distanceFromEnd }) => this.paginationFunction()}
                            />

                            <FlatList
                                style={{ width: width, marginTop: 32, borderTopWidth: 1, borderColor: colors.grey3, paddingHorizontal: -16 }}
                                extraData={this.state}
                                data={this.state.questions}
                                // onRefresh={() => this.onRefresh()}
                                renderItem={this.chatWindowList}
                                showsVerticalScrollIndicator={false}
                            // onEndReachedThreshold={0.2}
                            // onEndReached={({ distanceFromEnd }) => this.paginationFunction()}
                            />

                        </View>
                    </ScrollView>
                    <TouchableOpacity style={[styles.homeScreenButton]} onPress={() => this.props.navigation.goBack()}>
                        <Image source={Images.ic_Chat_FAB} />
                    </TouchableOpacity>
                    {this.state.isVisible && this.renderNotificationModal()}

                </KeyboardAvoidingView>
            </SafeAreaViewCustome>
        );
    }
}