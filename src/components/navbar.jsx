import {Link} from "../router.jsx";
import { navbarTitle } from "../assets/asset.jsx"

function Navbar() {
  return (
    <nav className="navbar"> {
      navbarTitle.map((item) => {
      const {id, title, link} = item;
      return <span key={id}><Link to={link} className="router-link"> {title} </Link> </span>; }) 
    } 
    </nav>
  )
}

export default Navbar;
