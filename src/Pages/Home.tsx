"use client"

import { Button } from "./../Components/ui/button"
import { Activity, Database, ArrowRight, Shield, ChevronRight, Bell, Lock } from "lucide-react"
import { useRef } from "react"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import FAQSection from "../Components/FAQ"
import { motion } from "framer-motion"

export default function Component() {
  const howItWorksRef = useRef<HTMLDivElement | null>(null)

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  }

  return (
    <div className="min-h-screen app-background text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#1a0b2e] to-[#080413]">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Purple glow effects */}
      <div className="absolute top-40 -left-40 w-96 h-96 bg-purple-600 rounded-full filter blur-[150px] opacity-20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full filter blur-[150px] opacity-20" />

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* New Feature Banner */}
          <motion.div className="flex justify-center mb-10" initial="hidden" animate="visible" variants={fadeIn}>
            <div className="inline-flex items-center space-x-2 bg-purple-900/30 border border-purple-500/30 rounded-full px-5 mt-10 py-2">
              <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-purple-200">
                New vulnerabilities features are now live!
              </span>
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
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-purple-400"
              variants={fadeIn}
            >
              End-to-End Security Pipeline for Blockchain Applications
            </motion.h1>

            <motion.p className="text-xl text-purple-100/80 mb-12 max-w-2xl mx-auto leading-relaxed" variants={fadeIn}>
              Sentio helps you monitor, audit, and secure your AO processes with intelligent analysis, real-time alerts,
              and comprehensive reporting—so you always stay protected.
            </motion.p>

            {/* Redesigned button layout */}
            <motion.div variants={fadeIn} className="flex flex-col items-center space-y-6">
              {/* Primary action buttons in a row */}
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
                <Button className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-xl px-8 py-6 text-lg font-medium shadow-lg shadow-purple-900/30 border border-purple-500/20 transition-all duration-300 flex-1">
                  <a href="/dashboard" className="w-full h-full flex items-center justify-center">
                    Start Monitoring
                  </a>
                </Button>

                <Button className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-xl px-8 py-6 text-lg font-medium shadow-lg shadow-purple-900/30 border border-purple-500/20 transition-all duration-300 flex-1">
                  <a href="/offchain" className="w-full h-full flex items-center justify-center">
                    Start Auditing
                  </a>
                </Button>
              </div>

              {/* Secondary action button below */}
              <Button className="bg-transparent hover:bg-white/5 text-white border border-purple-500/30 rounded-xl px-8 py-4 text-base font-medium transition-all duration-300 group">
                <a href="https://sentio-docs.vercel.app/" className="w-full h-full flex items-center justify-center">
                  Learn More
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            className="mt-20 relative"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#080413] via-transparent to-transparent z-10" />
            <div className="relative z-0 rounded-2xl border border-purple-500/20 shadow-2xl overflow-hidden bg-black/40 backdrop-blur-sm">
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-6 w-6 text-purple-400" />
                    <h2 className="text-2xl font-semibold text-white">Security Dashboard</h2>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Create alert
                  </Button>
                </div>

                <motion.div className="space-y-5" variants={staggerChildren} initial="hidden" animate="visible">
                  {[
                    { name: "Process Authentication", status: 98, icon: Lock },
                    { name: "System Monitoring", status: 76, icon: Activity },
                    { name: "Access Control", status: 92, icon: Shield },
                  ].map((item) => (
                    <motion.div
                      key={item.name}
                      className="flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 rounded-xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300"
                      variants={fadeIn}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-900/50 flex items-center justify-center">
                          <item.icon className="h-5 w-5 text-purple-400" />
                        </div>
                        <span className="font-medium text-white">{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="h-3 w-32 bg-purple-900/30 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-purple-500 to-purple-400"
                            initial={{ width: 0 }}
                            animate={{ width: `${item.status}%` }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-purple-300 min-w-[40px] text-right">
                          {item.status}%
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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
            className="text-center mb-16"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block px-4 py-1 rounded-full bg-purple-900/30 text-purple-400 font-medium text-sm mb-6"
              variants={fadeIn}
            >
              SOLUTIONS
            </motion.div>
            <motion.h2
              className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200"
              variants={fadeIn}
            >
              Comprehensive Blockchain Monitoring
            </motion.h2>
            <motion.p className="text-xl text-purple-100/70 max-w-2xl mx-auto" variants={fadeIn}>
              Explore our advanced monitoring solutions for both on-chain and off-chain analysis to ensure complete
              coverage of your blockchain operations.
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
              className="group relative rounded-2xl border border-purple-500/20 bg-gradient-to-b from-purple-900/10 to-black/40 backdrop-blur-sm overflow-hidden hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-500"
              variants={fadeIn}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 flex flex-col h-full">
                <div className="mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-purple-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Activity className="h-8 w-8 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-200 transition-colors duration-300">
                    On-chain Monitoring
                  </h3>
                  <p className="text-purple-100/70 leading-relaxed">
                    Real-time monitoring and analysis of blockchain transactions, smart contracts, and network
                    activities with advanced threat detection.
                  </p>
                </div>
                <a
                  href="/dashboard"
                  className="mt-auto inline-flex items-center text-purple-400 hover:text-purple-300 text-lg font-medium group-hover:translate-x-1 transition-all duration-300"
                >
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:ml-3 transition-all" />
                </a>
              </div>
            </motion.div>

            {/* Off-chain Monitoring Card */}
            <motion.div
              className="group relative rounded-2xl border border-purple-500/20 bg-gradient-to-b from-purple-900/10 to-black/40 backdrop-blur-sm overflow-hidden hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-500"
              variants={fadeIn}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 flex flex-col h-full">
                <div className="mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-purple-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Database className="h-8 w-8 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-200 transition-colors duration-300">
                    Off-chain Monitoring
                  </h3>
                  <p className="text-purple-100/70 leading-relaxed">
                    Monitor and audit data interactions, file operations, and network requests for comprehensive
                    security and vulnerability detection.
                  </p>
                </div>
                <a
                  href="/offchain"
                  className="mt-auto inline-flex items-center text-purple-400 hover:text-purple-300 text-lg font-medium group-hover:translate-x-1 transition-all duration-300"
                >
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:ml-3 transition-all" />
                </a>
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
        <Footer />
      </motion.div>
    </div>
  )
}
