/**
 * Signup Screen
 */

import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Components
import { normalize } from "../../utilities/helpers/normalizeText";
import Button from "../../components/Button";
import colors from "../../utilities/config/colors";
import { SafeAreaViewCustome } from "../../components/SafeAreaView";

import Text from "../../components/Text";
import { styles } from "../../styles";
import { Header } from "./Templates/BackHeader";
export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
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
        onPress={() => this.pressButton(title)}
        title={title}
      />
    );
  };
  pressButton = title => {
    if (title == "SIGN OFF") {
      this.props.navigation.navigate("TabNavigator");
    }
  };
  render() {
    return (
      <SafeAreaViewCustome>
        <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 8 }}>
          {/* <Header
            goBack={() => this.props.navigation.goBack()}
            title={"Back"}
          /> */}
          <View style={{ height: 32 }} />

          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              paddingVertical: 16
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../assets/images/thin0154OkSuccessfulCheck.png")}
              />
            </View>
            <View style={{ alignItems: "flex-start", paddingVertical: 20 }}>
              <Text
                h4
                style={[styles.RalewayBold, { fontSize: normalize(20) }]}
              >
                Thanks for your registration
              </Text>
            </View>

            <View style={{ alignItems: "flex-start" }}>
              <Text p textAlign tyle={[styles.WSRegular]}>
                {`A member of our team will contact you to guide you through the approval process.\n \nOnce approved you can start delivering our clients bags.  Until then you have to wait here.`}
              </Text>
            </View>
            <View style={{ height: 32 }} />
            <View style={{ justifyContent: "flex-start" }}>
              {this.renderButton("SIGN OFF")}
            </View>
          </View>
        </View>
      </SafeAreaViewCustome>
    );
  }
}
