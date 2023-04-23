import Image from "next/image"
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline'
import {HomeIcon} from '@heroicons/react/24/solid'
import {Bars3Icon} from '@heroicons/react/24/solid'
import {PaperAirplaneIcon} from '@heroicons/react/24/outline'
import {PlusCircleIcon} from '@heroicons/react/24/outline'
import {UserGroupIcon} from '@heroicons/react/24/outline'
import {HeartIcon} from '@heroicons/react/24/outline'

const Header = () => {
  return (
    <header className="shadow-sm bg-white border-b sticky top-0 z-50">
    <div className="max-w-[1150px] mx-auto flex justify-between  py-2 items-center px-2 lg:py-0">

<div className='w-24 h-16  hidden lg:block relative cursor-pointer'>
    <Image alt="logo" src={'/assets/symbol.png'} fill objectFit="contain"/>
</div>
<div className='w-7 h-7 flex-shrink-0  lg:hidden relative cursor-pointer'>
    <Image className="" alt="logo" src={'/assets/symbol2.png'} fill objectFit="contain"/>
</div>


<div className="flex items-center relative max-w-xl ">
    <div className="absolute pointer-events-none ">
        <MagnifyingGlassIcon className="h-6 pl-3 text-gray-600 p-1" />
        </div>

<input className="pl-8 outline-none focus:ring-1 py-1 border-2 rounded-md focus:border-black border-gray-400 focus:ring-black" type="text" placeholder="search"/>

</div>

<div className="flex gap-6 items-center">
<HomeIcon  className=" icon"/>
<Bars3Icon className="h-5 md:hidden cursor-pointer flex-shrink-0" />
<div className="relative icon">
    <div className="absolute -top-1 -right-1 z-50   w-3 h-3 flex items-center justify-center text-white p-2 rounded-full  bg-red-500"  >
       1
        </div>

<PaperAirplaneIcon className="icon pointer-events-none" />
</div>
<PlusCircleIcon  className="icon"/>
<UserGroupIcon className="icon" />
<HeartIcon  className="icon"/>
<img src="/assets/imageplaceholder.jpg" className="w-10 h-10 rounded-full cursor-pointer" />

</div>



    </div>
    </header>
  )
}

export default Header