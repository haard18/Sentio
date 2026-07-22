"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useActiveAddress } from "arweave-wallet-kit"
import { Droplets } from "lucide-react"

import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import Wallet from "../Components/Wallet-Button"
import { handleAirDrop } from "../lib/tokenServices"
import AirdropGif from "../assets/Airdropping.gif"

export default function Faucetspage() {
  const address = useActiveAddress()
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (address) {
      setWalletAddress(address)
      getTokenBalance()
    }
  }, [address])

  const getTokenBalance = async () => {
    await window.arweaveWallet.connect(["ACCESS_TOKENS"])
    const tokens = await window.arweaveWallet.userTokens()
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].Name === "TEST$SENTI") {
        const tokenid = tokens[i].processId
        // @ts-expect-error - window.arweaveWallet is not typed
        await window.arweaveWallet.tokenBalance(tokenid)
      }
    }
  }

  const handleAirDropWithBalanceUpdate = async (addr: string) => {
    setLoading(true)
    await handleAirDrop(addr, window.arweaveWallet)
    setTimeout(() => {
      getTokenBalance()
      setLoading(false)
    }, 3000)
  }

  const copyAddress = () => {
    if (!walletAddress) return
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-void text-phosphor">
      <Navbar />

      <main className="relative mt-14 flex-1 border-b border-rule">
        <div className="blueprint pointer-events-none absolute inset-0 opacity-40" aria-hidden />

        <div className="shell relative grid gap-10 py-16 lg:grid-cols-[1fr_380px] lg:gap-16 lg:py-24">
          {/* Briefing */}
          <div>
            <span className="t-meta text-hazard">Dispensary / Testnet</span>
            <h1 className="t-display-xl mt-4">
              tSenti
              <br />
              faucet
            </h1>
            <div className="rule-accent my-8 max-w-md" />
            <p className="t-body">
              Claim tSENTI to fund evaluation runs — code auditing, Sentinel deployment, and
              monitoring. Test-net denomination only; carries no value.
            </p>

            <dl className="mt-10 max-w-md border-t border-rule">
              {[
                ["Token", "tSENTI"],
                ["Network", "AO Testnet"],
                ["Cost", "Free"],
                ["Rate Limit", "Per Wallet"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-rule py-2">
                  <dt className="t-meta">{k}</dt>
                  <dd className="t-label text-phosphor">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Dispense terminal */}
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="panel self-start"
          >
            <div className="panel-head">
              <div className="flex items-center gap-2">
                <Droplets className="h-3.5 w-3.5 text-hazard" />
                <span className="t-label">Dispense</span>
              </div>
              
            </div>

            <div className="space-y-5 p-5">
              <div>
                <span className="t-meta">Step 01 / Connect Wallet</span>
                <div className="mt-2">
                  <Wallet />
                </div>
              </div>

              <div className="rule" />

              <div>
                <span className="t-meta">Step 02 / Target Address</span>
                <button
                  onClick={copyAddress}
                  disabled={!walletAddress}
                  title={walletAddress ? "Click to copy" : "Wallet not connected"}
                  className={`mt-2 block w-full border p-3 text-left font-mono text-xs leading-relaxed break-all transition-colors ${
                    walletAddress
                      ? "border-rule2 text-phosphor hover:border-hazard"
                      : "cursor-not-allowed border-rule text-faint"
                  }`}
                >
                  {walletAddress ?? "Not connected"}
                </button>
                <span className="t-meta mt-1 block text-faint">
                  {copied ? "Copied to clipboard" : walletAddress ? "Click to copy" : "Awaiting connection"}
                </span>
              </div>

              <div className="rule" />

              <div>
                <span className="t-meta">Step 03 / Claim</span>
                <button
                  onClick={() => walletAddress && handleAirDropWithBalanceUpdate(walletAddress)}
                  disabled={!walletAddress || loading}
                  className="btn btn-accent mt-2 w-full"
                >
                  {loading ? "Dispensing…" : "Claim tSENTI"}
                </button>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 p-4">
          <div className="panel">
            <div className="panel-head">
              <div className="flex items-center gap-2">
                <span className="led" aria-hidden />
                <span className="t-label">Airdrop in progress</span>
              </div>
            </div>
            <img src={AirdropGif} alt="" className="max-h-[50vh] w-full object-contain" />
            <div className="border-t border-rule px-4 py-2">
              <span className="t-meta">Do not close this window</span>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
