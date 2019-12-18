import React from "react";
import { TouchableOpacity, View, ImageBackground } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../../../utilities/config/colors";
import { styles } from "../../../styles";
import Text from "../../../components/Text";
import { Images } from '../../../utilities/images'
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Image } from "react-native-animatable";
export const Header = props => {
    return (
        <ImageBackground
            source={Images.appbar}
            style={{ paddingHorizontal: 16, height: (props.heightSet) ? 110 : 52, justifyContent: (props.heightSet) ? 'flex-start' : 'center', paddingTop: (props.heightSet) ? 15 : 0 }}>
            <View
                // onPress={() => props.goBack()}
                style={{
                    // paddingVertical: 5,
                    // flex: 0.1,
                    alignItems: "flex-start",
                    flexDirection: "row"
                }}
            >
                {!props.hideIcon && <TouchableOpacity onPress={() => props.goBack()} style={{ flexDirection: "row" }}><Ionicons name="ios-arrow-back" size={28}
                    style={{ alignSelf: 'center' }}
                    color={colors.white} />
                    <Text p style={[styles.RsBold, { paddingLeft: 10, alignSelf: 'center', color: colors.white }]}>
                        {props.backTitle}{" "}
                    </Text>
                </TouchableOpacity>
                }
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', flex: 1 }}>
                    <Text h3 style={[styles.WsRegular, { paddingLeft: 10, alignSelf: 'center', color: Colors.white }]}>
                        {props.title}{" "}
                    </Text>
                    {
                        props.rightIcon && <TouchableOpacity style={{justifyContent:'center'}} onPress={() => (props.rightAction ? props.rightAction() : undefined)}><Image source={Images.ic_3dots}
                            style={{ alignSelf: 'center' }} />
                        </TouchableOpacity>
                    }
                </View>

            </View>
        </ImageBackground>
    )
}