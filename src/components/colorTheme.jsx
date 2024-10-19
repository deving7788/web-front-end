import {useState, useEffect, useRef} from "react";

function ColorTheme() {
  const [showThemesList, setShowThemesList] = useState(false)
  const [colorTheme, setColorTheme] = useState("");
  const themeConRef = useRef(null);

  function handleClickOut(e) {
    const btnColor = document.getElementById("color-theme-btn");
    if(themeConRef && !themeConRef.current.contains(e.target) && e.target !== btnColor) {
      setShowThemesList(false); 
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOut);
    return function() {document.removeEventListener("click", handleClickOut);}
  }, [])
  
  function setCSS() {
    const linkElements = document.getElementsByTagName("link"); 
    const linkCSS = linkElements.namedItem("css");
    let preferDark;
    switch (colorTheme) {
      case "system":
        preferDark = window.matchMedia("(prefers-color-scheme: dark)");
        if(preferDark.matches) {
          linkCSS.href = "/css/main-dark.css";
        }else {
          linkCSS.href = "/css/main-light.css";
        }
        break;
      case "to-light":
        linkCSS.href = "/css/main-light.css";
        break;
      case "to-dark":
        linkCSS.href = "/css/main-dark.css";
        break;
    }
  }
  useEffect(setCSS, [colorTheme]);

  return (
      <div className="color-theme-container">
        <div id="color-theme-btn" className="color-theme-btn btn" onClick={() => setShowThemesList(!showThemesList)}>
          Theme
        </div>
        <div ref={themeConRef} className={showThemesList ? "themes-list-container show" : "themes-list-container"}>
          <ul className="themes-list">
            <li onClick={()=>setColorTheme("system")}>System</li>
            <li onClick={()=>setColorTheme("to-light")}>Light</li>
            <li onClick={()=>setColorTheme("to-dark")}>Dark</li>
          </ul>
        </div>
      </div>
  )
}

export default ColorTheme; 
