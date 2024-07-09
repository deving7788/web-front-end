import { useState, useEffect, createContext, useContext } from "react";

let allChildren = [];
let errorComponent;
let allPaths = new Set();

function PreErrorPage() {
  useEffect(() => {redirectTo("/*")}, []);
  return <div></div>;
}

const RouterContext = createContext(null);

function Router({routes}) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  routes.forEach((route) => {
    if (route.path === "/*") {
      errorComponent = route.component;
    }
  })

  function getAllPaths(allPaths, routes) {
    routes.map(route => {
      allPaths.add(route.path);
      if(route.children) {
        getAllPaths(allPaths, route.children);
      }
    });
  }

  getAllPaths(allPaths, routes);

  function createAllRoutes(routes) {
    const createdRoutes = routes.map((route, index) => {
      let subAllPaths = new Set();
      subAllPaths.add(route.path);
      if (route.children) {
        getAllPaths(subAllPaths, route.children);
      }
      return (
        <Route key={index} path={subAllPaths} component={route.component}>
          {
            route.children !== undefined ? createAllRoutes(route.children) : ""
          }
        </Route>
      ) 
    })
    return createdRoutes;
  }

  const allRoutes = createAllRoutes(routes);

  return <RouterContext.Provider value={{currentPath, setCurrentPath}}>
           {allRoutes}
         </RouterContext.Provider>
}

function useRouterContext() {
  return useContext(RouterContext);
}

function Route({ path, component, children }) {
  const {currentPath, setCurrentPath} = useRouterContext();
  if (children) {
    allChildren = [...children];
  }

  function navigate(e) {
    setCurrentPath(window.location.pathname);
  }

  useEffect(function() {
    window.addEventListener("linkNavigate", navigate);
    window.addEventListener("redirectNavigate", navigate);
    window.addEventListener("popstate", navigate);
    return function() {
             window.removeEventListener("linkNavigate", navigate);
             window.removeEventListener("redirectNavigate", navigate);
             window.removeEventListener("popstate", navigate);
           }
  }, [])
  
  if (allPaths.has(currentPath)) {
    return path.has(currentPath) ? component : "";
  }else {
      return <PreErrorPage/>;
  }
}

function TheNested() {
  return <>{allChildren}</>;
}

function redirectTo(path) {
  window.history.pushState({}, "", path);
  const RedirectNavigate = new PopStateEvent("redirectNavigate");
  window.dispatchEvent(RedirectNavigate);
}

function Link({to, className, children}) {
  //const {setErrorFlag} = useRouterContext();
  
  function handleClick(e) {
    e.preventDefault();
    window.history.pushState({}, "", to);
    const LinkNavigate = new PopStateEvent("linkNavigate");
    window.dispatchEvent(LinkNavigate);
  }
  return <a href={to} className={className} onClick={handleClick}>{children}</a>;
}

function setBaseURL(url) {
  const baseUrlElement = document.createElement("base");
  baseUrlElement.href = url;
  document.head.prepend(baseUrlElement);
}

export {Router, TheNested, redirectTo, Link, setBaseURL};
