export const SET_PROPERTY = 'SET_PROPERTY';
export const SET_DATE = 'SET_DATE';
export const SET_SERVICE_TYPE = 'SET_SERVICE_TYPE';
export const SET_SERVICES = 'SET_SERVICES';
export const SET_BASE_SERVICE = 'SET_BASE_SERVICE';
export const SET_ADDON_SERVICE = 'SET_ADDON_SERVICE';
export const SET_COMMENTS_AGENT_PROFILE = 'SET_COMMENTS_AGENT_PROFILE'

export function setProperty(property) {
  return {
    type: SET_PROPERTY,
    property
  }
}

export function setDate(date) {
  return {
    type: SET_DATE,
    date
  }
}

export function setServiceType(serviceType) {
  return {
    type: SET_SERVICE_TYPE,
    serviceType
  }
}

export function setServices(services) {
  return {
    type: SET_SERVICES,
    services
  }
}

export function setBaseService(baseService) {
  return {
    type: SET_BASE_SERVICE,
    baseService
  }
}

export function setAddonService(addonService) {
  return {
    type: SET_ADDON_SERVICE,
    addonService
  }
}

export function setCommentsAgentProfile(commentsAgentProfile) {
  return {
    type: SET_COMMENTS_AGENT_PROFILE,
    commentsAgentProfile
  }
}