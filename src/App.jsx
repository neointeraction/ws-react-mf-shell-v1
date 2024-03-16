import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import AppLayout from "./layout/AppLayout";
import { Dashboard, router } from "./routes/route";
import { loadModule, loadScript } from "./libs";
import { HostProvider } from "./store/store";
import { RouterProvider } from "react-router-dom";

const App = () => {
  const headerRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    loadScript(
      "header",
      "http://localhost:3002/remoteEntry.js"
    ).then(() => {
      loadModule("header", "placeHolder").then((e) => {
        try {
          e.default(headerRef.current, "Header");
          e.default(footerRef.current, "Footer");
        } catch (error) {}
      });
    });
  }, []);

  return (
    
      <div>
      <div ref={headerRef} style={{position:'fixed',top:'0px',width:'100%'}}></div>
      <RouterProvider router={router} />
      <div ref={footerRef} style={{position:'fixed',bottom:'0px',width:'100%'}}></div>
      </div>
    
  );
};
ReactDOM.render(<HostProvider><App /></HostProvider>, document.getElementById("app"));
