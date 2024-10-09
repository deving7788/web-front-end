import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import App from "./app.jsx";
import MainContextProvider from "./context/mainContext.jsx";
import SecondaryContextProvider from "./context/secondaryContext.jsx";
import "./css/main-light.css";

const preferDark = window.matchMedia("(prefers-color-scheme: dark)");
if(preferDark.matches) {
  const darkLink = document.createElement("link");
  darkLink.rel = "preload";
  darkLink.href = "/css/main-dark.css";
  darkLink.as = "style";
  darkLink.onload = function() {
    const loadDarkLink = document.createElement("link");
    loadDarkLink.rel = "stylesheet"
    loadDarkLink.href = "/css/main-dark.css";
    loadDarkLink.id = "css";
    document.head.appendChild(loadDarkLink);
  }
  document.head.appendChild(darkLink);
}
else {
  const lightLink = document.createElement("link");
  lightLink.rel = "preload";
  lightLink.href = "/css/main-light.css";
  lightLink.as = "style";
  lightLink.onload = function() {
    const loadLightLink = document.createElement("link");
    loadLightLink.rel = "stylesheet"
    loadLightLink.href = "/css/main-dark.css";
    loadLightLink.id = "css";
    document.head.appendChild(loadLightLink);
  }
  document.head.appendChild(lightLink);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainContextProvider>
      <SecondaryContextProvider>
        <App />
      </SecondaryContextProvider>
    </MainContextProvider>
  </StrictMode>
)
