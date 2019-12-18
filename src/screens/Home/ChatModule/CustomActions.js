import PropTypes from 'prop-types'
import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
  ViewPropTypes,
} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import RNThumbnail from 'react-native-thumbnail';

// import Permissions from 'react-native-permissions'
import { Images } from '../../../utilities/images'
// import {
//   getLocationAsync,
//   pickImageAsync,
//   takePictureAsync,
// } from './mediaUtils'
let optionsPic = {
  mediaType: "photo",
  includeBase64: true,
  // compressVideoPreset:0.7
  compressImageQuality: 0.4,
  forceJpg: true,
};
export default class CustomActions extends React.Component {
  onActionsPress = () => {
    const options = [
      'Choose From Library',
      'Take Picture',
      // 'Send Location',
      'Cancel',
    ]
    const cancelButtonIndex = options.length - 1
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async buttonIndex => {
        const { onSend } = this.props
        switch (buttonIndex) {
          case 0:
            this.openPicGallery();
            // pickImageAsync(onSend)
            return
          case 1:
            this.openPicCamera();
            // takePictureAsync(onSend)
            return
          case 2:
          // getLocationAsync(onSend)
          default:
        }
      },
    )
  }
  openPicCamera = () => {
    ImagePicker.openCamera(optionsPic).then(async (response) => {
      // Same code as in above section!
      debugger
      let val = (response.path) ? response.path.split('.').pop() : null
      if (response && (response.type === "image" || val == 'jpg' || val == 'jpeg' || val == 'png')) {
        this.props.onSend({
          messageType: 'IMAGE',
          fileUrl: response.path,
          fileExt: '.jpg',
          fileType: "image/jpg"
        });
      } else {
        debugger
        let fileThumbnail = ''
        if (Platform.OS == 'ios') {
          await RNThumbnail.get(response.path).then((result) => {
            debugger
            fileThumbnail = "file://" + result.path
            // this.setState({ image: "file://" + result.path })
          })
        }
        else {
          fileThumbnail = "file://" + response.path
          // this.setState({ image: "file://" + response.path })
        }
        this.props.onSend({
          messageType: 'VIDEO',
          fileUrl: (Platform.OS == 'ios') ? response.sourceURL : response.path,
          fileThumbnail: fileThumbnail,
          fileExt: '.mp4',
          fileType: "video/mp4"
        });
      }




      // let val = (response.path) ? response.path.split('.').pop() : null
      // if (response && (response.height || response.type === "image" || val == 'jpg' || val == 'jpeg' || val == 'png')) {
      //   // if (response && (response.height || response.type === "image")) {
      //   this.props.onSend({
      //     messageType: 'IMAGE',
      //     fileUrl: response.uri,
      //     fileExt: '.jpg',
      //     fileType: "image/jpg"
      //   });
      // } else {
      //   this.props.onSend({
      //     messageType: 'VIDEO',
      //     fileUrl: response.uri,
      //     fileExt: '.mp4',
      //     fileType: "video/mp4"
      //   });
      // }
    })
  }


  openPicGallery = async () => {

    ImagePicker.openPicker(optionsPic).then(async (response) => {
      debugger
      let val = (response.path) ? response.path.split('.').pop() : null
      if (response && (response.type === "image" || val == 'jpg' || val == 'jpeg' || val == 'png')) {
        this.props.onSend({
          messageType: 'IMAGE',
          fileUrl: (Platform.OS == 'ios') ? response.sourceURL : response.path,
          fileExt: '.jpg',
          fileType: "image/jpg"
        });
      } else {
        debugger
        let fileThumbnail = ''
        if (Platform.OS == 'ios') {
          await RNThumbnail.get(response.sourceURL).then((result) => {
            debugger
            fileThumbnail = "file://" + result.path
            // this.setState({ image: "file://" + result.path })
          })
        }
        else {
          fileThumbnail = "file://" + response.path
          // this.setState({ image: "file://" + response.path })
        }
        this.props.onSend({
          messageType: 'VIDEO',
          fileUrl: (Platform.OS == 'ios') ? response.sourceURL : response.path,
          fileThumbnail: fileThumbnail,
          fileExt: '.mp4',
          fileType: "video/mp4"
        });
      }
      console.log(response);
    });







    // ImagePicker.launchImageLibrary(optionsPic, (response) => {
    //   console.log('Response = ', response);
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   }
    //   else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   }
    //   else if (response.customButton) {
    //   }
    //   else {
    //     let val = (response.path) ? response.path.split('.').pop() : null
    //     if (response && (response.height || response.type === "image" || val == 'jpg' || val == 'jpeg' || val == 'png')) {
    //       // if (response && (response.height || response.type === "image")) {
    //       this.props.onSend({
    //         messageType: 'IMAGE',
    //         fileUrl: response.uri,
    //         fileExt: '.jpg',
    //         fileType: "image/jpg"
    //       });
    //     } else {
    //       this.props.onSend({
    //         messageType: 'VIDEO',
    //         fileUrl: response.uri,
    //         fileExt: '.mp4',
    //         fileType: "video/mp4"
    //       });
    //     }
    //   }
    // });
  }
  renderIcon = () => {
    if (this.props.renderIcon) {
      return this.props.renderIcon()
    }
    return (
      <View style={[styles.wrapper,]}>
        <Image source={Images.ic_camera} style={[styles.iconText, this.props.iconTextStyle]} />
      </View>
    )
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.containerStyle]}
        onPress={this.onActionsPress}
      >
        {this.renderIcon()}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 8,
  },
  wrapper: {
    // borderRadius: 13,
    // borderColor: '#b2b2b2',
    // borderWidth: 2,
    // flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
})

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
}

CustomActions.defaultProps = {
  onSend: () => { },
  options: {},
  renderIcon: null,
  containerStyle: {},
  wrapperStyle: {},
  iconTextStyle: {},
}

CustomActions.propTypes = {
  onSend: PropTypes.func,
  options: PropTypes.object,
  renderIcon: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  iconTextStyle: Text.propTypes.style,
}