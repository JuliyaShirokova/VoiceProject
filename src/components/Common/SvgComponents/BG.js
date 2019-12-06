
import React from 'react';
import {
  Svg,
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  Text,
  Use,
  Defs,
  Stop,
} from 'react-native-svg';
import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

export default function BG(props) {
  return (
    <Svg
      height={height}
      width={width}
      fill="none"
      viewBox="0 0 322 568"
      style={styles.svg}
      >
      <Defs>
        <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor={props.startColor} stopOpacity="1" />
            <Stop offset="50%" stopColor={props.startColor} stopOpacity="1" />
            <Stop offset="70%" stopColor={props.stopColor} stopOpacity="1" />
            <Stop offset="100%" stopColor={props.stopColor} stopOpacity="1" />
          </LinearGradient>
      </Defs>
    	<Path d="M0 0H322V568H0V0Z" fill="url(#grad)"/>

    </Svg>
  );
}
const styles = StyleSheet.create({
  svg: {},
})
;