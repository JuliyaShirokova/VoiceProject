import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from 'react-native';
import { HelveticaNeueBold } from '../../constants/fonts';
import * as colors from '../../constants/colors';
import { moderateScale } from '../../utilits/scalable';
import { PADDING_HORIZONTAL } from '../../constants/commonConstants';


export default ListItemRender = ( props ) => {
    const { item } = {...props};

    _onPressCurrent = () => {
      props.navigation.navigate(
        'LevelScreen',
        { key: item.key }
        );
    };

    _onPressFuture = () => {

    };

    _renderItem = (func, disabledItem, itemContainerStyle) => {
      return (
        <TouchableOpacity
          disabled={disabledItem}
          onPress={func}
        >
          <View style={[styles.itemContainer, itemContainerStyle]}>
            <Text style={styles.itemText}>{item.key}</Text>
          </View>
        </TouchableOpacity>
      );
    };



    _prepareRenderItem = ( item ) => {
        switch (item.status){
          case 'done': { return _renderItem( null, true, styles.itemContainerDone ); }
          case 'current': { return _renderItem( _onPressCurrent, false, styles.itemContainerCurrent ); }
          case 'future': { return _renderItem( _onPressFuture, true, styles.itemContainerFuture); }
          default: { return _renderItem( null, true, styles.itemContainerDone ); }
        }
    };

    return _prepareRenderItem( item );
  };
const buttonSize = Math.max(((Dimensions.get('screen').width - PADDING_HORIZONTAL * 2) * 0.2), 42);
  const styles = StyleSheet.create({
    itemContainer: {
      height: buttonSize,
      width: buttonSize,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: buttonSize / 2,
    },
    itemText: {
      fontSize: moderateScale(20),
      lineHeight: moderateScale(22),
      fontFamily:  HelveticaNeueBold,
      color: colors.white,

    },
    itemContainerDone: {
      backgroundColor: colors.doneBgColor,
    },
    itemContainerCurrent: {
      backgroundColor: colors.currentBgColor,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
    },
    itemContainerFuture: {
      backgroundColor: colors.futureBgColor,
    },
  });
