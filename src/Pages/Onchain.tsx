import { useActiveAddress } from "arweave-wallet-kit";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import ProcessCard from "../Components/ProcessCard";
import "../index.css"
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
interface Tag {
    name: string;
    value: string;
}

interface Node {
    id: string;
    tags: Tag[];
}

interface ApiResponse {
    edges: { node: Node }[];
}

const Onchain = () => {
    const address = useActiveAddress();
    const [processes, setProcesses] = useState<{ id: string; tags: Tag[] }[]>([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const navigate = useNavigate()
    useEffect(() => {
        const walletConnected = localStorage.getItem("wallet_kit_strategy_id")
        if (!walletConnected) {
            navigate("/")
        }
        const fetchProcesses = async () => {
            setLoading(true); // Set loading to true when starting to fetch
            try {
                const response = await axios.post<ApiResponse>("https://sam-server.azurewebsites.net/getProcesses", { address });
                const processArray = response.data.edges.map(edge => ({
                    id: edge.node.id,
                    tags: edge.node.tags,
                }));
                setProcesses(processArray);
            } catch (error) {
                console.error("Error fetching processes:", error);
            } finally {
                setLoading(false); // Set loading to false once fetch is complete
            }
        };
        if (address) {
            fetchProcesses();
        }
    }, [address, navigate]);
   
    return (
        <>
            <div className="app-background flex-grow min-h-screen flex flex-col">
                <Navbar />

                <div className="flex justify-center items-center py-3">
                    <h1 className="text-white font-bold text-center text-3xl tracking-widest" style={{ fontFamily: "'Roboto'" }}>
                        CHECK YOUR PROCESSES
                    </h1>
                </div>

                <div className="flex flex-col items-center w-full mt-5 space-y-4">
                    {loading ? (
                        <div className="flex justify-center items-center">
                            {/* Spinner component or spinner CSS */}
                            <div className="loader"></div> {/* Example class name for spinner */}
                        </div>
                    ) : processes.length > 0 ? (
                        processes.map((process, index) => (
                            <ProcessCard key={index} process={process} onCopy={() => { /* Add your onCopy logic here */ }} />
                        ))
                    ) : (
                        <p className="text-white">No processes available.</p>
                    )}
                </div>
            </div>
            <div>

                <Footer />
            </div>
        </>
    );
};

export default Onchain;
