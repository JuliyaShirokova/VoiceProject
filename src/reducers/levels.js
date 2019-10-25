import { LEVEL_UP, SUBLEVEL_UP, LEVELS_RESET } from '../constants/actionTypes';
import { MAX_LEVEL } from '../constants/commonConstants';
import { levelsSource }  from '../sources/levelsSource';

const INITIAL_STATE = {
  level: [1],
  sublevel: [1],
};

const getMaxSublevel = ( level ) => {
  const currLevel = 'level-' + level[level.length - 1];
  const arr = levelsSource[currLevel];
  const sublevelLength = arr && arr.length;
  return sublevelLength || 1;
};

const levels = (state = INITIAL_STATE, action) => {
  switch (action.type){
    case LEVEL_UP:
      const currLevel = Math.min(state.level + 1, MAX_LEVEL);
      return {
        level: [...state.level, currLevel],
        sublevel: [1],
      };
    case SUBLEVEL_UP:
        const sl = state.sublevel;
        const lastSl = sl && sl.length-1;
        const newSublevel = lastSl+1 || 0; 
        const currSublevel = Math.min(newSublevel, getMaxSublevel( state.level ));
        return {
          level: [...state.level],
          sublevel: [...state.sublevel, currSublevel],
        };
    case LEVELS_RESET: { return INITIAL_STATE; } 
    default : { return state; }
  }
};

export default levels;
