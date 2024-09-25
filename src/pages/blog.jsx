import {genGetReq} from "../utils";
import {gohost} from "../assets/data.jsx";
import {useEffect} from "react";
import {useSecondaryContext} from "../context/secondaryContext.jsx";

function Blog() {
  const articleIdQuery = window.location.search.split("=")[1];
  const {article, setArticle} = useSecondaryContext();
  const {articleId, author, title, content, createdAt, modifiedAt, featured, category} = article;
  let createdDate = String(createdAt).split("T")[0];
  createdDate = new Date(createdDate).toString().slice(0, 15);
  let modifiedDate = String(modifiedAt).split("T")[0];
  modifiedDate = new Date(modifiedDate).toString().slice(0, 15);
  const request = genGetReq(`${gohost}/api/blog/article?articleId=${articleIdQuery}`);
  useEffect(() => {
    async function getArticle() {
      try {
        const response = await fetch(request);
        if (response.ok) {
          const body = await response.json();
          setArticle(body);
        }else {
          window.alert("Internal server error, please try later.");
        }
      }catch(err) {
        window.alert("Connection error, please try later.");
      }
    }
    getArticle();
  }, [])
  return (
    <div className="blog-page">
      <div className="blog-container">
        <div className="blog-title-container">
          {title}
        </div>
        <div className="blog-author-container">
          <span>by {author}, </span>
          <span>{createdDate}</span>
        </div>
        <div className="blog-content-container">
          <div dangerouslySetInnerHTML={{__html: content}}></div>
        </div>
        <div className="blog-edited-container">
          {createdDate === modifiedDate ? "" : `edited on ${modifiedDate}`}
        </div>
      </div>
    </div>
  )
}


export default Blog
