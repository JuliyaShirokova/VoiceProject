import React from 'react';
import { 
  StyleSheet, 
  TouchableOpacity, 
  View,
  Text
} from 'react-native';
import { HelveticaNeue } from '../../constants/fonts';

export default ListItemRender = ( props ) => {
    _onPress = () => {
      props.onPressItem(props.level);
    };
    console.log(props.level)
    return (
        <TouchableOpacity onPress={_onPress}>
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{props.level}</Text>
          </View>
        </TouchableOpacity>
      );
  }
  const styles = StyleSheet.create({
    itemContainer: {
      height: 50,
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 25,
      borderColor: 'red'
    },
    itemText: {
      fontSize: 16,
      lineHeight: 18,
      fontFamily:  HelveticaNeue,
      color: 'red',
    
    }
  })