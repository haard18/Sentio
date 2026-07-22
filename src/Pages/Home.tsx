"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
import FAQSection from "../Components/FAQ"

const READOUTS = [
  { id: "01", name: "Process Authentication", value: 98, state: "Nominal" },
  { id: "02", name: "System Monitoring", value: 76, state: "Degraded" },
  { id: "03", name: "Access Control", value: 92, state: "Nominal" },
]

const SOLUTIONS = [
  {
    id: "01",
    title: "On-Chain\nMonitoring",
    body: "Sentinels attach to live AO processes and stream message-level telemetry. Anomalous handler calls, balance drift, and permission escalation raise an alert the moment they are observed.",
    specs: [
      ["Latency", "Real-time"],
      ["Surface", "AO processes"],
      ["Output", "Alert, webhook"],
    ],
    href: "/dashboard",
    cta: "Open dashboard",
  },
  {
    id: "02",
    title: "Off-Chain\nAudit",
    body: "Static analysis of Lua source before it ever reaches the network. Vulnerability classes, standards violations, and unsafe patterns are reported, then written to Arweave as an atomic asset.",
    specs: [
      ["Stage", "Pre-deploy"],
      ["Surface", "Lua source"],
      ["Output", "Immutable report"],
    ],
    href: "/offchain",
    cta: "Run an audit",
  },
]

const CAPABILITIES = [
  ["01", "Static Analysis", "Vulnerability classes, unsafe patterns, standards enforcement"],
  ["02", "Sentinel Agents", "Autonomous guardians pinned to a process ID"],
  ["03", "Immutable Reports", "Audit output stored on Arweave as an atomic asset"],
  ["04", "Alert Pipeline", "Webhook and GitHub delivery on threat detection"],
  ["05", "Certificates", "Verifiable proof of audit, issued per process"],
  ["06", "Token Faucet", "Test-net funding for evaluation environments"],
]

const rise = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

