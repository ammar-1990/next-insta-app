import React, { useEffect } from 'react'
import { faker } from '@faker-js/faker';
import { useState } from 'react';
import Story from './Story';




export function createRandomUser() {
    return {
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
     

    };
  }







const Stories = () => {
const [users,setUsers]=useState(null)
useEffect(()=>{setUsers([...Array(20).fill().map((_,i)=>({...createRandomUser()}))])},[])

  
  return (
    <div className='flex gap-3 overflow-x-scroll py-8 px-3  myScroll border mt-6'>
{users && users.map((pro)=><Story key={pro.userId} {...pro} />)}


    </div>
  )
}

export default Stories