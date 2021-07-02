import React from 'react';
import {Link} from 'react-router-dom';


const Navbar = () => {

	return(
		<>
			<div className="loggedin-nav">
				<Link to="/privatejournals" className="link-btn">
					<h1>My entries</h1>
				</Link>
				<div>
					<Link to="/privatejournals/create">
						<button className="new-btn">New Entry</button>
					</Link>
					<Link to="/account">
						<button className="account-btn">My Account</button>
					</Link>
				</div>
			</div>
		</>

	)
}

export default Navbar;