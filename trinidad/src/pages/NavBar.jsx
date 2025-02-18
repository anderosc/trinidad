import { Link } from "react-router"

function NavBar() {
  return (
    <div className="navbar">
      <div className="navbaritem">
        <ul>
          <Link to="/intro">  <li>NÕUDED</li> </Link>
          <Link to="/article">  <li>ARTIKKEL</li> </Link>
          <Link to="/list">  <li>TABEL</li> </Link>
          <Link to="/life">  <li>GAME OF LIFE</li> </Link>
        </ul>
        </div>
    </div>
  )
}

export default NavBar