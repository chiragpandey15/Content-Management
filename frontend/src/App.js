import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import {Login} from './components/Login';
import {CreatePost} from "./components/CreatePost";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ScheduledPost } from "./components/ScheduledPost";

import {FirstPage} from "./components/FirstPage";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/scheduledPost" element={<ScheduledPost />} />
      </Routes>
    </Router>
      
  )
}

