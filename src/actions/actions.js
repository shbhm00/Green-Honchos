import {SET_INFO, DELETE_INFO, SET_EMP_ID} from './actionTypes';

export const info = payload => {
  return dispatch => {
    dispatch({
      type: SET_INFO,
      payload: payload,
    });
  };
};
export const EmployeeId = payload => {
  return dispatch => {
    dispatch({
      type: SET_EMP_ID,
      payload: payload,
    });
  };
};
export const deleteInfo = payload => {
  return dispatch => {
    dispatch({
      type: DELETE_INFO,
      payload: payload,
    });
  };
};
