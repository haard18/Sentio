'use client'

import { Button } from "./../Components/ui/button"
import { Activity, Database } from 'lucide-react'
import { useRef } from "react"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import FAQSection from "../Components/FAQ"
import { motion } from "framer-motion"

export default function Component() {
  const howItWorksRef = useRef<HTMLDivElement | null>(null);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  }

  return (
    <div className="min-h-screen app-background text-white relative overflow-hidden">
      {/* Dotted Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px',
            backgroundRepeat: 'repeat',
            transition: 'background 0.3s ease',
          }}
        />
      </motion.div>
      <Navbar />
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Update Banner */}
          <motion.div 
            className="flex justify-center mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="inline-flex items-center space-x-2 bg-white/5 rounded-full px-4 py-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span className="text-sm">New security features are now live!</span>
            </div>
          </motion.div>

          {/* Hero Content */}
          <motion.div 
            className="text-center z-10 max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8"
              variants={fadeIn}
            >
              Enter an End to End Pipeline with Security, Audit and Analysis
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
              variants={fadeIn}
            >
              Sentio helps you monitor, audit, and secure your AO processes with intelligent analysis,
              real-time alerts, and comprehensive reporting—so you always stay protected.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              variants={staggerChildren}
            >
              <motion.div variants={fadeIn}>
                <Button
                  className="bg-purple-600 hover:bg-purple-700 gradient-button text-white rounded-xl px-8 py-6 text-lg"
                >
                  <a href="/dashboard" className="w-full h-full flex items-center justify-center">Start monitoring</a>
                </Button>
              </motion.div>
              <motion.div variants={fadeIn}>
                <Button
                  className="bg-white hover:bg-white text-black rounded-xl px-8 py-6 text-lg"
                >
                  <a href="https://docs_sentio-app.ar-io.dev/" className="w-full h-full flex items-center justify-center">Learn More</a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div 
            className="mt-20 relative"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <div className="relative z-0 rounded-lg border border-white/10 shadow-2xl overflow-hidden bg-black/40 backdrop-blur-sm">
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">Security Dashboard</h2>
                  <Button variant="outline" size="sm" className="border-purple-500 text-purple-500">
                    Create alert
                  </Button>
                </div>
                <motion.div 
                  className="space-y-4"
                  variants={staggerChildren}
                  initial="hidden"
                  animate="visible"
                >
                  {[
                    { name: "Process Authentication", status: 98 },
                    { name: "System Monitoring", status: 76 },
                    { name: "Access Control", status: 92 },
                  ].map((item) => (
                    <motion.div
                      key={item.name}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                      variants={fadeIn}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        <span>{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-2 w-24 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-purple-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${item.status}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                        <span className="text-sm text-gray-400">{item.status}%</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-transparent opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Solutions Section */}
      <motion.section 
        className="py-24 relative" 
        ref={howItWorksRef}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="text-purple-500 font-medium mb-4" variants={fadeIn}>SOLUTIONS</motion.div>
            <motion.h2 className="text-4xl sm:text-5xl font-bold mb-6" variants={fadeIn}>Comprehensive Blockchain Monitoring</motion.h2>
            <motion.p className="text-xl text-gray-400 max-w-2xl mx-auto" variants={fadeIn}>
              Explore our advanced monitoring solutions for both on-chain and off-chain analysis to ensure complete coverage of your blockchain operations.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* On-chain Monitoring Card */}
            <motion.div 
              className="group relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden hover:border-purple-500/50 transition-colors"
              variants={fadeIn}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-6 flex flex-col h-full">
                <div className="mb-6">
                  <Activity className="h-12 w-12 text-purple-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">On-chain Monitoring</h3>
                  <p className="text-gray-400">
                    Real-time monitoring and analysis of blockchain transactions, smart contracts, and network activities.
                  </p>
                </div>
                <a href="/dashboard" className="mt-auto text-purple-500 hover:underline text-lg font-medium">Learn more →</a>
              </div>
            </motion.div>

            {/* Off-chain Monitoring Card */}
            <motion.div 
              className="group relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden hover:border-purple-500/50 transition-colors"
              variants={fadeIn}
            >
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
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        className="py-24 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <FAQSection />
      </motion.section>
      
      <motion.div 
        className="relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Footer/>
      </motion.div>
    </div>
  )
}

