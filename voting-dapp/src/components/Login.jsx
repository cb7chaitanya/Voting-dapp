import React from 'react'

const Login = (props) => {

  return (
    <div className='flex justify-center flex-col max-w-[80%]'>
        <div className='flex justify-center mb-8'>
            <h1 className='text-zinc-200 text-2xl sm:text-3xl md:text-4xl text-center font-bold'>Welcome to my first dapp, this is a voting application built on the ethereum blockchain</h1>
        </div>
        <div className='flex justify-center'>
            <button onClick={props.connectWithMetamask} className='bg-zinc-800 hover:bg-zinc-600 duration-300 text-white font-bold py-2 px-4 text-md sm:text-lg md:text-xl rounded flex justify-center'>Connect</button>
        </div>
    </div>
  )
}

export default Login