import React from "react";
import { StyleSheet, View } from 'react-native';
import {
    BarIndicator,

} from 'react-native-indicators'
import colors from "../utilities/config/colors";

const Indicator = (props) => {
    return <View style={styles.loading}>
        <BarIndicator color={colors.primary}
        size={28}
        count={4}
        
        />
    </View>

};
export default Indicator
const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        display: 'flex',
        top: 0,
        justifyContent: 'space-around',
        bottom: 0,
        alignItems: 'center',
        zIndex: 100000,
        // justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)'
    }

});
