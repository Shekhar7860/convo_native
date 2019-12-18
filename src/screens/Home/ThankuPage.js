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

export default class ThankuPage extends Component {
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
  pressButton = (title) => {
    if(title == 'NEXT'){
         this.props.navigation.navigate('DeliverFinished')
       }
     }
  render() {
    return (
      <View style={{ flex: 1, paddingHorizontal: 16 ,justifyContent:'center'}}>

        <View style={{alignItems:'center'}}>
              <Image source={require('../../assets/images/thin0154OkSuccessfulCheck.png')}/>
        </View>
        <View style={{ alignItems: "center", paddingVertical: 20 }}>
          <Text h4 style={[styles.RalewayBold]}>
          Great!
          </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <Text p textAlign tyle={[styles.WSRegular]}>
            {`Your delivery was successful!`}
          </Text>
        </View>
        <View style={{ height: "10%" }} />
        <View style={{ justifyContent: "flex-start" }}>
          {this.renderButton("NEXT")}
        </View>
      </View>
    );
  }
}
