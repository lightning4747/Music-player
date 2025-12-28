import { Link, useLocation } from "react-router" 

export const Navbar = () => {
    const location = useLocation();
    return <nav className="navbar">
        <div className="navbar-brand">
        <Link className="brand-link" to="/">Muisc Player</Link>
        </div>
        <div className="navbar-links">
            <Link to="/" className={`nav-link ${location.pathname==="/" ? "active" : ""}`}>All songs</Link>
              <Link to="/player" className={`nav-link ${location.pathname==="/player" ? "active" : ""} `}>Playlist</Link>
        </div>
    </nav>
}