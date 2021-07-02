import React, {useState, useEffect} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Navbar from './Navbar';
import {useHistory} from 'react-router-dom';


const CreateJournal = () => {

  const history = useHistory();
  const initialValue = '';
  const [message, setMessage] = useState('');
  const [value, setValue] = useState(initialValue ?? '');
  const [error, setError] = useState('');

  useEffect(() => setValue(initialValue ?? ''), [initialValue]);

  useEffect(() => {
    async function getData(){
      try{
        const response = await fetch('https://journally-backend.herokuapp.com/user/', {
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
      } catch(err) {
        setError(err.message);
      }
    }
    getData();
  }, [])


   const handleSubmit = async (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        if (!title || !value) {
          setMessage('Please fill up both the fields');
          return;
        }
        
        try{
            const response = await fetch('https://journally-backend.herokuapp.com/user/createjournal', {
              method: "POST",
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
            alert('Saved');
             history.push(`/privatejournals/${data.journal._id}`);
          }
          setMessage(data.message)
        } catch(err) {
          setError(err.message);
        }
   }

   return (
     <>
     {!error && <div>
           <Navbar/>
         <p className="message">{message}</p>
        <form onSubmit={handleSubmit} className="new-journal-form" autoComplete="off">
            <h2>New Journal</h2>
            <input type="text" placeholder="Title" name="title" id="title"/>
            {<Editor 
              initialValue={initialValue}
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
              <button type="submit" className="save-btn">Submit</button>
        </form>
      </div>
     }
       {error && <p className="message">{error}</p>}

     </>
   );
 }

 export default CreateJournal;