import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import axios from 'axios';



const SetupPage: React.FC = () => {
    const [processId, setProcessId] = useState<string>('');
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [selectedTime, setSelectedTime] = useState<string>("1 min");
    const [sentinelId, setSentinelId] = useState<string>('');
    const { processId: pid } = useParams();
    const totalSteps = 3;
    const navigate = useNavigate()
    const [tags, setTags] = useState<string[]>(['']);
    const [email, setEmail] = useState<string>('');
    const [isEmailConfirmed, setIsEmailConfirmed] = useState<boolean>(false);

    useEffect(() => {
        setProcessId(pid || '');
    }, [pid]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prevStep) => {
                if (prevStep < totalSteps) {
                    return prevStep + 1;
                } else {
                    clearInterval(interval);
                    return prevStep;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchSentinel = async () => {
            const response = await axios.post('https://sam-server.azurewebsites.net/api/process/getSentinel', {
                targetProcess: processId
            });
            if (response.data.sid) {
                setSentinelId(response.data.sid);
            } else {
                console.log('Sentinel ID not found');
            }
        };

        fetchSentinel();
    }, [processId]);

    const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTime(event.target.value);
    };

    const handleTagChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newTags = [...tags];
        newTags[index] = event.target.value;
        setTags(newTags);
    };

    const handleAddTag = () => {
        setTags([...tags, '']);
    };

    const handleRemoveTag = (index: number) => {
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags);
    };

    const handleSpawnSentinel = async () => {
        const response = await axios.post('https://sam-server.azurewebsites.net/api/process/spawnProcess', {
            cronValue: selectedTime,
            targetProcess: processId,
        });
        setSentinelId(response.data.pid);
    };

    const configureSentinel = async () => {
        const response = await axios.post('https://sam-server.azurewebsites.net/api/process/sendCode', {
            processId: sentinelId,
            targetId: processId,
            tagArray: tags
        });
        console.log(response.data);
        navigate('/dashboard')
    };  

    return (
        <div className='app-background min-h-screen text-white flex flex-col'>
            <header className="navbar flex justify-center py-4 shadow-md ">
                <Navbar />
            </header>

            <main className='flex-grow container mx-auto px-6 md:px-10 py-20 w-[1/3]'>
                <section className='rounded-xl bg-gray-800 bg-opacity-70 p-8 shadow-lg mb-12 text-center md:text-left'>
                    <h1 className='text-4xl font-extrabold text-white mb-4'>
                        Sentinel Setup Process
                    </h1>
                    <p className='text-lg text-gray-300'>
                        Your process ID is: <span className='font-mono text-[#9966ff]'>{processId || 'N/A'}</span>
                    </p>
                    {sentinelId && <p className='text-lg text-gray-300'>
                        Your Sentinel ID is: <span className='font-mono text-[#9966ff]'>{sentinelId || 'N/A'}</span>
                    </p>}
                </section>

                <section className='rounded-xl bg-gray-800 bg-opacity-70 p-6 shadow-md mb-8'>
                    <h2 className='text-3xl font-semibold text-gray-100 mb-6 text-center'>
                        Installation Progress
                    </h2>
                    <div className='flex items-center space-x-4 mb-8'>
                        {[...Array(totalSteps)].map((_, index) => (
                            <div
                                key={index}
                                className={`flex-1 h-4 rounded-full transition-all duration-1000 ${index < currentStep ? 'bg-[#9966ff]' : 'bg-gray-600'}`}
                            ></div>
                        ))}
                    </div>

                    <div className='text-lg font-semibold text-gray-200 text-center mt-6'>
                        {currentStep === 1 && <p>Step 1: Install the Sentinel software on your system.</p>}
                        {currentStep === 2 && <p>Step 2: Launch the Sentinel and configure initial settings.</p>}
                        {currentStep === 3 && <p>Step 3: Monitor and review Sentinel activity.</p>}
                    </div>
                </section>

                <section className='rounded-xl bg-gray-800 bg-opacity-70 p-6 shadow-md flex justify-center'>
                    <div className="text-center w-full max-w-lg bg-gray-800 bg-opacity-70 backdrop-blur-md rounded-lg p-6">
                        <h2 className='text-3xl font-semibold text-gray-100 mb-4'>Configure Sentinel</h2>
                        <form className="bg-transparent p-4 rounded-lg grid grid-cols-1 gap-4">
                            {!sentinelId && <div className='flex items-center justify-between mb-4'>
                                <div className="w-1/2">
                                    <label htmlFor="time-select" className='text-lg text-gray-300 mr-[74%]'>Interval:</label>
                                    <select
                                        id="time-select"
                                        value={selectedTime}
                                        onChange={handleTimeChange}
                                        className='w-full p-2 bg-gray-700 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9966ff]'
                                    >
                                        <option value="1-minutes">1 min</option>
                                        <option value="3-minutes">3 min</option>
                                        <option value="5-minutes">5 min</option>
                                        <option value="10-minutes">10 min</option>
                                    </select>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleSpawnSentinel}
                                    className='ml-4 px-6 py-2 gradient-button text-white rounded-xl mt-7'
                                    disabled={!!sentinelId}
                                >
                                    Spawn Sentinel
                                </button>
                            </div>}

                            <div className="mb-4">
                                <h3 className='text-lg text-gray-300 mr-[74%]'>Tags:</h3>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {tags.map((tag, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center bg-[#9966ff] text-white rounded-full px-4 py-2 space-x-2"
                                        >
                                            <span>{tag}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTag(index)}
                                                className="text-white text-sm font-bold hover:text-gray-300"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    placeholder="New tag"
                                    value={tags[tags.length - 1] || ''}
                                    onChange={(e) => handleTagChange(tags.length - 1, e)}
                                    className='w-full p-2 mb-2 bg-gray-700 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9966ff]'
                                />
                                <button
                                    type="button"
                                    onClick={handleAddTag}
                                    className='px-4 py-2 gradient-button  text-white rounded-xl'
                                >
                                    Add Tag
                                </button>
                            </div>

                            <div className="mb-4 flex flex-col items-center">
                                <div className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id="email-confirm"
                                        checked={isEmailConfirmed}
                                        onChange={(e) => setIsEmailConfirmed(e.target.checked)}
                                        className='mr-2'
                                    />
                                    <label htmlFor="email-confirm" className='text-sm text-gray-300'>I want to receive updates via email</label>
                                </div>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='w-full p-2 bg-gray-700 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9966ff]'
                                />
                            </div>

                            <button
                                type="button"
                                onClick={configureSentinel}
                                className='w-full py-2 mt-2 gradient-button text-white rounded-xl'
                            >
                                Configure Sentinel
                            </button>
                        </form>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default SetupPage;
