
import React from 'react'
import { Link } from 'react-router-dom'
import {Button} from './ui/button'
import { SignInButton,SignedOut,UserButton,SignedIn } from '@clerk/clerk-react'
const Header = () => {
  return (
   <>
   <nav className='py-2 px-4 flex justify-between items-center'>
    <Link>
    <img  src='/opportunest-high-resolution-logo-transparent.png' className='h-20'/>
    </Link>
    <Button variant='outline'>Login</Button>
     {/* <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn> */}
   </nav>
   </>
  )
}

export default Header