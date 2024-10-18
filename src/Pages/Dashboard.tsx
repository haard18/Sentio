/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import axios from "axios";

const Dashboard: React.FC = () => {
  // const { walletid } = useParams<{ walletid: string }>();
  const [process, setProcess] = useState<any>(null);
  const[walletid, setWalletid] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const checkWallet=async()=>{
    const isConnected=localStorage.getItem("wallet_kit_strategy_id");
    if(isConnected){
    const walletId=await window.arweaveWallet.getActiveAddress();
    setWalletid(walletId);
    console.log(walletId);
    }
  }
  useEffect(() => {
    checkWallet();
    fetchProcessDetails(walletid);
  }, [walletid]);

  const fetchProcessDetails = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('https://sam-server.azurewebsites.net/getProcesses', {
        address: id
      });
      console.log(response.data);
      setProcess(response.data.edges);
    } catch (error) {
      console.error("Error fetching process details:", error);
      setError("Failed to load process details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-background text-white p-6 min-h-screen" style={{ fontFamily: "'Roboto'" }}>
      <h1 className="text-4xl font-bold mb-4">Process Dashboard</h1>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <svg
            className="animate-spin h-12 w-12 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8l4 4-4 4v-8a8 8 0 00-8-8z"
            ></path>
          </svg>
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : process ? (
        <div>
          {process.map((process: any, index: number) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
              <h2 className="text-2xl font-semibold mb-2">Process ID: {process.node.id}</h2>
              <p className="mb-4"><strong>Status:</strong> {process.node.status}</p>
              <div className="mb-4">
                <h3 className="text-xl font-bold">Tags</h3>
                <ul className="list-disc list-inside">
                  {process.node.tags.map((tag: any, index: number) => (
                    <li key={index}>
                      <strong>{tag.name}:</strong> {tag.value}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-5">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
                  onClick={() => navigator.clipboard.writeText(process.node.id)}
                >
                  Copy Process ID
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-200"
                  onClick={() => alert("Analyzer feature coming soon!")}
                >
                  Analyze Process
                </button>
              </div>
            </div>
          ))}
        </div>
        // <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        //   <h2 className="text-2xl font-semibold mb-2">Process ID: {process.id}</h2>
        //   <p className="mb-4"><strong>Status:</strong> {process.status}</p>
        //   <div className="mb-4">
        //     <h3 className="text-xl font-bold">Tags</h3>
        //     <ul className="list-disc list-inside">
        //       {process.tags.map((tag: any, index: number) => (
        //         <li key={index}>
        //           <strong>{tag.name}:</strong> {tag.value}
        //         </li>
        //       ))}
        //     </ul>
        //   </div>
        //   <div className="flex gap-5">
        //     <button
        //       className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
        //       onClick={() => navigator.clipboard.writeText(process.id)}
        //     >
        //       Copy Process ID
        //     </button>
        //     <button
        //       className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-200"
        //       onClick={() => alert("Analyzer feature coming soon!")}
        //     >
        //       Analyze Process
        //     </button>
        //   </div>
        // </div>
      ) : (
        <p>No process found with the given ID.</p>
      )}
    </div>
  );
};

export default Dashboard;