import React, { Component } from 'react'
import { connect } from 'react-redux';
import { 
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableOpacity
} from 'react-native';
import BackgroundPage from '../Common/BackgroundPage';
import Slider from '@react-native-community/slider';
import Tts from "react-native-tts";
import { changeSpeechRate, changeSpeechPitch, changeThemeColor, resetLevels } from '../../actions';
import * as colors from '../../constants/colors';
import Preloader from '../Common/Preloader';
import { getThemeColor } from '../../utilits/themeColorFunctions';
import { lightTheme, darkTheme, commonStyle } from '../Common/ThemeStyles';

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
        this._getThemeColor = getThemeColor;
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

    setThemeColor = async rate => {
        const { onChangeThemeColor } = this.props;
        onChangeThemeColor( rate );
    };


    checkSpeech = async () => {
        console.log('check speech')
        await Tts.stop();
        await Tts.speak('Проверка скорости речи');
    }

    resetLevels = () => {
        const { onResetLevels } = this.props;
        onResetLevels();
    }

    getOpacity = (disable) => {
        return (disable) ? 0.3 : 1;
    }

    renderThemeColor = (theme) => {
        return (theme.toFixed(2) > 50) ? 'Day' : 'Night';
    }
   

    render(){
        const { speechRate, speechPitch, themeColor } = this.props;
        const { startColor, stopColor } = this._getThemeColor( themeColor );
        console.log('settings ', this.props);
        const currStyles = ( themeColor > 50 ) ? lightTheme : darkTheme; 
        if (!this.state.isLoading){
            return (<Preloader
                        colorIndicator = {colors.white}
                        startColor={startColor}
                        stopColor={stopColor}    
                    />)
        }else{
            return (
                <View style={styles.container}>
                    <BackgroundPage
                        startColor={startColor}
                        stopColor={stopColor}
                     />
                    <ScrollView style={[commonStyle.contentContainer, currStyles.contentContainer]}>
                        <View style={commonStyle.screenTitleContainer}>
                            <Text style={[commonStyle.screenTitleText, currStyles.screenTitleText]}>Settings</Text>
                        </View>
                        <View style={commonStyle.titleContainer}>
                            <Text style={[commonStyle.titleText, currStyles.titleText]}>Speaker Settings</Text>
                        </View>
        
                        <View style={commonStyle.settingContainer}>
                            <Text
                                style={[commonStyle.settingLabel, currStyles.settingLabel]}
                            >
                                {`Speed: ${speechRate.toFixed(2)}`}
                            </Text>
                            <Slider
                                style={commonStyle.slider}
                                minimumValue={0.01}
                                maximumValue={0.99}
                                value={parseFloat(speechRate)}
                                onSlidingComplete={this.setSpeechRate}
                            />
                        </View>
        
                        <View style={commonStyle.settingContainer}>
                            <Text
                                style={[commonStyle.settingLabel, currStyles.settingLabel]}
                            >
                                {`Pitch: ${speechPitch.toFixed(2)}`}
                            </Text>
                            <Slider
                            style={commonStyle.slider}
                            minimumValue={0.5}
                            maximumValue={2}
                            value={parseFloat(speechPitch)}
                            onSlidingComplete={this.setSpeechPitch}
                            />
                        </View>
                        <View style={commonStyle.settingContainer}>
                            <Text
                                style={[commonStyle.settingLabel, currStyles.settingLabel]}
                            >
                                {`Voice: ${this.state.selectedVoice}`}
                            </Text>
                        </View>
                        <View style={commonStyle.buttonContainer}>
                            <TouchableOpacity
                                style={[commonStyle.buttonTouch, {opacity: this.getOpacity(this.state.isLoading)}]}
                                onPress={this.checkSpeech}
                                disabled={this.state.isLoading} 
                            >
                                <Text style={commonStyle.buttonText}>Check Voice</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={commonStyle.titleContainer}>
                            <Text style={[commonStyle.titleText, currStyles.titleText]}>Theme Settings</Text>
                        </View>
                        <View style={commonStyle.settingContainer}>
                            <Text
                                style={[commonStyle.settingLabel, currStyles.settingLabel]}
                            >
                                {this.renderThemeColor(themeColor)}
                            </Text>
                            <Slider
                                style={commonStyle.slider}
                                minimumValue={1}
                                maximumValue={99}
                                value={parseFloat(themeColor)}
                                onSlidingComplete={this.setThemeColor}
                            />
                        </View>
        
                        <View style={commonStyle.titleContainer}>
                            <Text style={[commonStyle.titleText, currStyles.titleText]}>Other settings</Text>
                        </View>
                        <View style={commonStyle.buttonContainer}>
                            <TouchableOpacity
                                style={[commonStyle.buttonTouch, {opacity: this.getOpacity(this.state.isLoading)}]}
                                onPress={this.resetLevels}
                                disabled={this.state.isLoading} 
                            >
                                <Text style={commonStyle.buttonText}>Reset levels</Text>
                            </TouchableOpacity>
                        </View>

        
  
                    </ScrollView>
                   
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
       width: '100%',
       height: '100%',
       alignItems: 'center'
    },
});

const mapStateToProps = state => {
    console.log('Settings connect map state to props', state)
    return ({ 
        speechRate: state.settings.speechRate,
        speechPitch: state.settings.speechPitch,
        themeColor: state.settings.themeColor,
    })
};


const mapDispatchToProps = dispatch => ({
    onChangeSpeechRate: ( val ) => dispatch(changeSpeechRate( val )),
    onChangeSpeechPitch: ( val ) => dispatch(changeSpeechPitch( val )),
    onChangeThemeColor: ( val ) => dispatch(changeThemeColor( val )),
    onResetLevels: () => dispatch(resetLevels()),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings)