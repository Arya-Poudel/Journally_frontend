import React from 'react';
import {Link} from 'react-router-dom';


const Navbar = () => {

	return(
		<>
			<div className="loggedin-nav">
				<Link to="/privatejournals" >
					<h1>Your entries</h1>
				</Link>
				<div>
					<Link to="/createjournal">
						<button>New Entry</button>
					</Link>
					<Link to="/account">
						<button>My Account</button>
					</Link>
				</div>
			</div>
		</>

	)
}

export default Navbar;