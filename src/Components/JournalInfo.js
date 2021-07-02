import React, {useState, useEffect} from "react";
import { Editor } from '@tinymce/tinymce-react';
import Navbar from './Navbar';
import {useHistory} from 'react-router-dom';


const JournalInfo = ({blogId}) => {

	const history = useHistory();
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const [journalText, setJournalText] = useState('');
	const [journalTitle, setJournalTitle] = useState('');
	const [value, setValue] = useState('');

	const decodeHtml = (html) => {
	    const txt = document.createElement("textarea");
	    txt.innerHTML = html;
	    return txt.value;
	}

	const handleDelete = async () => {
		const answer = window.confirm("Are you sure you want to delete this journal?");
		if (answer) {
	      try{
            const response = await fetch(`http://localhost:5000/user/privatejournals/${blogId}/delete`, {
              method: "DELETE",
              mode: 'cors',
              headers:{
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                'Accept': 'application/json',
                'Content-type': 'application/json'
              },
	      })
	          const data = await response.json();
	          setMessage(data.message);
	          if (response.ok) 	{
		          history.push('/privatejournals');
	          }
	        } catch(err) {
	          setError(err.message);
	        }
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const title = document.getElementById('title').value;
        if (!title || !value) {
          setMessage('Please fill up both the fields');
          return;
        }

        try{
            const response = await fetch(`http://localhost:5000/user/updatejournal/${blogId}`, {
              method: "PUT",
              mode: 'cors',
              headers:{
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                'Accept': 'application/json',
                'Content-type': 'application/json'
              },
              //serialize the JSON body
              body: JSON.stringify({title:title, journal: value})
	      })
	          const data = await response.json();
	          if (response.ok) {
	          	alert('Updated');
	          	setMessage('');
	          } else {
	          	setMessage(data.message);
	        	}
	        } catch(err) {
	          setError(err.message);
	        }
	}

	useEffect(() => {
		async function getData(){
			try{
				const response = await fetch(`http://localhost:5000/user/privatejournals/${blogId}`, {
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
				setJournalText(decodeHtml(data.journal));
				setJournalTitle(decodeHtml(data.title));
			} catch(err) {
				setError(err.message);
			}
		}
		getData();
	}, [blogId])


	return(
	<>
    {error && <p className="message">{error}</p>}
    
		{!error && 
			<div>
			<Navbar />
	         <p className="message">{message}</p>
			<form onSubmit={handleSubmit} className="new-journal-form" autoComplete="off">
				<div className="form_info">
		            <h2>Edit Journal</h2>
		            <button type="button" className="delete-journal-btn" onClick={handleDelete}>Delete</button>
	            </div>
	            <input type="text" placeholder="Title" name="title" id="title" defaultValue={journalTitle}/>
	            {<Editor 
	              initialValue={journalText}
	              value={value}
	              onEditorChange={(newValue, editor) => setValue(newValue)}
	            apiKey="rxu7s9jihhz78zovnx660tl8yno80hjks7cgooi9b97q0u9k"
	              init={{
	              	 mode : "textareas",
									 force_br_newlines : false,
									 force_p_newlines : false,
									 forced_root_block : false,
	                height: 500,
	                menubar: false,
	                 plugins: [
	                       'advlist autolink lists link image charmap print preview anchor',
	                       'searchreplace visualblocks code fullscreen',
	                       'insertdatetime media table paste code help wordcount'
	                     ],
	                     toolbar: 'undo redo | formatselect | ' +
	                     'bold italic backcolor | alignleft aligncenter ' +
	                     'alignright alignjustify | bullist numlist outdent indent | ' +
	                     'removeformat | help',
	                     content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
	              }}
	            />}
	              <button type="submit" className="save-btn">Save</button>
	        </form>
	      </div>
     }
   </>
   )
}

export default JournalInfo;