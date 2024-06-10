import { useState, useEffect } from 'react'
import {ethers} from "ethers"
import Login from './components/Login'
import GridBackground from './components/GridBackground'
import {contractAbi, contractAddress} from '../conf'
import Connected from './components/Connected'

function App() {

  const [provider, setProvider] = useState(null)
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState(null)
 
  useEffect(() => {
    if(window.ethereum) {
      window.ethereum.on("accountSwitch", handleSwitch)
    }

    return () => {
      if(window.ethereum) {
        window.ethereum.removeListener("accountSwitch", handleSwitch)
      }
    }
  }, [])

  function handleSwitch(accounts) {
    if(accounts.length>0 && address !== accounts[0]){
      setAddress(accounts[0])
    }
    else {
      setConnected(false)
      setAddress(null)
    }
  }
  async function connectWithMetamask() {
    if(window.ethereum) {
      try {
        const provideService = new ethers.providers.Web3Provider(window.ethereum)
        setProvider(provideService)
        await provideService.send("eth_requestAccounts", [])
        const signer =  provider.getSigner()
        const address = await signer.getAddress()
        setAddress(address)
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
    <div className='h-screen w-full flex justify-center '>
      <GridBackground />
      {connected ? <Connected address={address}/> : <Login connectWithMetamask={connectWithMetamask}/>}
    </div>
  )
}

export default App