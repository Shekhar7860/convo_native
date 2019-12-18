
import React from "react";
import { SafeAreaView, View } from "react-native";

export const SafeAreaViewCustome = props => {
return <SafeAreaView style={[props.style,{flex:1}]}>
       {props.children}
     </SafeAreaView>
}