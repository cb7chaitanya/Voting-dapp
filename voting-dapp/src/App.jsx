import { useState, useEffect } from 'react'
import {ethers} from "ethers"
import Login from './components/Login'
import {contractAbi, contractAddress} from '../conf'

function App() {

  const [provider, setProvider] = useState(null)
  const [connected, setConnected] = useState(false)
 
  async function connectWithMetamask() {
    if(window.ethereum) {
      try {
        const provideService = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(provideService)
        await provideService.send("eth_requestAccounts", [])
        const signer =  provider.getSigner()
        const address = await signer.getAddress()
        console.log("Wallet connection established: " + address)
        setConnected(true)
      } catch(error) {
        console.error(error)
      }
    } else {
      console.log("Metamask not accessible in the browser window")
    }
  }
  return (
    <div className='bg-black h-screen w-full flex justify-center '>
      <Login connectWithMetamask={connectWithMetamask} connected={connected}/>
    </div>
  )
}

export default App