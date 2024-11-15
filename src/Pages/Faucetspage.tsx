import { motion } from 'framer-motion';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { DotPatternHover } from '../Components/ui/Hoverdots';
import Wallet from '../Components/Wallet-Button';
import { useEffect, useState } from 'react';
import { useActiveAddress } from 'arweave-wallet-kit';
import { handleAirDrop } from '../lib/tokenServices';
import AirdropGif from "../assets/Airdropping.gif";

const Faucetspage = () => {
  const address = useActiveAddress();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [testSentiBalance, setTestSentiBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  console.log(loading)
  useEffect(() => {
    if (address) {
      console.log('Wallet connected ' + address);
      setWalletAddress(address);
      getTokenBalance();
    }
  }, [address]);

  const getTokenBalance = async () => {
    // @ts-expect-error - window.arweaveWallet is not defined
    await window.arweaveWallet.connect(["ACCESS_TOKENS"]);
    // @ts-expect-error - window.arweaveWallet is not defined
    const tokens = await window.arweaveWallet.userTokens();
    console.log("Tokens owned by the user:", tokens);
    for (let i = 0; i < tokens.length; i++) {
      console.log(tokens[i].Name);
      if (tokens[i].Name === 'TEST$SENTI') {
        const tokenid = tokens[i].processId;
        // @ts-expect-error - window.arweaveWallet is not defined
        const balance = await window.arweaveWallet.tokenBalance(tokenid);
        console.log("Test Senti Balance: ", balance);
        setTestSentiBalance(balance);
      }
    }
  };

  const handleAirDropWithBalanceUpdate = async (walletAddress: string) => {
    setLoading(true); 
    await handleAirDrop(walletAddress, window.arweaveWallet);
    setTimeout(() => {
      getTokenBalance();
      setLoading(false); 
    }, 3000);
  };
  return (
    <div className='app-background w-full h-screen flex flex-col items-center
     gap-8 space-y-8 ' style={{ fontFamily: "'Amaranth'" }}>


      <Navbar />
      <DotPatternHover>
        <div className='w-full flex py-7 justify-center items-center h-full'>
          <div className='flex flex-col items-center text-center px-4 py-10 rounded-xl border    '>
            <h1>tSenti Faucet</h1>
            <p className="text-lg text-[#cfd8e0] max-w-lg mb-6">
              Claim tSENTI tokens from the faucet to get started with code auditing, monitoring, and complete security.
            </p>
            <motion.button
              className="text-[#0e1116] py-2 px-6 text-lg rounded-md mb-6 transition"
              whileHover={{ scale: 1.05 }}
            >
              <Wallet />
            </motion.button>
            <div className='text-left'>

              <p className="text-lg">
                Please connect wallet to get <span className="text-white">tSENTI Tokens</span>
              </p>
              <p>
                Your Wallet Address: <span className="text-white">{walletAddress}</span>
              </p>
              <p>
                Your Test Senti Balance: <span className="text-white">{testSentiBalance}</span>
              </p>
              {walletAddress &&
                <div className='flex justify-end px-5'>
                  <button
                    onClick={() => handleAirDropWithBalanceUpdate(walletAddress)}
                    className='gradient-button text-white px-5 py-2 rounded-xl'
                    disabled={!walletAddress}
                  >
                    Claim tSENTI
                  </button>

                </div>}
              {loading && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-70">
                  <img src={AirdropGif} alt="Airdropping" className="w-90 h-90" />
                </div>
              )}

            </div>
          </div>
        </div>
        <div className='flex bottom-0 right-0 left-0 fixed'>

          <Footer />
        </div>
      </DotPatternHover>


    </div>
  )
};

export default Faucetspage;
