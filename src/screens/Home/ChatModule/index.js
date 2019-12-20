import React from "react";
import {
  ImageBackground,
  Dimensions,
  Platform,
  Image,
  KeyboardAvoidingView,
  Linking,
  Text,
  TouchableOpacity
} from "react-native";
import {
  Bubble,
  GiftedChat,
  SystemMessage
} from "../../../lib/react-native-gifted-chat";
import moment from "moment";
import SocketIOClient from "socket.io-client";
import uuid from "uuid";
import { BASE_URL } from "../../../utilities/contsants";
import { SafeAreaViewCustome } from "../../../components/SafeAreaView";
import { HeaderBack } from "../../Auth/Templates/BackHeader";
import { View } from "react-native-animatable";
import CustomActions from "./CustomActions";
import { styles } from "../../../styles";
import TextCustom from "../../../components/Text";
import colors from "../../../utilities/config/colors";
import * as fetchApi from "../../../utilities/ApiMethods";

import CustomView from "./CustomView";
import { Images } from "../../../utilities/images";
const { width, height } = Dimensions.get("window");

const getChatListLink = "/user/v1/question_answer";
const uploadImageLink = "/app/v1/uploadImage";

let questionObject = {
  day: "Question of the day",
  question: "What is one of your earliest memories?"
};
let earlierMessages = [];

