export const SET_PROPERTY = 'SET_PROPERTY';

export function setProperty(property) {
  return {
    type: SET_PROPERTY,
    property
  }
}