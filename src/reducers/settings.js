import { CHANGE_SPEECH_RATE, CHANGE_SPEECH_PITCH, RESET_SETTINGS } from '../constants/actionTypes'

const INITIAL_STATE = {
  speechPitch: 1,
  speechRate: 0.5
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
    default: return state
  }
}

export default settings
