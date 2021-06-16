import React, {useState, useEffect} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Navbar from './Navbar';


const TinyMceDemo = () => {

  const initialValue = '';
  const [message, setMessage] = useState('');
  const [value, setValue] = useState(initialValue ?? '');

  useEffect(() => setValue(initialValue ?? ''), [initialValue]);

   const handleSubmit = async (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;

        if (!title || !value) {
          setMessage('Fill up both fields');
          return;
        }
        
        try{
            const response = await fetch('http://localhost:5000/user/createjournal', {
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
          setMessage(data.message);
        } catch(err) {
          console.log(err);
          setMessage(err);
        }
   }

   return (
     <>
        <Navbar/>
         <p>{message}</p>
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
              <button type="submit">Submit</button>
        </form>

     </>
   );
 }

 export default TinyMceDemo;