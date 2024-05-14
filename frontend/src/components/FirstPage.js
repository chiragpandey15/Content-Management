import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import {Login} from './Login';
import {CreatePost} from "./CreatePost";


function FirstPage() {
  return (
    <header>
      <SignedOut>
        <Login/>
      </SignedOut>
      <SignedIn>
        {/* <UserButton /> */}
        <CreatePost/>
      </SignedIn>
    </header>
  )
}

export {FirstPage};

