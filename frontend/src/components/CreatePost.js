import React,{useState} from 'react';
import { useUser } from "@clerk/clerk-react";

<<<<<<< HEAD
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
=======
>>>>>>> 9eb881ae797dfcb5a30a00701fa97e90cf8af5cf

import './CreatePost.css'

import { Sidebar } from './Sidebar';
<<<<<<< HEAD
import { MdDelete } from "react-icons/md";
import { Modal, Button, Select, MenuItem, TextField,Stack } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

=======
>>>>>>> 9eb881ae797dfcb5a30a00701fa97e90cf8af5cf

function CreatePost() {

    const { user } = useUser();
    

    const [text, setText] = useState('');
    const [image, setImage] = useState(null);

<<<<<<< HEAD
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [scheduledTime, setScheduledTime] = useState(null);
    const [scheduledDate, setScheduledDate] = useState();


=======
>>>>>>> 9eb881ae797dfcb5a30a00701fa97e90cf8af5cf

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
<<<<<<< HEAD
        
=======
>>>>>>> 9eb881ae797dfcb5a30a00701fa97e90cf8af5cf
        setImage(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
        const imageData = reader.result;
        setImage(imageData);
        };
    };

<<<<<<< HEAD
    const deleteImage = (e) =>{
      setImage(null);
    };

=======
>>>>>>> 9eb881ae797dfcb5a30a00701fa97e90cf8af5cf
    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            if(text==null && image==null) return;
            if(image==null){
                const body = {
                    'text':text,
                    'userID':user.id,
                }
                
<<<<<<< HEAD
                await fetch('https://t-skyline-387001.el.r.appspot.com/publishText', {
=======
                await fetch('https://clean-pilot-386800.wl.r.appspot.com/publishText', {
>>>>>>> 9eb881ae797dfcb5a30a00701fa97e90cf8af5cf
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
<<<<<<< HEAD
                  toast.success("Successfully Shared");
=======
>>>>>>> 9eb881ae797dfcb5a30a00701fa97e90cf8af5cf

            }else{
                const body = {
                    'text':text,
                    'image':image,
                    'userID':user.id
                }
                console.log(body);
                // await fetch('http://localhost:3001/publishText', {
<<<<<<< HEAD
                await fetch('https://t-skyline-387001.el.r.appspot.com/publishText', {
=======
                await fetch('https://clean-pilot-386800.wl.r.appspot.com/publishText', {
>>>>>>> 9eb881ae797dfcb5a30a00701fa97e90cf8af5cf
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
<<<<<<< HEAD
                  toast.success("Successfully Shared");
=======
>>>>>>> 9eb881ae797dfcb5a30a00701fa97e90cf8af5cf
            }
            
        }catch(error){
            console.log(error);
        }
        setText('');
        setImage(null);
    };

<<<<<<< HEAD
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
    
=======
>>>>>>> 9eb881ae797dfcb5a30a00701fa97e90cf8af5cf

    return (
        <div style={{display:"flex", backgroundColor:"lightgray"}}>
            <Sidebar/>
<<<<<<< HEAD
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
=======

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

>>>>>>> 9eb881ae797dfcb5a30a00701fa97e90cf8af5cf
        </div>
    );

}

export  {CreatePost};