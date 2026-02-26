import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Tv, Home, Search as SearchIcon } from 'lucide-react';
import "../App.css";

const NavBar = () => {
  return (
    <nav className="glass-nav py-3">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="d-flex align-items-center text-decoration-none">
          <div className="bg-primary p-2 rounded-3 me-2 d-flex align-items-center justify-content-center">
            <Tv size={24} color="white" />
          </div>
          <span className="fs-4 fw-bold text-white tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            TV<span className="text-primary">MAZEE</span>
          </span>
        </Link>

        <div className="d-flex gap-4 align-items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-decoration-none d-flex align-items-center gap-2 fw-medium transition-all ${isActive ? 'text-primary' : 'text-secondary hover-white'}`
            }
          >
            <Home size={18} />
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              `text-decoration-none d-flex align-items-center gap-2 fw-medium transition-all ${isActive ? 'text-primary' : 'text-secondary hover-white'}`
            }
          >
            <SearchIcon size={18} />
            <span>Browse</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
