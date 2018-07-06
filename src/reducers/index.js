import {combineReducers} from 'redux';
import {SET_PROPERTY, SET_DATE, SET_SERVICE_TYPE} from "../actions";

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

function serviceType(state = [], action) {
  switch (action.type) {
    case SET_SERVICE_TYPE:
      return action.serviceType;
    default:
      return state;
  }
}

const rootReducer = combineReducers({property, date, serviceType});
export default rootReducer;