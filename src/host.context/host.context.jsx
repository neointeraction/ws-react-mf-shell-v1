import { createContext, useEffect, useImperativeHandle, useState } from "react";

export const hostContext = createContext({test:'test'});

export const HostProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState('Eldhos Aji');

  useEffect(()=>{

  },[])
  useImperativeHandle(document.getElementById("app"),()=>{
    return {
        host:{
            userInfo,
            setUserInfo,
        }
      }
  })
  return (
    <hostContext.Provider
      value={{
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </hostContext.Provider>
  );
};
