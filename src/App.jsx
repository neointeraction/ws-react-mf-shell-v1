import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import AppLayout from "./layout/AppLayout";
import useHost from "./hooks/useHost";
const loadScript = (scope, url, type = "text/javascript") => {
  return new Promise(function (resolve, reject) {
    try {
      let script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.type = type;
      script.onload = function (e) {
        resolve(scope);
      };
      script.onerror = function (e) {
        document.head.removeChild(script);
        reject(scope);
      };
      document.head.appendChild(script);
    } catch (ex) {
      reject(ex);
    }
  });
};

const loadModule = (scope, module) => {
  return new Promise(async (resolve) => {
    await __webpack_init_sharing__("default");
    const container = window[scope];
    if (container && module) {
      await container.init(__webpack_share_scopes__.default);
      const factory = await window[scope].get(`./${module}`);
      const Module = factory();
      resolve(Module);
    } else resolve({});
  });
};

const App = () => {
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const ngAppRef = useRef(null);
  const [Dashboard, setDashboard] = useState(null);

  useEffect(() => {
    loadScript(
      "dashboard",
      "https://neointeraction.github.io/ws-react-mf-remote/dist/remoteEntry.js"
    ).then(() => {
      loadModule("dashboard", "App").then((e) => {
        setDashboard(e);
      });
    });

    loadScript(
      "header",
      "https://neointeraction.github.io/ws-vue-remote-mf/dist/remoteEntry.js"
    ).then(() => {
      loadModule("header", "placeHolder").then((e) => {
        try {
          e.default(headerRef.current, "Header");
          e.default(footerRef.current, "Footer");
        } catch (error) {}
      });
    });
    
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
    
    
   
  }, []);

  return (
    <AppLayout>
      <div ref={headerRef}></div>
      <app-settings></app-settings>
      <app-profile></app-profile>
      <div>{Dashboard?.default && Dashboard?.default()}</div>
      <div ref={footerRef}></div>
    </AppLayout>
  );
};
console.log("useHost",useHost.getState())
ReactDOM.render(<App />, document.getElementById("app"));
