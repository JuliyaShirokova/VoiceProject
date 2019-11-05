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
  import Slider from '@react-native-community/slider';
  import Tts from "react-native-tts";
  
  export default class Speaker extends Component {
    state = {
      voices: [],
      ttsStatus: "initiliazing",
      selectedVoice: null,
      speechRate: 0.5,
      speechPitch: 1,
      arrSyllableWord: undefined
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
      Tts.setDefaultRate(this.state.speechRate);
      Tts.setDefaultPitch(this.state.speechPitch);
    }

    componentDidMount = async () => {
       await Tts.getInitStatus().then(this.initTts);
    }
    
    transformToArray = (word) => word.split('-') || [word]

    getSyllableWord = () => {
      const { speakedWord } = this.props;
      const arrSyllableWord = this.transformToArray(speakedWord);
    //  console.log('speaked word', arrSyllableWord);
      return arrSyllableWord;
    }

    renderSyllableWord = () => {
      return this.state.arrSyllableWord.map((value, index, arr) => {
      //console.log('val', value)
        return (<View
                  key = {value+index} 
                  style={styles.syllableHolder}>
                  <TouchableOpacity
                    style={styles.syllableTouch}
                    onPress = { ( value ) => this.speakSyllable( value ) }
                  >
                    <Text style={styles.syllableText}>{value}</Text>
                  </TouchableOpacity>
              </View>);
        })
    }

    speakSyllable = async (syllable) => {
        Tts.stop();
        Tts.speak(syllable);
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
      const arrWord = this.getSyllableWord();
      this.setState({ arrSyllableWord: arrWord })
    };
  
    setSpeechRate = async rate => {
      await Tts.setDefaultRate(rate);
      this.setState({ speechRate: rate });
    };
  
    setSpeechPitch = async rate => {
      await Tts.setDefaultPitch(rate);
      this.setState({ speechPitch: rate });
    };
  
   /*  onVoicePress = async voice => {
      try {
        await Tts.setDefaultLanguage(voice.language);
      } catch (err) {
        console.log(`setDefaultLanguage error `, err);
      }
      await Tts.setDefaultVoice(voice.id);
      this.setState({ selectedVoice: voice.id });
    };
   */
    /* renderVoiceItem = ({ item }) => {
      return (
        <Button
          title={`${item.language} - ${item.name || item.id}`}
          color={this.state.selectedVoice === item.id ? undefined : "#969696"}
          onPress={() => this.onVoicePress(item)}
        />
      );
    }; */
  
    render() {
      /*
       *       React Native TTS Example
       *             |Read text|
       *           Status: ready
       *    Selected Voice: com.apple....
       *      Speed: 0.50   ------o------
       *      Pitch: 1.00   -----o-------
       *  ________________________________
       * | This is an example text        |
       * |                                |
       * |________________________________|
       *           |de-DE - Anna|
       *          |en-GB - Arthur|
       *           |it-IT - Alice|
       */
      //const arrWord = this.state.arrSyllableWord;
      return (
        <View style={styles.container}>
          <View
            style={styles.wordContainer}
          >
            { this.state.arrSyllableWord && this.renderSyllableWord() }
          </View>
          <Text style={styles.label}>{`Selected Voice: ${this.state.selectedVoice || ""}`}</Text>
  
          <View style={styles.sliderContainer}>
            <Text
              style={styles.sliderLabel}
            >{`Speed: ${this.state.speechRate.toFixed(2)}`}</Text>
            <Slider
              style={styles.slider}
              minimumValue={0.01}
              maximumValue={0.99}
              value={this.state.speechRate}
              onSlidingComplete={this.setSpeechRate}
            />
          </View>
  
          <View style={styles.sliderContainer}>
            <Text
              style={styles.sliderLabel}
            >{`Pitch: ${this.state.speechPitch.toFixed(2)}`}</Text>
            <Slider
              style={styles.slider}
              minimumValue={0.5}
              maximumValue={2}
              value={this.state.speechPitch}
              onSlidingComplete={this.setSpeechPitch}
            />
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
    title: {
      fontSize: 20,
      textAlign: "center",
      margin: 10
    },
    label: {
      textAlign: "center"
    },
    sliderContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    sliderLabel: {
      textAlign: "center",
      marginRight: 20
    },
    slider: {
      width: 150
    },
    wordContainer: {
      height: 60,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    syllableHolder: {
      marginVertical: 10,
    },
    syllableTouch: {
      borderBottomWidth: 1,
    },
    syllableText: {
      fontSize: 20,
      lineHeight: 24,
      fontWeight: 'normal',
      paddingVertical: 10,
    }
  });