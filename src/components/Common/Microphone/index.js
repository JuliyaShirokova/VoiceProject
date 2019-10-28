import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, Image, TouchableHighlight } from 'react-native';
import { maxLevel } from '../../../sources/levelsSource';
import Voice from 'react-native-voice';
import { lastInArray } from '../../../utilits/lastInArray';
import { levelsSource } from '../../../sources/levelsSource';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

class Microphone extends Component {
  state = {
    recognized: '',
    pitch: '',
    error: '',
    end: '',
    started: '',
    results: [],
    partialResults: [],
  };

  constructor(props) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }
  checkResults = () => {
    const { displayData } = this.props;
    const word = displayData["word"];
    const arrValue = [...this.state.results, ...this.state.partialResults];
    console.log("arr value", arrValue);
   
    if (arrValue.find((value, ind, arr) => {
      //  console.log('item-'+ind, arr[ind], word)
        const valTransforming = arr[ind].toString().toLowerCase();
        const wordTransforming = word.toString().toLowerCase();
      //  console.log(valTransforming, wordTransforming, valTransforming == wordTransforming)
        return valTransforming == wordTransforming
      })){
      //  this._stopRecognizing();
        this._changeLevel();
      }
  }

  onSpeechStart = e => {
    console.log('onSpeechStart: ', e);
    this.setState({
      started: '√',
    });
  };

  onSpeechRecognized = e => {
    console.log('onSpeechRecognized: ', e);
    
    this.setState({
      recognized: '√',
    },
    this.checkResults);
  };

  onSpeechEnd = e => {
    console.log('onSpeechEnd: ', e);
    this.setState({
      end: '√',
    },
    this.checkResults);
  };

  onSpeechError = e => {
    console.log('onSpeechError: ', e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  _onSublevelUp = () => {
    const { onSublevelUp } = this.props;
    onSublevelUp();
  }
  _onLevelUp = () => {
    const {  onLevelUp } = this.props;
    onLevelUp();  
  }

  _changeLevel = () => {
    
    const { levels } = this.props;
    console.log('level props', JSON.stringify(levels))
    const arrLevel = levels.level;

    const currLevel = lastInArray(arrLevel);
    console.log('current level', currLevel.toString());
    const currArrSublevel = levelsSource && levelsSource['level-'+currLevel];
    console.log('arr source ', JSON.stringify(levelsSource));
    const maxSublevel = currArrSublevel && currArrSublevel.length;
    
    const arrSublevel = levels.sublevel;
    const currSublevel = lastInArray(arrSublevel);
    console.log('current sublevel', currSublevel.toString());
    
    if( currSublevel < maxSublevel){
      Alert.alert("Молодец!");
      this._onSublevelUp();
    }else if (( currSublevel >= maxSublevel) && ( currLevel < maxLevel)) {
      Alert.alert("Отлично!", "Переходи на новий уровень!");
      this._onLevelUp();
    }else if (currLevel >= maxLevel){
      Alert.alert("Ты все прочитал!")
    }
  }

  onSpeechResults = e => {
    console.log('onSpeechResults: ', e);
    this.setState({
      results: e.value,
    },
    this.checkResults);
  };

  onSpeechPartialResults = e => {
    console.log('onSpeechPartialResults: ', e);
    this.setState({
      partialResults: e.value,
    },
    this.checkResults);
  };

  onSpeechVolumeChanged = e => {
    //console.log('onSpeechVolumeChanged: ', e);
    this.setState({
      pitch: e.value,
    });
  };

  _startRecognizing = async () => {
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });

    try {
      console.log('start')
      await Voice.start('ru-RU');
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
      console.log("stop");
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native Voice!</Text>
        <Text style={styles.instructions}>Press the button and start speaking.</Text>
        <Text style={styles.stat}>{`Started: ${this.state.started}`}</Text>
        <Text style={styles.stat}>{`Recognized: ${this.state.recognized}`}</Text>
        <Text style={styles.stat}>{`Pitch: ${this.state.pitch}`}</Text>
        <Text style={styles.stat}>{`Error: ${this.state.error}`}</Text>
        <Text style={styles.stat}>Results</Text>
        {this.state.results.map((result, index) => {
          return (
            <Text key={`result-${index}`} style={styles.stat}>
              {result}
            </Text>
          );
        })}
        <Text style={styles.stat}>Partial Results</Text>
        {this.state.partialResults.map((result, index) => {
          return (
            <Text key={`partial-result-${index}`} style={styles.stat}>
              {result}
            </Text>
          );
        })}
        <Text style={styles.stat}>{`End: ${this.state.end}`}</Text>
        <View
          style={[styles.buttonContainer, styles.startContainer]}
        >
          <TouchableHighlight
            onPress={this._startRecognizing}
            style={[styles.buttonTouch, styles.startTouch]}
          >
            <Icon
              name='microphone'
              size={24}
              color='#ffffff'
            />
          </TouchableHighlight>
        </View>
        <View
          style={[styles.buttonContainer, styles.stopContainer]}
        >
          <TouchableHighlight 
            onPress={this._stopRecognizing}
            style={[styles.buttonTouch, styles.startTouch]}
          >
            <Icon
              name='microphone-slash'
              size={24}
              color='#ffffff'
            />
          </TouchableHighlight>
        
        </View>
     </View>
    );
  }
}

const buttonSize=80;

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
  buttonContainer: {
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize/2,
  },
  startContainer: {
    backgroundColor: 'green'
  },
  stopContainer: {
    backgroundColor: 'red'
  },
  buttonTouch: {
    width: '100%',
    height: '100%',
    borderRadius: buttonSize/2,
    justifyContent: 'center',
    alignItems: 'center'
  },

});

export default Microphone;