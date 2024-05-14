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

import { FaMagic, FaCheckCircle} from 'react-icons/fa';


function CreatePost() {

    const { user } = useUser();
    

    const [text, setText] = useState('');
    const [image, setImage] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [scheduledTime, setScheduledTime] = useState(null);
    const [scheduledDate, setScheduledDate] = useState();


    const [grammaticallyCorrectText, setGrammarticallyCorrectText] = useState('Something went wrong.');
    const [isGrammarModalOpen, setIsGrammarModalOpen] = useState(false);

    const [topic, setTopic] = useState('');
    const [postStyle, setPostStyle] = useState(null);
    const [generateContentText, setgenerateContentText] = useState('');
    const [isgenerateContentModalOpen, setIsgenerateContentModalOpen] = useState(false);



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
              console.log("Hi");
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

    const handleGrammarModalClose = () =>{
      setGrammarticallyCorrectText('');
      setIsGrammarModalOpen(false);
    }

    const handlegenerateContentModalClose = () =>{
      setgenerateContentText('');
      setIsgenerateContentModalOpen(false);
    }

    const generateContent = async (e) =>{
      //TODO
      if(topic.length<2 || postStyle==null){
        toast.warning("Please complete the form.");
        return;
      }

      try{

        const body = {
          'topic':topic,
          'style':postStyle
        }
            
            // await fetch('http://localhost:3001/generateContent', {
            await fetch('https://t-skyline-387001.el.r.appspot.com/generateContent', {
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
                return response.json();
              })
              .then(data => {
                console.log('LinkedIn API response:', data.text);
                setgenerateContentText(data.text);
                // TODO change button
            })
              .catch(error => {
                console.error('Error:', error);
              });


      }catch(e){
        console.log(e);
      }
      
    };


    const checkGrammar = async () =>{
      if(text.length<20){
        toast.warning("Text is too small.")
        return;
      }else{
          try{
            
            const body = {
              'text':text,
            }
                
                // await fetch('http://localhost:3001/checkGrammar', {
                await fetch('https://t-skyline-387001.el.r.appspot.com/checkGrammar', {
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
                    return response.json();
                  })
                  .then(data => {
                    console.log('LinkedIn API response:', data.text);
                    setGrammarticallyCorrectText(data.text);
                })
                  .catch(error => {
                    console.error('Error:', error);
                  });
                  // toast.success("Successfully scheduled");

            }catch(error){
              console.log(error);
            }
            setIsGrammarModalOpen(true);
      }
    }



    return (
        <div style={{display:"flex", backgroundColor:"lightgray"}}>
            <Sidebar prompt="createPost"/>
            <ToastContainer />
              
              <div className="fullpage-form" style={{flex:'10'}}>
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
                          <MdDelete onClick={deleteImage} style={{opacity:'20%'}} />
                          <img src={image} alt="Uploaded" style={{ width: '100%', height: '100%' }} />
                        </div>
                      )}
                    </div>
                    <div style={{display:'flex', marginBottom:'10px'}}>
                    <input type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            />
                    <div >
                    <div className='generate-icon-contaier'>

                      <FaMagic onClick={(e)=>{setIsgenerateContentModalOpen(true);}} style={{marginRight:'20px'}}/>
                      
                      <div className="generate-icon-description">Generate content</div>
                    </div>

                    <div className='check-icon-contaier'>

                    <FaCheckCircle onClick={checkGrammar}/>
                      
                      <div className="check-icon-description">Check grammar</div>
                    </div>
                    
                    
                    </div>
                    </div>
                    <div style={{display:'flex'}}>
                      <button type="button" onClick={handleSchedule} style={{marginRight:'10px', width:'150px'}}>Schedule</button>
                      <button type='submit'>Publish</button>
                    </div>
                </form>
              </div>


            <Modal
        open={isGrammarModalOpen}
        onClose={handleGrammarModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-content" style={{width:'600px'}}>
          <span className="close" onClick={handleGrammarModalClose}>&times;</span>
          <h2>Grammar Check</h2>
          <textarea
                          value={grammaticallyCorrectText}
                          onChange={(e)=>{setGrammarticallyCorrectText(e.target.value)}}
                          rows={10}
                          cols={70}
                      />
              <Button variant="contained" onClick={(e)=>{setText(grammaticallyCorrectText); handleGrammarModalClose();}}>Replace</Button>
          </div>
          </Modal>  

{/**********************************/}                    

          <Modal
        open={isgenerateContentModalOpen}
        onClose={handlegenerateContentModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

      

        <div className="modal-content" style={{width:'600px'}}>
          <span className="close" onClick={handlegenerateContentModalClose}>&times;</span>
          <h2>Generate Content</h2>
          
          <form>
            <div className="form-group">
              <label htmlFor="topic">Topic:</label>
              <input
                type="text"
                id="topic"
                placeholder="Enter topic"
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                onChange={(e) => setPostStyle(e.target.value)}
                required
              >
                <option value="">Select category</option>
                <option value="Formal">Formal</option>
                <option value="Informal">Informal</option>
                <option value="Motivation">Motivation</option>
                <option value="Humour">Humour</option>
                <option value="Challenge">Challenge</option>
                <option value="Promote">Promote</option>
              </select>
            </div>
            {generateContentText.length>0? <div><textarea
                          value={generateContentText}
                          onChange={(e)=>{setgenerateContentText(e.target.value)}}
                          rows={10}
                          cols={70}
                      /><br/><Button  variant="contained" onClick={(e)=>{setText(generateContentText); handlegenerateContentModalClose();}}>Replace</Button></div>
            :<Button  variant="contained" onClick={generateContent}>Generate Content</Button>}
          </form>
          
          </div>
          </Modal>  

          {/**********************************/}
            

            <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-content">
          <span className="close" onClick={handleModalClose}>&times;</span>
          <h2>Schedule Post</h2>
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