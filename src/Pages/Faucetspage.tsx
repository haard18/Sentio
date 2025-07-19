"use client"

import { motion } from "framer-motion"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import { DotPatternHover } from "../Components/ui/Hoverdots"
import Wallet from "../Components/Wallet-Button"
import { useEffect, useState } from "react"
import { useActiveAddress } from "arweave-wallet-kit"
import { handleAirDrop } from "../lib/tokenServices"
import AirdropGif from "../assets/Airdropping.gif"
import { Droplets,Plug2,WalletCards} from "lucide-react"



export default function Component() {
  const address = useActiveAddress()
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  // const [testSentiBalance, setTestSentiBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [isHovered, setIsHovered] = useState(false)


  useEffect(() => {
    if (address) {
      console.log("Wallet connected " + address)
      setWalletAddress(address)
      getTokenBalance()
    }
  }, [address])

  const getTokenBalance = async () => {
    // @ts-expect-error - window.arweaveWallet is not defined
    await window.arweaveWallet.connect(["ACCESS_TOKENS"])
    // @ts-expect-error - window.arweaveWallet is not defined
    const tokens = await window.arweaveWallet.userTokens()
    console.log("Tokens owned by the user:", tokens)
    for (let i = 0; i < tokens.length; i++) {
      console.log(tokens[i].Name)
      if (tokens[i].Name === "TEST$SENTI") {
        const tokenid = tokens[i].processId
        // @ts-expect-error - window.arweaveWallet is not defined
        const balance = await window.arweaveWallet.tokenBalance(tokenid)
        console.log("Test Senti Balance: ", balance)
        // setTestSentiBalance(balance)
      }
    }
  }

  const handleAirDropWithBalanceUpdate = async (walletAddress: string) => {
    setLoading(true)
    await handleAirDrop(walletAddress, window.arweaveWallet)
    setTimeout(() => {
      getTokenBalance()
      setLoading(false)
    }, 3000)
  }

  return (
    <div className="app-background min-h-screen flex flex-col">
      <section className="relative z-50 pb-12">
        <Navbar />
      </section>
      <DotPatternHover>
        <div className="flex-grow flex items-center justify-center px-4 py-8 md:py-16">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
             className="max-w-7xl w-full outline outline-1 outline-gray-700/50 rounded-2xl shadow-2xl overflow-hidden mx-auto backdrop-blur-sm bg-black/40 px-4 sm:px-6"

          >
            <div className="p-6 md:p-10">
                  <div 
                    className="flex items-center justify-center mb-6 cursor-pointer group"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {/* Logo container */}
                    <div className="relative flex items-center space-x-4">
                      {/* Icon section */}
                      <div className="relative">
                        {/* Main icon background */}
                        <div className={`w-16 h-16 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg transition-all duration-500 ${isHovered ? 'scale-110 rotate-6' : ''}`}>
                          <Droplets className="w-8 h-8 text-white" />
                        </div>    
                       {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-xl blur-xl opacity-30 -z-10 group-hover:opacity-50 transition-opacity duration-500" />
                      </div>

                      {/* Text section */}
                      <div className="flex flex-col">
                        <h1 className="text-4xl md:text-5xl font-bold">
                            <span className="text-transparent bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text relative">
                            tSenti
                            {/* Animated underline */}
                            {/* <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 transition-all duration-500 ${isHovered ? 'w-full' : 'w-0'}`} /> */}
                            </span>
                        </h1>
                        <div className="flex items-center space-x-2 -mt-1">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"  />
                          <span className="text-lg text-gray-400 font-light px-2">Faucet</span>
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                        </div>
                      </div>
                    </div>
                  </div>

                 <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed text-center mb-4">
                    Claim <span className="font-semibold text-white">tSENTI tokens</span> from the faucet to get started with<br />
                    <span className="font-semibold text-white">code auditing</span>, 
                    <span className="font-semibold text-white"> monitoring</span>, and 
                    <span className="font-semibold text-white"> complete security</span>.
                  </p>

              <div className="flex justify-center mt-10 mb-10">
                {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="inline-block">
                  <Wallet />
                </motion.div> */}
              </div>


              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-6 text-gray-300 bg-black/30 p-6 rounded-xl border border-gray-700/30"
              >
                <p className="text-lg flex items-center gap-2 text-blue-300">
                  <Plug2 className="w-4 h-4 text-blue-400" />

                  <span>
                    Please <span className="text-white font-semibold">connect your wallet</span> to receive 
                    <span className="text-white font-semibold"> tSENTI Tokens</span>.
                  </span>
                </p>

                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <WalletCards className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-400 whitespace-nowrap">
                    Wallet Address:
                  </span>
                  
                  <span
                    onClick={() => walletAddress && navigator.clipboard.writeText(walletAddress)}
                    title={walletAddress ? "Click to copy" : "Wallet not connected"}
                    className={`cursor-pointer transition-colors duration-200 ${
                      walletAddress ? 'hover:bg-black/50' : 'opacity-50 cursor-not-allowed'
                    } text-white break-all bg-black/40 p-3 text-sm font-mono border border-gray-600/30 rounded-md`}
                  >
                    {walletAddress || "Not connected"}
                  </span>
                </div>


                {/* <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <span className="text-gray-400 whitespace-nowrap">Your Test Senti Balance:</span>
                  <span className="text-white font-semibold bg-black/40 p-2 rounded-lg inline-block min-w-[80px] text-center">
                    {testSentiBalance !== null ? testSentiBalance : "N/A"}
                  </span>
                </div> */}

                {walletAddress && (
                  <div className="flex justify-center mt-8">
                    <motion.button
                      onClick={() => handleAirDropWithBalanceUpdate(walletAddress)}
                      className="gradient-button text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 relative overflow-hidden group"
                      disabled={!walletAddress}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                          <Droplets className="w-5 h-5" />
                          Claim tSENTI
                        </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </motion.button>
                  </div>
                )}

                
              </motion.div>
            </div>
          </motion.div>
        </div>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-80 backdrop-blur-sm"
          >
            <div className="bg-black/60 p-6 rounded-2xl border border-gray-700/50 shadow-2xl">
              <img src={AirdropGif || "/placeholder.svg"} alt="Airdropping" className="w-90 h-90" />
            </div>
          </motion.div>
        )}
      </DotPatternHover>
      <Footer />
    </div>
  )
}
