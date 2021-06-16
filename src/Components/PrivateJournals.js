import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import Navbar from './Navbar';

const PrivateJournals = () => {

	function decodeHtml(html) {
	    var txt = document.createElement("textarea");
	    txt.innerHTML = html;
	    return txt.value;
	}

	const [journals, setJournals] = useState([]);

	useEffect(() => {
		async function getData(){
			try{
				const response = await fetch('http://localhost:5000/user/privatejournals', {
					mode: 'cors',
					headers:{
						'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
					},
				})
				const data = await response.json();
				console.log(data);
				setJournals(data);
			} catch(err) {
				console.log(err);
			}
		}
		getData();
	}, [])

	return(
	<>
		<div>
			<Navbar />
			 {journals.map(journal => (
			 	<Link key={journal._id} className="link" to={`/journal/${journal._id}`}> 
			 		<div className="journal">
				 		<p>{decodeHtml(journal.title)}</p>
				 		<p>{decodeHtml(journal.date.split("T")[0])}</p>

			 		</div>
			 	</Link>
			 	)
			 )}
		</div>
   </>
   )
}

export default PrivateJournals;