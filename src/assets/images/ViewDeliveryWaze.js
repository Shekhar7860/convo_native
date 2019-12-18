/**
 * Home Screen
 */

import React, { Component, Fragment } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
  ImageBackground
} from "react-native";

//Components
import Button from "../../components/Button";
import { styles } from "../../styles";
import Text from "../../components/Text";
import colors from "../../utilities/config/colors";
import { TopSectionDelivery } from "./Templates/TopSectiondelivery";
import { normalize } from "../../utilities/helpers/normalizeText";
import { ViewWaze } from "./Templates/ViewWaze";
const { width, height } = Dimensions.get("window");
import { ListItem } from "./Templates/ListItem";

export default class ViewDeliveryWaze extends Component {
  constructor(props) {
    super(props);
    let { params } = this.props.navigation.state;
    this.state = {
      deliveres: params.deliveres ? params.deliveres : [],
      isScanedBag: params.isScanedBag,
      isAllScanned: true
    };
  }
  componentDidMount(){
    let { params } = this.props.navigation.state;
    this.checkAllAreScanned(params.deliveres ? params.deliveres : []);

  }
  renderButton = (title,disabled) => {
    return (
      <Button
        disabled={disabled}
        buttonStyle={{
          height: 48,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: disabled
            ? "rgb(147,147,156)"
            : colors.primary
        }}
        fontSize={18}
        color={"#FFFFFF"}
        onPress={() => this.pressButton(title)}
        title={title}
      />
    );
  };

  isAddedTrue = currentValue => {
    return currentValue == true;
  };

  checkAllAreScanned = deliveres => {
    let isScanned = false;
    if (deliveres && deliveres.length > 0) {
      isScanned = deliveres.every((item, index, array) => {
        return this.isAddedTrue(item.isScan);
      });
      if (isScanned) {
        this.setState({ 
          isAllScanned: false
        });
      }
    }
  };

  pressButton = title => {
    if (title == "BEING DELIVERY") {
      this.props.navigation.navigate("DeliverInfo");
    }
  };
  
  renderDeliveryItem = (item, index) => {
    return (
      <View
        key={index + "delivery"}
        style={[
          styles.cardView_Style,
          styles.shadow,
          {
            backgroundColor: "white",
            shadowRadius: 1,
            shadowColor: "rgb(0,0,0)",
            shadowOpacity: 0.3,
            elevation: 0.4,
            width: width - 32,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: "rgba(58,76,130,0.09)",
            marginHorizontal:
              32 / (this.state.deliveres.length + 1) +
              (this.state.deliveres.length - 1 - index) *
                (32 / (this.state.deliveres.length + 1)),
            marginVertical:
              (this.state.deliveres.length - index) *
              (32 / (this.state.deliveres.length + 1)),
            height: "100%"
          }
        ]}
      >
        <ListItem
          item={item}
          index={index}
          style={{
            marginVertical: 0,
            paddingVertical: 0,
            paddingTop: 8
          }}
        />
      </View>
    );
  };

  renderDeliveryList = () => {
    return this.state.deliveres.map((deliver, index) => {
      return this.renderDeliveryItem(deliver, index);
    });
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "rgb(246,249,255)" }}>
        {/* Top Section */}
        <TopSectionDelivery
          title={"Detail"}
          goBack={() => this.props.navigation.goBack()}
        />
        <ScrollView style={{ flex: 1 }}>
          <ViewWaze />
          <View
            style={[
              styles.paddingHoriZontal,
              {
                paddingVertical: 16,
                alignSelf: "flex-start"
              }
            ]}
          >
            <Text h5 style={[styles.RsBold, { color: colors.black }]}>
              {`${this.state.isScanedBag}/${
                this.state.deliveres.length
              } Bags ready`}
            </Text>
          </View>
          <View style={{ height: 110 }}>{this.renderDeliveryList()}</View>
          <View style={{ height: 100 }} />
        </ScrollView>
        <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          <View style={{ paddingBottom: 16 }}>
            <Text
              p
              textAlign
              style={[
                styles.WsRegular,
                { color: "rgb(78,89,116)", fontSize: normalize(14) }
              ]}
            >
              When you arrive at the final destination
            </Text>
          </View>
          {this.renderButton("BEING DELIVERY",this.state.isAllScanned)}
        </View>
      </View>
    );
  }
}
