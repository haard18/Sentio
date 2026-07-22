'use client'

import { useState, useEffect } from 'react'

const steps = [
  { id: 1, title: "Install package", description: "Install the Sentinel package." },
  { id: 2, title: "Set up sentinel ID", description: "Configure your unique sentinel identifier." },
  { id: 3, title: "Start analyzing", description: "Begin the analysis process." },
]

export default function StepAnimation() {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length)
    }, 3000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div>
      {/* Reserve the tallest step's height so the panel doesn't jump as
          the copy cycles. */}
      <div className="relative min-h-[7rem]">
        {steps.map((step, index) => (
          <div
            key={step.id}
            aria-hidden={index !== currentStep}
            className={`absolute inset-x-0 top-0 transition-opacity duration-500 ${
              index === currentStep ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            <div className="flex items-baseline gap-3">
              <span className="t-meta text-hazard">
                {String(step.id).padStart(2, '0')}
              </span>
              <h3 className="t-label text-phosphor">{step.title}</h3>
            </div>
            <p className="t-body mt-3">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Progress ticks */}
      <div className="mt-4 flex gap-1 border-t border-rule pt-4">
        {steps.map((_, i) => (
          <span
            key={i}
            className={`h-1 flex-1 transition-colors duration-300 ${
              i <= currentStep ? 'bg-hazard' : 'bg-rule'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
