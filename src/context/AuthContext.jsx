import { createContext, useReducer, useEffect } from "react";
import apiService from "../app/apiService";
import { isValidToken } from "../utils/jwt"; //check the token is still working?
import React from "react";

const initialState = {
  isInitialized: false, //check is the app render ?
  isAuthenicated: false, //check is the  user have login?
  user: null, //check the data of the user
};

const AuthContext = createContext({ ...initialState });

const setSession = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("accesstoken");
    delete apiService.defaults.headers.common.Authorization;
  }
};

const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const LOGOUT = "AUTH.LOGOUT";
const UPDATE_PROFILE = "AUTH.UPDATE_PROFILE";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { isAuthenicated, user } = action.payload;
      return {
        ...state,
        isInitialized: true,
        isAuthenicated,
        user,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenicated: true,
        user: action.payload.user,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenicated: true,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenicated: false,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispacth] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          console.log(accessToken);
          const response = await apiService.get("/users/me");
          const user = response.data;
          console.log(user);

          dispacth({
            type: INITIALIZE,
            payload: { isAuthenicated: true, user },
          });
        } else {
          setSession(null);
          dispacth({
            type: INITIALIZE,
            payload: { isAuthenicated: false, user: null },
          });
        }
      } catch (error) {
        setSession(null);
        dispacth({
          type: INITIALIZE,
          payload: { isAuthenicated: false, user: null },
        });
      }
    };
    initialize();
  }, []);

  const login = async ({ email, password }, callback) => {
    const response = await apiService.post("/auth/login", { email, password });
    const { user, accessToken } = response.data;

    setSession(accessToken);
    dispacth({
      type: LOGIN_SUCCESS,
      payload: { user },
    });
    callback();
  };

  const register = async ({ name, email, password }, callback) => {
    console.log("This is abc");
    const response = await apiService.post("/users", {
      name,
      email,
      password,
    });
    const { user, accessToken } = response.data;

    setSession(accessToken);
    dispacth({
      type: REGISTER_SUCCESS,
      payload: { user },
    });
    callback();
  };

  const logout = (callback) => {
    setSession(null);
    dispacth({
      type: LOGOUT,
    });
    callback();
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
