import { useEffect } from "react";
import { createHashRouter } from "react-router-dom";
import * as loadApp from 'ngApp/loadApp';
import  App from 'dashboard/App'
export const DashboardPage = ()=>{
  return <>
  <App/>
  </>
}

const Settings = ()=>{
  useEffect(()=>{
    loadApp?.mount()
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
    element: <DashboardPage/>,
  },
  {
    path: "/settings",
    element: <Settings/>,
  },

  
]);
