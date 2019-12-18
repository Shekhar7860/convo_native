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
  StyleSheet,
  Dimensions
} from "react-native";
import CardStack, { Card } from 'react-native-card-stack-swiper';

import Button from "../../components/Button";
import { styles } from "../../styles";
import Text from "../../components/Text";
const { width, height } = Dimensions.get("window");
import colors from "../../utilities/config/colors";
import {SafeAreaViewCustome } from '../../components/SafeAreaView'

export default class DeliverFinished extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveres: [
        {
          bagTitle: "Bag for my personal business",
          name: "Taurus",
          isScan: false,
          color: "rgb(255,132,0)"
        },
        {
          bagTitle: "Bag with a green ribbon",
          name: "Taurus",
          isScan: true,
          color: "rgb(18,18,18)"
        },
        {
          bagTitle: "Bag for my personal business",
          name: "Taurus",
          isScan: false,
          color: "rgb(1,68,255)"
        },
        {
            bagTitle: "Bag for my personal business",
            name: "Taurus",
            isScan: false,
            color: "rgb(1,68,255)"
          },
       
      ]
    };
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
        onPress={() => null}
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
            elevation: 2,
            width: width - 32,
            borderWidth:StyleSheet.hairlineWidth,
            borderColor:'rgba(58,76,130,0.07)',
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
      <View style={{flex:1,
        paddingVertical:8,
       flexDirection:'row'}}>
           <View style={{paddingLeft:16,flex:0.7}}>
           <View>
              <Text style={[styles.WSRegular,styles.textColor,styles.smallFont]}>From</Text>
              <Text style={[styles.WSRegular,styles.textColor]}>JF Kannedy Airport</Text>
          </View>
          <View style={{paddingTop:12}}>
              <Text style={[styles.WSRegular,styles.textColor,styles.smallFont]}>To</Text>
              <Text style={[styles.WSRegular,styles.textColor]}>Pensilvania, Maples Av. 20001</Text>
          </View>
           </View>
           <View style={{flex:0.3,paddingRight:8}}>
           <View
           style={{height:25,
            justifyContent:'center',
            alignItems:'center',
            paddingHorizontal:4,
            borderRadius:25/2,backgroundColor:'rgb(11,201,27)'}}>
              <Text  
              textAlign style={[styles.Wsbold,{color:colors.white}]}>DELIVERED</Text>
            </View>
          <View style={{paddingTop:20,justifyContent:'center',
          alignItems:'flex-end',
         }}>
             <View style={{height:10}}/>
                <Image source={require('../../assets/images/thin0160ArrowNextRight.png')} />
          </View>
           </View>
      </View>
 </View>
    );
  };

  renderDeliveryList = () => {
    return this.state.deliveres.map((deliver, index) => {
      return this.renderDeliveryItem(deliver, index);

  })
  };
  render() {
    return (
      <SafeAreaViewCustome style={{ flex: 1, backgroundColor: "rgb(246,249,255)"}}>

      <View style={{ flex: 1,backgroundColor:'rgb(247,249,255)'}}>
        <View style={[{ alignItems: "flex-start", paddingTop: 20,paddingHorizontal:16 }]}>
          <Text h4 style={[styles.RalewayBold,]}>
            Delivery finished
          </Text>
        </View>
        <ScrollView
          style={{ flex: 1,  paddingTop: 8, }}
          showsVerticalScrollIndicator={false}
        >
        <View style={{ height: 103, }}>{this.renderDeliveryList()}</View>
        <View style={{ height: 30 }}/>
          <View style={{ alignItems: "center", paddingTop: 20 }}>
            <Text h4 style={[styles.RalewayBold]}>
              Congratulations
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../../assets/images/welcome.png")}
              style={{
                height: 150,
                width: 150
              }}
              resizeMode={"center"}
            />
          </View>
          <View style={{ alignItems: "center", paddingTop: 10,paddingHorizontal:16 }}>
            <Text p textAlign tyle={[styles.WSRegular]}>
              {`Your delivery was successful and you just earned `}
            </Text>
            <View style={{ alignItems: "center", paddingTop: 12 }}>
              <Text h2 textAlign tyle={[styles.Wsbold, { color: "#585858" }]}>
                {`$25.00 USD`}
              </Text>
            </View>
          </View>
          <View style={{ height: 25 }}/>
        </ScrollView>
        <View style={{ justifyContent: "flex-start", paddingHorizontal: 16 }}>
          {this.renderButton("THANKS")}
        </View>
        <View style={{ height: 15 }}/>

      </View>
      </SafeAreaViewCustome>
    );
  }
}

