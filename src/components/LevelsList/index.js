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
import { levelUp, levelsReset } from '../../actions';
import { connect } from 'react-redux';
import { maxLevel, levelsSource } from '../../sources/levelsSource';
import BackgroundPage from '../Common/BackgroundPage';
import { getThemeColor } from '../../utilits/themeColorFunctions';

class LevelsList extends PureComponent{
    
    constructor(props){
        super(props);

        this._getThemeColor = getThemeColor;
    }
    _keyExtractor = (item, index) => (item.key).toString();
  
    _renderItem = (item) => {
        return <ListItemRender
            item={item.item}
            navigation={this.props.navigation}
        />
    }
  
    render() {
        const { levels, themeColor } = this.props;
        const { startColor, stopColor } = this._getThemeColor(themeColor);
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.flatList}
                    data={this.props.listData}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    horizontal={false}
                    numColumns={1}
                />
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingTop: '7%',
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    flatList: {
        width: '100%',
        height: '100%',
    }
})

const getListData = (arrLevels) => {
    const arr = []
    const arrLength = arrLevels.length
    const currInd = arrLevels[arrLength - 1];
    
    for (let i = 1; i <= maxLevel; i++) {
        const el = levelsSource && levelsSource['level-'+i];
        if (arrLevels.find(el => el == i) && (currInd != i)) {
            arr.push({ key: i, status: 'done',  name: el['name'], complexity: el['complexity']})
        } else if (currInd == i) {
            arr.push({ key: i, status: 'current', name: el['name'], complexity: el['complexity']})
        } else {
            arr.push({ key: i, status: 'future',  name: el['name'], complexity: el['complexity'] })
        }
    }
    return arr
}
  
const mapStateToProps = state => {
    console.log('Levels list container', JSON.stringify(state))
    return ({
      levels: state.levels,
      listData: getListData(state.levels.level),
      themeColor: state.settings.themeColor,
    })
}
  
const mapDispatchToProps = dispatch => ({
  //  onLevelUp: (res) => dispatch(levelUp(res)),
  //  onlevelsReset: () => dispatch(levelsReset())
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LevelsList)
  