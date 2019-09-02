import { LEVEL_UP, LEVELS_RESET } from "../constants/action-types";

const INITIAL_STATE = {
  levels: []
};

function levels(state = INITIAL_STATE, action) {
  switch (action.type){
    case LEVEL_UP:
      return {
        results: [action.payload, ...state.levels]
      }
    case LEVELS_RESET: { return INITIAL_STATE }
    default : { return state }
  }
  
}
export default levels;