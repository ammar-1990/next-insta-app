import React, { useEffect } from 'react'
import { faker } from '@faker-js/faker';
import { useState } from 'react';




export function createRandomUser() {
    return {
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),

      avatar: faker.image.avatar(),
      company:faker.company.bsAdjective()
     

    };
  }



const Suggestions = () => {

const [suggestions,setSuggestions]=useState([])
    useEffect(()=>{

setSuggestions([...Array(5).fill().map((_,i)=>({...createRandomUser()}))])

    },[])


  return (
    <div>

        <div className='flex justify-between py-8'>
            <p className='font-bold text-gray-500'>Suggestions for you</p>
            <p className='font-bold text-gray-500 cursor-pointer'>See All</p>
        </div>

{suggestions.map(profile=><div key={profile.userId} className='flex items-center mb-4 '>
    <img src={profile.avatar} alt="avatar" className='w-10 h-10 rounded-full p-[1px] lg:mr-5 mr-1 border-2 cursor-pointer' />

    <div className='flex-1'>
        <p className='font-bold '>
          {profile.username}  
        </p>
        <p className='text-gray-400 font-semibold text-sm'>
{profile.company}
        </p>
    </div>
<button className='text-blue-400'>
Follow
</button>

</div>)}
    </div>
  )
}

export default Suggestions