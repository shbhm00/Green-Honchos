import {SET_INFO, DELETE_INFO, SET_EMP_ID} from '../actions/actionTypes';

const initialState = {
  data: [],
};

export default function (state = initialState, action) {
  console.log('actionnn', action);
  switch (action.type) {
    case SET_INFO:
      let oldDataIndex = state.data.findIndex(
        item => item.empId === action.payload[4],
      );
      if (oldDataIndex > -1) {
        state.data[oldDataIndex] = {
          firstName: action.payload[0],
          lastName: action.payload[1],
          date: action.payload[2],
          image: action.payload[3],
          empId: action.payload[4],
        };
        return {...state, data: [...state.data]};
      } else {
        return {
          ...state,
          data: [
            ...state.data,
            {
              firstName: action.payload[0],
              lastName: action.payload[1],
              date: action.payload[2],
              image: action.payload[3],
              empId: action.payload[4],
            },
          ],
          // }
        };
      }

    case DELETE_INFO:
      return {
        ...state,
        data: state.data.filter(item => item.empId !== action.payload),
      };
    default:
      return state;
  }
}
