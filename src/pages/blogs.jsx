import {useState, useEffect} from "react";
import {genGetReq} from "../utils";
import {gohost} from "../assets/data.jsx";
import {useMainContext} from "../context/mainContext.jsx";
import {useSecondaryContext} from "../context/secondaryContext.jsx";
import {Link} from "../router.jsx";

function Blogs() {
  const {articles, setArticles} = useSecondaryContext();
  async function getAllArticles() {
    const request = genGetReq(`${gohost}/api/blog/article-titles`);
    try {
      const response = await fetch(request);
      const body = await response.json();
      setArticles(body);
    }catch(err) {
      window.alert("Connection error, please try later.");
    }
  }
  useEffect(() => getAllArticles, []);

  return (
    <div className="blogs-page">
      <div className="blog-titles-container">
      {
        articles.map((article) => {
          const {articleId, title} = article;
          return (
            <div key={articleId} className="blog-title">
                <Link to={`/article?id=${articleId}`}className="router-link"><div dangerouslySetInnerHTML={{__html: title}}/></Link>
            </div>
            
          )
        })
      }
      </div>
    </div>
  )
}

export default Blogs
