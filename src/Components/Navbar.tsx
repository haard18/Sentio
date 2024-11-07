import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Wallet from "./Wallet-Button";
import logo from "../assets/s.svg";
import { motion } from "framer-motion";
import {  FaTimes } from "react-icons/fa";

interface NavbarProps {
    faqRef?: React.RefObject<HTMLElement>;
    howItWorksRef?: React.RefObject<HTMLElement>;
    switchNetRef?: React.RefObject<HTMLElement>;
}

const Navbar: React.FC<NavbarProps> = ({ faqRef, howItWorksRef, switchNetRef }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string>("");
    console.log('activeSection', activeSection);
    const sidebarVariants = {
        hidden: { x: "100%" },
        visible: {
            x: 0,
            transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
        },
    };

    const handleScrollToFaq = () => {
        faqRef?.current?.scrollIntoView({ behavior: "smooth" });
        setIsSidebarOpen(false);
    };

    const handleScrollToHowItWorks = () => {
        howItWorksRef?.current?.scrollIntoView({ behavior: "smooth" });
        setIsSidebarOpen(false);
    };

    const handleScrollToSwitchNet  = () => {
        switchNetRef?.current?.scrollIntoView({ behavior: "smooth" });
        setIsSidebarOpen(false);
    };

    const navigateToHome = () => {
        navigate('/');
        setIsSidebarOpen(false);
    };

    const navigateToAboutUs = () => {
        navigate('/about');
        setIsSidebarOpen(false);
    };

    const navigateToFaucets = () => {
        navigate('/faucets');
        setIsSidebarOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (location.pathname === "/") {
                const sections = [
                    { id: "howItWorks", ref: howItWorksRef },
                    { id: "faq", ref: faqRef },
                    { id: "switchNet", ref: switchNetRef },
                ];

                const scrollPosition = window.scrollY + window.innerHeight / 2;

                sections.forEach((section) => {
                    const sectionTop = section.ref?.current?.offsetTop || 0;
                    const sectionBottom = sectionTop + (section.ref?.current?.offsetHeight || 0);

                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        setActiveSection(section.id);
                    }
                });
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [faqRef, howItWorksRef, switchNetRef, location.pathname]);

    return (
        <div className=" top-5 z-50 bg-black text-white flex items-center justify-between border border-[#66686e] rounded-xl p-6 w-[90%] lg:w-[85%]" style={{fontFamily:"'Amaranth'"}}>
            {/* Logo */}
            <div className="flex items-center">
                <div className="w-12">
                    <img src={logo} alt="Logo" className="rounded-full" />
                </div>
                <p className="hidden lg:block ml-2 cursor-pointer" onClick={navigateToHome}>
                    SENTIO
                </p>
            </div>

            {/* Centered Navigation Options */}
            <div className=" ml-[5%] hidden lg:flex gap-6 text-lg justify-center items-center space-x-1">
                {location.pathname === "/" ? (
                    <>
                        <button
                            onClick={handleScrollToHowItWorks}
                            className="hover:text-gray-400 px-3 py-2 rounded transition-colors"
                        >
                            Services
                        </button>
                        <button
                            onClick={handleScrollToFaq}
                            className="hover:text-gray-400 px-3 py-2 rounded transition-colors"
                        >
                            FAQ
                        </button>
                        <button
                            onClick={navigateToAboutUs}
                            className="hover:text-gray-400 px-3 py-2 rounded transition-colors"
                        >
                            About Us
                        </button>
                        <button
                            onClick={handleScrollToSwitchNet}
                            className="hover:text-gray-400 px-3 py-2 rounded transition-colors"
                        >
                            Features
                        </button>
                        <button
                            onClick={navigateToFaucets}
                            className="hover:text-gray-400 px-3 py-2 rounded transition-colors"
                        >
                            Faucet
                        </button>
                        <button
                            onClick={() => { window.location.href = "https://docs_sentio-app.ar-io.dev"; }}>
                            Docs
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={navigateToHome}
                            className="hover:text-gray-400 px-3 py-2 rounded transition-colors"
                        >
                            Home
                        </button>
                        <button
                            onClick={navigateToAboutUs}
                            className="hover:text-gray-400 px-3 py-2 rounded transition-colors"
                        >
                            About Us
                        </button>
                        <button
                            onClick={navigateToFaucets}
                            className="hover:text-gray-400 px-3 py-2 rounded transition-colors"
                        >
                            Faucet
                        </button>
                    </>
                )}
            </div>

            {/* Wallet Button */}
            <Wallet />

            {/* Sidebar for Mobile */}
            {isSidebarOpen && (
                <motion.div
                    className="fixed top-0 right-0 h-full w-2/3 bg-[#333] p-6 z-50 flex flex-col gap-4"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={sidebarVariants}
                >
                    <div className="flex justify-end mb-4">
                        <FaTimes
                            className="text-white text-2xl cursor-pointer"
                            onClick={() => setIsSidebarOpen(false)}
                        />
                    </div>

                    <div className="flex items-center mb-4">
                        <img src={logo} alt="Logo" className="w-12" />
                    </div>

                    {location.pathname === "/" ? (
                        <>
                            <button onClick={handleScrollToHowItWorks}>How it works</button>
                            <button onClick={handleScrollToFaq}>FAQ</button>
                            <button onClick={navigateToAboutUs}>About Us</button>
                            <button onClick={handleScrollToSwitchNet}>Features</button>
                            <button onClick={navigateToFaucets}>Faucet</button>
                        </>
                    ) : (
                        <>
                            <button onClick={navigateToHome}>Home</button>
                            <button onClick={navigateToAboutUs}>About Us</button>
                            <button onClick={navigateToFaucets}>Faucet</button>
                        </>
                    )}

                    <Wallet />
                </motion.div>
            )}
        </div>
    );
};

export default Navbar;
