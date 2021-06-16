import React, {useState, useEffect} from "react";
import Navbar from './Navbar';


const UserInfo = () =>{

	const [accountInfo, setAccountInfo] = useState('');
	const [showPasswordChangeForm, setShowPasswordChangeForm] = useState(false);

	const handleLogout = () => {
		const answer = window.confirm("Are you sure you want to logout?");
		if (answer) {
			localStorage.removeItem('token');
		}

	}

	const handlePasswordChange = async (e) => {
		e.preventDefault();
		let formdata = new FormData(document.getElementById('change_password_form'));
		console.log(formdata);
		try{
			const response = await fetch('http://localhost:5000/user/changepassword', {
				method: "POST",
				mode: 'cors',
				headers:{
					'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
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

	useEffect(() => {
		async function getData(){
			try{
				const response = await fetch('http://localhost:5000/user', {
					mode: 'cors',
					headers:{
						'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
					},
				})
				const data = await response.json();
				setAccountInfo(data);
			} catch(err) {
				console.log(err);
			}
		}
		getData();
	}, [])

	return(
	<>
		<Navbar />
		<div className="account">
			<h1>Account Info</h1>
			<p>Username: {accountInfo.username}</p>
			<p>Email: {accountInfo.email}</p>
			<button onClick={handleLogout}>Logout</button>
			<button type="button" onClick={() => setShowPasswordChangeForm(true)}>Change password</button>
		</div>	

		{showPasswordChangeForm && 
			<div className="change-password-div">
				<h2>Change password</h2>
				<form id="change_password_form"  onSubmit={handlePasswordChange} className="change-password" autoComplete="off">
		        	<label htmlFor="old_password">Old password:</label>
		        	<input type="password" id="old_password" name="old_password" required/>
		        	<label htmlFor="new_password">New password:</label>
		        	<input type="password" id="new_password" name="new_password" required/>
		        	<label htmlFor="confirm_new_password">Confirm new password:</label>
		        	<input type="password" id="confirm_new_password" name="confirm_new_password" required/>
					<button type="submit">Save password</button>
					<button type="button" onClick={() => setShowPasswordChangeForm(false)}>Cancel</button>
		        </form>
			</div>
		}

   </>
   )
}

export default UserInfo;