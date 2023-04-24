import {EllipsisVerticalIcon} from '@heroicons/react/24/outline'
import {HeartIcon} from '@heroicons/react/24/outline'
import {PaperAirplaneIcon} from '@heroicons/react/24/outline'
import {ChatBubbleLeftEllipsisIcon} from '@heroicons/react/24/outline'
import {BookmarkIcon} from '@heroicons/react/24/outline'
import {FaceSmileIcon} from '@heroicons/react/24/outline'
import {HeartIcon as FilledHeart} from '@heroicons/react/24/solid'

const Post = ({username,userImg,img,caption}) => {
  return (
    <div className='border mb-4'>

        {/* Header */}
        <div className='p-4 flex items-center'>
<img src={userImg} className='w-11 h-11 rounded-full border-2 p-[1px] object-cover mr-4 cursor-pointer' alt="user img" />
<p className='flex-1 font-semibold'>{username}</p>
<EllipsisVerticalIcon  className='h-6 text-gray-600 cursor-pointer'/>
        </div>
{/* Image */}
<img src={img} className='w-full object-contain cursor-pointer' alt="image" />

{/* body */}

<div className='flex justify-between items-center pt-2 px-2'>
<div className='flex gap-3'>
    <HeartIcon className='postIcon' />
    <PaperAirplaneIcon className='postIcon'/>
    <ChatBubbleLeftEllipsisIcon className='postIcon'/>
</div>

<BookmarkIcon className='postIcon'/>
</div>

{/* caption */}
<div className='p-2'>
    <p className='truncate'>
        <span className='font-semibold'>
            {username} {' '}
        </span>
        {caption}
    </p>
</div>

{/* input */}
<form className='flex p-4 items-center'>
<FaceSmileIcon  className='icon'/>
<input type="text" className='border-none outline-none flex-1 p-y px-3' placeholder='Add a comment...'/>
<button className='text-blue-400'>Post</button>
</form>

    </div>
  )
}

export default Post