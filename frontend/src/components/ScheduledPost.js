import React,{useEffect, useState} from 'react';
import { useUser } from "@clerk/clerk-react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Sidebar } from './Sidebar';
import './ScheduledPost.css';
import {Card} from './Card';



function ScheduledPost() {

    const { user } = useUser();

    const [scheduledPosts,setScheduledPosts] = useState([]);

    const fetchData = async () => {
        try {            
          // Fetch data from the API
          const response = await fetch(`https://t-skyline-387001.el.r.appspot.com/getScheduledPost?userID=${user.id}`)
          .then(response => {
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  console.log(response);
                  return response.json();
                })
                .then(data => {
                  console.log('LinkedIn API response:', data);
                  let temp =[]
                  Object.keys(data).forEach(key =>{
                      temp.push(data[key]);
                  });

                  setScheduledPosts(temp);
                  // console.log(typeof data);
              })
                .catch(error => {
                  console.error('Error:', error);
                });
        } catch (error) {
          // Update state with error if API call fails
          console.log(error);
        } 
      };

      useEffect(() => {
        fetchData();
      }, []);


      const deleteFunction = async(deleted,id)=>{
        fetchData();
      }
    
    return (
        <div style={{display:"flex", backgroundColor:"lightgray"}}>
            <Sidebar prompt="scheduledPost"/>
            <ToastContainer />
            <div style={{marginLeft:'250px'}}>
                
            {scheduledPosts.map((object, index) => (
                <Card object={object} deleteFunction={deleteFunction}/>
            ))}

            </div>
        </div>
    );

}

export  {ScheduledPost};