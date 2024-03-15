import React, { useContext } from "react";
import { hostContext } from "../host.context/host.context";

let hostValue;
const useHost = () => {
  hostValue = useContext(hostContext);
  return hostValue;
};

useHost.getState = () => {
  try {
    return document.getElementById("app").current.host;
  } catch (error) {
    return {};
  }
};

export default useHost;
