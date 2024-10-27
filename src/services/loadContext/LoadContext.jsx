import React from "react";
import { createContext, useState } from "react";

export const LoadContext = createContext();

const LoadContextProvider = ({ children }) => {
  const [load, setLoad] = useState(false);

  const handleLoad = () => setLoad((prevLoad) => !prevLoad);

  const data = { load, handleLoad };

  return <LoadContext.Provider value={data}>{children}</LoadContext.Provider>;
};
export default LoadContextProvider;
