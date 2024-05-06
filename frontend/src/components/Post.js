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


function Post() {

    const { user } = useUser();
    
    



    return (
        <div style={{display:"flex", backgroundColor:"lightgray"}}>
            <Sidebar/>
        </div>
    );

}

export  {Post};