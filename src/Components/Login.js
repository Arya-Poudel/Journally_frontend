import React, {useState} from "react";
import HomeNav from './HomeNav';
import {Link, useHistory} from 'react-router-dom';

const Login = () => {

	const history = useHistory();
	const [message, setMessage] = useState('');


	if (JSON.parse(localStorage.getItem('token'))) {
		const checkToken = async () => {
			try{
				const response = await fetch('http://localhost:5000/user/privatejournals', {
					mode: 'cors',
					headers:{
						'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
					},
				})
				if (response.ok) {
					history.push('/privatejournals');
				} else{
					localStorage.removeItem('token');
				}
			} catch(err) {
				setMessage(err.message);
			}
		}
		checkToken();
	}


	const handleFormSubmit = async (e) => {
		e.preventDefault();
		if (!document.getElementById('username').value || !document.getElementById('password').value) {
			setMessage('Please fill up both the fields');
			return;
		}
		let formdata = new FormData(document.getElementById('login_form'));
		try{
			const response = await fetch('http://localhost:5000/login', {
				method: "POST",
				mode: 'cors',
				headers:{
					'Accept': 'application/json',
					'Content-type': 'application/json'
				},
				//serialize the JSON body
				body: JSON.stringify(Object.fromEntries(formdata))
			})
			const data = await response.json();
			setMessage(data.message);
			if (response.ok) {
				localStorage.setItem('token', JSON.stringify(data.token));
				history.push('/privatejournals')
			}	
		} catch(err) {
			setMessage(err.message);
		}
	}

	return(
	<>
		<HomeNav />
		<form id="login_form"  onSubmit={handleFormSubmit} className="login_form" autoComplete="off">
        	<label htmlFor="username">Username:</label>
        	<input type="text" id="username" name="username" />
        	<label htmlFor="password">Password:</label>
        	<input type="password" id="password" name="password" />
			<button type="submit" className="save-btn">LOGIN</button>
			<button type="button" className="cancel-btn">
				<Link className="link-btn" to="/">Cancel</Link>
			</button>
        </form>
        <p className="message">{message}</p>
   </>
   )
}

export default Login;