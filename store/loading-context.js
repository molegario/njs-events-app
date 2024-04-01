import { createContext, useState } from "react";

const LoadingContext = createContext(
  {
    isLoading: false,
    showIsLoading: () => {},
    hideIsLoading: () => {},
  }
);

export function LoadingContextProvider({ children }) {

  const [isLoading, setIsLoading] = useState(false);

  function showIsLoading() {
    console.log("SHOWING::::");
    setIsLoading(true);
  }

  function hideIsLoading() {
    setIsLoading(false);
  }

  const context = {
    isLoading: isLoading,
    showIsLoading: showIsLoading,
    hideIsLoading: hideIsLoading,
  };

  return <LoadingContext.Provider value={context}>
    {
      children
    }
  </LoadingContext.Provider>


}

export default LoadingContext;