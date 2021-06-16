import React from "react";

const Signup = () => {

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		let formdata = new FormData(document.getElementById('signup_form'));
		try{
			const response = await fetch('http://localhost:5000/signup', {
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
		} catch(err) {
			console.log(err);
		}
		
	}

	return(
	<>
		<div className="form">
			<form id="signup_form"  onSubmit={handleFormSubmit} className="form_div" autoComplete="off">
	        	<label htmlFor="email">Email:</label>
	        	<input type="email" id="email" name="email" required/>
	        	<label htmlFor="username" > Username: </label>
	        	<input type="text" id="username" name="username" required />
	        	<label htmlFor="password">Password:</label>
	        	<input type="password" id="password" name="password" required/>
	        	<label htmlFor="confirm_password">Confirm Password:</label>
	        	<input type="password" id="confirm_password" name="confirm_password" required/>
				<button type="submit" className="linkBtn">SIGNUP</button>
	        </form>
		</div>
   </>
   )
}

export default Signup;