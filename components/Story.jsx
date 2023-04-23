import React from 'react'

const Story = ({username,email,avatar}) => {
  return (
    <div className='flex flex-col gap-1 flex-shrink-0 items-center'>
<img  className='w-12 h-12 rounded-full border-red-400 border-2 p-[1px] cursor-pointer object-contain hover:scale-110 duration-150 ease-out' src={avatar} alt="avatar" />
<p className='text-xs w-14 truncate'>{username}</p>


    </div>
  )
}

export default Story