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
  Dimensions,
  ImageBackground,
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
const { width, height } = Dimensions.get("window");

export default class PickupInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScanedBag: 0,
      showDetailInfo: false,
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
      ]
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
  pressButton = (title, item) => {
    if (title == "PICK UP") {
    this.props.navigation.navigate("QrScan", {
      data: item,
      updateList: data => this.updateDeliverList(data)
    });
    }else if(title == "BEING DELIVERY"){
      this.props.navigation.navigate("DeliverInfo");
    }
  };
  isAddedTrue = currentValue => {
    return currentValue == true;
  };
  getScannedCount = () => {
    let deliveres = this.state.deliveres.filter((item, index, array) => {
      return this.isAddedTrue(item.isScan);
    });
    this.setState(
      {
        isScanedBag: deliveres && deliveres.length > 0 ? deliveres.length : 0,
      },
      () => {
        if (
         this.state.deliveres.length > 0 && this.state.isScanedBag == this.state.deliveres.length
        ) {
          this.setState({
            showDetailInfo: true
          });
        }
      }
    );
  };
  renderButton = (title, item) => {
    return (
      <Button
        buttonStyle={{
          height: 48,
          justifyContent: "center",
          alignItems: "center"
        }}
        fontSize={18}
        color={"#FFFFFF"}
        onPress={() => this.pressButton(title, item)}
        title={title}
      />
    );
  };
  renderDeliveryItem = (item, index) => {
    let { showDetailInfo } = this.state;
    if (showDetailInfo) {
      return this.renderDeliveryItemAllScanned(item, index);
    } else {
      return (
        <View style={{ marginHorizontal: 16 }} key={"delivery" + index}>
          <ListItem item={item} index={index} style={[{ flex: 0.2 }]} />
          {!item.isScan && this.renderButton("PICK UP", item)}
        </View>
      );
    }
  };
  renderDeliveryList = () => {
    return this.state.deliveres.map((deliver, index) => {
      return this.renderDeliveryItem(deliver, index);
    });
  };

  renderDetailTopSection = () => {
    let { showDetailInfo } = this.state;
    if (showDetailInfo) {
      return (
        <TopSectionDelivery
          title={"Detail"}
          goBack={() => this.props.navigation.goBack()}
        />
      );
    } else {
      return <TopSectionDelivery title={"Delivery information"} />;
    }
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
  render() {
    let { showDetailInfo } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "rgb(246,249,255)" }}>
        {/* Top Section */}
        {this.renderDetailTopSection()}
        <ScrollView>
          <ViewWaze onPress={() => null} />
          {!showDetailInfo && (
            <View
              style={[
                styles.paddingHoriZontal,
                {
                  paddingVertical: 16,
                  alignSelf: "flex-start"
                }
              ]}
            >
              <Text p style={[styles.WsRegular, { color: "rgb(78,89,116)" }]}>
                First you need to scan all of the bags tags to start your
                delivery
              </Text>
            </View>
          )}
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
          <View
            style={
              showDetailInfo && {
                height: 110
              }
            }
          >
            {this.renderDeliveryList()}
          </View>
          {showDetailInfo && <View style={{ height: 100 }} />}
        </ScrollView>
        {showDetailInfo && (
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
            {this.renderButton("BEING DELIVERY")}
          </View>
        )}
      </View>
    );
  }
}
