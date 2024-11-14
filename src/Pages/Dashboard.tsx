'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import ProcessCard from "../Components/ProcessCard";
import SentinelDemo from "../Components/SentinelDemo";

// import DotPattern from "../Components/ui/dot-pattern";
// import { cn } from "../lib/utils";

import Sentinel from "../Components/Sentinel"; // Import the Sentinel component
import { DotPatternHover } from "../Components/ui/Hoverdots";
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

    <div className="app-background text-white min-h-screen" style={{ fontFamily: "'Roboto'" }}>

      <div className="flex justify-center">
        <Navbar />
      </div>
      <DotPatternHover>
        <div className="flex justify-center mb-4 mt-5">
          <h1 className="text-4xl font-bold">Process Dashboard</h1>
        </div>

        <div className="flex justify-center mt-5">
          <button
            className="px-10 py-3 text-white bg-[#9966FF] mt-7 z-10 rounded-xl font-bold text-md"
            onClick={() => setSentinelMode(prev => !prev)}
          >
            {sentinelMode ? 'Cancel Setup Sentinel' : 'Setup Sentinel'}
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center mt-5 h-48">
            <svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8l4 4-4 4v-8a8 8 0 00-8-8z"></path>
            </svg>
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : processes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {processes.map((process, index) => (
              <div key={index}>
                {sentinelMode && (
                  <div className="mb-2 flex items-start ">
                    <input
                      type="checkbox"
                      checked={selectedProcesses.includes(process.node.id)}
                      onChange={() => handleProcessSelection(process.node.id)}
                      className="mt-1"
                    />
                    <span className="ml-2 text-white break-words w-full">{`Select ${process.node.id}`}</span>
                  </div>
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
          <p>No process found with the given ID.</p>
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
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-5 rounded-lg shadow-lg max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-600"
                onClick={() => setShowSentinelDemo(false)}
              >
                Close
              </button>
              <SentinelDemo />
            </div>
          </div>
        )}

        {copied && (
          <div className="fixed bottom-4 right-4 bg-white text-black py-2 px-4 rounded shadow-lg transition-all duration-300" style={{ fontFamily: "'Roboto'" }}>
            Process ID copied to clipboard!
          </div>
        )}
      </DotPatternHover>
      <Footer/>
    </div>


  );
}
