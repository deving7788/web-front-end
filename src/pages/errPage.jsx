import {Link} from "../router.jsx";
function ErrPage(){
    return <div className="error-page">
             <div className="error-page-content">
               <div className="error-page-message">This page does not exist.</div>
               <div className="error-page-link router-link"><Link to="/">Home page</Link></div>
             </div>
           </div>
}

export default ErrPage
