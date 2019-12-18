import { Linking,View,Image } from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native'
import Lightbox from 'react-native-lightbox';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video';

import { Images } from "../../../utilities/images";

// const MapView = Platform.select({
//   web: () => require('react-native-web-maps'),
//   default: () => require('react-native-maps'),
// })

export default class CustomView extends React.Component {
  static propTypes = {
    currentMessage: PropTypes.object,
    containerStyle: ViewPropTypes.style,
    mapViewStyle: ViewPropTypes.style,
  }

  static defaultProps = {
    currentMessage: {},
    containerStyle: {},
    mapViewStyle: {},
  }

  // openMapAsync = async () => {
  //   const { currentMessage: { location = {} } = {} } = this.props

  //   const url = Platform.select({
  //     ios: `http://maps.apple.com/?ll=${location.latitude},${location.longitude}`,
  //     default: `http://maps.google.com/?q=${location.latitude},${location.longitude}`,
  //   })

  //   try {
  //     const supported = await Linking.canOpenURL(url)
  //     if (supported) {
  //       return Linking.openURL(url)
  //     }
  //     alert('Opening the map is not supported.')
  //   } catch ({ message }) {
  //     alert(message)
  //   }
  // }
  renderVideoPlayer = () => {
    return (
      <Video
      source={this.props.currentMessage.video}
        rotateToFullScreen={false}
        
        // placeholder={this.props.currentMessage.video}
        resizeMode={'contain'}
        fullScreenOnly={true}
        style={styles.backgroundVideo} 
        // cache = {true}
      />
    )
  }
  render() {
    const { currentMessage, containerStyle, mapViewStyle } = this.props
    if (currentMessage.video) {
      return (
        <View style={[ this.props.containerStyle]}>
            {/* <Lightbox
              activeProps={{
                style: styles.imageActive
              }}
              swipeToDismiss={false}
              renderContent={this.renderVideoPlayer}
            >
              <FastImage
                style={[styles.image]}
                source={Images.ic_add_white}
              >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={Images.ic_3dots} />
                </View>
              </FastImage>
            </Lightbox> */}
          </View>
        // <TouchableOpacity
        //   style={[styles.container, containerStyle]}
        //   onPress={this.openMapAsync}
        // >
        //   <MapView
        //     style={[styles.mapView, mapViewStyle]}
        //     region={{
        //       latitude: currentMessage.location.latitude,
        //       longitude: currentMessage.location.longitude,
        //       latitudeDelta: 0.0922,
        //       longitudeDelta: 0.0421,
        //     }}
        //     scrollEnabled={false}
        //     zoomEnabled={false}
        //   />
        // </TouchableOpacity>
      )
    }
    return null
  }
}

const styles = StyleSheet.create({
  containerFile: {
    width: 150,
    height: 30,
    justifyContent: 'center',
    borderRadius: 13,
    margin: 3,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  containerAudio: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    borderRadius: 13,
    margin: 3,
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3
  },
  imageActive: {
    flex: 1,
    // resizeMode: 'contain'
  },
  containerVideo: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  }
});

CustomView.defaultProps = {
  currentMessage: {},
  containerStyle: {},
};

CustomView.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
};
