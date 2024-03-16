import React, { createContext, useContext, useEffect, useImperativeHandle, useState } from "react";

const storeContext = React.createContext({});

let storeValues = {}
export const HostProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState("Eldhos Aji");

  useImperativeHandle(document.getElementById("app"), () => {
    return {
      host: {
        userInfo,
        setUserInfo,
      },
    };
  });

  useEffect(() => {
    Object.assign(window["host"], {
      getState: () => {
        return {
          userInfo,
          setUserInfo,
        };
      },
    });
  }, []);
  return (
    <storeContext.Provider 
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </storeContext.Provider>
  );
};

export const useHost = ()=>{
  return useContext(storeContext);
}

export const getState = ()=>window["host"]?.getState?window["host"]?.getState():({});