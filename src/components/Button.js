import React from "react";
import {
  TouchableNativeFeedback,
  TouchableHighlight,
  StyleSheet,
  View,
  Platform,
  Image,
} from "react-native";
import colors from "../utilities/config/colors";
import {styles} from '../styles'
import Text from './Text'
const Button = props => {
  const {
    disabled,
    title,
    titleView,
    buttonStyle,
    backColor,
    borderRadius,
    buttonTextStyle,
    onPress,
    color,
    fontSize,
    underlayColor,
    raised,
    textStyle,
    containerViewStyle,
    numberOfLines,
    ...attributes
  } = props;
  let { Component } = props;
  if (!Component && Platform.OS === "ios") {
    Component = TouchableHighlight;
  }
  if (!Component && Platform.OS === "android") {
    Component = TouchableNativeFeedback;
  }
  if (!Component) {
    Component = TouchableHighlight;
  }
  if (Platform.OS === "android" && (borderRadius && !attributes.background)) {
    attributes.background = TouchableNativeFeedback.Ripple(
      "ThemeAttrAndroid",
      true
    );
  }
  
  return (
    <View
      style={[btnStyles.container, raised && btnStyles.raised, containerViewStyle]}
    >
      <Component
        underlayColor={underlayColor || "transparent"}
        onPress={onPress || log}
        disabled={disabled || false}
        {...attributes}
      >
        <View
          style={[
           (!backColor)? btnStyles.button:btnStyles.buttonLogin,
            buttonStyle && buttonStyle
          ]
          // ,          {backgroundColor:backColor}
        }
        >
        <View style={{ flexDirection: "row", flex: 1 }}>
            {title ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-start",
                  paddingLeft: 10
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={[
                      styles.bold,
                      color && { color },
                      fontSize && { fontSize },
                      textStyle && textStyle,
                      buttonTextStyle && buttonTextStyle
                    ]}
                    numberOfLines={numberOfLines ? numberOfLines : 5}
                  >
                    {title}
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </Component>
    </View>
  );
};
const btnStyles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
  },
  button: {
    borderRadius: 48/2,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonLogin:{
    borderRadius: 48/2,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    color: "white",
    fontWeight: "500",
  },
  iconLeft: {
    alignSelf: "center"
  }
});

export default Button;
