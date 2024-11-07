import { useNavigate } from "react-router-dom";
import logo from "../assets/s.svg";
import { FaTwitter, FaGithub, FaEnvelope } from "react-icons/fa"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-black text-white p-6 w-full">
            <div className="max-w-[90%] lg:max-w-2/3 mx-auto flex justify-between items-center flex-col lg:flex-row gap-6 lg:gap-0">
                
                {/* Logo and Name Side by Side */}
                <div className="flex flex-col items-center lg:items-start">
                    <div className="flex items-center">
                        <img src={logo} alt="SENTIO Logo" className="w-12 rounded-full" />
                        <p className="ml-2 cursor-pointer" onClick={() => navigate("/")}>
                            SENTIO
                        </p>
                    </div>
                    {/* New tagline below the logo and SENTIO */}
                    <p className="text-sm text-gray-400 text-center lg:text-left mt-2">
                        Enter an End To End Pipeline with Security, Analysis and Monitoring
                    </p>
                </div>

                {/* Social Media Icons */}
                <div className="flex gap-4 text-2xl items-center">
                    <a href="mailto:connectsentio@gmail.com">
                        <FaEnvelope className="hover:text-[#D9A5B3]" />
                    </a>
                    <a href="https://twitter.com/sentio_AR" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="hover:text-[#1DA1F2]" />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="hover:text-gray-300" />
                    </a>
                    {/* Replace LinkedIn with Araw Icon */}
                    <a href="https://arweaveindia.com/projects/sentio" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faUpRightFromSquare} />
                    </a>
                </div>
            </div>

            {/* Footer Bottom Section */}
            <div className="text-center mt-6 text-sm text-gray-400">
                <p>&copy; 2024 SENTIO. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
