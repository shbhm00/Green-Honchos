import {ADD_TO_CART} from './actionTypes';

export const addToCart = payload => {
  return dispatch => {
    dispatch({
      type: ADD_TO_CART,
      payload: payload,
    });
  };
};
