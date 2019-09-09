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
import { HelveticaNeue } from '../../constants/fonts';
import { moderateScale } from '../../utilits/scalable';


export default class LevelsList extends PureComponent{
    
    _keyExtractor = (item, index) => (item.key).toString();
  
    _renderItem = (item) => {
        return <ListItemRender
            item={item.item}
            navigation={this.props.navigation}
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
        paddingTop: '20%',
        alignItems: 'center'
    },
    row: {
        width: '100%',
        paddingVertical: '2.5%',
        paddingHorizontal: PADDING_HORIZONTAL,
        justifyContent: "space-around"
    },
    flatList: {
        width: '100%',
        height: '100%',
        flexWrap: 'wrap',
    }
})