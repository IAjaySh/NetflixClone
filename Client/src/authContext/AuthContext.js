import AuthReducer from "./AuthReducer";
import { createContext, useEffect, useReducer } from "react";

const InitailState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetch: false,
  error: false,
};

export const AuthContext = createContext(InitailState);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, InitailState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
