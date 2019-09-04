import React, { PureComponent } from 'react';
import { 
    View,
    FlatList,
    Text, 
    SectionList, 
    TouchableOpacity, 
    StyleSheet 
} from 'react-native';
import ListItemRender from '../ListItemRender';
import { PADDING_HORIZONTAL } from '../../constants/commonConstants';


export default class LevelsList extends PureComponent{
    
    _keyExtractor = (item, index) => (item.key).toString();
  
    _onPressItem = ( key ) => { };
  
    _renderItem = (item) => {
        console.log(item);
        return <ListItemRender
          level={item.item.key}
          onPressItem={this._onPressItem}
          status={item.status}
        />
    }
  
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.flatList}
                    data={this.props.listData}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    horizontal={false}
                    numColumns={4}
                    columnWrapperStyle={styles.row}
                />
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    row: {
        width: '100%',
        borderWidth: 1,
        paddingHorizontal: PADDING_HORIZONTAL,
        justifyContent: "space-around"
    },
    flatList: {
        width: '100%',
        height: '100%',
        flexWrap: 'wrap'
    }
})