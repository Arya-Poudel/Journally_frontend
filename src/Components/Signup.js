import React, {useState} from "react";
import HomeNav from './HomeNav';
import {Link, useHistory} from 'react-router-dom';

const Signup = () => {

	const history = useHistory();
	const [message, setMessage] = useState('');

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		if (!document.getElementById('username').value || !document.getElementById('password').value || !document.getElementById('confirm_password')) {
			setMessage('Please fill up all the fields');
			return;
		}
		let formdata = new FormData(document.getElementById('signup_form'));
		try{
			const response = await fetch('https://journally-backend.herokuapp.com/signup', {
				method: "POST",
				mode: 'cors',
				headers:{
					'Accept': 'application/json',
					'Content-type': 'application/json'
				},
				//serialize the JSON body
				body: JSON.stringify(Object.fromEntries(formdata))
			})
			if (response.ok) {
				try{
					const response = await fetch('https://journally-backend.herokuapp.com/login', {
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
			else{
				const data = await response.json();
				setMessage(data.message);
			}
			
		} catch(err) {
			setMessage(err.message)
		}
		
	}

	return(
	<>
		<HomeNav />
		<form id="signup_form"  onSubmit={handleFormSubmit} className="signup_form" autoComplete="off">
        	<label htmlFor="username" > Username*: </label>
        	<input type="text" id="username" name="username"  />
        	<label htmlFor="password">Password*:</label>
        	<input type="password" id="password" name="password" />
        	<label htmlFor="confirm_password">Confirm Password*:</label>
        	<input type="password" id="confirm_password" name="confirm_password" />
			<button type="submit" className="save-btn">SIGNUP</button>
			<button type="button" className="cancel-btn">
				<Link className="link-btn" to="/">Cancel</Link>
			</button>
        </form>
        <p className="message">{message}</p>
   </>
   )
}

export default Signup;