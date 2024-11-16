'use client'

import { motion } from 'framer-motion'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { DotPatternHover } from '../Components/ui/Hoverdots'
import Wallet from '../Components/Wallet-Button'
import { useEffect, useState } from 'react'
import { useActiveAddress } from 'arweave-wallet-kit'
import { handleAirDrop } from '../lib/tokenServices'
import AirdropGif from "../assets/Airdropping.gif"

export default function Component() {
  const address = useActiveAddress()
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [testSentiBalance, setTestSentiBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (address) {
      console.log('Wallet connected ' + address)
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
      if (tokens[i].Name === 'TEST$SENTI') {
        const tokenid = tokens[i].processId
        // @ts-expect-error - window.arweaveWallet is not defined
        const balance = await window.arweaveWallet.tokenBalance(tokenid)
        console.log("Test Senti Balance: ", balance)
        setTestSentiBalance(balance)
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
    <div className="app-background min-h-screen flex flex-col" style={{ fontFamily: "'Amaranth'" }}>
      <Navbar />
      <DotPatternHover>
        <div className="flex-grow flex items-center mt-12 justify-center px-4 py-12">
            <div className="max-w-3xl outline my-4 rounded-2xl shadow-2xl overflow-hidden mx-auto">
            <div className="p-8 md:p-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">tSenti Faucet</h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 text-center">
                Claim tSENTI tokens from the faucet to get started with code auditing, monitoring, and complete security.
              </p>
              <div className="flex justify-center mb-8">
                <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
                  <Wallet />
                </motion.div>
              </div>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg">
                  Please connect wallet to get <span className="text-white font-semibold">tSENTI Tokens</span>
                </p>
                <p>
                  Your Wallet Address: <span className="text-white break-all">{walletAddress || 'Not connected'}</span>
                </p>
                <p>
                  Your Test Senti Balance: <span className="text-white font-semibold">{testSentiBalance !== null ? testSentiBalance : 'N/A'}</span>
                </p>
                {walletAddress && (
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={() => handleAirDropWithBalanceUpdate(walletAddress)}
                      className="gradient-button text-white px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      disabled={!walletAddress}
                    >
                      Claim tSENTI
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {loading && (
          <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-70">
            <img src={AirdropGif} alt="Airdropping" className="w-90 h-90" />
          </div>
        )}
      </DotPatternHover>
      <Footer />
    </div>
  )
}