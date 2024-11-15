'use client'

import { Button } from "./../Components/ui/button"
import { Activity, Database } from "lucide-react"
// import Image from "next/image"
import { useRef } from "react"
// import AccordionComp from "../Components/Accordion"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
// import FAQ from "../Components/Accordion"
import FAQSection from "../Components/FAQ"

export default function Component() {
  const howItWorksRef = useRef<HTMLDivElement | null>(null); // Create ref for "How it works"



  return (
    <div className="min-h-screen app-background text-white relative overflow-hidden">
      {/* Dotted Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full"
          style={{

            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px',
            backgroundRepeat: 'repeat',
            transition: 'background 0.3s ease',
          }}
        >

        </div>
      </div>
      <Navbar />
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Update Banner */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/5 rounded-full px-4 py-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span className="text-sm">New security features are now live!</span>
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center z-10 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
              Enter an End to End Pipeline with Security, Audit and Monitoring
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Sentio helps you monitor, audit, and secure your AO processes with intelligent analysis,
              real-time alerts, and comprehensive reporting—so you always stay protected.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                className="bg-purple-600 hover:bg-purple-700 gradient-button text-white rounded-xl px-8 py-6 text-lg"
              >
                <a href="/dashboard" className="w-full h-full flex items-center justify-center">Start monitoring</a>
              </Button>

              <Button
                className="bg-purple-600 hover:bg-purple-700 gradient-button text-white rounded-xl px-8 py-6 text-lg"
              >
                <a href="https://docs_sentio-app.ar-io.dev/" className="w-full h-full flex items-center justify-center">Learn More</a>
              </Button>

            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <div className="relative z-0 rounded-lg border border-white/10 shadow-2xl overflow-hidden bg-black/40 backdrop-blur-sm">
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">Security Dashboard</h2>
                  <Button variant="outline" size="sm" className="border-purple-500 text-purple-500">
                    Create alert
                  </Button>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Process Authentication", status: 98 },
                    { name: "System Monitoring", status: 76 },
                    { name: "Access Control", status: 92 },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        <span>{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-24 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-500"
                            style={{ width: `${item.status}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-400">{item.status}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-transparent opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />

      </div>

      {/* Solutions Section */}
      <section className="py-24 relative" ref={howItWorksRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-purple-500 font-medium mb-4">SOLUTIONS</div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Comprehensive Blockchain Monitoring</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explore our advanced monitoring solutions for both on-chain and off-chain analysis to ensure complete coverage of your blockchain operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* On-chain Monitoring Card */}
            <div className="group relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden hover:border-purple-500/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-6 flex flex-col h-full">
                <div className="mb-6">
                  <Activity className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">On-chain Monitoring</h3>
                  <p className="text-gray-400">
                    Real-time monitoring and analysis of blockchain transactions, smart contracts, and network activities.
                  </p>
                </div>
                <a href="/onchain" className="mt-auto text-purple-500 hover:underline text-lg font-medium">Learn more →</a>
              </div>
            </div>

            {/* Off-chain Monitoring Card */}
            <div className="group relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden hover:border-purple-500/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-6 flex flex-col h-full">
                <div className="mb-6">
                  <Database className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Off-chain Monitoring</h3>
                  <p className="text-gray-400">
                    Monitor and audit data interactions, file operations, and network requests for comprehensive security.
                  </p>
                </div>
                <a href="/offchain" className="mt-auto text-purple-500 hover:underline text-lg font-medium">Learn more →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <AccordionComp />
       */}
      <section className="py-24 relative">

        <FAQSection />
      </section>
      
      <section className=" relative">

        <Footer/>
      </section>



    </div>
  )
}
