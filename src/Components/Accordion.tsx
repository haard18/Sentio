import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./../Components/ui/accordion";

const AccordionComp = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Track which item is open

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the current item
  };

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400">Everything you need to know about Sentio's security monitoring</p>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {[
            {
              question: "How does Sentio ensure process security?",
              answer: "Sentio uses advanced AI algorithms to monitor process behavior, detect anomalies, and prevent unauthorized access or modifications in real-time.",
            },
            {
              question: "What types of processes can Sentio monitor?",
              answer: "Sentio can monitor any process running on AO, including system processes, user applications, and custom workflows.",
            },
            {
              question: "How does the auditing feature work?",
              answer: "Our auditing system maintains detailed logs of all process activities, changes, and access attempts, providing comprehensive audit trails for compliance and security analysis.",
            },
            {
              question: "Can Sentio integrate with existing security tools?",
              answer: "Yes, Sentio offers seamless integration with popular security tools and platforms, allowing you to maintain your existing security infrastructure while adding advanced process monitoring.",
            },
          ].map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-white/10 rounded-lg bg-white/5"
            >
              <AccordionTrigger
                onClick={() => handleToggle(index)} 
                className="px-4 py-2 hover:bg-white/10 transition-all duration-200 rounded-t-lg"
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent
                className={`px-4 text-gray-400 transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
              >
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default AccordionComp;
