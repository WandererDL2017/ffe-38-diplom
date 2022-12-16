import {
  CHANGE_USER_FIELD,
} from '../actions/actionTypes';

const initialState = {
  first_name: '',
  last_name: '',
  patronymic: '',
  phone: '',
  email: '',
  payment_method: '',
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USER_FIELD:
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };
    default:
      return state;
  }
}
