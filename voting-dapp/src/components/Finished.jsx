import React from 'react'

const Finished = (props) => {
  return (
    <div className='flex justify-center flex-col max-w-[80%] relative z-[2]'>
        <div className='flex justify-center'>
            <h1 className='text-2xl sm:text-3xl md:text-5xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center'>
                Voting finished
            </h1>
        </div>
    </div>
  )
}

export default Finished