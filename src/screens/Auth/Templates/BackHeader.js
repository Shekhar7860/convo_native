import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../../../utilities/config/colors";
import { styles } from "../../../styles";
import Text from "../../../components/Text";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Images } from "../../../utilities/images";

export const HeaderBack = props => {
  return <View style={{
    justifyContent: "space-between",
    flexDirection: "row",
  }}>
    <TouchableOpacity
      onPress={() => props.goBack()}
      style={{
        // paddingVertical: 5,
        alignItems: "flex-start",
        flexDirection: "row"
      }}
    >
      {!props.hideIcon && <Ionicons name="ios-arrow-back" size={28}
        style={{ alignSelf: 'center' }}
        color={Colors.white} />}
      <Text p style={[styles.RsBold, {fontSize:16, paddingLeft: 10, alignSelf: 'center', color: Colors.white }]}>
        {props.title}{" "}
      </Text>
    </TouchableOpacity>
    {props.centerTitle ? <Text h3 style={[styles.RsBold, {marginLeft:-36, alignSelf: 'center', color: Colors.white }]}>{props.centerTitle}</Text>
      : null}
    {
      props.rightIcon && <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => (props.rightAction ? props.rightAction() : undefined)}><Image source={Images.ic_3dots}
        style={{ alignSelf: 'center' }} />
      </TouchableOpacity>
    }
  </View>
}