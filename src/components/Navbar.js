import { Link, useLocation } from "react-router-dom";

const Navbar = () => {

  let location = useLocation();

  const handClick = () => {
    sessionStorage.clear()
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">iNotebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              {!localStorage.getItem('token') ? <>
              <Link className="btn btn-primary mx-2" to="/login " role="button">Login</Link>
              <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link></> :
               <Link className="btn btn-danger mx-2" to="/login" role="button" onClick={handClick}>Logout</Link>}
            </form>
          </div>
        </div>
      </nav>

    </>
  )
}
export default Navbar
