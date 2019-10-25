import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, Image, TouchableHighlight } from 'react-native';
import { MAX_LEVEL } from '../../../constants/commonConstants'
import Voice from 'react-native-voice';
import { lastInArray } from '../../../utilits/lastInArray';
import { levelsSource } from '../../../sources/levelsSource';

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
        console.log(valTransforming, wordTransforming, valTransforming == wordTransforming)
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
      console.log("next sublevel");
      this._onSublevelUp();
    }else if (( currSublevel >= maxSublevel) && ( currLevel < MAX_LEVEL)) {
      console.log("Next level");
      this._onLevelUp();
    }else if (currLevel >= MAX_LEVEL){
      console.log(" You are Win!")
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

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });
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
        <TouchableHighlight onPress={this._startRecognizing}>
          <Text style={styles.action}>Start</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._stopRecognizing}>
          <Text style={styles.action}>Stop Recognizing</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._cancelRecognizing}>
          <Text style={styles.action}>Cancel</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._destroyRecognizer}>
          <Text style={styles.action}>Destroy</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
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
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
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
});

export default Microphone;