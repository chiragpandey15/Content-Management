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
<<<<<<< HEAD
                <span>Content Management</span>
=======
                <span>Lica Take-Home Assignment</span>
>>>>>>> 9eb881ae797dfcb5a30a00701fa97e90cf8af5cf
            </div>
        <nav className="nav">
            <ul>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#" className="btn-try-free">Try for Free</a></li>
            </ul>
        </nav>
        </header>
<<<<<<< HEAD
        
        <div className='main-text'><strong style={{paddingRight:'5px', color:'rgb(45,100,188)'}}>LinkedIn </strong> Operation Tool for content-led creators </div>
=======

>>>>>>> 9eb881ae797dfcb5a30a00701fa97e90cf8af5cf
        <div className="clerkLogin">
        <div className="login-container">
            <SignIn/>
        </div>
        </div>
    </div>
  );
}

export  {Login};

