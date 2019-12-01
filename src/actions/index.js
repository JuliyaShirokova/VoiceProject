import { 
  LEVEL_UP,
  SUBLEVEL_UP,
  LEVELS_RESET,
  CHANGE_SPEECH_RATE,
  CHANGE_SPEECH_PITCH,
  RESET_SETTINGS
} from "../constants/actionTypes";

export function levelUp( ) {
  return { type: LEVEL_UP };
};

export function sublevelUp( ) {
  return { type: SUBLEVEL_UP };
};

export function levelsReset( ){
  console.log('actions levels reset');
  return { type: LEVELS_RESET };
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

export function resetSettings() {
  return { type: RESET_SETTINGS };
}