import { useRouter } from 'next/router'
import React from 'react'
import Header from './Header';
import Slidebar from './Slidebar';

function Layout({children} : {children: React.ReactNode}) {
  const router = useRouter();
  const credentialsRoute = router.pathname == "/";

  console.log(credentialsRoute);

  return (
    <>
        {credentialsRoute ? (
            <>
                {children}
            </>
        ) : (
            <div className='flex justify-between'>
                <Slidebar/>
                <div className='w-[90%]'>
                <Header/>
                {children}
                </div>
            </div>
        )}
    </>
  )
}

export default Layout