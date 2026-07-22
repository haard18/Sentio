import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { OrbitingCirclesDemo } from './Circles';
import offchain from "../assets/offchain.png";
import Monitoring from './Monitoring';

const SwitchNet: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'security' | 'auditing' | 'monitoring'>('security');
    const [buttonText, setButtonText] = useState<string>('Go to Security');
    const navigate = useNavigate();

    const handleTabChange = (tab: 'security' | 'auditing' | 'monitoring') => {
        setActiveTab(tab);
        setButtonText(tab === 'security' ? 'Go to Security' : tab === 'auditing' ? 'Go to Auditing' : 'Go to Monitoring');
    };

    const handleNavigate = () => {
        if (activeTab === 'security') {
            navigate('/dashboard');
        } else if (activeTab === 'auditing') {
            navigate('/offchain');
        } else {
            navigate('/dashboard');
        }
    };

    // Tabs are flat panels; the active one is marked by a red rule, not a fill.
    const tabButtonVariants = {
        active: { backgroundColor: '#171717', color: '#EAEAEA' },
        inactive: { backgroundColor: '#0A0A0A', color: '#8A8A8A' },
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-6 flex flex-col">
            {/* Tab Selection at the Top */}
            <div className="flex border border-rule">
                <motion.button
                    className="relative flex-1 border-r border-rule py-3 t-label focus:outline-none"
                    onClick={() => handleTabChange('security')}
                    variants={tabButtonVariants}
                    animate={activeTab === 'security' ? 'active' : 'inactive'}
                >
                    Security
                </motion.button>
                <motion.button
                    className="relative flex-1 border-r border-rule py-3 t-label focus:outline-none"
                    onClick={() => handleTabChange('auditing')}
                    variants={tabButtonVariants}
                    animate={activeTab === 'auditing' ? 'active' : 'inactive'}
                >
                    Auditing
                </motion.button>
                <motion.button
                    className="relative flex-1 py-3 t-label focus:outline-none"
                    onClick={() => handleTabChange('monitoring')}
                    variants={tabButtonVariants}
                    animate={activeTab === 'monitoring' ? 'active' : 'inactive'}
                >
                    Monitoring
                </motion.button>
            </div>

            {/* Main Content Below the Tabs */}
            <div className="flex flex-col md:flex-row">
                {/* Right Side Content */}
                <div className="flex-grow flex flex-col" style={{ minHeight: '500px', width: '100%' }}>
                    <div className="flex-grow py-6" style={{ minHeight: '500px' }}>
                        {activeTab === 'security' && (
                            <div>
                                <p className="t-body mx-auto text-center">
                                    Ensure that your smart contracts are secure and free from vulnerabilities before deployment.
                                </p>
                                <div className="mt-6">
                                    <OrbitingCirclesDemo />
                                </div>
                            </div>
                        )}
                        {activeTab === 'auditing' && (
                            <div>
                                <p className="t-body mx-auto text-center">
                                    Audit the codebase and transaction history to ensure compliance and integrity of the smart contract.
                                </p>
                                <div className="mt-6 flex h-[500px] items-center justify-center border border-rule bg-void">
                                    <img
                                        src={offchain}
                                        alt=""
                                        className="h-full object-contain"
                                    />
                                </div>
                            </div>
                        )}
                        {activeTab === 'monitoring' && (
                            <div>
                                <p className="t-body mx-auto text-center">
                                    Monitor on-chain activity to detect potential issues or anomalies in real time.
                                </p>
                                <div className="mt-6 h-[500px] w-full ">
                                    <Monitoring />
                                </div>
                            </div>
                        )}

                        {/* Dynamic Go Button */}
                        <div className="mt-6 flex justify-center">
                            <motion.button
                                onClick={handleNavigate}
                                className="btn btn-accent"
                            >
                                {buttonText}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SwitchNet;
