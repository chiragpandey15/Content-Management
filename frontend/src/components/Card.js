import React from 'react';
import './Card.css'; // Import CSS file for styling
import { FaEdit,FaTrash } from 'react-icons/fa';

const Card = ({ object, deleteFunction}) => {

   const onDelete = async() =>{
    try{
        const body ={
            'documentID': object.documentID
        };
        console.log(body);
        await fetch(`https://t-skyline-387001.el.r.appspot.com/deleteSchedulePost`,{

            method:"POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(body)
        })
            .then(response => {
                    if (!response.ok) {
                      throw new Error('Network response was not ok');
                    }
                    console.log(response);
                    return response.json();
                  })
                  .then(data => {
                    console.log('LinkedIn API response:', data);
                    deleteFunction(true);
                    
                    // console.log(typeof data);
                })
                  .catch(error => {
                    console.error('Error:', error);
                  });


    }catch(e){
        console.log(e);
    }
   } 

   const onEdit = () => {
    try{

    }catch(e){
        console.log(e);
    }
   }

  return (
    <div className="card" >
      <p>{object.text}</p>
      <FaEdit id='editBtn' className='editBtn'/>
      <FaTrash id='deleteBtn' className='deleteBtn' onClick={onDelete}/>
    </div>
  );
};

export {Card};
