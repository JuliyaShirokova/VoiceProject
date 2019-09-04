import { LEVEL_UP, LEVELS_RESET } from "../constants/actionTypes";

export function levelUp( payload ) {
    return { type: LEVEL_UP, payload }
  };
export function levelsReset(payload){
  return { type: LEVELS_RESET, payload }
}