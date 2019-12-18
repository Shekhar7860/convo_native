
import React from "react";
import {  View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../../../utilities/config/colors";
import { styles } from "../../../styles";
import Text from "../../../components/Text";

export const Label = props => {
return   <View
  style={[
  styles.paddingHoriZontal,
  {
    paddingVertical: 16,
    alignSelf: "flex-start"
  },
]}
>
<Text h5 style={[styles.RsBold, { color: colors.black },props.textStyle]}>
    {props.label}
</Text>
</View>

}