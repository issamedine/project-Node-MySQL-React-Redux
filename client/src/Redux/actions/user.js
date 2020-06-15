import axios from "axios";
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
  LOGOUT
} from "./type";

//load page
export const loadUser = () => async (dispatch) => {
  try {
    // const config = {
    //   headers: {
    //     Authorization: localStorage.getItem("token"),
    //   },
    // };

    // const res = await axios.get("/current");

    dispatch({
      type: USER_LOAD_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: USER_LOAD_FAIL,
      data: err,
    });
  }
};

// gett all user
export const getAllUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/list-user");
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error,
    });
  }
};

// Register person
export const signup = (payloadState) => async (dispatch) => {
  console.log("payloadState", payloadState);
  try {
    const res = await axios.post("/signup", { ...payloadState });
    console.log("res axios", res);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: SIGNUP_FAIL,
      data: error.response.data,
    });
  }
};

//login user
export const login = (payloadState) => async (dispatch) => {
  try {
    const res = await axios.post("/login", { ...payloadState });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data
    });
  }
};

export const editUser = (payloadState) => async (dispatch) => {
  console.log("payloadState action edit", payloadState.id);
  try {
    const res = await axios.put(`/api/update/${payloadState.id}`, {
      ...payloadState,
    });
    dispatch({
      type: EDIT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_FAIL,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/delete/${id}`);
    dispatch({
      type: DELETE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_FAIL,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT
    })
  } catch (error) {}
};
