import {CART_SESSION} from '../actions/actionTypes';
const initialState = {
  cart_id: '',
  cart_session: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CART_SESSION:
      return {
        ...state,
        cart_id: action.payload.cart_id,
        cart_session: action.payload.cart_session,
      };
    default:
      return state;
  }
}
