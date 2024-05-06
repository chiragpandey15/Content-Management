import React,{useState} from 'react';
import { useUser } from "@clerk/clerk-react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './CreatePost.css'

import { Sidebar } from './Sidebar';
import { MdDelete } from "react-icons/md";
import { Modal, Button, Select, MenuItem, TextField,Stack } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


function CreatePost() {

    const { user } = useUser();
    

    const [text, setText] = useState('');
    const [image, setImage] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [scheduledTime, setScheduledTime] = useState(null);
    const [scheduledDate, setScheduledDate] = useState();



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

    const deleteImage = (e) =>{
      setImage(null);
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
                
                await fetch('https://t-skyline-387001.el.r.appspot.com/publishText', {
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
                  toast.success("Successfully Shared");

            }else{
                const body = {
                    'text':text,
                    'image':image,
                    'userID':user.id
                }
                console.log(body);
                // await fetch('http://localhost:3001/publishText', {
                await fetch('https://t-skyline-387001.el.r.appspot.com/publishText', {
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
                  toast.success("Successfully Shared");
            }
            
        }catch(error){
            console.log(error);
        }
        setText('');
        setImage(null);
    };

    const handleSchedule = () => {
      setIsModalOpen(true);
    };
  
    const handleModalClose = () => {
      setIsModalOpen(false);
    };
  
    const handleScheduleSubmit = async (e) => {
      if(scheduledTime==null)
        return;
      console.log(scheduledTime.target.value);
      e.preventDefault();
      let parsedDate = new Date(scheduledDate);
      
      
      const scheduledAt = parsedDate.getFullYear().toString() +"-"+parsedDate.getMonth().toString()+"-"+
                          parsedDate.getDate().toString();
      console.log(scheduledAt);
            try{
              e.preventDefault();
              if(text==null && image==null) return;
              if(image==null){
                  const body = {
                      'text':text,
                      'userID':user.id,
                      'scheduledDate': scheduledAt,
                      'scheduledTime':scheduledTime.target.value

                  }
                  
                  // await fetch('http://localhost:3001/schedulePost', {
                  await fetch('https://t-skyline-387001.el.r.appspot.com/schedulePost', {
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
                    toast.success("Successfully scheduled");

              }else{
                  const body = {
                      'text':text,
                      'image':image,
                      'userID':user.id,
                      'scheduledDate': scheduledAt,
                      'scheduledTime':scheduledTime.target.value
                  }
                  console.log(body);
                  // await fetch('http://localhost:3001/schedulePost', {
                  await fetch('https://t-skyline-387001.el.r.appspot.com/schedulePost', {
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
                    toast.success("Successfully scheduled");
              }
              
          }catch(error){
              console.log(error);
          }
          setText('');
          setImage(null);
          setScheduledTime('');
          setScheduledDate('');
      
      setIsModalOpen(false);
    };

    const fetchPost = async (e) =>{
      const body = {
        'userID':user.id
    }
      await fetch('http://localhost:3001/fetchUserPosts', {
        // await fetch('https://t-skyline-387001.el.r.appspot.com/schedulePost', {
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
    

    return (
        <div style={{display:"flex", backgroundColor:"lightgray"}}>
            <Sidebar/>
            <ToastContainer />
            <div className="fullpage-form">
              <form onSubmit={handleSubmit}>
                  <div className='textBox'>
                    <textarea
                        value={text}
                        onChange={handleTextChange}
                        placeholder="Write your story"
                        rows={20}
                        cols={50}
                    />
                    {image && (
                      <div className='image-box'>
                        <MdDelete onClick={deleteImage} style={{position:'absolute', right:'0', opacity:'20%'}}/>
                        <img src={image} alt="Uploaded" style={{ width: '100%', height: '100%' }} />
                      </div>
                    )}
                  </div>
                  <input type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          />
                  
                  <div style={{display:'flex'}}>
                    <button type="button" onClick={handleSchedule} style={{marginRight:'10px', width:'150px'}}>Schedule</button>
                    <button type='submit'>Publish</button>
                  </div>
              </form>
            </div>

            <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-content">
          <span className="close" onClick={handleModalClose}>&times;</span>
          <form onSubmit={handleScheduleSubmit}>
          {/* <form onSubmit={fetchPost}> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={2}>
                <DatePicker
                  label="Select Date"
                  onChange={(newValue) => setScheduledDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                  disablePast
                  required
                />
                <Select
                  labelId="hour-label"
                  onChange={(newHour)=> setScheduledTime(newHour)}
                  // fullWidth
                >
                  {[...Array(24)].map((_, index) => (
                    <MenuItem key={index} value={index}>{index+":00"}</MenuItem>
                  ))}
                </Select>
                <Button type="submit" variant="contained">Schedule Post</Button>
              </Stack>
            </LocalizationProvider>
          </form>
        </div>
      </Modal>   
        </div>
    );

}

export  {CreatePost};