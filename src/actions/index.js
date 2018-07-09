export const SET_PROPERTY = 'SET_PROPERTY';
export const SET_DATE = 'SET_DATE';
export const SET_SERVICE_TYPE = 'SET_SERVICE_TYPE';
export const SET_SERVICES = 'SET_SERVICES';

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