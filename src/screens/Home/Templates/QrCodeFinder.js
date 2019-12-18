import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  Easing } from 'react-native';
import colors from '../../../utilities/config/colors';
  const { width, height } = Dimensions.get('window');

class QrFinder extends Component {
  constructor(props) {
      super(props);
      this.state= {
        animate: new Animated.Value(30),
        animateXY: new Animated.ValueXY({x:-100, y: 0})
      }
      this.aminateInterpolate = this.state.animateXY.x.interpolate({
        inputRange: [0, 150],
        outputRange: [1, 1],
        extrapolateRight: 'clamp',
      });
    }
    state = {
      xPosition: 0,
      yPosition: -95,
    }
    startAnimation() {
      Animated.sequence([
        Animated.timing(this.state.animateXY, {
          toValue: { x: 97, y: 0 },
          duration: 1500,
          friction: 1,
          tension: 2,
        }),
        Animated.timing(this.state.animateXY, {
          toValue: { x: -97, y: 0 },
          duration: 1500,
          friction: 1,
          tension: 2,
        }),
      ]).start(() => this.startAnimation());
  }

  UNSAFE_componentWillMount() {
    this.position = new Animated.ValueXY(0,0);
    this.startAnimation();
  }
  getSizeStyles() {
    return ({
      width: width-60,
      height: height/2,
      justifyContent:'center',
      alignItems:'center',

    });
  }
  render() {
    return (
      <View>
      <View style={[styles.container]}>
        {/* <Text style={{ color: '#fff', backgroundColor: 'rgba(0,0,0,0)', fontSize:20, position: 'absolute', top: 75}}> Scan an Item or QR code</Text> */}
        <View style={[styles.finder, this.getSizeStyles()]}>
          <Animated.View style={{
             ...this.position.getLayout(),
             top: this.state.animateXY.x,
             left: this.state.animateXY.y,
             borderRadius: 1,
             opacity: 1,
             backgroundColor: '#ffffff',
             width: width-60,
             transform: [{scale: this.aminateInterpolate}]
           }}>
             <View style={{borderWidth: 1, borderColor: colors.scanColor, width: width-60}} />
         </Animated.View>
          <View style={[
          {borderColor: colors.scanColor},
          styles.topLeftEdge,
          {
            borderLeftWidth: 5,
            borderTopWidth: 5,
          }
        ]} />
        <View style={[
          {borderColor: colors.scanColor},
          styles.topRightEdge,
          {
            borderRightWidth: 5,
            borderTopWidth: 5,
          }
        ]} />
        <View style={[
          {borderColor: colors.scanColor},
          styles.bottomLeftEdge,
          {
            borderLeftWidth: 5,
            borderBottomWidth: 5,
          }
        ]} />
        <View style={[
          {borderColor: colors.scanColor},
          styles.bottomRightEdge,
          {
            borderRightWidth:5 ,
            borderBottomWidth: 5,
          }
        ]} />
          </View>
      </View>
      {this.props.children}
      </View>
    );
  }
};
var styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex:1000
  },
  finder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topLeftEdge: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 75,
    height: 75,
  },
  topRightEdge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 75,
    height: 75,
  },
  bottomLeftEdge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 75,
    height: 75,
  },
  bottomRightEdge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 75,
    height: 75,
  },
});
export default QrFinder;
