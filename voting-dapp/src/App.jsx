import { useState, useEffect } from 'react'
import {ethers} from "ethers"
import Login from './components/Login'
import GridBackground from './components/GridBackground'
import {contractAbi, contractAddress} from '../conf'
import Connected from './components/Connected'
import Finished from './components/Finished'

function App() {

  const [provider, setProvider] = useState(null)
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState(null)
  const [voting, setVoting] = useState(true)
  const [time, setTime] = useState('')
  const [candidates, setCandidates] = useState([])
  const [id, setId]= useState('')
  const [ableToVote, setAbleToVote] = useState(true)
 
  useEffect(() => {
    fetchAllCandidates()
    fetchTimeLeft()
    fetchStatus()
    if(window.ethereum) {
      window.ethereum.on("accountSwitch", handleSwitch)
    }

    return () => {
      if(window.ethereum) {
        window.ethereum.removeListener("accountSwitch", handleSwitch)
      }
    }
  }, [])

  async function vote(){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", [])
    const signer =  provider.getSigner()
    const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer)
    const voteAction = await contractInstance.vote(id)
    await voteAction.wait()
    canVote()
  }

  async function canVote(){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", [])
    const signer =  provider.getSigner()
    const address = await signer.getAddress()
    const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer)
    const status = await contractInstance.voters(address)
    setAbleToVote(status)
  }
  
  async function fetchAllCandidates() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", [])
    const signer =  provider.getSigner()
    const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer)
    const candidates = await contractInstance.getAllVotesOfCandidates()
    const candidateList = candidates.map((candidate, index) => {
      return {
        candidateName: candidate.name,
        votes: candidate.votes.toNumber(),
        index: index,
      }
    }) 
    setCandidates(candidateList)
  }

  async function fetchTimeLeft() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", [])
    const signer =  provider.getSigner()
    const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer)
    const time = await contractInstance.getTimeLeft()
    setTime(time.toNumber())
  }

  async function fetchStatus() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", [])
    const signer =  provider.getSigner()
    const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer)
    const status = await contractInstance.getVotingStatus()
    setVoting(status)
  }

  function handleSwitch(accounts) {
    if(accounts.length>0 && address !== accounts[0]){
      setAddress(accounts[0])
    }
    else {
      setConnected(false)
      setAddress(null)
    }
  }

  async function handleIdChange(e) {
    setId(e.target.value);
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
      {(connected ? (<Connected address={address} candidates={candidates} time={time} id={id} showButton={ableToVote} voting={voting} vote={vote} ableToVote={ableToVote} handleIdChange={handleIdChange}/>) : (<Login connectWithMetamask={connectWithMetamask}/>))}
    </div>
  )
}

export default App