export const SET_PROPERTY = 'SET_PROPERTY';
export const SET_DATE = 'SET_DATE';

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