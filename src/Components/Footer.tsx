import { FaTwitter, FaGithub, FaEnvelope } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-black/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row sm:justify-between items-center text-center sm:text-left text-sm space-y-6 sm:space-y-0">
                    {/* Contact Section */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-white">Contact</h3>
                        <ul className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 justify-center sm:justify-start">
                            <li>
                                <a
                                    href="mailto:connectsentio@gmail.com"
                                    className="text-gray-400 hover:text-white flex items-center"
                                >
                                    <FaEnvelope className="mr-1" /> Email
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://twitter.com/sentio_AR"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white flex items-center"
                                >
                                    <FaTwitter className="mr-1" /> Twitter
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/sentioAO"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white flex items-center"
                                >
                                    <FaGithub className="mr-1" /> GitHub
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://arweaveindia.com/projects/sentio"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white flex items-center"
                                >
                                    <FontAwesomeIcon icon={faUpRightFromSquare} className="mr-1" /> Arweave
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Resources Section */}
                    <div className="space-y-2">
                        <h3 className="font-semibold text-white">Resources</h3>
                        <ul className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 justify-center sm:justify-start">
                            <li>
                                <a
                                    href="https://docs_sentio-app.ar-io.dev"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:connectsentio@gmail.com"
                                    className="text-gray-400 hover:text-white"
                                >
                                    Help Center
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-6 border-t border-white/10 pt-6 text-gray-400 text-center text-xs">
                    © {new Date().getFullYear()} Sentio. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
