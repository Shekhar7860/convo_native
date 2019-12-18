import PropTypes from 'prop-types';
import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native';
import fonts from '../utilities/config/font';
import {normalize,textAligner} from '../utilities/helpers/normalizeText';
import colors from '../utilities/config/colors';
import {styles} from '../styles'
const TextElement = props => {
  const { style, children, h1, h2, h3, h4,h5,h6,p, textAlign,fontFamily, ...rest } = props;
  return (
    <Text
      style={[
        styles.text,
        h1 && { fontSize: normalize(40) },
        h2 && { fontSize: normalize(31) },
        h3 && { fontSize: normalize(28) },
        h4 && { fontSize: normalize(22) },
        h5 && { fontSize: normalize(18) },
        h6 && { fontSize: normalize(14) },
        p && { fontSize: normalize(16) ,color:colors.textColor,lineHeight:24},
        
        h1 && styles.WsMedium,
        h2 && styles.WsMedium,
        h3 && styles.WsMedium,
        h4 && styles.WsMedium,
        h5 && styles.WsMedium ,
        textAlign && {textAlign : textAligner('center')},
        // h6 && styles.bold,
        fontFamily && { fontFamily },
        style && style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

TextElement.propTypes = {
  style: PropTypes.any,
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  h5: PropTypes.bool,
  h6: PropTypes.bool,
  p: PropTypes.bool,
  textAlign:PropTypes.bool,
  fontFamily: PropTypes.string,
  children: PropTypes.any,
};

export default TextElement;
