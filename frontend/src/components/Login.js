import React from 'react';
import {  SignIn } from "@clerk/clerk-react";
import myImage from '../icon.png'; 
import './Login.css'; 


function Login() {

  return (
    <div className='backgroundImage'>
        <header className="header">
            <div className='company'>
                <div className="logo">
                    <img src={myImage} alt="Company Logo" />
                </div>
                <span>Content Management</span>
            </div>
        <nav className="nav">
            <ul>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#" className="btn-try-free">Try for Free</a></li>
            </ul>
        </nav>
        </header>
        
        <div className='main-text'><strong style={{paddingRight:'5px', color:'rgb(45,100,188)'}}>LinkedIn </strong> Operation Tool for content-led creators </div>
        <div className="clerkLogin">
        <div className="login-container">
            <SignIn/>
        </div>
        </div>
    </div>
  );
}

export  {Login};

