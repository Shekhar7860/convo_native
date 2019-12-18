import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import * as Animatable from "react-native-animatable";

import Text from "./Text";
import styles from "../styles";
import { normalize } from "../utilities/helpers/normalizeText";

export default DropDownList = props => {
    return (
        <ScrollView
            style={[
                // styles.shadow,
                {
                    backgroundColor: "white",
                    borderWidth: 1,
                    paddingHorizontal: 16,
                    borderTopWidth: 0,
                    borderColor: "rgba(0,0,0,0.2)",
                    zIndex: 100,
                    shadowOpacity: 0.2,
                    backgroundColor: "#F9F8F8",
                    shadowRadius: 5,
                    height: 150,
                    marginBottom: 10
                }
            ]}
        >
            {props.lists.map((item, index) => {
                return (
                    <TouchableOpacity onPress={() => props.selectItem && props.selectItem(item)}>

                        <Animatable.View
                            animation="slideInDown"
                            //   duration={'500'} direction={'normal'}
                            style={[
                                {
                                    paddingVertical: 8
                                }
                            ]}
                        >
                            <Text
                                p
                                style={{ fontSize: normalize(16), color: "rgba(0,0,0,0.56)" }}
                            >
                                {item.relation}
                            </Text>
                        </Animatable.View>
                    </TouchableOpacity>

                );
            })}
        </ScrollView>
    );
};