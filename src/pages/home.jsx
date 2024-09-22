import {useSecondaryContext} from "../context/secondaryContext.jsx";
import {gohost} from "../assets/data.jsx";
import {genGetReq} from "../utils";
import {useEffect} from "react";

function Home() {
  console.log("test in home page")
  const {featuredArticles, setFeaturedArticles} = useSecondaryContext();
  const request = genGetReq(`${gohost}/api/blog/featured-articles`);
  useEffect(() => {
    async function getFeaturedArticles() {
      try {
        const response = await fetch(request);
        if (response.ok) {
          const articles = await response.json();
          console.log("response body in home page: ", articles)
          setFeaturedArticles(articles);
        }else {
          window.alert("Internal server error, please try later.");
        }
      }catch(err) {
        window.alert("Connection error, please try later.");
      }
    }
    getFeaturedArticles();
  }, [])
  return (
    <div className="home-page">
      <div className="featured-blogs-container">
        {featuredArticles.map((article) => {
            const {articleId, author, title, content, createdAt, modifiedAt} = article;
            let createdDate = String(createdAt).split("T")[0];
            createdDate = new Date(createdDate).toString().slice(0, 15);
            let modifiedDate = String(modifiedAt).split("T")[0];
            modifiedDate = new Date(modifiedDate).toString().slice(0, 15);
            return (
              <div key={articleId} className="featured-blog-container">
                <div className="featured-blog-title-container">
                  {title}
                </div>
                <div className="featured-blog-author-container">
                  <span>by {author}, </span>
                  <span>{createdDate}</span>
                </div>
                <div className="featured-blog-content-container">
                  <div dangerouslySetInnerHTML={{__html: content}}></div>
                </div>
                <div className="featured-blog-edited-container">
                  {createdDate === modifiedDate ? "" : `edited on ${modifiedDate}`}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home;
