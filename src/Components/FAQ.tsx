"use client"

import type React from "react"
import { useRef } from "react"

interface FAQItem {
  question: string
  answer: string
}

const FAQ: React.FC = () => {
  const ref = useRef(null)

  const faqData: FAQItem[] = [
    {
      question: "What is Sentio?",
      answer:
        "Sentio is a cutting-edge platform designed to revolutionize the way you interact with blockchain data. We provide powerful tools and insights to help you make informed decisions in the world of decentralized finance (DeFi).",
    },
    {
      question: "How does Sentio work?",
      answer:
        "Sentio aggregates and analyzes vast amounts of blockchain data, presenting it in an intuitive and user-friendly interface. Our advanced algorithms identify trends, patterns, and anomalies, empowering you to stay ahead of the curve.",
    },
    {
      question: "What blockchains does Sentio support?",
      answer:
        "Currently, Sentio supports Ethereum, Polygon, and Binance Smart Chain. We are continuously expanding our support to include more blockchains in the future.",
    },
    {
      question: "Is Sentio free to use?",
      answer:
        "Sentio offers both free and premium subscription plans. The free plan provides access to basic features and data, while the premium plans unlock advanced analytics, real-time updates, and personalized support.",
    },
    {
      question: "How do I get started with Sentio?",
      answer:
        "Getting started with Sentio is easy! Simply create an account on our website and explore the platform. We offer comprehensive tutorials and documentation to guide you through the process.",
    },
  ]

  return (
    <div ref={ref} className="min-h-screen mb-8 flex items-center justify-center text-white px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          FAQ
        </h1>
        <p className="text-xl text-center text-gray-400 mb-12">Everything You Need to Know About Sentio.</p>
        <div>
          {faqData.map((faq, index) => (
            <details
              key={index}
              className="group rounded-xl border border-[#6C3AE1] p-6 bg-black/40 backdrop-blur-sm hover:bg-black/60 transition-all duration-300 overflow-hidden mb-4"
            >
              <summary className="flex justify-between items-center font-medium text-lg text-white cursor-pointer list-none">
                <span className="font-semibold">{faq.question}</span>
                <span className="text-xl text-[#6C3AE1] group-open:rotate-180 transition-transform duration-300">
                  &#x25BC;
                </span>
              </summary>
              <p className="mt-6 text-gray-300 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FAQ
