import {useState, useEffect} from "react";
import {genGetReq} from "../utils";
import {gohost} from "../assets/data.jsx";
import {useMainContext} from "../context/mainContext.jsx";

function Blogs() {
  const {articles, setArticles} = useMainContext();

  async function getAllArticles() {
    const request = genGetReq(`${gohost}/api/blog/article-titles`);
    try {
      const response = await fetch(request);
      const body = await response.json();
      console.log(body);
      setArticles(body);
    }catch(err) {
      console.log(err)
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
                <a href="" className="blog-title-link"><div dangerouslySetInnerHTML={{__html: title}}/></a>
            </div>
            
          )
        })
      }
      </div>
    </div>
  )
}

export default Blogs
