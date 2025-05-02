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
      answer: "Sentio is an end-to-end security and monitoring platform for blockchain applications. It provides automated code auditing, real-time monitoring through Sentinels, and immediate notifications for any detected vulnerabilities, helping developers secure their smart contracts and projects on AO and Arweave."
    },
    {
      question: "How does Sentio help with post-deployment monitoring?",
      answer: "Once your project is live, Sentio's Sentinels continuously monitor the smart contract for unusual activities or threats. In case of any suspicious behavior, Sentio sends real-time alerts, allowing developers to respond quickly and mitigate potential risks."
    },
    {
      question: "What makes Sentio different from other security tools?",
      answer: "Sentio offers both pre-deployment code audits and post-deployment monitoring, creating a dual-layered approach to security. The platform is also integrated into AO, allowing audits to be stored immutably as atomic assets and enabling seamless security processes without centralized intervention."
    },
    {
      question: "Who can use Sentio?",
      answer: "Sentio is permissionless, meaning anyone can use it without project or legal barriers. It’s designed for developers, project teams, and the broader AO ecosystem looking to ensure top-tier security and monitoring for their blockchain applications."
    },
    {
      question: "Are there specific types of projects Sentio is currently collaborating with?",
      answer: "Yes, Sentio is actively collaborating with projects like Betteridea, an IDE for AO development, and Veritas, a funding platform for onboarding secure projects. These partnerships help us refine our services and meet the needs of various applications within the ecosystem."
    },
    {
      question: "What is the role of Sentinels?",
      answer: "Sentinels are monitoring agents deployed by Sentio to scan for vulnerabilities or suspicious activity within smart contracts post-deployment. They act as 'guardians' for on-chain processes, continuously analyzing the contract’s performance and sending alerts if issues arise."
    },
    {
      question: "How does Sentio handle code audits?",
      answer: "Sentio performs in-depth code audits pre-deployment, identifying vulnerabilities, enforcing coding standards, and ensuring compliance with security best practices. The audit results are then stored immutably on AO as atomic assets, adding a layer of trust and transparency."
    },
    {
      question: "Will there be educational resources on security?",
      answer: "Yes, Sentio aims to provide educational resources, such as webinars and guides, to raise awareness about blockchain security and best practices. We believe that empowering developers with knowledge is key to a safer ecosystem."
    },
    {
      question: "What are the future goals for Sentio?",
      answer: "Sentio plans to expand its Sentinels to monitor bridges and automated bots, enhance its code auditing capabilities, and promote security education within the blockchain community, all while growing partnerships across the ecosystem."
    }
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
