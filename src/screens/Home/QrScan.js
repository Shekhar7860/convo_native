import React from "react";
import { StyleSheet, View, Dimensions, Platform } from "react-native";

import { RNCamera } from "react-native-camera";
import { Header } from "../Auth/Templates/BackHeader";
import { styles } from "../../styles";
import QrCodeFinder from "./Templates/QrCodeFinder";
import Text from "../../components/Text";
import { SafeAreaViewCustome } from "../../components/SafeAreaView";
import colors from "../../utilities/config/colors";

const landmarkSize = 2;
const { width, height } = Dimensions.get("window");

export default class QrScanSceen extends React.Component {

  state = {
    flash: "off",
    zoom: 0,
    autoFocus: "on",
    depth: 0,
    type: "back",
    whiteBalance: "auto",
    ratio: "16:9",
    canDetectFaces: false,
    canDetectText: false,
    canDetectBarcode: true,
    faces: [],
    textBlocks: [],
    barcodes: []
  };

  barcodeRecognized = ({ barcodes }) => {
    let { setToastMessage } = this.props.screenProps.actions;
    let { toastRef } = this.props.screenProps;
    let { params } = this.props.navigation.state;
    if (barcodes && barcodes.length > 0 && barcodes[0].data) {
      if (params && params.updateList) {
        let data = params.data;
        data["isScan"] = true;
        params.updateList(data);
        setToastMessage(true, "green");
        toastRef.show("Successfully Scaned bag", "green");
        this.props.navigation.goBack();
      } else {
        toastRef.show("Error in Qr code", colors.danger);
      }
    } else {
      toastRef.show("Something wrong in qrcode", colors.danger);
    }
  };
  renderBarcodes = () => (
    <View style={appStyles.facesContainer} pointerEvents="none">
      {this.state.barcodes.map(this.renderBarcode)}
    </View>
  );

  renderBarcode = ({ bounds, data, type }) => (
    <React.Fragment key={data + bounds.origin.x}>
      <View
        style={[
          appStyles.text,
          {
            ...bounds.size,
            left: bounds.origin.x,
            top: bounds.origin.y
          }
        ]}
      >
        <Text style={[appStyles.textBlock]}>{`${data} ${type}`}</Text>
      </View>
    </React.Fragment>
  );

  renderCamera() {
    const { canDetectFaces, canDetectText, canDetectBarcode } = this.state;
    return (
      <QrCodeFinder>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{
            height: Platform.OS == "android" ? height / 2 : height / 2 + 100
            // flex:1,
            // justifyContent: "space-between"
          }}
          type={this.state.type}
          flashMode={this.state.flash}
          autoFocus={this.state.autoFocus}
          // zoom={this.state.zoom}
          whiteBalance={this.state.whiteBalance}
          // ratio={this.state.ratio}
          focusDepth={this.state.depth}
          androidCameraPermissionOptions={{
            title: "Permission to use camera",
            message: "We need your permission to use your camera",
            buttonPositive: "Ok",
            buttonNegative: "Cancel"
          }}
          faceDetectionLandmarks={
            RNCamera.Constants.FaceDetection.Landmarks
              ? RNCamera.Constants.FaceDetection.Landmarks.all
              : undefined
          }
          onFacesDetected={canDetectFaces ? this.facesDetected : null}
          onTextRecognized={canDetectText ? this.textRecognized : null}
          onGoogleVisionBarcodesDetected={
            canDetectBarcode ? this.barcodeRecognized : null
          }
        />
      </QrCodeFinder>
    );
  }
  render() {
    return (
      <SafeAreaViewCustome
        style={{ flex: 1, backgroundColor: "rgb(246,249,255)" }}
      >
        <View style={{ flex: 1, backgroundColor: "rgb(246,249,255)" }}>
          <View style={[styles.rowWithPadding]}>
            <Header
              goBack={() => this.props.navigation.goBack()}
              title={"Cancel"}
              hideIcon
            />
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text p style={[styles.WsRegular]}>
                QR SCAN
              </Text>
            </View>
          </View>
          <View style={{ marginTop: Platform.OS == "android" ? 65 : 0 }}>
            {this.renderCamera()}
          </View>
          <View
            style={{
              marginTop: Platform.OS == "android" ? 65 : 0,
              flex: 0.5,
              alignItems: "center",
              paddingVertical: 16
            }}
          >
            <Text p style={{ color: "rgb(78,89,116)", fontSize: 14 }}>
              Please scan the QR code in the tag
            </Text>
          </View>
        </View>
      </SafeAreaViewCustome>
    );
  }
}

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#000"
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: "white",
    borderWidth: 1,
    padding: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  autoFocusBox: {
    position: "absolute",
    height: 64,
    width: 64,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "white",
    opacity: 0.4
  },
  flipText: {
    color: "white",
    fontSize: 15
  },
  zoomText: {
    position: "absolute",
    bottom: 70,
    zIndex: 2,
    left: 2
  },
  picButton: {
    backgroundColor: "darkseagreen"
  },
  facesContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    top: 0
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: "absolute",
    borderColor: "#FFD700",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: "absolute",
    backgroundColor: "red"
  },
  faceText: {
    color: "#FFD700",
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    backgroundColor: "transparent"
  },
  text: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: "absolute",
    borderColor: "#F00",
    justifyContent: "center"
  },
  textBlock: {
    color: "#F00",
    position: "absolute",
    textAlign: "center",
    backgroundColor: "transparent"
  }
});
