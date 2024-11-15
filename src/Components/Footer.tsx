// import { useNavigate } from "react-router-dom";
// import logo from "../assets/s.svg";
import { FaTwitter, FaGithub, FaEnvelope } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    // const navigate = useNavigate();
    return (
        // <div className="bg-black text-white p-6 w-full">
        //     <div className="max-w-[90%] lg:max-w-2/3 mx-auto flex justify-between items-center flex-col lg:flex-row gap-6 lg:gap-0">

        //         {/* Logo and Name Side by Side */}
        //         <div className="flex flex-col items-center lg:items-start">
        //             <div className="flex items-center">
        //                 <img src={logo} alt="SENTIO Logo" className="w-12 rounded-full" />
        //                 <p className="ml-2 cursor-pointer" onClick={() => navigate("/")}>
        //                     SENTIO
        //                 </p>
        //             </div>
        //             {/* New tagline below the logo and SENTIO */}
        //             <p className="text-sm text-gray-400 text-center lg:text-left mt-2">
        //                 Enter an End To End Pipeline with Security, Analysis and Monitoring
        //             </p>
        //         </div>

        //         {/* Social Media Icons */}
        //         <div className="flex gap-4 text-2xl items-center">
        //             <a href="mailto:connectsentio@gmail.com">
        //                 <FaEnvelope className="hover:text-[#D9A5B3]" />
        //             </a>
        //             <a href="https://twitter.com/sentio_AR" target="_blank" rel="noopener noreferrer">
        //                 <FaTwitter className="hover:text-[#1DA1F2]" />
        //             </a>
        //             <a href="https://github.com" target="_blank" rel="noopener noreferrer">
        //                 <FaGithub className="hover:text-gray-300" />
        //             </a>
        //             {/* Replace LinkedIn with Araw Icon */}
        //             <a href="https://arweaveindia.com/projects/sentio" target="_blank" rel="noopener noreferrer">
        //             <FontAwesomeIcon icon={faUpRightFromSquare} />
        //             </a>
        //         </div>
        //     </div>

        //     {/* Footer Bottom Section */}
        //     <div className="text-center mt-6 text-sm text-gray-400">
        //         <p>&copy; 2024 SENTIO. All rights reserved.</p>
        //     </div>
        // </div>
        
        <footer className="border-t border-white/10 bg-black/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <h3 className="text-sm font-semibold mb-4">Product</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Security</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold mb-4">Contact</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="mailto:connectsentio@gmail.com" className="text-gray-400 hover:text-white flex items-center justify-center">
                                    <FaEnvelope className="mr-2" /> Email
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com/sentio_AR" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white flex items-center justify-center">
                                    <FaTwitter className="mr-2" /> Twitter
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white flex items-center justify-center">
                                    <FaGithub className="mr-2" /> GitHub
                                </a>
                            </li>
                            <li>
                                <a href="https://arweaveindia.com/projects/sentio" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white flex items-center justify-center">
                                    <FontAwesomeIcon icon={faUpRightFromSquare} className="mr-2" /> Arweave
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold mb-4">Resources</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-white/10 text-center">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} Sentio. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>

    );
};

export default Footer;
