import React from "react";
import { Link } from "react-router-dom";

const Home = () =>{

	return(
	<>
	<div className="home">
		<nav className="navbar">
		  <h1>Journally</h1>
		  <div>
			  <Link to="/login">
				  <button className="login-btn">Log In</button>
			  </Link>
			  <Link to="signup">
				  <button className="signup-btn">Sign Up</button>
			  </Link>
		  </div>
		</nav>
		<div className="description">
			<div className="introduction">
		     	<h2>An online private diary to record your daily-life, thoughts, dreams and frustrations.</h2>
		     	<Link to="signup">
				    <button className="signup-btn">Create An Account</button>
			    </Link>
			</div>
			<div>
			     <h2>Advantages of keeping a Journal:</h2>
			     <ul>
			     	<li>Allows you to self-reflect.</li>
			     	<li>Improves your creativity and writing.</li>
			     	<li>Helps to set and achieve your goals.</li>
			     	<li>Helps increase mindfulness and accountability.</li>
			     	<li>Strengthens your self-discipline.</li>
			     </ul>
			</div>
			<div>
			     <h2>Features of Journally:</h2>
			     <ul>
			     	<li>All journals are private by default and can only be seen by the creator.</li>
			     	<li>Can add reviews to your journals. </li>
			     	<li>Uses encryption so that your journals are always private.</li>
			     	<li>Also allows to create public journals (anonymously or not)</li>
			     </ul>
			</div>
	    </div>
     </div>
   </>
   )
}

export default Home;