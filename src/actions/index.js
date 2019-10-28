import { LEVEL_UP, SUBLEVEL_UP, LEVELS_RESET } from "../constants/actionTypes";

export function levelUp( ) {
  return { type: LEVEL_UP }
};
export function sublevelUp( ) {
  return { type: SUBLEVEL_UP }
};
export function levelsReset( ){
  console.log('actions levels reset')
  return { type: LEVELS_RESET }
}