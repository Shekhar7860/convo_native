import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Modal from 'react-native-modal';

import { styles } from "../styles";
export default  CustomModal = props => {
  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={()=>props.closeModal()}
    //   onSwipeComplete={() => props.closeModal()}
    //   swipeDirection={["up", "left", "right", "down"]}
      style={styles.bottomModal}
    >
      {props.children}
    </Modal>
  );
};
