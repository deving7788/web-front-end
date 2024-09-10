import {useEffect} from "react";
import {Router, setBaseURL} from "./router.jsx";
import {Home, MainFrame, ErrPage, Blogs, Forum, SignupGate, UserPanelGate, LoginGate, Blog} from "./pages";
import {useMainContext} from "./context/mainContext.jsx";
import {authenticate} from "./auth";
import {frontendHost} from "./assets/data.jsx";

setBaseURL(frontendHost);

function App() {
  const {emailVerified, updateLoggedIn, updateAccountName, updateDisplayName, updateRole, updateEmail, updateEmailVerified} = useMainContext();
  const refreshToken = localStorage.getItem("refreshToken");
  useEffect(() => {
      if(refreshToken) {
        authenticate({refreshToken, updateLoggedIn, updateAccountName, updateDisplayName, updateRole, updateEmail, updateEmailVerified});
      }
  }, []);

  console.log("test in app")

  const routes = [
    {path: "/", 
     component: <MainFrame/>,
     children: [
       {path: "/", component: <Home/>,},
       {path: "/blogs", component: <Blogs/>,},
       {path: "/blog", component: <Blog/>,},
       {path: "/signup", component: <SignupGate/>,},
       {path: "/login", component: <LoginGate/>,},
       {path: "/forum", component: <Forum/>,},
       {path: "/user-panel", component: <UserPanelGate/>,},
     ],},
     {path: "/*", component: <ErrPage/>,},
  ];

  return (
    <Router routes={routes}/>
  )
  

}

export default App;
