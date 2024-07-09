import {useEffect} from "react";
import {Router, setBaseURL} from "./router.jsx"; 
import {Home, MainFrame, ErrPage, Blogs, Forum, SignupGate, UserPanelGate, Login} from "./pages";
import {authenticate} from "./auth";
import {useMainContext} from "./context/mainContext.jsx";

setBaseURL("http://localhost:5000");

function App() {
  const {updateLoggedIn, updateAccountName, updateDisplayName, updateRole, updateEmail} = useMainContext();
  const refreshToken = localStorage.getItem("refreshToken");
  useEffect(() => {
      if(refreshToken) {
        authenticate({refreshToken, updateLoggedIn, updateAccountName, updateDisplayName, updateRole, updateEmail});
      }
  }, []);

  console.log("test")

  const routes = [
    {path: "/", 
     component: <MainFrame/>,
     children: [
       {path: "/", component: <Home/>,},
       {path: "/blogs", component: <Blogs/>,},
       {path: "/signup", component: <SignupGate/>,},
       {path: "/login", component: <Login/>,},
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
