/**
 * Home Screen
 */

import React, { Component, Fragment } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Keyboard,
  Image
} from "react-native";
import firebase from 'react-native-firebase'
import Button from "../../components/Button";
import { styles } from "../../styles";
import Text from "../../components/Text";
import { Header } from './Templates/header'
import TextFieldInput from "../../components/TextInput";
import * as fetchApi from '../../utilities/ApiMethods'
import { SafeAreaViewCustome } from '../../components/SafeAreaView'
import { string } from "../../utilities/languages/i18n";
import colors from "../../utilities/config/colors";
import { Images } from "../../utilities/images";
const { width, height } = Dimensions.get('window')
const getConvoLink = '/user/v1/convos'
const updateTokenLink = '/user/v1/updateProfile'

let profileImage = Images.ic_userplaceholder
let ic_pending = Images.ic_pending
let data = {
  image: Images.ic_userplaceholder, status: Images.ic_pending, name: 'London Pickett', question: 'What is one of your earliest memories?'
}
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      skip: 0,
      isFetching: false,
      count: 0,
      indicator1: false,
      limit: 10,
      convoList: []
    }

  }
  componentDidMount() {
    this.fetchData(this.state.search, this.state.skip, this.state.limit)
  }
  componentWillReceiveProps=(nextProps)=>{
    this.setState({convoList:nextProps.screenProps.user.convoList.data, count: nextProps.screenProps.user.count})
  }
  fetchData(search, skip, limit) {
    debugger
    let { netStatus } = this.props.screenProps.user;
    let { setToastMessage, setIndicator, loginSignupUser, tokenLogOutUserSuccess,convoList } = this.props.screenProps.actions;
    let { toastRef } = this.props.screenProps;
    if (!netStatus) {
      setToastMessage(true, colors.danger);
      return toastRef.show(string("NetAlert", colors.danger));
    } else {
      // setIndicator(true)
      convoList(getConvoLink, search, skip, limit, this.props.screenProps.user.user.accessToken)
        .then(res => {
          debugger
          if (res.status == 200) {
            this.updateToken()
            setIndicator(false);
            if (skip == 0) {
              this.setState({ convoList: res.success.data, count: res.success.count, indicator1: false })
            } else {
              this.setState({ convoList: this.state.convoList.concat(res.success.data), count: res.success.count, indicator1: false })
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
  async updateToken() {
    let { setToastMessage, setIndicator, loginSignupUser, tokenLogOutUserSuccess } = this.props.screenProps.actions;
    let { toastRef } = this.props.screenProps;
    const fcmToken = await firebase.messaging().getToken();
    let data = {}
    data['deviceToken'] = fcmToken
    fetchApi.updateProfile(updateTokenLink, data, this.props.screenProps.user.user.accessToken)
      .then(res => {
        if (res.status == 200) {
          setIndicator(false);
          this.setState({ indicator1: false })
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
        return toastRef.show("Something went wrong", colors.danger);
      });
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
        onPress={() => this.props.navigation.navigate('DashBoardDelivery', {
          isToast: true
        })}
        title={title}
      />
    );
  };
  updateList() {
    let { setIndicator } = this.props.screenProps.actions;
    setIndicator(true)
    this.fetchData('', 0, 10)
  }
  onChangeText = (text, name) => {
    this.setState({
      [name]: text,
    }, () => {
      this.fetchData(text, 0, this.state.limit)
    });
  }
  onFocus = name => {
    this.setState({
      [name]: true
    })
  }
  onBlur = name => {
    this.setState({
      [name]: false
    })
  }
  viewConvo(item) {
    this.props.navigation.navigate('ViewConvoProfile', { data: item, onNavigatioBack: () => this.fetchData('', 0, 10) })
  }
  convoListUsers = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => this.viewConvo(item)} style={{ justifyContent: 'space-between', margin: 20 }}>
        <Image source={item.convoTo && item.convoTo.profileImage && item.convoTo.profileImage.thumbnail ? { uri: item.convoTo.profileImage.thumbnail } : Images.ic_userplaceholder} style={{ height: 100, width: 100, borderRadius: 50 }} />
        {item.convoStatus != "Pending" ?
          <View style={{ position: 'absolute', height: 20, width: 20, borderRadius: 10, backgroundColor: colors.green, bottom: -10, left: 40 }}>
            <Image source={ic_pending} />
          </View> :
          (item.pendingQuestions && item.pendingQuestions > 0) ?
            <View style={{ position: 'absolute', left: 32, bottom: -10, backgroundColor: colors.danger, borderWidth: 4, borderColor: colors.white, height: 32, width: 32, borderRadius: 16 }}>
              <Text h5 style={{ color: colors.white, alignSelf: 'center', marginTop: (Platform.OS == 'ios') ? undefined : 1 }}>{(item.pendingQuestions < 10) ? item.pendingQuestions : '9+'}</Text>
            </View> :
            <View style={{ position: 'absolute', height: 20, width: 20, borderRadius: 10, backgroundColor: colors.green, bottom: -10, left: 40 }}>
              <Image source={Images.ic_check} />
            </View>
          //  /* <Image source={ic_pending} /> */}
        }
      </TouchableOpacity >
    )
  }
  paginationFunction() {
    let { setToastMessage, setIndicator } = this.props.screenProps.actions

    if (this.state.indicator1 == false) {
      if (this.state.convoList.length < this.state.count) {
        setIndicator(true)
        this.setState({ skip: this.state.convoList.length, indicator1: true }, () => {
          this.fetchData(this.state.search, this.state.skip, this.state.limit);
        })
      }
    }
  }
  onRefresh() {
    this.fetchData('', 0, 10)
    this.setState({ isFetching: false })
  }
  render() {
    debugger
    return (
      <SafeAreaViewCustome>
        <Header
          goBack={() => this.props.navigation.goBack()}
          rightAction={() => this.props.navigation.navigate('Setting')}
          hideIcon
          title={string('Dashboard')}
          rightIcon={"ios-more"}
        />
        <View style={{ flex: 1, paddingVertical: 16, paddingHorizontal: 32, alignItems: "center" }}>
          <Text h3 style={{ color: colors.primary }}>
            {string('myconvos')}
          </Text>
          <View style={{ paddingVertical: 8 }}>
            <TextFieldInput
              style={{ width: width - 120, fontSize: 16 }}
              refs={ref => (this.searchRef = ref)}
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onChangeText={text => this.onChangeText(text, "search")}
              onFocus={() => this.onFocus("searchFieldFocus")}
              onBlur={() => this.onBlur("searchFieldFocus")}
              returnKeyType="next"
              placeholder={string('searchConvo')}
              placehlderTxtColor
              value={this.state.search}
            />
          </View>
          <FlatList
            style={{ flex: 1 }}
            extraData={this.state}
            data={this.state.convoList}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            renderItem={this.convoListUsers}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.2}
            onEndReached={({ distanceFromEnd }) => this.paginationFunction()}
          />
          <TouchableOpacity style={styles.homeScreenButton} onPress={() => this.props.navigation.navigate('CreateConvo', { onNavigatioBack: () => this.fetchData('', 0, 10) })}>
            <Image source={Images.ic_Add} />
          </TouchableOpacity>
        </View>
      </SafeAreaViewCustome>
    );
  }
}
