import { LEVEL_UP, SUBLEVEL_UP, RESET_LEVELS } from '../constants/actionTypes';
import { maxLevel } from '../sources/levelsSource';
import { levelsSource }  from '../sources/levelsSource';

const INITIAL_STATE = {
  level: [1],
  sublevel: [1],
};

const getMaxSublevel = ( level ) => {
  const currLevel = 'level-' + level[level.length - 1];
  const lev = levelsSource[currLevel];
  const arr = lev && lev.values 
  const sublevelLength = arr && arr.length;
  return sublevelLength || 1;
};

const levels = (state = INITIAL_STATE, action) => {
  switch (action.type){
    case LEVEL_UP:
      const l = state.level;
      const lastL = l && l.length;
      const newLevel = lastL + 1|| 1;
      const currLevel = Math.min(newLevel, maxLevel);
      return {
        level: [...state.level, currLevel],
        sublevel: [1],
      };
    case SUBLEVEL_UP:
      const sl = state.sublevel;
      const lastSl = sl && sl.length;
      const newSublevel = lastSl + 1 || 0;
      const currSublevel = Math.min(newSublevel, getMaxSublevel( state.level ));
      return {
        level: [...state.level],
        sublevel: [...state.sublevel, currSublevel],
      };
    case RESET_LEVELS: 
      console.log('reduser levels', action.type)
      return INITIAL_STATE; 
    default : 
      return state;
  }
};

export default levels;
