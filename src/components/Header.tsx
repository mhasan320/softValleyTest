import { RootState } from '@/app/store';
import Cookies from 'js-cookie';
import React from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';

function Header() {
  const router = useRouter();
  const name = useSelector((state: RootState) => state.userData.name);
  const role = useSelector((state: RootState) => state.userData.role);

  const logoutHandler = () => {
    Cookies.set('token', '')
    router.push('/')
  }
  
  return (
    <div className='header'>
        <div className='leftAlign'>
            <h3>Leads</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className='rightAlight'>
            <p>Name: <span>{name}</span></p>
            <p>Role: <span>{role}</span></p>
            <span className='logout' onClick={logoutHandler}>Log Out</span>
        </div>
    </div>
  )
}

export default Header

