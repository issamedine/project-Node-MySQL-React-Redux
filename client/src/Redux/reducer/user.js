import {
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOAD_SUCCESS,
  USER_LOAD_FAIL,
  EDIT_SUCCESS,
  EDIT_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL,
  LOGOUT,
} from "../actions/type";

const initialState = {
  isAuth: false,
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOAD_SUCCESS:
      return {
        ...state,
        isAuth: true,
      };
    case USER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuth: true,
      };
      case LOGIN_FAIL:
      return {
        ...state,
      };
    case EDIT_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuth: false,
      };
    default:
      return state;
  }
}
