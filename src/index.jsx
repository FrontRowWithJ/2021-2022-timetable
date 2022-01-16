import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { registerRoute } from "workbox-routing";
import * as strategies from "workbox-strategies";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();

registerRoute(
  "https://cdn.jsdelivr.net/npm/lzutf8/build/production/lzutf8.min.js",
  new strategies.CacheFirst()
);

registerRoute(
  "https://db.onlinewebfonts.com/c/860c3ec7bbc5da3e97233ccecafe512e?family=Circular Std Book",
  new strategies.CacheFirst()
);

registerRoute(
  "https://db.onlinewebfonts.com/t/860c3ec7bbc5da3e97233ccecafe512e.woff2",
  new strategies.CacheFirst()
);

registerRoute(
  "https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap",
  new strategies.CacheFirst()
);


reportWebVitals();
