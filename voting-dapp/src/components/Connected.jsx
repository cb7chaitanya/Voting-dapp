import React from 'react'

const Connected = (props) => {
  return (
    
    <div className='flex justify-center flex-col max-w-[80%] relative z-[2]'>
        <div className='flex justify-center mb-8'>
            <h1 className='text-2xl sm:text-3xl md:text-5xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center'>You are connected to Metamask</h1>
        </div>
        <div className='flex justify-center'>
            <p className='text-lg sm:text-xl md:text-2xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 text-center'>Account address: {props.address}</p>
        </div>
        { props.showButton ? (
                <p className="connected-account">You have already voted</p>
            ) : (
                <div>
                    <input type="number" placeholder="Entern Candidate Index" value={props.number} onChange={props.handleNumberChange}></input>
            <br />
            <button className="login-button" onClick={props.voteFunction}>Vote</button>

                </div>
            )}
            
            <table id="myTable" className="candidates-table">
                <thead>
                <tr>
                    <th>Index</th>
                    <th>Candidate name</th>
                    <th>Candidate votes</th>
                </tr>
                </thead>
                <tbody>
                {props.candidates.map((candidate, index) => (
                    <tr key={index}>
                    <td>{candidate.index}</td>
                    <td>{candidate.name}</td>
                    <td>{candidate.voteCount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            
        </div>
    )
}

export default Connected;