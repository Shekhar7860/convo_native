/**
 * Home Screen
 */

import React, { Component, Fragment } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Platform,
  Image,
  ImageBackground,
  Dimensions,
  StyleSheet
} from "react-native";

//Components
import Button from "../../components/Button";
import { styles } from "../../styles";

import Text from "../../components/Text";
import colors from "../../utilities/config/colors";
import { TopSectionDelivery } from "./Templates/TopSectiondelivery";
import { normalize } from "../../utilities/helpers/normalizeText";
import { ViewWaze } from "./Templates/ViewWaze";
import { ListItem } from "./Templates/ListItem";
import { Header } from "../Auth/Templates/BackHeader";
import { Label } from "./Templates/Label";
import { ReceivedTagView } from "./Templates/ReceivedTag";
import { SafeAreaViewCustome } from "../../components/SafeAreaView";
const { width, height } = Dimensions.get("window");

export default class DeliverInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScanedBag: 0,
      deliveres: [
        {
          bagTitle: "Bag for my personal business",
          name: "Taurus",
          isScan: false,
          images:require('../../assets/images/bag1.jpeg'),
          color: "rgb(255,132,0)",
          id: 1
        },
        {
          bagTitle: "Bag with a green ribbon",
          name: "Taurus",
          isScan: false,
          images:require('../../assets/images/bag2.jpeg'),

          color: "rgb(18,18,18)",
          id: 2
        },
        {
          bagTitle: "Bag for my personal business",
          name: "Taurus",
          images:require('../../assets/images/bag3.jpeg'),

          isScan: false,
          color: "rgb(1,68,255)",
          id: 3
        }
      ],
      name: null,
      signature: null,
      isAllScanned: true,
      showDetailInfo: false
    };
  }
  updateDeliverList = data => {
    this.setState(
      {
        deliveres: this.state.deliveres.map((deliver, index) => {
          if (deliver.id == data.id) {
            return {
              ...deliver,
              isScan: true
            };
          } else {
            return { ...deliver };
          }
        })
      },
      () => {
        this.getScannedCount();
      }
    );
  };
  isAddedTrue = currentValue => {
    return currentValue == true;
  };
  getScannedCount = () => {
    let deliveres = this.state.deliveres.filter((item, index, array) => {
      return this.isAddedTrue(item.isScan);
    });
    let isScanned = this.state.deliveres.every((item, index, array) => {
      return this.isAddedTrue(item.isScan);
    });
    
    this.setState(
      {
        isScanedBag: deliveres && deliveres.length > 0 ? deliveres.length : 0,
        isAllScanned: isScanned ? false : true
      },
      () => {
        if (
          this.state.deliveres.length > 0 &&
          this.state.isScanedBag == this.state.deliveres.length
        ) {
          this.setState({
            showDetailInfo: true
          });
        }
      }
    );
  };

  renderButton = (title, backgroundColor, disabled, item) => {
    return (
      <Button
        disabled={disabled}
        buttonStyle={{
          height: 48,
          justifyContent: "center",
          backgroundColor: backgroundColor
            ? disabled
              ? backgroundColor
              : colors.primary
            : colors.primary,
          alignItems: "center"
        }}
        fontSize={18}
        color={"#FFFFFF"}
        onPress={() => this.pressButton(title, item)}
        title={title}
      />
    );
  };
  pressButton = (title, item) => {
    if (title == "DELIVER") {
      this.props.navigation.navigate("QrScan", {
        data: item,
        updateList: data => this.updateDeliverList(data)
      });
    } else if (title == "FINISH") {
      this.props.navigation.navigate("ThankuPage");
    }
  };
  renderDeliveryItem = (item, index) => {
    let { showDetailInfo } = this.state;
    if (showDetailInfo) {
      return this.renderDeliveryItemAllScanned(item, index);
    } else {
      return (
        <View style={{ marginHorizontal: 16 }} key={"delivery" + index}>
          <ListItem item={item} index={index} style={[{ flex: 0.2 }]} />
          {!item.isScan &&
            this.renderButton("DELIVER", colors.primary, false, item)}
        </View>
      );
    }
  };
  onDragOnSignature = signature => {
    this.setState({
      signature: signature
    });
  };
  renderInputAndSignatute = () => {
    return (
      <ReceivedTagView
        onDragOnSignature={signature => this.onDragOnSignature(signature)}
        name={this.state.name}
        signature={this.state.signature}
        onChangeText={text => this.setState({ name: text })}
      />
    );
  };
  renderDeliveryList = () => {
    return this.state.deliveres.map((deliver, index) => {
      return this.renderDeliveryItem(deliver, index);
    });
  };
  renderDeliveryItemAllScanned = (item, index) => {
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
            borderColor: "rgba(58,76,130,0.07)",
            width: width - 32,
            borderRadius: 4,
            marginHorizontal:
              32 / (this.state.deliveres.length + 1) +
              (this.state.deliveres.length - 1 - index) *
                (32 / (this.state.deliveres.length + 1)),
            marginVertical:
              (this.state.deliveres.length - index) *
              (32 / (this.state.deliveres.length + 1)),
            height: `100%`
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
  render() {
    let { showDetailInfo } = this.state;
    let disabled = true;
    if (this.state.isAllScanned) {
      if (!this.state.name || !this.state.signature) {
        disabled = true;
      }
    } else {
      if (!this.state.name || !this.state.signature) {
        disabled = true;
      } else {
        disabled = false;
      }
    }
    return (
      <SafeAreaViewCustome
        style={{ flex: 1, backgroundColor: "rgb(246,249,255)" }}
      >
        <View style={{ flex: 1, backgroundColor: "rgb(246,249,255)" }}>
          <View style={styles.rowWithPadding}>
            <Header
              goBack={() => this.props.navigation.goBack()}
              title={"Back"}
            />
            <View
              style={{
                flex: 0.8,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text p style={[styles.WsRegular]}>
                {showDetailInfo ? "Finish delivery" : "Bags to deliver"}
              </Text>
            </View>
          </View>

          {/* Top Section */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {showDetailInfo && (
              <View
                style={[
                  styles.paddingHoriZontal,
                  {
                    paddingVertical: 8,
                    alignSelf: "flex-start"
                  }
                ]}
              >
                <Text p style={[styles.WsRegular, { color: "rgb(78,89,116)" }]}>
                  It is necessary to scan each tag again to certify the delivery
                </Text>
              </View>
            )}
            <Label
              label={`${this.state.isScanedBag}/${
                this.state.deliveres.length
              } Bags ready`}
            />
            <View style={showDetailInfo && { height: 110 }}>
              {this.renderDeliveryList()}
            </View>

            <View style={{ paddingVertical: 16 }}>
              <Label
                label={"Who received the bags"}
                textStyle={styles.Wsbold}
              />
            </View>
            {this.renderInputAndSignatute()}
            <View style={{ height: 25 }} />
          </ScrollView>
          <View style={[styles.paddingHoriZontal, styles.paddingVertical]}>
            {this.renderButton("FINISH", "rgb(147,147,156)", disabled)}
          </View>
        </View>
      </SafeAreaViewCustome>
    );
  }
}
