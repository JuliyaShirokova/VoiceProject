import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { HelveticaNeueBold } from '../../constants/fonts';
import * as colors from '../../constants/colors';
import { moderateScale } from '../../utilits/scalable';
import { PADDING_HORIZONTAL } from '../../constants/commonConstants';


export default ListItemRender = ( props ) => {
  const { item } = {...props};

    _onPressCurrent = () => {
      console.log('onPressCurrent', props)
      props.navigation.navigate(
        'Level'
        );
    };

    _onPressFuture = () => {
      props.navigation.navigate(
        'Level'
      );
    };
    _onPressDone = () => {
      props.navigation.navigate(
        'Level'
      );
    };
    
    renderComplexity = (num) => {
      return [...Array(num)].map((e, i) => <View style={styles.starContainer} key={i}><Icon name='star' size={24} /></View>)
    }

    _renderItem = (func, disabledItem, itemContainerStyle) => {
      return (
        <View style={[styles.itemContainer, itemContainerStyle]}>
        
          <TouchableOpacity
            style={styles.itemTouch}
            disabled={disabledItem}
            onPress={func}
          >
            <Text style={styles.itemText}>{item.name}</Text>
            <View style={styles.complexityContainer}>{this.renderComplexity(item.complexity)}</View>
          </TouchableOpacity>
        </View>
      
      );
    };



    _prepareRenderItem = ( item ) => {
        switch (item.status){
          case 'done': { return _renderItem( _onPressDone, true, styles.itemContainerDone ); }
          case 'current': { return _renderItem( _onPressCurrent, false, styles.itemContainerCurrent ); }
          case 'future': { return _renderItem( _onPressFuture, true, styles.itemContainerFuture); }
          default: { return _renderItem( null, true, styles.itemContainerDone ); }
        }
    };

    return _prepareRenderItem( item );
  };
  const styles = StyleSheet.create({
    itemContainer: {
      height: 40,
      width: 260,
      marginVertical: 5,
      borderRadius: 8,
      paddingHorizontal: PADDING_HORIZONTAL
    },
    itemTouch: {
      height: '100%',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 8,
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
    complexityContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    starContainer: {
      marginLeft: 5,
    }
  });
