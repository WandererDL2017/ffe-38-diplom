import {
  CLOSE_ERROR,
  CLOSE_INFO,
  SET_ERROR,
  SET_INFO,
} from '../actions/actionTypes';

const initialState = {
  error: false,
  info: false,
  messageMain: '',
  messageDetails: '',
  type: '',
};

export default function showMessagesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: true,
        messageMain: 'Упс, что-то пошло не так...',
        messageDetails: 'К сожалению, что-то пошло не так, как должно было:( Приносим извинения, Вы будете перенаправлены на главную страницу сайта',
        type: 'error',
      };
    case CLOSE_ERROR:
      return {
        ...state,
        error: false,
        messageMain: '',
        messageDetails: '',
        type: '',
      };
    case SET_INFO:
      const { messageMain, messageDetails, type } = action.payload;
      return {
        ...state,
        info: true,
        messageMain,
        messageDetails,
        type,
      };
    case CLOSE_INFO:
      return {
        ...state,
        info: false,
        messageMain: '',
        messageDetails: '',
        type: '',
      };
    default:
      return state;
  }
}
