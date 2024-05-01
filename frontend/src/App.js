import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import {Login} from './components/Login';
import {CreatePost} from "./components/CreatePost";


export default function App() {
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

