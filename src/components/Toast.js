import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
// import Toast, { DURATION } from "react-native-easy-toast";
import * as Animatable from 'react-native-animatable';
const ToastShow = props => {
  return (
    <Animatable.View 
    animation={'slideInDown'}
    duration={500}
    style={[styles.container, { top: 20 }]} 
      pointerEvents="none">
      <View
        style={[
          styles.content,
          {
            backgroundColor:props.color
          }
        ]}
       >
        {React.isValidElement(props.message) ? (
          props.message
        ) : (
          <Text style={styles.text}>{props.message}</Text>
        )}
      </View>
    </Animatable.View>
  );
};
const styles = {
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    flex:1,
    elevation: 999,

    // alignItems: 'center',
    zIndex: 10000,
},
content: {
    backgroundColor: 'black',
    borderRadius: 0,
    padding: 10,
},
text: {
    color: 'white',
    fontSize:14
}
};
export default ToastShow;
