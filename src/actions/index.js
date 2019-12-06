import { 
  LEVEL_UP,
  SUBLEVEL_UP,
  RESET_LEVELS,
  CHANGE_SPEECH_RATE,
  CHANGE_SPEECH_PITCH,
  RESET_SETTINGS,
  CHANGE_THEME_COLOR
} from "../constants/actionTypes";

export function levelUp( ) {
  return { type: LEVEL_UP };
};

export function sublevelUp( ) {
  return { type: SUBLEVEL_UP };
};

export function resetLevels( ){
  console.log('actions levels reset');
  return { type: RESET_LEVELS };
}

export function changeSpeechRate( val ) {
  return { 
    type: CHANGE_SPEECH_RATE,
    payload: {speechRateValue: val}
  };
}

export function changeSpeechPitch( val ) {
  return { 
    type: CHANGE_SPEECH_PITCH,
    payload: {speechPitchValue: val}
  };
}

export function changeThemeColor( val ) {
  return { 
    type: CHANGE_THEME_COLOR,
    payload: { themeColorValue: val }
  };
}

export function resetSettings() {
  return { type: RESET_SETTINGS };
}