import React from 'react';
import { Link } from "react-router-dom";

const HomeNav = () =>{
	return(
		<nav className="navbar">
		<Link to="/" className="home-link">
		  <h1>Journally</h1>
		</Link>
		  <div>
			  <Link to="/login">
				  <button className="login-btn">Log In</button>
			  </Link>
			  <Link to="signup">
				  <button className="signup-btn">Sign Up</button>
			  </Link>
		  </div>
		</nav>
	)

}

export default HomeNav;