export default class GiftedChatModule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inverted: false,
      step: 0,
      messages: [],
      loadEarlier: true,
      skip: 0,
      limit: 10,
      typingText: null,
      isLoadingEarlier: false,
      question:
        this.props.navigation.state &&
        this.props.navigation.state.params &&
        this.props.navigation.state.params.question
    };
    _isMounted = false;
    socket = SocketIOClient(
      `${BASE_URL}?id=` + this.props.screenProps.user.user._id
    );

    // socket.on('socketConnected', (id) => {
    //   console.log(id, 'response from server')
    //   data = id
    // })
    socket.on("newMessage", response => {
      console.log(response, "messageRecieved");
      this.messageRecieved(response);
    });
  }

  componentDidMount() {
    this._isMounted = true;
    // init with only system messages
    this.fetchData(this.state.skip, this.state.limit);

    // this.setState({
    //   messages: messagesData, // messagesData.filter(message => message.system),
    //   appIsReady: true,
    // })
  }

  fetchData = (skip, limit) => {
    // this.setState({ visible: true })
    let { netStatus } = this.props.screenProps.user;
    let {
      setToastMessage,
      setIndicator,
      loginSignupUser,
      tokenLogOutUserSuccess
    } = this.props.screenProps.actions;
    let { toastRef } = this.props.screenProps;
    if (!netStatus) {
      setToastMessage(true, colors.danger);
      return toastRef.show(string("NetAlert", colors.danger));
    } else {
      fetchApi
        .getChatList(
          getChatListLink,
          this.state.question._id,
          skip,
          limit,
          this.props.screenProps.user.user.accessToken
        )
        .then(result => {
          if (result.status == 200) {
            let newArray = [];
            if (result.success.data.length < 10) {
              this.setState({ loadEarlier: false });
            }
            for (let i = 0; i < result.success.data.length; i++) {
              let newMessage = {};
              newMessage._id = result.success.data[i]._id;
              newMessage.createdAt = new Date(result.success.data[i].createdAt);
              newMessage.sent = true;
              // newMessage.received = result.success.message[i].isDelivered
              newMessage.user = {
                _id: result.success.data[i].userId._id,
                name: result.success.data[i].userId.firstName,
                avatar: result.success.data[i].userId.profileImage.thumbnail
              };
              newMessage.reactions = result.success.data[i].reactions;
              if (result.success.data[i].messageType == "TEXT") {
                newMessage.text = result.success.data[i].text;
              } else if (result.success.data[i].messageType == "IMAGE") {
                newMessage.image = result.success.data[i].image.thumbnail;
              } else if (result.success.data[i].messageType == "VIDEO") {
                newMessage.video = result.success.data[i].video.thumbnail;
              } else if (result.success.data[i].messageType == "FILE") {
                newMessage.file = result.success.data[i].file.fileUrl;
              } else if (result.success.data[i].messageType == "AUDIO") {
                newMessage.audio = result.success.data[i].audio.audiourl;
              }
              newArray.push(newMessage);
              // seenMessages = newArray
            }
            this.setState({ messages: newArray, visible: false }),
              console.log(this.state.messages);
          } else if (res.status == 401) {
            setIndicator(false);
            tokenLogOutUserSuccess();
            setTimeout(
              () => this.props.navigation.navigate("AuthNavigatorStack"),
              10
            );
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
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  messageRecieved(response) {
    debugger;
    let newMessage = {};
    newMessage._id = response.msg._id;
    newMessage.createdAt = new Date(response.msg.createdAt);
    newMessage.sent = true;
    newMessage.user = {
      _id: response.msg.user._id,
      name: response.msg.user.name,
      avatar: response.msg.user.avatar
    };
    newMessage.reactions = response.msg.reactions;
    if (response.msg.messageType == "TEXT") {
      newMessage.text = response.msg.message;
    } else if (response.msg.messageType == "IMAGE") {
      newMessage.image = response.msg.image.thumbnail;
    } else if (response.msg.messageType == "VIDEO") {
      newMessage.video = response.msg.video.thumbnail;
    } else if (response.msg.messageType == "AUDIO") {
      newMessage.audio = response.msg.audio.audiourl;
    }
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, newMessage)
    }));
    // if (this.state.messages.length > 10) {
    //   this.setState({ loadEarlier: true })
    // }
    // console.error("value  ",response)
    // let recievedData = { messageId: response._id, senderId: response.senderId._id }
    // let recievedData = { messageId: response._id, senderId: response.senderId._id }
    // console.error(response.data.socketId)

    // this.emitRecievedMessageAck(recievedData)
  }
  onLoadEarlier = () => {
    this.setState(
      { isLoadingEarlier: true, skip: this.state.messages.length },
      () => {
        let { netStatus } = this.props.screenProps.user;
        let {
          setToastMessage,
          setIndicator,
          loginSignupUser,
          tokenLogOutUserSuccess
        } = this.props.screenProps.actions;
        let { toastRef } = this.props.screenProps;
        if (!netStatus) {
          setToastMessage(true, colors.danger);
          return toastRef.show(string("NetAlert", colors.danger));
        } else {
          fetchApi
            .getChatList(
              getChatListLink,
              this.state.question._id,
              this.state.skip,
              this.state.limit,
              this.props.screenProps.user.user.accessToken
            )
            .then(result => {
              if (result.status == 200) {
                let newArray = [];
                if (result.success.data.length < 10) {
                  this.setState({ loadEarlier: false });
                }
                for (let i = 0; i < result.success.data.length; i++) {
                  let newMessage = {};
                  newMessage._id = result.success.data[i]._id;
                  newMessage.createdAt = new Date(
                    result.success.data[i].createdAt
                  );
                  newMessage.sent = true;
                  // newMessage.received = result.success.message[i].isDelivered
                  newMessage.user = {
                    _id: result.success.data[i].userId._id,
                    name: result.success.data[i].userId.firstName,
                    avatar: result.success.data[i].userId.profileImage.thumbnail
                  };
                  if (result.success.data[i].messageType == "TEXT") {
                    newMessage.text = result.success.data[i].text;
                  } else if (result.success.data[i].messageType == "IMAGE") {
                    newMessage.image = result.success.data[i].image.thumbnail;
                  } else if (result.success.data[i].messageType == "VIDEO") {
                    newMessage.video = result.success.data[i].video.thumbnail;
                  } else if (result.success.data[i].messageType == "FILE") {
                    newMessage.file = result.success.data[i].file.fileUrl;
                  } else if (result.success.data[i].messageType == "AUDIO") {
                    newMessage.audio = result.success.data[i].audio.audiourl;
                  }
                  newArray.push(newMessage);
                  // seenMessages = newArray
                }
                let isShowLoad;
                if (result.success.data.length > 9) {
                  isShowLoad = true;
                } else {
                  isShowLoad = false;
                }
                this.setState(previousState => {
                  return {
                    messages: GiftedChat.prepend(
                      previousState.messages,
                      newArray
                    ),
                    loadEarlier: isShowLoad,
                    isLoadingEarlier: false
                  };
                });
              } else if (res.status == 401) {
                setIndicator(false);
                tokenLogOutUserSuccess();
                setTimeout(
                  () => this.props.navigation.navigate("AuthNavigatorStack"),
                  10
                );
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
      }
    );
  };

  onSend = (messages = []) => {
    let socketMessage = {};
    (socketMessage._id = uuid.v4()),
      (socketMessage.questionId = this.state.question._id),
      (socketMessage.convoId = this.state.question.convoId),
      // socketMessage.createdAt= new Date(Milliseconds),
      (socketMessage.user = {
        _id: this.props.screenProps.user.user._id,
        name:
          this.props.screenProps.user.user.firstName +
          " " +
          this.props.screenProps.user.user.lastName,
        avatar:
          this.props.screenProps.user.user &&
          this.props.screenProps.user.user.profileImage &&
          this.props.screenProps.user.user.profileImage.thumbnail
            ? this.props.screenProps.user.user.profileImage.thumbnail
            : ""
      }),
      // socketMessage.senderId = this.props.screenProps.user.user._id,
      (socketMessage.messageType = "TEXT"),
      (socketMessage.message = messages[0].text),
      (socketMessage.receiverId =
        this.state.question.questionFrom != this.props.screenProps.user.user._id
          ? this.state.question.questionFrom
          : this.state.question.questionTo);
    socket.emit("sendMessage", socketMessage, response => {
      if (response.status == 200) {
        const step = this.state.step + 1;
        this.setState(previousState => {
          const sentMessages = [{ ...messages[0], sent: true, received: true }];
          return {
            messages: GiftedChat.append(
              previousState.messages,
              sentMessages,
              Platform.OS !== "web"
            ),
            step
          };
        });
      }
      console.log(response);
    });

    // for demo purpose
    // setTimeout(() => this.botSend(step), Math.round(Math.random() * 1000))
  };

  updateMessageRecieved = response => {
    this.setState({
      messages: this.state.messages.map(m => {
        if (m._id == response.messageId) {
          return {
            ...m,
            received: true
          };
        }
        return m;
      })
    });
  };

  botSend = (step = 0) => {
    const newMessage = messagesData
      .reverse()
      // .filter(filterBotMessages)
      .find(findStep(step));
    if (newMessage) {
      this.setState(previousState => ({
        messages: GiftedChat.append(
          previousState.messages,
          newMessage,
          Platform.OS !== "web"
        )
      }));
    }
  };

  parsePatterns = linkStyle => {
    return [
      {
        pattern: /#(\w+)/,
        style: { textDecorationLine: "underline", color: "darkorange" },
        onPress: () => console.log("")
        // Linking.openURL('http://gifted.chat')
      }
    ];
  };
  renderCustomView(props) {
    return (
      <View>
        <CustomView {...props} />
        <Text
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            color: colors.primary
          }}
        >
          {moment(props.currentMessage.createdAt).format("L") +
            " @ " +
            moment(props.currentMessage.createdAt).format("LT")}
        </Text>
      </View>
    );
  }

  onReceive = text => {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(
          previousState.messages,
          {
            _id: Math.round(Math.random() * 1000000),
            text,
            createdAt: new Date(),
            user: otherUser
          },
          Platform.OS !== "web"
        )
      };
    });
  };

  onSendFromUser = (messages = []) => {
    const step = this.state.step + 1;
    this.setState({ isLoadingEarlier: true, skip: this.state.messages.length });
    let { netStatus } = this.props.screenProps.user;
    let {
      setToastMessage,
      setIndicator,
      loginSignupUser,
      tokenLogOutUserSuccess
    } = this.props.screenProps.actions;
    let { toastRef } = this.props.screenProps;
    if (!netStatus) {
      setToastMessage(true, colors.danger);
      return toastRef.show(string("NetAlert", colors.danger));
    } else {
      fetchApi
        .uploadImage(
          uploadImageLink,
          messages.fileUrl,
          this.props.screenProps.user.user.accessToken
        )
        .then(result => {
          if (result.status == 200) {
            let socketMessage = {};
            if (messages.messageType == "IMAGE") {
              socketMessage = {
                // messages.map(message => ({
                // ...messages,
                _id: uuid.v4(),
                messageType: messages.messageType,
                questionId: this.state.question._id,
                convoId: this.state.question.convoId,
                user: {
                  _id: this.props.screenProps.user.user._id,
                  name: this.props.screenProps.user.user.firstName,
                  avatar:
                    this.props.screenProps.user.user &&
                    this.props.screenProps.user.user.profileImage &&
                    this.props.screenProps.user.user.profileImage.thumbnail
                      ? this.props.screenProps.user.user.profileImage.thumbnail
                      : ""
                },
                receiverId:
                  this.state.question.questionFrom !=
                  this.props.screenProps.user.user._id
                    ? this.state.question.questionFrom
                    : this.state.question.questionTo,
                // user,
                image: result.success.original,
                imageData: result.success
                // _id: Math.round(Math.random() * 1000000),
              };
            } else {
              socketMessage = {
                // messages.map(message => ({
                // ...messages,
                _id: uuid.v4(),
                messageType: messages.messageType,
                questionId: this.state.question._id,
                convoId: this.state.question.convoId,
                user: {
                  _id: this.props.screenProps.user.user._id,
                  name: this.props.screenProps.user.user.firstName,
                  avatar:
                    this.props.screenProps.user.user &&
                    this.props.screenProps.user.user.profileImage &&
                    this.props.screenProps.user.user.profileImage.thumbnail
                      ? this.props.screenProps.user.user.profileImage.thumbnail
                      : ""
                },
                // user,
                imageData: result.success,
                receiverId:
                  this.state.question.questionFrom !=
                  this.props.screenProps.user.user._id
                    ? this.state.question.questionFrom
                    : this.state.question.questionTo,
                video: result.success.original,
                fileThumbnail: result.success.original
                // _id: Math.round(Math.random() * 1000000),
              };
            }

            // }))
            socket.emit("sendMessage", socketMessage, response => {
              if (response.status == 200) {
                this.setState(previousState => ({
                  messages: GiftedChat.append(
                    previousState.messages,
                    socketMessage
                  ),
                  step
                }));
              }
            });
          } else if (res.status == 401) {
            setIndicator(false);
            tokenLogOutUserSuccess();
            setTimeout(
              () => this.props.navigation.navigate("AuthNavigatorStack"),
              10
            );
            setToastMessage(true, colors.danger);
            return toastRef.show(res.failure, colors.danger);
          } else {
            setIndicator(false);
            setToastMessage(true, colors.danger);
            return toastRef.show(res.failure, colors.danger);
          }
        })
        .catch(error => {
          debugger;
          setIndicator(false);
          setToastMessage(true, colors.danger);
          return toastRef.show("Something went wrong", colors.danger);
        });
    }
  };

  renderAccessory = () => <AccessoryBar onSend={this.onSendFromUser} />;

  renderCustomActions = props =>
    Platform.OS === "web" ? null : (
      <CustomActions {...props} onSend={this.onSendFromUser} />
    );

  reactSocket = (reaction, messages) => {
    debugger;
    let socketMessage = {};
    messages.currentMessage.reactions[reaction] = !messages.currentMessage
      .reactions[reaction];
    (socketMessage._id = uuid.v4()),
      // socketMessage.createdAt= new Date(Milliseconds),
      (socketMessage.reactions = messages.currentMessage.reactions);
    (socketMessage.user = {
      _id: this.props.screenProps.user.user._id,
      name:
        this.props.screenProps.user.user.firstName +
        " " +
        this.props.screenProps.user.user.lastName,
      avatar:
        this.props.screenProps.user.user &&
        this.props.screenProps.user.user.profileImage &&
        this.props.screenProps.user.user.profileImage.thumbnail
          ? this.props.screenProps.user.user.profileImage.thumbnail
          : ""
    }),
      (socketMessage.answerId = messages.currentMessage._id),
      (socketMessage.receiverId =
        this.state.question.questionFrom != this.props.screenProps.user.user._id
          ? this.state.question.questionFrom
          : this.state.question.questionTo);

    socket.emit("react", socketMessage, response => {
      if (response.status == 200) {
        this.setState({
          messages: this.state.messages.map(x => {
            if (x._id == messages.currentMessage._id) {
              return {
                ...x,
                reactions: {
                  ...x.reactions,
                  reaction: messages.currentMessage.reactions[reaction]
                }
              };
            } else {
              return {
                ...x
              };
            }
          })
        });
      }
    });

    // for demo purpose
    // setTimeout(() => this.botSend(step), Math.round(Math.random() * 1000))
  };

  renderBubble = props => {
    return (
      <View>
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              backgroundColor: "#f0f0f0"
            },
            right: {
              backgroundColor: colors.themeColor
            }
          }}
        />
        {props.currentMessage.user._id !=
        this.props.screenProps.user.user._id ? (
          <View
            style={{
              flexDirection: "row",
              marginVertical: 16,
              marginHorizontal: 8,
              justifyContent:
                props.position == "right" ? "flex-end" : "flex-start"
            }}
          >
            {props.currentMessage.reactions.love ? (
              <TouchableOpacity onPress={() => this.reactSocket("love", props)}>
                <Image source={Images.ic_heart_Filled} />
              </TouchableOpacity>
            ) : props.currentMessage.reactions.happy ? (
              <TouchableOpacity
                onPress={() => this.reactSocket("happy", props)}
              >
                <Image source={Images.ic_laughemoji_Filled} />
              </TouchableOpacity>
            ) : props.currentMessage.reactions.notClear ? (
              <TouchableOpacity
                onPress={() => this.reactSocket("notClear", props)}
              >
                <Image source={Images.ic_questionmarkFilled} />
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent:
                    props.position == "right" ? "flex-end" : "flex-start"
                }}
              >
                <TouchableOpacity
                  onPress={() => this.reactSocket("love", props)}
                >
                  <Image source={Images.ic_heart} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.reactSocket("happy", props)}
                >
                  <Image
                    source={Images.ic_laughemoji}
                    style={{ marginHorizontal: 16 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.reactSocket("notClear", props)}
                >
                  <Image source={Images.ic_questionmark} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : null}
      </View>
    );
  };

  renderSystemMessage = props => {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15
        }}
        textStyle={{
          fontSize: 14
        }}
      />
    );
  };

  // renderFooter = props => {
  //   if (this.state.typingText) {
  //     return (
  //       <View style={styles.footerContainer}>
  //         <Text style={styles.footerText}>{this.state.typingText}</Text>
  //       </View>
  //     )
  //   }
  //   return null
  // }

  onQuickReply = replies => {
    const createdAt = new Date();
    if (replies.length === 1) {
      this.onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies[0].title,
          user
        }
      ]);
    } else if (replies.length > 1) {
      this.onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies.map(reply => reply.title).join(", "),
          user
        }
      ]);
    } else {
      console.warn("replies param is not set correctly");
    }
  };

  renderQuickReplySend = () => <Text>{" custom send =>"}</Text>;

  render() {
    return (
      <SafeAreaViewCustome>
        <View style={{ flex: 1 }}>
          <ImageBackground
            source={Images.appbar}
            style={{ width: width, paddingHorizontal: 16, paddingVertical: 8 }}
          >
            <HeaderBack
              goBack={() => this.props.navigation.goBack()}
              rightAction={() => this.props.navigation.navigate("Setting")}
              title={"Back"}
              centerTitle={"My Convo"}
              rightIcon={"ios-more"}
            />
          </ImageBackground>
          <View style={{ padding: 16 }}>
            <TextCustom p style={{ color: colors.primary, marginBottom: 8 }}>
              {questionObject.day}
            </TextCustom>
            <TextCustom h5 style={{ color: colors.primary }}>
              {this.state.question.text.trim()}
            </TextCustom>
          </View>
          <GiftedChat
            messages={this.state.messages}
            extraData={this.state}
            onSend={this.onSend}
            loadEarlier={this.state.loadEarlier}
            onLoadEarlier={this.onLoadEarlier}
            isLoadingEarlier={this.state.isLoadingEarlier}
            parsePatterns={this.parsePatterns}
            user={{
              _id: this.props.screenProps.user.user._id,
              name: this.props.screenProps.user.user.firstName,
              avatar:
                this.props.screenProps.user.user &&
                this.props.screenProps.user.user.profileImage &&
                this.props.screenProps.user.user.profileImage.thumbnail
                  ? this.props.screenProps.user.user.profileImage.thumbnail
                  : ""
            }}
            scrollToBottom
            // onLongPressAvatar={user => alert(JSON.stringify(user))}
            // onPressAvatar={() => alert('short press')}
            // onQuickReply={this.onQuickReply}
            keyboardShouldPersistTaps="never"
            // renderAccessory={Platform.OS === 'web' ? null : this.renderAccessory}
            renderActions={this.renderCustomActions}
            showUserAvatar={true}
            showAvatarForEveryMessage={true}
            renderAvatarOnTop={true}
            renderBubble={this.renderBubble}
            renderSystemMessage={this.renderSystemMessage}
            renderCustomView={this.renderCustomView}
            quickReplyStyle={{ borderRadius: 2 }}
            renderQuickReplySend={this.renderQuickReplySend}
            inverted={Platform.OS !== "web"}
            timeTextStyle={{
              left: { color: "red" },
              right: { color: "yellow" }
            }}
          />
        </View>
        {/* <TouchableOpacity style={[styles.homeScreenButton, { alignSelf: 'center' }]} onPress={() => this.props.navigation.navigate('Dashboard')}>
          <Image source={Images.ic_Chat_FAB} />
        </TouchableOpacity> */}
      </SafeAreaViewCustome>
    );
  }
}
