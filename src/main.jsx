import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import App from "./app.jsx";
import MainContextProvider from "./context/mainContext.jsx";
import SecondaryContextProvider from "./context/secondaryContext.jsx";

const preferDark = window.matchMedia("(prefers-color-scheme: dark)");
if(preferDark.matches) {
  const darkLink = document.createElement("link");
  darkLink.rel = "stylesheet";
  darkLink.href = "src/main-dark.css";
  darkLink.id = "css";
  document.head.append(darkLink);
}
else {
  const lightLink = document.createElement("link");
  lightLink.rel = "stylesheet";
  lightLink.href = "src/main-light.css";
  lightLink.id = "css";
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
