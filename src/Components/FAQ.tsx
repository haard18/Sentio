"use client"

import type React from "react"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "What is Sentio?",
    answer:
      "Sentio is an end-to-end security and monitoring platform for blockchain applications. It provides automated code auditing, real-time monitoring through Sentinels, and immediate notifications for any detected vulnerabilities, helping developers secure their smart contracts and projects on AO and Arweave.",
  },
  {
    question: "How does Sentio help with post-deployment monitoring?",
    answer:
      "Once your project is live, Sentio's Sentinels continuously monitor the smart contract for unusual activities or threats. In case of any suspicious behavior, Sentio sends real-time alerts, allowing developers to respond quickly and mitigate potential risks.",
  },
  {
    question: "What makes Sentio different from other security tools?",
    answer:
      "Sentio offers both pre-deployment code audits and post-deployment monitoring, creating a dual-layered approach to security. The platform is also integrated into AO, allowing audits to be stored immutably as atomic assets and enabling seamless security processes without centralized intervention.",
  },
  {
    question: "Who can use Sentio?",
    answer:
      "Sentio is permissionless, meaning anyone can use it without project or legal barriers. It's designed for developers, project teams, and the broader AO ecosystem looking to ensure top-tier security and monitoring for their blockchain applications.",
  },
  {
    question: "Are there specific types of projects Sentio is currently collaborating with?",
    answer:
      "Yes, Sentio is actively collaborating with projects like Betteridea, an IDE for AO development, and Veritas, a funding platform for onboarding secure projects. These partnerships help us refine our services and meet the needs of various applications within the ecosystem.",
  },
  {
    question: "What is the role of Sentinels?",
    answer:
      "Sentinels are monitoring agents deployed by Sentio to scan for vulnerabilities or suspicious activity within smart contracts post-deployment. They act as guardians for on-chain processes, continuously analyzing the contract's performance and sending alerts if issues arise.",
  },
  {
    question: "How does Sentio handle code audits?",
    answer:
      "Sentio performs in-depth code audits pre-deployment, identifying vulnerabilities, enforcing coding standards, and ensuring compliance with security best practices. The audit results are then stored immutably on AO as atomic assets, adding a layer of trust and transparency.",
  },
  {
    question: "Will there be educational resources on security?",
    answer:
      "Yes, Sentio aims to provide educational resources, such as webinars and guides, to raise awareness about blockchain security and best practices. We believe that empowering developers with knowledge is key to a safer ecosystem.",
  },
  {
    question: "What are the future goals for Sentio?",
    answer:
      "Sentio plans to expand its Sentinels to monitor bridges and automated bots, enhance its code auditing capabilities, and promote security education within the blockchain community, all while growing partnerships across the ecosystem.",
  },
]

const FAQ: React.FC = () => {
  return (
    <section className="border-t border-rule">
      <div className="shell py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
          <header className="lg:sticky lg:top-24 lg:self-start">
            <span className="t-meta text-hazard">Reference</span>
            <h2 className="t-display-lg mt-3">FAQ</h2>
            <div className="rule-accent my-6 max-w-[120px]" />
            <p className="t-body">
              Everything you need to know about Sentio. Expand an entry to read the full
              record.
            </p>
            <p className="t-meta mt-6 text-faint">
              {String(faqData.length).padStart(2, "0")} entries / rev 2.6
            </p>
          </header>

          <div className="border-t border-rule">
            {faqData.map((faq, index) => (
              <details key={index} className="group border-b border-rule">
                <summary className="row-scan flex cursor-pointer list-none items-start gap-4 px-3 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="t-meta mt-1 shrink-0 text-faint group-open:text-hazard">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="t-label flex-1 text-phosphor">{faq.question}</span>
                  <span
                    className="t-label shrink-0 text-dim transition-transform duration-150 group-open:rotate-45 group-open:text-hazard"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <div className="border-t border-rule bg-steel px-3 py-5 pl-3 sm:pl-14">
                  <p className="t-body">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
