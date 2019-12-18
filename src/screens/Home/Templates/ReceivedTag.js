import React from "react";
import { View, Keyboard, Dimensions,Image,Platform } from "react-native";
import SignatureCapture from 'react-native-signature-capture';

import colors from "../../../utilities/config/colors";
import { styles } from "../../../styles";
import Text from "../../../components/Text";

import TextFieldInput from "../../../components/TextInput";
const { width, height } = Dimensions.get("window");

// Received Tag
export  class ReceivedTagView extends React.Component {
  constructor(props) {
    super(props);
  }
/************ Signature Finction  ****************/
  _onSaveEvent(result) {
    console.log(result,"signature",)
  }
  _onDragEvent(result) {
  if(this.props.onDragOnSignature){
    this.props.onDragOnSignature(result.dragged)
  }
  }
  saveSign() {
    if (Platform.OS == "android") {
        Permissions.check('storage')
            .then(response => {
                if (response == "authorized") {
                    this.refs["sign"].saveImage();
                } else {
                    Permissions.request('storage')
                        .then(response => {
                            if (response == "authorized") {
                                this.refs["sign"].saveImage();
                            } else {
                                // this.setState({ imageModalVisible: false }, () => {
                                 setTimeout(() => { Alert.alert("Please provide permission to use location") }, 1000);
                                // })
                            }
                        }).catch((err) => {
                            Alert.alert("Please provide permission to use to read storage")
                        })
                }
            }).catch((err) => {
                console.log(err);
            });
    } else {
        this.refs["sign"].saveImage();
    }
}
resetSign = () => {
    this.refs["sign"].resetImage();
}
  render(){
  let { onChangeText } = this.props;
  return (
    <View style={{ flexDirection: "row", flex: 1 }}>
      <View>
        <RedCheckInfo {...this.props} />
      </View>
      <View style={{ flex: 1, paddingRight: 16 }}>
        <TextFieldInput
          label={"Name"}
          redCheck
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          onChangeText={text => onChangeText(text)}
          onSubmitEditing={event => {
            Keyboard.dismiss();
          }}
          returnKeyType="done"
          value={this.props.name}
        />
        <View style={{ height: (height / height) * 58 }} />
        <View style={styles.paddingVertical}>
          <Text style={[styles.medium, { color: "rgb(147,147,156)" }]}>
            {`SIGNATURE`}
          </Text>
        </View>
        
         <SignatureCapture
            ref="sign"
            style={[{height:height/4},styles.signature]}
            onSaveEvent={this._onSaveEvent}
            onDragEvent={this._onDragEvent.bind(this)}
            saveImageFileInExtStorage={true}
            showBorder={false}
            showNativeButtons={false}
            showTitleLabel={false}
        />
      </View> 
    </View>
  );
  }
};

// Check Info
const RedCheckInfo = props => {
  return (
    <View style={[styles.paddingHoriZontal]}>
      <View>
          {
              props.name ? 
              <Image source={require("../../../assets/images/redCheckSuccess.png")} />
              : <Image source={require("../../../assets/images/redCheck.png")} />
          }
        <View
          style={{
            marginLeft: 10,
            width: 2,
            height: 100,
            backgroundColor: colors.primary
          }}
        />
         {
              props.signature ? 
              <Image source={require("../../../assets/images/redCheckSuccess.png")} />
              : <Image source={require("../../../assets/images/redCheck.png")} />
          }
      </View>
    </View>
  );
};
