export const loadScript = (scope, url, type = "text/javascript") => {
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
  
  export const loadModule = (scope, module) => {
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