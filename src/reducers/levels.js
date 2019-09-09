import { LEVEL_UP, LEVELS_RESET } from "../constants/actionTypes";
import { MAX_LEVEL } from '../constants/commonConstants';

const INITIAL_STATE = {
  level: [1],
  sublevel: [1]
};

const levels = (state = INITIAL_STATE, action) => {
  switch (action.type){
    case LEVEL_UP:
      const currLevel = Math.min(state.level+1, MAX_LEVEL);
      return {
        level: [...state.level, currLevel]
      }
    case LEVELS_RESET: { return INITIAL_STATE }; 
    default : { return state };
  }
  
}

export default levels;