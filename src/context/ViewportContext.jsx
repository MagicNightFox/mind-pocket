import {createContext, useContext} from "react";

export const ViewportContext = createContext(null);
export const useViewport = () => {
  const context = useContext(ViewportContext);
  if (!context) {
    throw new Error("Must be used with ViewportProvider");
  }
  return context;
}