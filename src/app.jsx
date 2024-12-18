import {useEffect} from "react";
import {Router, setBaseURL} from "./router.jsx";
import {Home, MainFrame, ErrPage, Blogs, SignupGate, UserPanelGate, LoginGate, Blog} from "./pages";
import {useMainContext} from "./context/mainContext.jsx";
import {authenticate} from "./auth";
import {frontendHost} from "./assets/data.jsx";

setBaseURL(frontendHost);

function App() {
  const {emailVerified, updateLoggedIn, updateAccountName, updateDisplayName, updateRole, updateEmail, updateEmailVerified} = useMainContext();
  const refreshToken = sessionStorage.getItem("refreshToken");
  useEffect(() => {
      if(refreshToken) {
        authenticate({refreshToken, updateLoggedIn, updateAccountName, updateDisplayName, updateRole, updateEmail, updateEmailVerified});
      }
  }, []);

  const routes = [
    {path: "/", 
     component: <MainFrame/>,
     children: [
       {path: "/", component: <Home/>,},
       {path: "/articles", component: <Blogs/>,},
       {path: "/article", component: <Blog/>,},
       {path: "/signup", component: <SignupGate/>,},
       {path: "/login", component: <LoginGate/>,},
       {path: "/user-panel", component: <UserPanelGate/>,},
     ],},
     {path: "/*", component: <ErrPage/>,},
  ];

  return (
    <Router routes={routes}/>
  )
  

}

export default App;
