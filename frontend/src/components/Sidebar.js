import React from 'react';
import { useUser, UserButton } from "@clerk/clerk-react";
import { FaFontAwesome, FaPen, FaLightbulb, FaToolbox, FaArrowUp } from 'react-icons/fa';
import myImage from '../icon.png'; 

import './Sidebar.css';
import { useNavigate, useNavigation } from 'react-router-dom';


function Sidebar(prompt) {

    const { user } = useUser();
    const history = useNavigate();
    
    const goToScheduledPost = () => {
        console.log("goToScheduledPost clicked")
        history('/scheduledPost');
        
      };

    const goToFirstpage = () => {
        history('/');
    }
    
  return (
    
        <div className="sidebar">
        <ul>
            <li onClick={goToFirstpage}>
            <div className='company'>
                <div className="logo">
                    <img src={myImage} alt="Company Logo" />
                </div>
                <span>CMS</span>
            </div>

            </li>
            {prompt.prompt=="createPost"? <li
                style={{backgroundColor:"lightgray", borderRadius:"5px", padding:"10px"}} 
                onClick={goToFirstpage}
            >
                <FaPen style={{paddingRight:'5px'}}/> Create Post
            </li> : <li onClick={goToFirstpage}><FaPen style={{paddingRight:'5px'}}/> Create Post</li>}
            {prompt.prompt=="scheduledPost"?
            <li 
            style={{backgroundColor:"lightgray", borderRadius:"5px", padding:"10px"}} 
            onClick={goToScheduledPost}>
            <FaFontAwesome style={{paddingRight:'5px'}}/> Scheduled Post
            </li>: <li onClick={goToScheduledPost}><FaFontAwesome style={{paddingRight:'5px'}}/> Scheduled Post</li>}
            
        </ul>
        <div className="sign-out">
        <UserButton />
            <span>{user.fullName}</span>
            
        </div>
        </div>

        
  );
};

export  {Sidebar};
