import React,{useState} from 'react';
import { useUser } from "@clerk/clerk-react";


import './CreatePost.css'

import { Sidebar } from './Sidebar';

function CreatePost() {

    const { user } = useUser();
    

    const [text, setText] = useState('');
    const [image, setImage] = useState(null);


    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
        const imageData = reader.result;
        setImage(imageData);
        };
    };

    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            if(text==null && image==null) return;
            if(image==null){
                const body = {
                    'text':text,
                    'userID':user.id,
                }
                
                await fetch('https://clean-pilot-386800.wl.r.appspot.com/publishText', {
                method: 'POST',
                
                headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(body)
                }).then(response => {
                    if (!response.ok) {
                      throw new Error('Network response was not ok');
                    }
                    console.log(response);
                  })
                  .then(data => {
                    console.log('LinkedIn API response:', data);
                    
                })
                  .catch(error => {
                    console.error('Error:', error);
                  });

            }else{
                const body = {
                    'text':text,
                    'image':image,
                    'userID':user.id
                }
                console.log(body);
                // await fetch('http://localhost:3001/publishText', {
                await fetch('https://clean-pilot-386800.wl.r.appspot.com/publishText', {
                method: 'POST',
                
                headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(body)
                }).then(response => {
                    if (!response.ok) {
                      throw new Error('Network response was not ok');
                    }
                    console.log(response);
                  })
                  .then(data => {
                    console.log('LinkedIn API response:', data);
                    
                })
                  .catch(error => {
                    console.error('Error:', error);
                  });
            }
            
        }catch(error){
            console.log(error);
        }
        setText('');
        setImage(null);
    };


    return (
        <div style={{display:"flex", backgroundColor:"lightgray"}}>
            <Sidebar/>

            <div className="fullpage-form">
            <form onSubmit={handleSubmit}>
                <textarea
                    value={text}
                    onChange={handleTextChange}
                    placeholder="Write your story"
                    rows={30}
                    cols={50}
                />
                <input type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        />
                <button type='submit'>Publish</button>
            </form>
        </div>

        </div>
    );

}

export  {CreatePost};