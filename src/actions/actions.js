import {ADD_TO_CART, CART_SESSION} from './actionTypes';

export const addToCart = payload => {
  return dispatch => {
    dispatch({
      type: ADD_TO_CART,
      payload: payload,
    });
  };
};

export const cartSession = payload => {
  return dispatch => {
    dispatch({
      type: CART_SESSION,
      payload: payload,
    });
  };
};
