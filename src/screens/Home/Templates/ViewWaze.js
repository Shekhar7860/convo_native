import React from "react";
import {
  TouchableOpacity,
  Dimensions,
  View,
  Image,
  ImageBackground
} from "react-native";

import colors from "../../../utilities/config/colors";
import { styles } from "../../../styles";
import Text from "../../../components/Text";
const { height } = Dimensions.get("window");
export const ViewWaze = props => {
  return (
    <TouchableOpacity
      onPress={()=>  props.onPress ? props.onPress() : null}
      style={[
        styles.shadow,
        {
          paddingVertical: 16,
          marginHorizontal: 16,
          shadowRadius: 0.01,
          elevation: 0.4,
          flex: 0.15,
          backgroundColor: "rgb(246,249,255)"
        }
      ]}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row"
        }}
      >
        <Image source={require("../../../assets/images/waze.png")} />
        <Text
          p
          style={[styles.RsMedium, { paddingLeft: 10, color: colors.primary }]}
        >
          View in WAZE
        </Text>
      </View>
    </TouchableOpacity>
  );
};
