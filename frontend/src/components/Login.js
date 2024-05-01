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
                <span>Lica Take-Home Assignment</span>
            </div>
        <nav className="nav">
            <ul>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#" className="btn-try-free">Try for Free</a></li>
            </ul>
        </nav>
        </header>

        <div className="clerkLogin">
        <div className="login-container">
            <SignIn/>
        </div>
        </div>
    </div>
  );
}

export  {Login};

