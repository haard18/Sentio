import './App.css';
import { ArweaveWalletKit } from "arweave-wallet-kit";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Waitlist from './Pages/Waitlist';
import Offchain from './Pages/Offchain';
import Dashboard from './Pages/Dashboard';
import SentinelProcess from './Pages/OnchainDemo';
import ReportDetailsPage from './Pages/Details';

import ReactGA from 'react-ga4';
import { useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react";
import Aboutus from './Pages/Aboutus';
import Certificate from './Pages/Certificate';
import Faucetspage from './Pages/Faucetspage';
import SetupPage from './Pages/Setup';
import Webhook from './Pages/GitHook';

// import NoteBookPage from './Pages/Notebook';


function App() {
  useEffect(() => {
    const trackingId = "G-BY4ZM3EL9F";
    ReactGA.initialize(trackingId);
    ReactGA.send({ hitType: "pageview", page: "/", title: "Landing Page" });
    ReactGA.send({ hitType: "pageview", page: "/wait", title: "Waitlist Page" });
    ReactGA.send({ hitType: "pageview", page: "/offchain", title: "Offchain Page" });
    ReactGA.send({ hitType: "pageview", page: "/onchain", title: "Onchain Page" });
    ReactGA.send({ hitType: "pageview", page: "/report-details", title: "Report Details Page" });
    ReactGA.send({ hitType: "pageview", page: "/dashboard", title: "Dashboard Page" });
    ReactGA.send({ hitType: "pageview", page: "/sentinel/:processId", title: "Sentinel Page" });
    ReactGA.send({ hitType: "pageview", page: "/aboutus", title: "About us Page" });
    ReactGA.send({ hitType: "pageview", page: "/certificates", title: "Certificates Page" });
    ReactGA.send({ hitType: "pageview", page: "/faucets", title: "Faucets Page" });
    ReactGA.send({ hitType: "pageview", page: "/webhook", title: "Webhook Page" });
  });

  return (
    <ArweaveWalletKit>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wait" element={<Waitlist />} />
          <Route path="/offchain" element={<Offchain />} />

          {/* <Route path = "/offchain/notebook" element={<NoteBookPage/>} /> */}

          <Route path="/onchain" element={<SentinelProcess />} />
          <Route path="/report-details" element={<ReportDetailsPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/setup/:processId" element={<SetupPage />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/certificates" element={<Certificate/>} />
          <Route path="/faucets" element={<Faucetspage/>} />
          <Route path='/webhook' element={<Webhook/>}/>
          
        </Routes>
        <Analytics />
      </BrowserRouter>
    </ArweaveWalletKit>
  );
}

export default App;
