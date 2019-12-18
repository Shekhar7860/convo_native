import React from "react";
import {
  TouchableOpacity,
  Dimensions,
  View,
  Image,
  ImageBackground
} from "react-native";
import colors from "../../../utilities/config/colors";
import {normalize} from "../../../utilities/helpers/normalizeText";

import { styles } from "../../../styles";
import Text from "../../../components/Text";
const { height } = Dimensions.get("window");
export const ListItem = ({item,index,children,style}) => {
  return ( <View
      style={
      [  
        {
          paddingLeft: 16,
          paddingRight:12,
          marginVertical: 12,
          backgroundColor: "white",
          flexDirection: "row",
          paddingTop: 16,
          paddingBottom:8
        },
        style && style,
      ]}
    >
      <View style={{ flex: 0.2 }}>
        <View style={{ borderRadius:4}} >
             <Image source={item.images}  
             style={{width:55,height:55,borderRadius:4}} />
          </View>
        <View
          style={{ backgroundColor: item.color, height:10,marginTop:12, borderRadius:2,width:55}}
        />
      </View>
      <View style={{ flex: 0.1 }} />

      <View style={{ flex: 0.6 }}>
        <Text p tep style={[styles.WsRegular, { color: "rgb(78,89,116)" }]}>
          Bag for my personal business
        </Text>
        <Text
          p
          style={[
            styles.WsMedium,
            {
              paddingBottom: 12,
              paddingTop: 8,
              fontSize: normalize(17),
              textAlign: "left",
              color: "rgb(147,147,156)"
            }
          ]}
        >
          Taurus
        </Text>
      </View>
      <View
        style={{
          flex: 0.1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {item.isScan ? (
          <Image
            source={require("../../../assets/images/green_success.png")}
          />
        ) : (
          <Image source={require("../../../assets/images/uncheck.png")} />
        )}
      </View>
       </View>
       
      
  );
};
