import { CHANGE_SPEECH_RATE, CHANGE_SPEECH_PITCH, RESET_SETTINGS, CHANGE_THEME_COLOR } from '../constants/actionTypes'

const INITIAL_STATE = {
  speechPitch: 1,
  speechRate: 0.5,
  themeColor: 50
}

const settings = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_SPEECH_RATE:
      console.log('speech rate change', action.type)
      return Object.assign({}, state, {
        speechRate: action.payload.speechRateValue
      })
    case CHANGE_SPEECH_PITCH:
      console.log('speech pitch change', action.type)
      return Object.assign({}, state, {
        speechPitch: action.payload.speechPitchValue
      })
    case RESET_SETTINGS:
      console.log('reset settings', action.type)
      return INITIAL_STATE
    case CHANGE_THEME_COLOR:
      console.log('change theme color', action.type)
      return Object.assign({}, state, {
        themeColor: action.payload.themeColorValue
      })
    default: return state
  }
}

export default settings
