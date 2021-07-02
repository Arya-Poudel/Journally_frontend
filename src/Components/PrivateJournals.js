import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import Navbar from './Navbar';

const PrivateJournals = () => {

	const decodeHtml =  (html) => {
	    const txt = document.createElement("textarea");
	    txt.innerHTML = html;
	    return txt.value;
	}

	const [journals, setJournals] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		async function getData(){
			try{
				const response = await fetch('https://journally-backend.herokuapp.com/user/privatejournals', {
					mode: 'cors',
					headers:{
						'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
					},
				})
				const data = await response.json();
				if (!response.ok) {
					setError(data.message);
					return;
				}
				setJournals(data);
			} catch(err) {
				setError(err.message);
			}
		}
		getData();
	}, [])

	return(
	<>
		{(!error && <div> 
			<Navbar />
			{journals.map(journal => (
			<Link key={journal._id} className="link" to={`/privatejournals/${journal._id}`}> 
				<div className="journal">
		 		<p className="journal-title">{decodeHtml(journal.title)}</p>
		 		<p>{decodeHtml(journal.date.split("T")[0])}</p>
				</div>
			</Link>
			)
		)}
		</div>)}

		{(error && <p className="message">{error}</p>)}
   </>
   )
}

export default PrivateJournals;