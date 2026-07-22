'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import ProcessCard from "../Components/ProcessCard";
import SentinelDemo from "../Components/SentinelDemo";

// import DotPattern from "../Components/ui/dot-pattern";
// import { cn } from "../lib/utils";

import Sentinel from "../Components/Sentinel"; // Import the Sentinel component
import Footer from "../Components/Footer";

interface Tag {
  name: string;
  value: string;
}

interface Process {
  id: string;
  tags: Tag[];
}

interface ProcessEdge {
  node: Process;
}

export default function Dashboard() {
  const [processes, setProcesses] = useState<ProcessEdge[]>([]);
  const [walletId, setWalletId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [sentinelMode, setSentinelMode] = useState<boolean>(false);
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>([]);
  const [showSentinelDemo, setShowSentinelDemo] = useState<boolean>(false);

  const checkWallet = async () => {
    const isConnected = localStorage.getItem("wallet_kit_strategy_id");
    if (isConnected) {
      const walletId = await window.arweaveWallet.getActiveAddress();
      setWalletId(walletId);
    }
  };

  useEffect(() => {
    checkWallet();
  }, []);

  useEffect(() => {
    if (walletId) {
      fetchProcessDetails(walletId);
    }
  }, [walletId]);

  const fetchProcessDetails = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('https://sam-server.azurewebsites.net/getProcesses', { address: id });
      const sortedProcesses = response.data.edges.sort((a: ProcessEdge, b: ProcessEdge) => {
        const aTag = a.node.tags.find(tag => tag.name === "Date-Created")?.value || "";
        const bTag = b.node.tags.find(tag => tag.name === "Date-Created")?.value || "";
        return aTag.localeCompare(bTag);
      });
      setProcesses(sortedProcesses);
    } catch (error) {
      console.log(error);
      setError("Failed to load process details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleProcessSelection = (processId: string) => {
    setSelectedProcesses(prevSelected =>
      prevSelected.includes(processId)
        ? prevSelected.filter(id => id !== processId)
        : [...prevSelected, processId]
    );
  };

  return (

    <div className="flex min-h-screen flex-col bg-void text-phosphor">

      <Navbar />

      {/* Command header — status readout, not a hero. */}
      <header className="mt-14 border-b border-rule">
        <div className="shell flex flex-col gap-6 py-10 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="t-meta text-hazard">Console</span>
            <h1 className="t-display-lg mt-3">Processes</h1>
          </div>

          <dl className="flex flex-wrap items-end gap-x-8 gap-y-3">
            <div>
              <dt className="t-meta">Indexed</dt>
              <dd className="t-display text-3xl tabular-nums">
                {String(processes.length).padStart(2, "0")}
              </dd>
            </div>
            <div>
              <dt className="t-meta">Selected</dt>
              <dd className="t-display text-3xl tabular-nums">
                {String(selectedProcesses.length).padStart(2, "0")}
              </dd>
            </div>
            <div>
              <dt className="t-meta">Wallet</dt>
              <dd className="t-label mt-1 flex items-center gap-2">
                {walletId ? (
                  <>
                    <span className="led" aria-hidden />
                    {walletId.slice(0, 6)}…{walletId.slice(-4)}
                  </>
                ) : (
                  <span className="text-faint">Not connected</span>
                )}
              </dd>
            </div>
            <button
              className={sentinelMode ? "btn btn-ghost" : "btn btn-accent"}
              onClick={() => setSentinelMode(prev => !prev)}
            >
              {sentinelMode ? 'Cancel setup' : 'Set up sentinel'}
            </button>
          </dl>
        </div>
      </header>

      <main className="shell flex-1 py-10">
        {loading ? (
          <div className="panel">
            <div className="panel-head">
              <span className="t-label">Querying index</span>
              <span className="t-meta text-faint">Please wait</span>
            </div>
            <div className="grid gap-1 p-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-28 animate-pulse border border-rule bg-steel2" />
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="panel border-hazard">
            <div className="panel-head border-hazard">
              <span className="t-label text-hazard2">Query failed</span>
            </div>
            <p className="t-body p-5">{error}</p>
            <div className="px-5 pb-5">
              <button className="btn btn-sm" onClick={() => walletId && fetchProcessDetails(walletId)}>
                Retry
              </button>
            </div>
          </div>
        ) : processes.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {processes.map((process, index) => (
              <div key={index}>
                {sentinelMode && (
                  <label className="mb-1 flex cursor-pointer items-center gap-2 border border-rule bg-steel2 px-3 py-2">
                    <input
                      type="checkbox"
                      checked={selectedProcesses.includes(process.node.id)}
                      onChange={() => handleProcessSelection(process.node.id)}
                      className="h-3 w-3 accent-[#E61919]"
                    />
                    <span className="t-meta">Select for sentinel</span>
                  </label>
                )}
                <ProcessCard
                  process={process.node}
                  onCopy={() => {
                    navigator.clipboard.writeText(process.node.id);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="panel">
            <div className="panel-head">
              <span className="t-label">No records</span>
            </div>
            <div className="p-8 text-center">
              <p className="t-display-md text-rule2">∅</p>
              <p className="t-body mx-auto mt-4">
                {walletId
                  ? "No processes indexed for this wallet."
                  : "Connect a wallet to index your processes."}
              </p>
            </div>
          </div>
        )}

        {sentinelMode && (
          <Sentinel
            processes={processes.map(process => ({ id: process.node.id }))} // Pass processes to the Sentinel component
            onClose={() => setSentinelMode(false)} // Close modal callback
            onSpawnSentinel={(processId) => {
              console.log(`Spawned Sentinel for Process ID: ${processId}`);
              // Implement your logic to spawn a sentinel
              // After spawning, you might want to close the modal or perform another action
              setSentinelMode(false); // Close the modal after spawning
            }}
          />
        )}

        {showSentinelDemo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 p-4">
            <div className="panel w-full max-w-md">
              <div className="panel-head">
                <span className="t-label">Sentinel demo</span>
                <button
                  className="t-label text-dim hover:text-hazard2"
                  onClick={() => setShowSentinelDemo(false)}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <div className="p-5">
                <SentinelDemo />
              </div>
            </div>
          </div>
        )}

        {copied && (
          <div
            role="status"
            className="fixed bottom-4 right-4 z-50 flex items-center gap-2 border border-phosphor bg-void px-4 py-3"
          >
            <span className="led" aria-hidden />
            <span className="t-label">Process ID copied</span>
          </div>
        )}
      </main>
      <Footer/>
    </div>


  );
}