export default function Home() {
  const solutionsRef = useRef<HTMLDivElement | null>(null)

  return (
    <div className="min-h-screen bg-void text-phosphor">
      <Navbar />

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative mt-14 border-b border-rule">
        <div className="blueprint pointer-events-none absolute inset-0 opacity-40" aria-hidden />

        <div className="shell relative grid gap-10 py-16 lg:grid-cols-[1fr_320px] lg:gap-0 lg:py-24">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="lg:pr-12">
            <motion.div variants={rise} className="mb-8">
              <span className="tag tag-accent">
                <span className="led" aria-hidden /> New — Vulnerability feed live
              </span>
            </motion.div>

            <motion.h1 variants={rise} className="t-display-xl">
              End-to-end
              <br />
              security for
              <br />
              <span className="text-hazard">on-chain</span> code
            </motion.h1>

            <motion.div variants={rise} className="rule-accent my-8 max-w-md" />

            <motion.p variants={rise} className="t-body">
              Sentio audits your Lua before deployment and posts Sentinels to watch it after.
              Analysis, real-time alerting, and immutable reporting — one pipeline, no
              intermediaries.
            </motion.p>

            <motion.div variants={rise} className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="/dashboard" className="btn btn-accent">
                Start monitoring
              </a>
              <a href="/offchain" className="btn">
                Start auditing
              </a>
              <a
                href="https://sentio-docs.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Docs
              </a>
            </motion.div>
          </motion.div>

          {/* Spec column — mechanical metadata slab */}
          <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative self-end border-l border-rule lg:pl-8"
          >
            <dl className="space-y-4">
              {[
                ["Platform", "AO / Arweave"],
                ["Access", "Permissionless"],
                ["Report", "Atomic Asset"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between border-b border-rule pb-2">
                  <dt className="t-meta">{k}</dt>
                  <dd className="t-label text-phosphor">{v}</dd>
                </div>
              ))}
            </dl>
          </motion.aside>
        </div>
      </section>

      {/* ── LIVE READOUT PANEL ──────────────────────────────── */}
      <section className="shell py-16 lg:py-24">
        <div className="panel">
          <div className="panel-head">
            <div className="flex items-center gap-3">
              <span className="led" aria-hidden />
              <span className="t-label">Security dashboard</span>
            </div>
            <a href="/dashboard" className="t-meta hover:text-hazard2 transition-colors">
              Create alert
            </a>
          </div>

          <motion.div
            className="grid-hair"
            style={{ gridTemplateColumns: "1fr" }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {READOUTS.map((r) => (
              <motion.div
                key={r.id}
                variants={rise}
                className="row-scan grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 p-4 sm:grid-cols-[auto_1fr_auto_auto] sm:p-5"
              >
                <span className="t-meta text-faint">{r.id}</span>
                <span className="t-label text-phosphor">{r.name}</span>

                {/* Stepped bar — 20 discrete cells, no smooth fill. */}
                <div className="col-span-2 flex gap-[2px] sm:col-span-1">
                  {Array.from({ length: 20 }).map((_, i) => {
                    const lit = i < Math.round((r.value / 100) * 20)
                    return (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.025, duration: 0.1 }}
                        className={`h-4 w-[6px] ${
                          lit ? (r.value < 80 ? "bg-hazard" : "bg-phosphor") : "bg-rule"
                        }`}
                      />
                    )
                  })}
                </div>

                <div className="flex items-baseline gap-3 justify-self-end">
                  <span className="t-meta">{r.state}</span>
                  <span className="t-display text-xl tabular-nums">{r.value}%</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SOLUTIONS ───────────────────────────────────────── */}
      <section ref={solutionsRef} className="border-y border-rule">
        <div className="shell py-16 lg:py-24">
          <header className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="t-meta text-hazard">Solutions</span>
              <h2 className="t-display-lg mt-3">
                Two surfaces.
                <br />
                One pipeline.
              </h2>
            </div>
            <p className="t-body sm:max-w-xs sm:text-right">
              Coverage before deployment and after it. Nothing between the two is left
              unobserved.
            </p>
          </header>

          <motion.div
            className="grid-hair md:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            {SOLUTIONS.map((s) => (
              <motion.article
                key={s.id}
                variants={rise}
                className="group relative flex flex-col p-6 transition-colors hover:bg-steel sm:p-10"
              >
                <span className="t-display pointer-events-none absolute right-4 top-4 text-6xl leading-none text-rule transition-colors group-hover:text-hazard sm:text-8xl">
                  {s.id}
                </span>

                <h3 className="t-display-md relative whitespace-pre-line">{s.title}</h3>

                <p className="t-body mt-6 flex-1">{s.body}</p>

                <dl className="mt-8 border-t border-rule pt-4">
                  {s.specs.map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-rule py-2">
                      <dt className="t-meta">{k}</dt>
                      <dd className="t-meta text-phosphor">{v}</dd>
                    </div>
                  ))}
                </dl>

                <a
                  href={s.href}
                  className="t-label mt-8 inline-flex items-center gap-2 self-start border-b border-rule2 pb-1 text-phosphor transition-colors hover:border-hazard hover:text-hazard2"
                >
                  {s.cta}
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                    {"→"}
                  </span>
                </a>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CAPABILITY INDEX ────────────────────────────────── */}
      <section className="shell py-16 lg:py-24">
        <header className="mb-10">
          <span className="t-meta text-hazard">Capability Index</span>
          <h2 className="t-display-lg mt-3">What it does</h2>
        </header>

        <motion.dl
          className="border-t border-rule"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
        >
          {CAPABILITIES.map(([id, title, desc]) => (
            <motion.div
              key={id}
              variants={rise}
              className="row-scan grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 border-b border-rule px-3 py-5 md:grid-cols-[80px_260px_1fr] md:items-baseline"
            >
              <dt className="t-meta text-hazard">{id}</dt>
              <dd className="t-label text-phosphor">{title}</dd>
              <dd className="col-span-2 t-meta normal-case tracking-normal md:col-span-1">
                {desc}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <FAQSection />

      {/* ── CTA BAND ────────────────────────────────────────── */}
      <section className="border-t border-rule">
        <div className="shell flex flex-col items-start gap-8 py-16 lg:flex-row lg:items-center lg:justify-between lg:py-20">
          <h2 className="t-display-lg">
            Ship it
            <br />
            audited<span className="text-hazard">.</span>
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="/offchain" className="btn btn-accent">
              Run an audit
            </a>
            <a href="/dashboard" className="btn">
              Deploy a sentinel
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
