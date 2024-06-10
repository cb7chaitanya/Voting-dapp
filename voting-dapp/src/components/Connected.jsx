import React from 'react'

const Connected = (props) => {
  return (
    
    <div className='flex justify-center flex-col max-w-[80%] relative z-[2]'>
        <div className='flex justify-center mb-8'>
            <h1 className='text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center'>You are connected to Metamask</h1>
        </div>
        <div className='flex justify-center'>
            <p className='text-lg sm:text-xl md:text-2xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center'>Account address: {props.address}</p>
        </div>
    </div>
  )
}

export default Connected