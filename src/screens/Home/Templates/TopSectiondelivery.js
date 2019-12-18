import React from "react";
import {
  TouchableOpacity,
  Dimensions,
  View,
  Image,
  ImageBackground,
  Platform
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../../utilities/config/colors";
import { styles } from "../../../styles";
import Text from "../../../components/Text";
const { height } = Dimensions.get("window");

export const TopSectionDelivery = props => {
  return (
    <View style={{ height: height / 3+10, backgroundColor: "rgb(44,44,57)" }}>
     {height >= 812 && Platform.OS == 'ios' && <View style={{height:35}} /> }
      <View style={{paddingTop: 16,
        justifyContent:props.goBack ? 'flex-start' :'center',
        flexDirection:'row',paddingHorizontal:16 }}>
        {
        props.goBack && <TouchableOpacity
          onPress={() =>props.goBack()}
          style={{
            // paddingVertical: 5,
             flex: 0.5,
            alignItems: "flex-start",
            flexDirection: "row"
          }}
        >
          <Ionicons
            name="ios-arrow-back"
            size={28}
            style={{ alignSelf: "center" }}
            color={colors.white}
          />
          
          <Text
            p
            style={[styles.WsRegular, {
               paddingLeft: 10, alignSelf: "center",color:colors.white }]}>
              Back
        </Text>
        </TouchableOpacity>
        }
        <Text p style={[styles.WsRegular, {
          alignSelf:'center',
           color: colors.white }]}>
          {props.title}
        </Text>
      </View>
      <ImageBackground
        resizeMode={"contain"}   
        style={{ flex: 1 }}
        source={require("../../../assets/images/layer1.png")}
      >
        <View style={{ paddingHorizontal: 23 }}>
          <View style={{ alignSelf: "flex-start", paddingTop: 20 }}>
            <Text p style={[styles.WsRegular, { color: colors.white }]}>
              From:
            </Text>
            <Text p style={[styles.Wsbold, { color: colors.white }]}>
              JF Kennedy Airport. NY
            </Text>
          </View>
          <View style={{ alignSelf: "flex-start", paddingTop: 8 }}>
            <Text p style={[styles.WsRegular, { color: colors.white }]}>
              To:
            </Text>
            <Text p style={[styles.Wsbold, { color: colors.white }]}>
              Pensilvania. Loubrage Av. 00139
            </Text>
          </View>
          <View
            style={{
              alignSelf: "flex-start",
              paddingTop: 24,
              flexDirection: "row"
            }}
          >
            <Image source={require("../../../assets/images/avtar.png")} />
            <Text p style={[styles.WsRegular, { color: colors.white }]}>
              {" "}
              Issac Norton
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
