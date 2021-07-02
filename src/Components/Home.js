import React from "react";
import { Link, useHistory } from "react-router-dom";
import HomeNav from './HomeNav';

const Home = () =>{

	const history = useHistory();

	if (JSON.parse(localStorage.getItem('token'))) {
		history.push('/privatejournals');
	}
	
	return(
	<>
	<div className="home">
		<HomeNav />
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
			     	<li>Uses encryption so that your journals are always private.</li>
			     	<li>You can edit and delete your journals at any time. </li>
			     	<li>You can delete your account at any time.</li>
			     </ul>
			</div>
	    </div>
     </div>
   </>
   )
}

export default Home;