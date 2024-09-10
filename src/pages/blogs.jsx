import {useState, useEffect} from "react";
import {genGetReq} from "../utils";
import {gohost} from "../assets/data.jsx";
import {useMainContext} from "../context/mainContext.jsx";

function Blogs() {
  const {articles, setArticles} = useMainContext();

  async function getAllArticles() {
    const request = genGetReq(`${gohost}/api/blogs`);
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
      <div className="blogs-container">
      {
        articles.map((article) => {
          const {articleId, title, content} = article;
          return (
            <div key={articleId} className="blog-article">
              <div dangerouslySetInnerHTML={{__html: title}}/>
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

export default Blogs
