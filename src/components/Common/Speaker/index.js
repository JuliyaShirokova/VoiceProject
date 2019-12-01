import React, { Component } from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Button,
    FlatList,
    TextInput,
    Keyboard
  } from "react-native";
import Tts from "react-native-tts";
  
  export default class Speaker extends Component {
    state = {
      voices: [],
      ttsStatus: "initiliazing",
      selectedVoice: null,
    };
  
    constructor(props) {
      super(props);
     
      Tts.addEventListener("tts-start", event =>
        this.setState({ ttsStatus: "started" })
      );
      Tts.addEventListener("tts-finish", event =>
        this.setState({ ttsStatus: "finished" })
      );
      Tts.addEventListener("tts-cancel", event =>
        this.setState({ ttsStatus: "cancelled" })
      );
      Tts.setDefaultRate(this.props.speechRate);
      Tts.setDefaultPitch(this.props.speechPitch);
    }

    componentDidMount = async () => {
       console.log('cdm speaker')
       await Tts.getInitStatus()
        .then( () => this.initTts() )
        .catch( err => console.log('error init tts ', err));
    }
    
    transformToArray = (word) => word.split('-') || [word]

    getSyllableWord = () => {
      const { speakedWord } = this.props;
      return this.transformToArray(speakedWord);
    }

    renderSyllableWord = () => {
      const arrWord = this.getSyllableWord();
      console.log('render syllable word', arrWord);
      return arrWord.map((value, index, arr) => {
      const elem = arr[index];
      return (<View
                  key = {value + index} 
                  style={styles.syllableHolder}>
                  <TouchableOpacity
                    style={styles.syllableTouch}
                    onPress = { () => {
                      return this.speakSyllable( elem );
                    } }
                  >
                    <Text style={styles.syllableText}>{value}</Text>
                  </TouchableOpacity>
              </View>);
        })
    }

    speakSyllable = async (text) => {
      console.log('onPress speak', text)
        await Tts.stop();
        await Tts.speak(text);
    }

    initTts = async () => {
      const voices = await Tts.voices();
      const availableVoices = voices
        .filter(v => !v.networkConnectionRequired && !v.notInstalled)
        .map(v => {
          return { id: v.id, name: v.name, language: v.language };
        });
      let selectedVoice = null;
      if (voices && voices.length > 0) {
        selectedVoice = voices[0].id;
        try {
          await Tts.setDefaultLanguage(voices[0].language);
        } catch (err) {
          await Tts.setDefaultLanguage('ru-RU');
          console.log('Default language set RU. SetDefaultLanguage error ', err);
        }
        await Tts.setDefaultVoice(voices[0].id);
        this.setState({
          voices: availableVoices,
          selectedVoice,
          ttsStatus: 'initialized'
        });
      } else {
        this.setState({ ttsStatus: 'initialized' });
      }
    };
  
    render() {
      return (
        <View style={styles.container}>
          <View
            style={styles.wordContainer}
          >
            { this.renderSyllableWord() }
          </View>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF"
    },
    wordContainer: {
      height: 140,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    syllableHolder: {
      marginHorizontal: 3,
      borderBottomWidth: 2,
      borderColor: 'orange',
    },
    syllableTouch: {
    },
    syllableText: {
      fontSize: 48,
      lineHeight: 48,
      fontWeight: 'normal',
      paddingVertical: 10,
    }
  });