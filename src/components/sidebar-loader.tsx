import { Loader } from 'lucide-react'
import React from 'react'

function SidebarLoader(){
  return (
    <div className='flex w-full justify-center items-center h-64 '>
        <Loader className='animate-spin text-cyan-900' size={32}/>
    </div>
  )
}

export default SidebarLoader