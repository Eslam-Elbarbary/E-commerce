import { createContext, useState } from "react";

export const CounterContext = createContext();

export function CounterContextProvider(props) {
  const [counter, setCounter] = useState(null);

  return (
    <CounterContext.Provider value={{ counter, setCounter }}>
      {props.children}
    </CounterContext.Provider>
  );
}
