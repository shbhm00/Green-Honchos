import {ADD_TO_CART} from '../actions/actionTypes';

const initialState = {
  data: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    default:
      return state;
  }
}
