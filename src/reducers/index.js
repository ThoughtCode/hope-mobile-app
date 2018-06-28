import { combineReducers } from 'redux';
import { SET_PROPERTY} from "../actions";

function property(state = [], action) {
  switch (action.type) {
    case SET_PROPERTY:
      return action.property;
    default:
      return state;
  }
}

const rootReducer = combineReducers({ property });
export default rootReducer;