import React, { Component } from 'react'
import { connect } from 'react-redux';
import { 
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Slider from '@react-native-community/slider';
import Tts from "react-native-tts";
import { changeSpeechRate, changeSpeechPitch } from '../../actions';
import * as colors from '../../constants/colors';
import Preloader from '../Common/Preloader';

class Settings extends Component{
    constructor(props){
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
    }
    state = {
        voices: [],
        ttsStatus: "initiliazing",
        selectedVoice: null,
        isLoading: true,
    };

    componentDidMount = async () => {
        console.log('cdm settings', this.props)
        Tts.setDefaultRate(this.props.speechRate);
        Tts.setDefaultPitch(this.props.speechPitch);
        await Tts.getInitStatus()
         .then( () => this.initTts() )
         .catch( err => console.log('error init tts ', err));
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
            ttsStatus: 'initialized',
            isLoading: false
          });
        } else {
          this.setState({ 
              ttsStatus: 'initialized',
              isLoading: false
             });
        }
        console.log('init tts', this.state.ttsStatus)
      };

    setSpeechRate = async rate => {
        const { onChangeSpeechRate } = this.props;
        
        await Tts.setDefaultRate(rate);
        onChangeSpeechRate( rate );
    };
    
    setSpeechPitch = async rate => {
        const { onChangeSpeechPitch } = this.props;
        
        await Tts.setDefaultPitch(rate);
        onChangeSpeechPitch( rate );
    };

    checkSpeech = async () => {
        console.log('check speech')
        await Tts.stop();
        await Tts.speak('Проверка скорости речи');
    }

    getOpacity = (disable) => {
        return (disable) ? 0.3 : 1;
    }

    render(){
        const { speechRate, speechPitch } = this.props;
        console.log('settings ', this.props);
        if (this.state.isLoading){
            return (<Preloader
                        colorIndicator = {colors.white}
                    />)
        }else{
            return (
                <View style={styles.container}>
                    <View style={styles.contentContainer}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>Speaker Settings</Text>
                        </View>
        
                        <View style={styles.settingContainer}>
                            <Text
                                style={styles.settingLabel}
                            >
                                {`Speed: ${speechRate.toFixed(2)}`}
                            </Text>
                            <Slider
                                style={styles.slider}
                                minimumValue={0.01}
                                maximumValue={0.99}
                                value={parseFloat(speechRate)}
                                onSlidingComplete={this.setSpeechRate}
                            />
                        </View>
        
                        <View style={styles.settingContainer}>
                            <Text
                                style={styles.settingLabel}
                            >
                                {`Pitch: ${speechPitch.toFixed(2)}`}
                            </Text>
                            <Slider
                            style={styles.slider}
                            minimumValue={0.5}
                            maximumValue={2}
                            value={parseFloat(speechPitch)}
                            onSlidingComplete={this.setSpeechPitch}
                            />
                        </View>
                        <View style={styles.settingContainer}>
                            <Text
                                style={styles.settingLabel}
                            >
                                {`Voice: ${this.state.selectedVoice}`}
                            </Text>
                        </View>
                        <View style={styles.buttonCheckContainer}>
                            <TouchableOpacity
                                style={[styles.buttonCheck, {opacity: this.getOpacity(this.state.isLoading)}]}
                                onPress={this.checkSpeech}
                                disabled={this.state.isLoading} 
                            >
                                <Text style={styles.butonCheckText}>Check Voice</Text>
                            </TouchableOpacity>
                        </View>
      
                    </View>
                   
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 20
    },
    titleContainer: {
        marginTop: 40,
        marginBottom: 20,
    },
    titleText: {
        fontSize: 24,
        textAlign: "center",
    },
    settingContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    settingLabel: {
        marginVertical: 10
    },
    slider: {
        width: 240
    },
    buttonCheckContainer: {
        width: 180,
        height: 40,
        marginVertical: 10
    },
    buttonCheck: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.mainContrast,
        justifyContent: 'center',
        alignItems: 'center'
    },
    butonCheckText: {
        fontSize: 18,
        lineHeight: 20,
        color: colors.white,
    }

});

const mapStateToProps = state => {
    console.log('map state to props', state)
    return ({ 
        speechRate: state.settings.speechRate,
        speechPitch: state.settings.speechPitch
    })
};


const mapDispatchToProps = dispatch => ({
    onChangeSpeechRate: ( val ) => dispatch(changeSpeechRate( val )),
    onChangeSpeechPitch: ( val ) => dispatch(changeSpeechPitch( val ))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings)