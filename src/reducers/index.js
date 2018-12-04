import {combineReducers} from 'redux';
import {
  SET_PROPERTY,
  SET_DATE,
  SET_SERVICE_TYPE,
  SET_SERVICES,
  SET_BASE_SERVICE,
  SET_ADDON_SERVICE,
  SET_COMMENTS_AGENT_PROFILE
} from "../actions";

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

function services(state = [], action) {
  switch (action.type) {
    case SET_SERVICES:
      return action.services;
    default:
      return state;
  }
}

function baseService(state = [], action) {
  switch (action.type) {
    case SET_BASE_SERVICE:
      return action.baseService;
    default:
      return state;
  }
}

function addonService(state = [], action) {
  switch (action.type) {
    case SET_ADDON_SERVICE:
      return action.addonService;
    default:
      return state;
  }
}

function commentsAgentProfile(state = [], action) {
  switch (action.type) {
    case SET_COMMENTS_AGENT_PROFILE:
      return action.commentsAgentProfile;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  property,
  date,
  serviceType,
  services,
  baseService,
  addonService,
  commentsAgentProfile
});

export default rootReducer;