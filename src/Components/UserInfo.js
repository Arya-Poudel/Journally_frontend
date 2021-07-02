import React, {useState, useEffect} from "react";
import Navbar from './Navbar';
import {useHistory} from 'react-router-dom';

const UserInfo = () => {

  const history = useHistory();
	const [accountInfo, setAccountInfo] = useState('');
	const [showPasswordChangeForm, setShowPasswordChangeForm] = useState(false);
	const [message, setMessage] = useState('');
  const [error, setError] = useState('');

	const handleLogout = () => {
		const answer = window.confirm("Are you sure you want to logout?");
		if (answer) {
			localStorage.removeItem('token');
			 history.push('/');
		}
	}

	const handleAccountDeletion = async () => {
		const answer = window.confirm("Are you sure you want to delete your account? This is permanent and cannot be undone");
		if (answer) {
	      try{
              const response = await fetch('http://localhost:5000/user/account/delete', {
              method: "DELETE",
              mode: 'cors',
              headers:{
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                'Accept': 'application/json',
                'Content-type': 'application/json'
              },
	      })
	          const data = await response.json();
	          if (response.ok) {
	          	localStorage.removeItem('token');
							window.location.href = `http://localhost:3000/#/`;
	          } else{
	          	setMessage(data.message)
	          }
	        } catch(err) {
	          setError(err.message)
	        }
		}
	}

	const handlePasswordChange = async (e) => {
		e.preventDefault();

		let formdata = new FormData(document.getElementById('change_password_form'));
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
			if (response.ok) {
				alert('Password changed. You have to login again');
				localStorage.removeItem('token');
				history.push('/login');
			} else{
					setMessage(data.message);
			}
		} catch(err) {
			setError(err.message);
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
				if (!response.ok) {
					setError(data.message);
				}
				setAccountInfo(data);
			} catch(err) {
				setError(err.message);
			}
		}
		getData();
	}, [])

	return(
	<>
	{!error && 
		<div>
		<Navbar />
		<div className="account">
			<h2>Username: {accountInfo.username}</h2>
			<h3>Entries: {accountInfo.count}</h3>
			<button onClick={handleLogout} className="logout-btn">Logout</button>
			<button type="button" className="change-password-btn" onClick={() => setShowPasswordChangeForm(true)}>Change password</button>
			<button type="button" className="delete-account-btn" onClick={handleAccountDeletion}>Delete Account</button>
		</div>	

		{showPasswordChangeForm && 
			<div className="change-password-div">
				<form id="change_password_form"  onSubmit={handlePasswordChange} className="change-password-form" autoComplete="off">
		        	<label htmlFor="old_password">Old password:</label>
		        	<input type="password" id="old_password" name="old_password" />
		        	<label htmlFor="new_password">New password:</label>
		        	<input type="password" id="new_password" name="new_password" />
		        	<label htmlFor="confirm_new_password">Confirm new password:</label>
		        	<input type="password" id="confirm_new_password" name="confirm_new_password" />
					<button type="submit" className="save-btn">Save password</button>
					<button type="button" className="cancel-btn" onClick={() => {setShowPasswordChangeForm(false); setMessage('')}}>Cancel</button>
	

		        </form>
		        <p className="message">{message}</p>
			</div>
		}
		</div>
	}
	{error && <p className="message">{error}</p>}
   </>
   )
}

export default UserInfo;