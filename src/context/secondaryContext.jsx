import {useState, useContext, createContext} from "react";

const SecondaryContext = createContext(null);

function SecondaryContextProvider({children}) {
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState({});
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [settingVisibility, toggleSettingVisibility] = useState(true);
  return <SecondaryContext.Provider value={{articles, setArticles, article, setArticle, featuredArticles, setFeaturedArticles, settingVisibility, toggleSettingVisibility}}>
           {children}
         </SecondaryContext.Provider>

}

function useSecondaryContext() {
  return useContext(SecondaryContext);
}

export default SecondaryContextProvider;
export {useSecondaryContext};

