import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWallet, FaListAlt, FaSearch, FaBell, FaPauseCircle } from 'react-icons/fa';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

type Step = {
  id: string;
  icon: typeof FaWallet;
  title: string;
  body: string;
  bullets?: string[];
  cta: string;
};

const STEPS: Step[] = [
  {
    id: '01',
    icon: FaWallet,
    title: 'Connect your wallet',
    body: 'Connect your wallet to get started with monitoring your active processes.',
    cta: 'Connect wallet',
  },
  {
    id: '02',
    icon: FaListAlt,
    title: 'Pick a process',
    body: 'Your active processes are listed here. Select the one you want watched.',
    cta: 'Select a process',
  },
  {
    id: '03',
    icon: FaSearch,
    title: 'Set up the sentinel',
    body: 'The sentinel is a separate AO process that observes yours.',
    bullets: [
      'Download the sentinel package.',
      'Set up the constructor with the Sentinel ID.',
      'Start sending messages from the process to the sentinel.',
    ],
    cta: 'Finish setup',
  },
];

const stepVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const SentinelProcess = () => {
  const [step, setStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-void text-phosphor">
      <Navbar />

      <header className="mt-14 border-b border-rule">
        <div className="shell py-12">
          <span className="t-meta text-hazard">Walkthrough</span>
          <h1 className="t-display-lg mt-3">On-chain monitoring</h1>
          <div className="rule-accent my-6 max-w-md" />
          <p className="t-body">
            How a Sentinel gets attached to a live AO process, in three steps.
          </p>
        </div>
      </header>

      <main className="shell flex-1 py-10">
        <ol className="mx-auto max-w-3xl">
          {STEPS.map((s, i) => {
            const revealed = step >= i + 1;
            const isLast = i === STEPS.length - 1;
            if (!revealed) return null;

            return (
              <motion.li
                key={s.id}
                className="panel mb-4"
                initial="hidden"
                animate="visible"
                variants={stepVariant}
              >
                <div className="panel-head">
                  <div className="flex items-center gap-3">
                    <span className="t-meta text-faint">{s.id}</span>
                    <s.icon className="h-3.5 w-3.5 text-hazard" />
                    <span className="t-label">{s.title}</span>
                  </div>
                  {step > i + 1 && <span className="t-meta text-signal">Done</span>}
                </div>

                <div className="p-5">
                  <p className="t-body">{s.body}</p>

                  {s.bullets && (
                    <ul className="mt-4 border-t border-rule">
                      {s.bullets.map((b, bi) => (
                        <li
                          key={bi}
                          className="flex gap-3 border-b border-rule py-2.5 last:border-0"
                        >
                          <span className="t-meta shrink-0 text-faint">
                            {String(bi + 1).padStart(2, '0')}
                          </span>
                          <span className="t-label text-dim">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {step === i + 1 && (
                    <button
                      className="btn btn-accent mt-6"
                      onClick={() => (isLast ? setIsModalOpen(true) : setStep(step + 1))}
                    >
                      {s.cta}
                    </button>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ol>

        {/* Message flow — a plain hairline diagram beats the old
            absolutely-positioned SVG overlays, which stacked on small screens. */}
        {step >= 3 && (
          <div className="mx-auto mt-8 max-w-3xl panel">
            <div className="panel-head">
              <span className="t-label">Message flow</span>
            </div>
            <div className="grid-hair sm:grid-cols-3">
              {[
                { icon: FaListAlt, label: 'Process', note: 'Emits messages' },
                { icon: FaSearch, label: 'Sentinel', note: 'Observes and scores' },
                { icon: FaBell, label: 'You', note: 'Alerted on anomaly' },
              ].map((node) => (
                <div key={node.label} className="flex items-center gap-3 p-5">
                  <node.icon className="h-5 w-5 shrink-0 text-dim" />
                  <div>
                    <p className="t-label text-phosphor">{node.label}</p>
                    <p className="t-meta mt-0.5">{node.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="panel w-full max-w-md">
            <div className="panel-head">
              <div className="flex items-center gap-2">
                <FaBell className="h-3.5 w-3.5 text-hazard" />
                <span className="t-label">Sentinel actions</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="t-label text-dim hover:text-hazard2"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="p-5">
              <p className="t-body">
                Once attached, the sentinel can act on what it observes.
              </p>
              <ul className="mt-4 border-t border-rule">
                {[
                  { icon: FaBell, text: 'Notify you on suspicious activity.' },
                  { icon: FaPauseCircle, text: 'Pause the process on a high-severity finding.' },
                ].map((action, i) => (
                  <li key={i} className="flex items-center gap-3 border-b border-rule py-3 last:border-0">
                    <action.icon className="h-4 w-4 shrink-0 text-hazard" />
                    <span className="t-label text-dim">{action.text}</span>
                  </li>
                ))}
              </ul>
              <button className="btn mt-6 w-full" onClick={() => setIsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SentinelProcess;
