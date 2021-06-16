import React from "react";

const Login = () =>{

	if (JSON.parse(localStorage.getItem('token'))) {
		window.location.href = 'http://localhost:3000/#/privatejournals';
	}

	const handleFormSubmit = async (e) => {
		e.preventDefault();
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
			console.log(data);
			if (data.token) {
				localStorage.setItem('token', JSON.stringify(data.token))
			}
		} catch(err) {
			console.log(err);
		}
	}

	return(
	<>
		<div className="form">
			<form id="login_form"  onSubmit={handleFormSubmit} className="form_div" autoComplete="off">
	        	<label htmlFor="email">Email:</label>
	        	<input type="email" id="email" name="email" required/>
	        	<label htmlFor="password">Password:</label>
	        	<input type="password" id="password" name="password" required/>
				<button type="submit" className="linkBtn">LOGIN</button>
	        </form>
		</div>
   </>
   )
}

export default Login;