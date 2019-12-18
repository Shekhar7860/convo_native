
import React, { Component } from "react";
import {
  TextInput,
  View,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  Image
} from "react-native";
// import colors from "../utilities/config/colors";
import { normalize } from "../utilities/helpers/normalizeText";
import Text from '../components/Text'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import colors from "../utilities/config/colors";
import DropDownList from "./dropdown";
import CountryPicker, {
  getAllCountries
} from 'react-native-country-picker-modal'
export default class  TextInputLabel extends Component {
  render() {
    let { isFocused, value } = this.props;
    let labelStyle = {
      position: "absolute",
      left: 0,
      // fontFamily: 'campton-light',
      top: !isFocused && !value ? (this.props.label == 'Phone Number') ? 0 :
        (this.props.redCheck ? 5 : 20) : -5,
      fontSize: !isFocused ? normalize(12) : normalize(11),
      color: !isFocused ? (this.props.profile)? colors.primary:colors.white : (this.props.profile)?colors.primary: colors.white
    }
    return (
   
      <View style={{ paddingTop: this.props.label ? 10 : 10 }} >

        {this.props.label ? (
          <Text
            style={[
              labelStyle,
              {
                fontWeight: isFocused ? "500" : null
              }
            ]}
          >
            {this.props.label.toUpperCase()}
          </Text>
        ) : null}
        {this.props.label || this.props.showPassword ? (
          <View
            style={[
              !this.props.label && styles.inputStyle,
              { flexDirection: "row", justifyContent: "space-between" }
            ]}
          >
            {
              this.props.label == 'Phone Number' &&
              <View style={{
                flexDirection: 'row',
                borderBottomWidth: this.props.label ? 1 : 0,
                borderBottomColor: isFocused
                  ?(this.props.profile)? colors.primary:colors.white
                  : "rgba(0,0,0,0.11)",
                paddingTop: 10,
                flex: 0.3,
              }}>
                <CountryPicker
                  onChange={value => {
                    this.props.setState(value)
                  }}
                  countyCss={{
                    justifyContent: 'center',
                    paddingLeft: 0,
                  }}
                  cca2={this.props.cca2}
                  translation="eng"
                />
                <View style={{ justifyContent: 'center' }}>
                  <MaterialIcons
                    name="arrow-drop-down"
                    size={28}
                    color={colors.black}
                  />
                </View>
                <View style={{ justifyContent: 'center', paddingLeft: 8, paddingBottom: 4 }}>
                  <Text h5 style={{fontSize: normalize(14),color:colors.primary}}>{this.props.callingCode}</Text>
                </View>
              </View>
            }
            <View style={{

              flex: this.props.showPassword ? 0.8 : (this.props.cca2) ? 0.7 : 1
            }}>
              <TextInput
                style={{
                  height: 42,
                  paddingLeft: (this.props.callingCode) ? 16 : 0,
                  paddingTop: (this.props.callingCode) ? (Platform.OS=='ios')?8:16 : 0,
                  fontSize: normalize(14),
                  color: isFocused ? (this.props.profile)? colors.primary:colors.white :(this.props.profile)?colors.primary: colors.white,
                  borderBottomWidth: this.props.label ? 1 : 0,
                  borderBottomColor: isFocused
                    ? (this.props.profile)? colors.primary:colors.white
                    : "rgba(0,0,0,0.11)"
                }}
                keyboardType={(this.props.callingCode)?'numeric':'default'}
                blurOnSubmit={false}
                {...this.props}
                placeholderTextColor={'red'}
                ref={ref => (this.props.refs ? this.props.refs(ref) : null)}
              />
            </View>
            {this.props.showPassword && (
              <TouchableOpacity
                onPress={() =>
                  this.props.onShowPassword ? this.props.onShowPassword() : null
                }
                style={{
                  flex: 0.2,
                  borderBottomWidth: 1,
                  borderBottomColor: isFocused
                    ? (this.props.profile)? colors.primary:colors.white
                    : "rgba(0,0,0,0.11)",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {this.props.secureTextEntry ? (
                  <MaterialIcons
                    name="visibility-off"
                    size={28}
                    color={(this.props.profile)? colors.primary:colors.white}
                  />
                ) : (
                    <MaterialIcons
                      name="visibility"
                      size={28}
                      color={(this.props.profile)? colors.primary:colors.white}
                    />
                  )}
              </TouchableOpacity>
            )}
          </View>
        ) : (
            <TouchableWithoutFeedback
              onPress={() => (this.props.onPress ? this.props.onPress() : null)}
              style={[
                this.props.viewTextStyle,
                {
                  // borderColor: borderColor.borderColor,
                  borderRadius: 4,
                  flexDirection: "row",
                  flex: 1,
                  // paddingVertical: 5,
                  marginTop: 10,
                  paddingLeft: 15
                }
              ]}
              disabled={this.props.editable}
            >
              <View style={[styles.inputStyle, , { borderColor: (this.props.placehlderTxtColor) ? colors.primary : '' }]}>
                <TextInput
                  ref={ref => (this.props.refs ? this.props.refs(ref) : null)}
                  style={[styles.input, { ...this.props.style }]}
                  placeholderTextColor={this.props.placehlderTxtColor ? colors.primary : colors.primary}
                  {...this.props}
                // placeholderTextColor={this.props.placehlderTxtColor?'red':''}
                />
                {
                  this.props.rightIcon ?
                    <View style={{marginTop:10}}>
                      <MaterialIcons
                        name="arrow-drop-down"
                        size={28}
                        color={colors.primary}
                      />
                    </View>
                    : <MaterialIcons
                      name="arrow-drop-down"
                      size={28}
                      color={colors.white}
                    />
                }

              </View>
            </TouchableWithoutFeedback>
          )}
        <View>
          {this.props.openDropDown ? <DropDownList
            {...this.props}
          /> : null}
        </View>
      </View>

    );
  }
}

const styles = {
  inputStyle: {
    // borderRadius: 48 / 2,
    height: 48,
    borderColor: "rgb(221,221,221)",
    borderBottomWidth: 2,
    flexDirection: 'row',
    backgroundColor: 'rgb(248,249,251)',
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  input: {
    fontSize: normalize(14),
    flex: 1,
  }
};




// import React, {Component} from "react";
// import {
//   TextInput,
//   View,
//   Animated,
//   Text,
//   TouchableOpacity,
//   Platform,
//   Image
// } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";

// import styles from "../styles";
// import { string } from "../utilities/languages/i18n";
// import { fonts } from "../utilities/contsants";
// import { normalize } from "../utilities/helpers/normalizeText";
// import colors from "../utilities/config/colors";
// import DropDownList from "./DropDownList";

// export default class TextInputLabel extends Component {
//   render() {
//     let { isFocused } = this.props;
//     let labelStyle = {
//       // position: 'absolute',
//       // left: 0,
//       // top: !isFocused ? 5 : -10,

//       fontSize: !isFocused ? normalize(16) : normalize(16),
//       color: !isFocused ? "rgba(0,0,0,0.56)" : "#96C50F",
//       ...styles.text
//     };
//     if (this.props.bankAccount) {
//       labelStyle = {
//         fontSize: normalize(15),
//         color: "#000000",
//         ...styles.text
//       };
//     }
//     let borderColor = {
//       borderColor: !isFocused ? "rgba(0,0,0,0.2)" : "#96C50F"
//     };
//     // let {textAlign,fontFamilyBold,fontFamilyRegular} = this.props.user
//     return (
//       <View style={{ marginTop: 10 }}>
//         <Text p style={labelStyle}>
//           {this.props.label}
//         </Text>
//         <TouchableOpacity
//           onPress={() => (this.props.onPress ? this.props.onPress() : null)}
//           style={[
//             this.props.viewTextStyle,
//             {
//               borderColor: borderColor.borderColor,
//               borderRadius: 4,
//               flexDirection: "row",
//               // paddingVertical: 5,
//               marginTop: 10,
//               paddingLeft: 15
//             }
//           ]}
//           disabled={this.props.editable}
//         >
//           <View
//             style={{
//               flex:
//                 this.props.rightIcon && this.props.rightIcon != null ? 0.9 : 1
//             }}
//           >
//             <TextInput
//               style={{
//                 height: 48,
//                 fontSize: normalize(20),
//                 textAlign: "left",
//                 // fontWeight: "500",
//                 color: '#000000',
//                 fontFamily: fonts.sourcesanspro,


//                 ...styles.text,
//                 ...this.props.textInputStyle,
//                 // lineHeight:16
//                 // borderBottomWidth: 1, borderBottomColor: isFocused ? '#75B152' : 'rgba(0,0,0,0.11)'
//               }}
//               {...this.props}
//               // secureTextEntry={this.props.secureTextEntry?this.props.secureTextEntry:false}
//               ref={ref =>
//                 this.props.inputMenthod ? this.props.inputMenthod(ref) : null
//               }
//             />
//           </View>

//           {this.props.rightIcon && this.props.rightIcon != null ? (
//             <View
//               style={{
//                 flex: 0.1,
//                 paddingRight: 16,
//                 justifyContent: "center",
//                 alignItems: "flex-end"
//               }}
//             >
//               {
//                 <Image source={this.props.rightIcon} />
//               }
//               {/* <Ionicons
//                 name={this.props.rightIcon}
//                 size={18}
//                 color={"#96C50F"}
//               /> */}
//             </View>
//           ) : null}

//           {/* <View style={{ height: 20 }} /> */}
//         </TouchableOpacity>
//         {this.props.openDropDown ? <DropDownList
//           {...this.props}
//         /> : null}

//       </View>
//     );
//   }
// }