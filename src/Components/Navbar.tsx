import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/demo2.png";
import Wallet from "./Wallet-Button";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navigateToFaucet = () => {
        navigate("/faucets");
        setIsMenuOpen(false); // Close menu on navigation
    };

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-6xl z-50 px-4">
            <nav className="border border-white/10 bg-black/50 text-white py-3 items-center backdrop-blur-xl rounded-none md:rounded-full">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <a href="/" className="flex items-center space-x-2">
                                <div className="flex items-center">
                                    <div className="w-8">
                                        <img src={logo} alt="Logo" className="rounded-full" />
                                    </div>
                                </div>
                                <span className="text-xl font-bold p-4">Sentio</span>
                            </a>
                        </div>
                        {/* Hamburger Menu for Mobile */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMenu}
                                className="text-gray-50 hover:text-white focus:outline-none"
                                aria-label="Toggle Menu"
                            >
                                <svg
                                    className="w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    {isMenuOpen ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16m-7 6h7"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>
                        {/* Desktop Links */}
                        <div className="hidden md:block">
                            <div className="flex items-center space-x-8">
                                <button onClick={() => navigate("/about")} className="text-gray-50 hover:text-white">
                                    About
                                </button>
                                <button onClick={navigateToFaucet} className="text-gray-50 hover:text-white">
                                    Faucet
                                </button>
                                <Wallet />
                            </div>
                        </div>
                    </div>
                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden mt-2 bg-black/70 text-white rounded-lg border border-white/10 p-4 space-y-4">
                            <button onClick={() => navigate("/about")} className="block text-left w-full text-gray-50 hover:text-white">
                                About
                            </button>
                            <button onClick={navigateToFaucet} className="block text-left w-full text-gray-50 hover:text-white">
                                Faucet
                            </button>
                            <Wallet />
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
