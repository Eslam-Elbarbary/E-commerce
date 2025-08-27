import { createContext, useState, useEffect } from "react";

export const TokenContext = createContext();

export function TokenContextProvider(props) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setToken(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {props.children}
    </TokenContext.Provider>
  );
}
