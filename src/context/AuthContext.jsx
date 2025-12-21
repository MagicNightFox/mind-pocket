import {createContext, useContext} from "react";

export const AuthContext = createContext(null);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Must be used with AuthProvider");
  }
  return context;
}