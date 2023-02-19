import React, { useState } from 'react'
import styles from "../styles/login.module.css"
import { TextInput, Button } from '@mantine/core';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { userSliceData } from '../../src/app/feature/useSlice'
import { RootState } from '@/app/store';
import { useRouter } from 'next/router';

export default function Login() {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('')
  
  const dispatch = useDispatch()
  const router = useRouter();
  
  const submitHandler = async (e: any) => {
    e.preventDefault();
    
    if(password.length < 6){
        setError('Password must be 6 digits');
        return;
    }
    await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/login`, {
        email: userName,
        password: password
    }, { 
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
        },
    }).then((res: any) => {
        dispatch(userSliceData({name: res.data.data.user.name, role: res.data.data.role, email: res.data.data.user.email}))
        Cookies.set('token', res.data.data.token)
        router.push('/leads');
    }).catch((err: any) => {
        console.log(err.response.data.code )
        if(err.response.data.code  == 422){
            setError(err.response.data.message);
        }else {
            setError(err.response.data.message); 
        }
    })
  }

  return (
    <div className={styles.login}>
        <form onSubmit={submitHandler}>
            <h3>Soft Valley</h3>
            <p>Table Visualization and Filter Application</p>
            <TextInput  type="text" label="User Name" placeholder="Enter email" onChange={(e: any)=> setUserName(e.target.value)} required value={userName}/>
            <TextInput type="password" label="Password" placeholder="Enter your password" onChange={(e: any)=> setPassword(e.target.value)} required value={password}/>
            {error && (<p className='!text-left !text-red-600'>{error}</p>)}
            <Button variant="outline" type='submit'>Login</Button>
        </form>
    </div>
  )
}
