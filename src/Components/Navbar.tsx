import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import logo from "../assets/unnamed.png";
import Wallet from "./Wallet-Button";

const LINKS = [
    { label: "Dashboard", to: "/dashboard", id: "01" },
    { label: "Audit", to: "/offchain", id: "02" },
    { label: "Faucet", to: "/faucets", id: "03" },
    { label: "About", to: "/about", id: "04" },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // Close the drawer whenever the route changes under it.
    useEffect(() => setIsMenuOpen(false), [pathname]);

    const go = (to: string) => {
        navigate(to);
        setIsMenuOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-rule bg-void/95 backdrop-blur-sm">
            <div className="flex h-14 items-stretch">
                {/* Identity block */}
                <a
                    href="/"
                    className="flex items-center gap-3 border-r border-rule px-4 sm:px-6 hover:bg-steel2 transition-colors"
                >
                    <img src={logo} alt="" className="h-6 w-6" />
                    <span className="t-display text-lg">Sentio</span>
                </a>

                {/* Live telemetry readout — desktop only */}
                <div className="hidden lg:flex items-center gap-2 border-r border-rule px-4">
                    <span className="led" aria-hidden />
                    <span className="t-meta">Net / AO Mainnet</span>
                </div>

                <div className="flex-1" aria-hidden />

                {/* Desktop nav */}
                <nav className="hidden md:flex items-stretch">
                    {LINKS.map((link) => {
                        const active = pathname === link.to;
                        return (
                            <button
                                key={link.to}
                                onClick={() => go(link.to)}
                                className={`group relative flex items-center gap-2 border-l border-rule px-5 t-label transition-colors ${
                                    active
                                        ? "bg-steel2 text-phosphor"
                                        : "text-dim hover:bg-steel2 hover:text-phosphor"
                                }`}
                            >
                                {active && (
                                    <span className="absolute inset-x-0 top-0 h-0.5 bg-hazard" aria-hidden />
                                )}
                                {link.label}
                            </button>
                        );
                    })}
                </nav>

                <div className="hidden md:flex items-center border-l border-rule px-3">
                    <Wallet />
                </div>

                {/* Mobile toggle */}
                <button
                    onClick={() => setIsMenuOpen((v) => !v)}
                    className="md:hidden ml-auto flex w-14 items-center justify-center border-l border-rule t-label text-phosphor"
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? "×" : "≡"}
                </button>
            </div>

            {/* Mobile drawer */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-rule bg-void">
                    {LINKS.map((link) => (
                        <button
                            key={link.to}
                            onClick={() => go(link.to)}
                            className="row-scan flex w-full items-center gap-3 border-b border-rule px-4 py-4 t-label text-left text-dim"
                        >
                            {link.label}
                        </button>
                    ))}
                    <div className="p-4">
                        <Wallet />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
