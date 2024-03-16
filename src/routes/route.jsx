import { useEffect, useRef, useState } from "react";
import { createBrowserRouter, createHashRouter } from "react-router-dom";
import { loadModule, loadScript } from "../libs";

export const Dashboard = ()=>{
  const [Dashboard, setDashboard] = useState(null);
  useEffect(()=>{
    loadScript(
      "dashboard",
      "http://localhost:3001/remoteEntry.js"
    ).then(() => {
      loadModule("dashboard", "App").then((e) => {
        setDashboard(e);
      });
    });

  },[])
  return <>
  {Dashboard?.default&&Dashboard?.default()}
  </>
}

const Settings = ()=>{
  const ngAppRef = useRef(null);

  useEffect(()=>{
    loadScript(
      "ngApp",
      "http://localhost:4000/remoteEntry.js"
    ).then(() => {
      loadModule("ngApp", "loadApp").then((e) => {
        try {
          e.mount()
        } catch (error) {
          console.log(error)
        }
      });
    });

  },[])
return <>
<app-settings></app-settings>
      <app-profile></app-profile>
</>
}
export const router = createHashRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },
  {
    path: "/settings",
    element: <Settings/>,
  },

  
]);
