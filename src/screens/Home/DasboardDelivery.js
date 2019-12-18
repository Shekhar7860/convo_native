/**
 * Home Screen
 */

import React, { Component, Fragment } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Image
} from "react-native";
import Button from "../../components/Button";
import { styles } from "../../styles";
import Text from "../../components/Text";
import { normalize } from "../../utilities/helpers/normalizeText";
import CustomModal from "../../components/Modal";
import colors from "../../utilities/config/colors";
import {SafeAreaViewCustome} from '../../components/SafeAreaView' 

export default class DashBoardDelivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      showToast:false
    };
  }
  componentDidMount(){
    let {params} = this.props.navigation.state
    if(params && params.isToast){
      this.setState({
        showToast:true
      },() =>{
        setTimeout(() =>{
          this.setState({
            showToast : false
          })
        },2500)
      })
    }
    setTimeout(() =>{
      this.setState({
        isVisible : true
      })
    },3500)
  }
  renderButton = (title, transparent, normal) => {
    return (
      <Button
        buttonStyle={{
          height: 48,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: transparent ? "transparent" : colors.primary
        }}
        buttonTextStyle={transparent && { fontWeight: "normal" }}
        fontSize={18}
        color={transparent ? colors.primary : "#FFFFFF"}
        onPress={() => this.pressButton(title)}
        title={title}
      />
    );
  };
  pressButton = (title) => {
    if(title == 'ACCEPT'){
      this.setState({
        isVisible:false
      })
      this.props.navigation.navigate('PickupInfo')
    }else if(title == 'No thanks'){
        this.setState({
          isVisible:false
        })
    }
  }
  renderToastMessage = () => {
    return (
      <View style={{ backgroundColor: "rgb(255,90,90)", paddingVertical: 8 }}>
        <View style={{ paddingHorizontal: 16 }}>
          <Text p style={[styles.WsRegular, { color: "rgb(255,255,255)" }]}>
            Your account has not been activated yet.For more information call
            us:
          </Text>
          <Text h5 style={[styles.WsRegular, { color: "rgb(255,255,255)" }]}>
            1-700-BEBAGGO
          </Text>
        </View>
      </View>
    );
  };
  
  renderEmptyBag = () => {
    return (
      <View style={{ alignSelf: "center" }}>
        <Image source={require("../../assets/images/emptybag.png")} />
      </View>
    );
  };
  closeModal = () => {
    this.setState({
      isVisible: false
    });
  };
  renderIntervelButton = () => {
    return (
      <View
        style={{
          height: 74,
          justifyContent: "center",
          alignItems: "center",
          borderColor: "rgb(221,221,221)",
          borderWidth: 1,
          borderRadius: 8
        }}
      >
        <Text
          p
          style={[
            styles.WsRegular,
            {
              paddingTop: 16,
              color: "rgb(221,221,221)",
              fontSize: normalize(30)
            }
          ]}
        >
          30seg
        </Text>
      </View>
    );
  };

  renderNotificationModal = () => {
    return (
      <CustomModal
        isVisible={this.state.isVisible}
        closeModal={() => this.closeModal()}
      >
        <View
          style={styles.modalRadius}>
          <View style={{ height: "5%" }} />
          <View style={{ alignSelf: "center", paddingTop: 10 }}>
            <Image source={require("../../assets/images/bell.png")} />
          </View>
          <View style={{ height: "2%" }} />
          <View style={{ alignSelf: "center", paddingTop: 10 }}>
            <Text h4 style={styles.RalewayBold}>
              New delivery!
            </Text>
          </View>
          <View
            style={{
              alignSelf: "center",
              paddingTop: 16,
              flexDirection: "row"
            }}
           >
            <Image source={require("../../assets/images/bag.png")} />
            <Text h5 style={{ color: "rgb(78,89,116)" }}>
              {" "}
              5 bags
            </Text>
          </View>
          <View style={{ height: 32}} />
          {this.renderIntervelButton()}
          <View style={{ alignSelf: "center", paddingTop: 10 }}>
            <Text p style={[styles.WsRegular, { color: "rgb(221,221,221)" }]}>
              Time left to accept the delivery
            </Text>
          </View>
          <View style={{ height: "5%" }} />

          <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            {this.renderButton("ACCEPT")}
          </View>
          <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            {this.renderButton("No thanks", true, true)}
          </View>
          <View style={{ height: "5%" }} />
        </View>
      </CustomModal>
    );
  };
  render() {
    return (
      <SafeAreaViewCustome>
      <ScrollView style={{ flex: 1, }} 
      showsVerticalScrollIndicator={false}>
                  <View style={{ height: 25 }} />

        {/* <View style={{ height: "2%" }} /> */}
       {this.state.showToast && this.renderToastMessage()}
        <View
          style={{
            alignItems: "flex-start",
            paddingVertical: 20,
            paddingHorizontal: 16,
            opacity: (this.state.showToast) ? 0.5 :1
          }}
        >
          <Text h3 style={[styles.RalewayBold]}>
            Any flights assigned
          </Text>
          <View style={{ height: 25 }} />
          <Text
            p
            style={[
              styles.WsRegular,
              { fontSize: normalize(18), color: "rgb(88,88,88)" }
            ]}
          >
            You don't have any flights assigned yet
          </Text>
        </View>
        <View style={{ height: 25 }} />

        {this.renderEmptyBag()}
        <View style={{ height: 25 }} />
        {this.state.isVisible && this.renderNotificationModal()}
      </ScrollView>
      </SafeAreaViewCustome>
    );
  }
}
