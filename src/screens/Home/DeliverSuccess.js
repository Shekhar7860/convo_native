/**
 * Home Screen
 */

import React, { Component, Fragment } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Keyboard,
  Image,
  ImageBackground,
  Dimensions
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
import {SafeAreaViewCustome } from '../../components/SafeAreaView'
const { width, height } = Dimensions.get("window");

export default class DeliverSuccess extends Component {
  constructor(props) {
    super(props);
    let { params } = this.props.navigation.state;
    this.state = {
      deliveres: params.deliveres ? params.deliveres : [],
      isScanedBag: params.isScanedBag,
      name: null,
      signature: null
    };
  }
componentDidMount(){
    let { params } = this.props.navigation.state;
    this.checkAllAreScanned(params.deliveres ? params.deliveres : []);

}
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
          shadowColor:'rgb(0,0,0)',
          shadowOpacity:0.3,
            elevation: 0.4,
            width: width - 32,
            borderWidth:StyleSheet.hairlineWidth,
            borderColor:'rgba(58,76,130,0.07)',
            width: width - 32,
            borderRadius:4,
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
      <ListItem item={item} index={index} 
         style={{
          marginVertical: 0,
          paddingVertical: 0,
          paddingTop:8,
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

renderInputAndSignatute = () => {
    return (
    <ReceivedTagView
    name={this.state.name}
    signature={this.state.signature}
    onChangeText={text => this.setState({ name: text })}
    />
    );
};
pressButton = title => {
  if(title == "FINISH"){
      this.props.navigation.navigate("ThankuPage");
   }
};
  render() {
    return (
      <SafeAreaViewCustome style={{ flex: 1, backgroundColor: "rgb(246,249,255)"}}>

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
              Finish delivery
            </Text>
          </View>
        </View>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
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
          <Label label= {`${this.state.isScanedBag}/${
                this.state.deliveres.length
              } Bags ready`} />
          <View style={{ height: 110 }}>{this.renderDeliveryList()}</View>
          <View style={{ height: 25 }} />
          <View style={{ paddingVertical: 24 }}>
            <Label label={"Who received the bags"} textStyle={styles.Wsbold} />
          </View>
          {this.renderInputAndSignatute()}

          <View style={{ height: 25 }} />
        </ScrollView>
        <View style={[styles.paddingHoriZontal, styles.paddingVertical]}>
              {this.renderButton("FINISH")}
        </View>
      </View>
      </SafeAreaViewCustome>
    );
  }
}
