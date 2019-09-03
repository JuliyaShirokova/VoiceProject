import { LEVEL_UP, LEVELS_RESET } from "../constants/action-types";
import { MAX_LEVEL } from '../constants/maxLevel';

const INITIAL_STATE = {
  level: [1]
};

function levels(state = INITIAL_STATE, action) {
  switch (action.type){
    case LEVEL_UP:
      const currLevel = Math.min(state.level+1, MAX_LEVEL);
      return {
        level: [...state.level, currLevel]
      }
    case LEVELS_RESET: 
      return INITIAL_STATE; 
    default : 
      return state;
  }
  
}

export default levels;