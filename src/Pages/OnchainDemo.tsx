import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaWallet, FaListAlt, FaSearch, FaBell, FaPauseCircle } from 'react-icons/fa';
import { BsArrowDown } from 'react-icons/bs';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const SentinelProcess = () => {
  const [step, setStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextStep = () => setStep(step + 1);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Scroll to the latest step
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [step]);

  // Animation variants
  const stepVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } },
  };

  const arrowVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: 0.1 } },
  };

  // Sending Animation - simulating a Wi-Fi-like connection
  const waveVariant = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1, transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } },
  };
 
  return (
    <>
      <div className="app-background min-h-screen flex flex-col bg-[#1a1a1a] text-white" style={{ fontFamily: "'Roboto'" }}>


        <Navbar/>

        <div
          className="sentinel-setup p-6 rounded-lg  w-full max-w-3xl mx-auto flex-grow mt-12"
          ref={containerRef}
        >
          {/* Step 1 */}
          <motion.div
            className="step-content text-center"
            initial="hidden"
            animate="visible"
            variants={stepVariant}
          >
            <h2 className="text-2xl font-semibold mb-4 flex justify-center items-center">
              <FaWallet className="mr-2" /> Step 1: Connect Your Wallet
            </h2>
            <p className="text-gray-400 mb-6">
              Connect your wallet to get started with monitoring your active processes.
            </p>
            <motion.button
              className="px-6 py-2 bg-white rounded-xl font-bold text-md text-black"
              onClick={nextStep}
              initial="hidden"
              animate="visible"
              variants={buttonVariant}
            >
              Connect Wallet
            </motion.button>
          </motion.div>

          {/* Arrow between steps */}
          {step >= 2 && (
            <motion.div
              className="flex justify-center my-4"
              initial="hidden"
              animate="visible"
              variants={arrowVariant}
            >
              <BsArrowDown className="text-white text-2xl" />
            </motion.div>
          )}

          {/* Step 2 */}
          {step >= 2 && (
            <motion.div
              className="step-content text-center"
              initial="hidden"
              animate="visible"
              variants={stepVariant}
            >
              <h2 className="text-2xl font-semibold mb-4 flex justify-center items-center">
                <FaListAlt className="mr-2" /> Step 2: Active Processes
              </h2>
              <p className="text-gray-400 mb-6">
                Your active processes will be listed here. Select a process to monitor.
              </p>
              <motion.button
                className="px-6 py-2 bg-white rounded-xl font-bold text-md text-black"
                onClick={nextStep}
                initial="hidden"
                animate="visible"
                variants={buttonVariant}
              >
                Select a Process
              </motion.button>
            </motion.div>
          )}

          {/* Arrow between steps */}
          {step >= 3 && (
            <motion.div
              className="flex justify-center my-4"
              initial="hidden"
              animate="visible"
              variants={arrowVariant}
            >
              <BsArrowDown className="text-white text-2xl" />
            </motion.div>
          )}

          {/* Step 3 */}
          {step >= 3 && (
            <motion.div
              className="step-content text-center"
              initial="hidden"
              animate="visible"
              variants={stepVariant}
            >
              <h2 className="text-2xl font-semibold mb-4 flex justify-center items-center">
                <FaSearch className="mr-2" /> Step 3: Setup Sentinel Process
              </h2>
              <ul className="text-gray-400 list-disc list-inside text-center justify-center space-y-1 mb-6 flex flex-col ">
                <li>Download the sentinel package.</li>
                <li>Set up the constructor with the Sentinel ID.</li>
                <li>Start sending messages from the process to the sentinel.</li>
              </ul>

              <motion.button
                className="px-6 py-2 bg-white rounded-xl font-bold text-md text-black"
                onClick={openModal}
                initial="hidden"
                animate="visible"
                variants={buttonVariant}
              >
                Finish Setup
              </motion.button>
            </motion.div>
          )}

          {/* Sending Animation - Process sends messages to sentinel */}
          {step >= 3 && (
            <div className="relative flex flex-col  sm:flex-row justify-center items-center mt-12">
              {/* Process Icon */}
              <div className="mr-6 text-white text-center mb-4 mt-7 sm:mb-0">
                <span className="block text-lg">Process</span>
                <FaListAlt className="text-4xl" />
              </div>

              {/* SVG Path (Wi-Fi like connection) */}
              <motion.svg
                className="w-48 h-23"
                viewBox="0 0 100 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M10 40 Q 50 0, 90 40"
                  stroke="blue"
                  strokeWidth="2"
                  fill="transparent"
                  variants={waveVariant}
                  initial="hidden"
                  animate="visible"
                />
                <motion.circle
                  cx="10"
                  cy="40"
                  r="2"
                  fill="blue"
                  variants={waveVariant}
                  initial="hidden"
                  animate="visible"
                />
              </motion.svg>

              {/* Sentinel Icon */}
              <div className="ml-6 text-white mt-3 text-center">
                <span className="block text-lg">Sentinel</span>
                <FaSearch className=" mt-4 text-4xl" />
              </div>
            </div>
          )}

          {/* Arrow between steps */}
          {step >= 4 && (
            <motion.div
              className="flex justify-center my-4"
              initial="hidden"
              animate="visible"
              variants={arrowVariant}
            >
              <BsArrowDown className="text-white text-2xl" />
            </motion.div>
          )}

          {/* Step 4 - Sentinel Actions */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-[#1a1a1a] p-6 rounded-lg border  h-1/2 w-full max-w-3xl mx-auto">
                <motion.div
                  className="step-content text-center mt-12"
                  initial="hidden"
                  animate="visible"
                  variants={stepVariant}
                >
                  <h2 className="text-2xl font-semibold mb-4 flex justify-center items-center">
                    <motion.div
                      className="mr-4"
                      animate={{
                        rotate: [0, -20, 20, -20, 20, 0], // Rotate back and forth to simulate ringing
                      }}
                      transition={{
                        duration: 1,  // Duration of one "ring"
                        ease: "easeInOut", // Smooth easing
                        repeat: Infinity, // Loop the animation
                        repeatType: "loop", // Continuous looping
                      }}
                    >
                      <FaBell />
                    </motion.div>
                    Sentinel Actions
                  </h2>
                  <div className='flex justify-center text-center items-center'>
                    <ul className="mt-4 text-gray-400  pl-6 px-4  mb-16   inline-block">
                      <li>Notification on suspicious activity.</li>
                      <li>
                        <FaPauseCircle className="inline-block mr-1" /> Pause the process if a high-level vulnerability is detected.
                      </li>
                    </ul>
                  </div>
                  {/* Arrow for Actions from Sentinel */}
                  <div className="relative flex flex-col sm:flex-row justify-center items-center mt-8 ">
                    {/* Sentinel Icon at the center */}
                    <div className="absolute text-white  text-center">
                      <span className="block text-lg ">Sentinel</span>
                      <FaSearch className="text-4xl ml-2 mb-16" />
                    </div>

                    {/* Path going to User Notification */}
                    <motion.svg
                      className="absolute left-1/3 w-32 h-16"
                      viewBox="0 0 100 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <motion.path
                        d="M90 40 Q 50 0, 10 40" // Adjusted for right to left
                        stroke="green"
                        strokeWidth="2"
                        fill="transparent"
                        variants={waveVariant}
                        initial="hidden"
                        animate="visible"
                      />
                    </motion.svg>

                    {/* Path going to Process Pause */}
                    <motion.svg
                      className="absolute right-1/3 w-32 h-16"
                      viewBox="0 0 100 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <motion.path
                        d="M10 40 Q 50 0, 90 40" // Adjusted for left to right
                        stroke="red"
                        strokeWidth="2"
                        fill="transparent"
                        variants={waveVariant}
                        initial="hidden"
                        animate="visible"
                      />
                    </motion.svg>

                    {/* Icons for User Notification and Process */}
                    <div className="absolute left-1/4 flex flex-col  items-center">
                      <span className="block text-lg text-white">Notify</span>
                      <FaBell className="text-3xl mr-2 text-white" />
                    </div>

                    <div className="absolute right-1/4 flex flex-col  items-center">
                      <span className="block text-lg text-white">Process</span>
                      <FaListAlt className="text-4xl text-white" />
                    </div>
                  </div>

                  <button
                    className="mt-20 my-10  px-6 py-2 bg-white rounded-xl font-bold text-md text-black"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </motion.div>
              </div>
            </div>
          )}
        </div>
        <div className='flex justify-center'>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default SentinelProcess;