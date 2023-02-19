import Link from 'next/link'
import React from 'react'

export default function Slidebar() {
  return (
    <div  className='slidebar'>
        <h3>Soft Valley</h3>
        <hr />
        <ul>
            <li>
                <Link href="/leads" passHref>Dashboard</Link>
            </li>
            <li>
                <Link href="/leads" passHref>Leads</Link>
            </li>
        </ul>
    </div>
  )
}
