import {combineReducers} from 'redux';
import {SET_PROPERTY, SET_DATE} from "../actions";

function property(state = [], action) {
  switch (action.type) {
    case SET_PROPERTY:
      return action.property;
    default:
      return state;
  }
}

function date(state = [], action) {
  switch (action.type) {
    case SET_DATE:
      return action.date;
    default:
      return state;
  }
}

const rootReducer = combineReducers({property, date});
export default rootReducer;