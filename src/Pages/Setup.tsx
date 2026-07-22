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

    const STEP_COPY = [
        'Install the Sentinel software on your system.',
        'Launch the Sentinel and configure initial settings.',
        'Monitor and review Sentinel activity.',
    ];

    return (
        <div className='flex min-h-screen flex-col bg-void text-phosphor'>
            <Navbar />

            <header className='mt-14 border-b border-rule'>
                <div className='shell py-12'>
                    <span className='t-meta text-hazard'>Provisioning</span>
                    <h1 className='t-display-lg mt-3'>Sentinel setup</h1>

                    <dl className='mt-8 max-w-2xl border-t border-rule'>
                        <div className='flex flex-col gap-1 border-b border-rule py-3 sm:flex-row sm:justify-between sm:gap-4'>
                            <dt className='t-meta'>Target Process</dt>
                            <dd className='break-all font-mono text-xs text-phosphor'>
                                {processId || 'N/A'}
                            </dd>
                        </div>
                        <div className='flex flex-col gap-1 border-b border-rule py-3 sm:flex-row sm:justify-between sm:gap-4'>
                            <dt className='t-meta'>Sentinel ID</dt>
                            <dd className='break-all font-mono text-xs'>
                                {sentinelId
                                    ? <span className='text-phosphor'>{sentinelId}</span>
                                    : <span className='text-faint'>Not spawned</span>}
                            </dd>
                        </div>
                    </dl>
                </div>
            </header>

            <main className='shell grid flex-1 gap-6 py-10 lg:grid-cols-[320px_1fr] lg:items-start'>
                {/* Install progress */}
                <section className='panel'>
                    <div className='panel-head'>
                        <span className='t-label'>Install progress</span>
                        <span className='t-meta text-faint'>
                            {currentStep}/{totalSteps}
                        </span>
                    </div>
                    <div className='p-5'>
                        <div className='flex gap-1'>
                            {[...Array(totalSteps)].map((_, index) => (
                                <div
                                    key={index}
                                    className={`h-2 flex-1 transition-colors duration-500 ${
                                        index < currentStep ? 'bg-hazard' : 'bg-rule'
                                    }`}
                                />
                            ))}
                        </div>
                        <ol className='mt-5 border-t border-rule'>
                            {STEP_COPY.map((copy, i) => {
                                const done = i + 1 < currentStep;
                                const active = i + 1 === currentStep;
                                return (
                                    <li key={i} className='border-b border-rule py-3'>
                                        <div className='flex items-baseline gap-2'>
                                            <span className={`t-meta ${done ? 'text-signal' : active ? 'text-hazard' : 'text-faint'}`}>
                                                {done ? '●' : active ? '◐' : '○'}
                                            </span>
                                            <span className={`t-label ${active ? 'text-phosphor' : 'text-dim'}`}>
                                                Step {i + 1}
                                            </span>
                                        </div>
                                        <p className='t-meta mt-1 normal-case tracking-normal'>{copy}</p>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                </section>

                {/* Configuration */}
                <section className='panel'>
                    <div className='panel-head'>
                        <span className='t-label'>Configure sentinel</span>
                        
                    </div>

                    <form className='space-y-6 p-5' onSubmit={(e) => e.preventDefault()}>
                        {!sentinelId && (
                            <div className='flex flex-col gap-3 sm:flex-row sm:items-end'>
                                <label className='flex-1'>
                                    <span className='t-meta'>01 / Scan Interval</span>
                                    <select
                                        id='time-select'
                                        value={selectedTime}
                                        onChange={handleTimeChange}
                                        className='field mt-2'
                                    >
                                        <option value='1-minutes'>1 min</option>
                                        <option value='3-minutes'>3 min</option>
                                        <option value='5-minutes'>5 min</option>
                                        <option value='10-minutes'>10 min</option>
                                    </select>
                                </label>
                                <button
                                    type='button'
                                    onClick={handleSpawnSentinel}
                                    className='btn btn-accent'
                                >
                                    Spawn Sentinel
                                </button>
                            </div>
                        )}

                        <div className='rule' />

                        <div>
                            <span className='t-meta'>02 / Watch Tags</span>
                            <div className='mt-2 flex flex-wrap gap-2'>
                                {tags.filter(Boolean).length === 0 ? (
                                    <span className='t-meta text-faint'>No tags added</span>
                                ) : (
                                    tags.map((tag, index) =>
                                        tag ? (
                                            <span key={index} className='tag'>
                                                {tag}
                                                <button
                                                    type='button'
                                                    onClick={() => handleRemoveTag(index)}
                                                    className='text-dim hover:text-hazard2'
                                                    aria-label={`Remove ${tag}`}
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ) : null
                                    )
                                )}
                            </div>
                            <div className='mt-3 flex gap-2'>
                                <input
                                    type='text'
                                    placeholder='New tag'
                                    value={tags[tags.length - 1] || ''}
                                    onChange={(e) => handleTagChange(tags.length - 1, e)}
                                    className='field'
                                />
                                <button type='button' onClick={handleAddTag} className='btn btn-ghost'>
                                    Add
                                </button>
                            </div>
                        </div>

                        <div className='rule' />

                        <div>
                            <span className='t-meta'>03 / Alert Channel</span>
                            <label className='mt-2 flex cursor-pointer items-center gap-2'>
                                <input
                                    type='checkbox'
                                    id='email-confirm'
                                    checked={isEmailConfirmed}
                                    onChange={(e) => setIsEmailConfirmed(e.target.checked)}
                                    className='h-3 w-3 accent-[#E61919]'
                                />
                                <span className='t-label text-dim'>Receive updates via email</span>
                            </label>
                            <input
                                type='email'
                                placeholder='you@domain.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={!isEmailConfirmed}
                                className='field mt-3 disabled:opacity-40'
                            />
                        </div>

                        <button
                            type='button'
                            onClick={configureSentinel}
                            className='btn btn-accent w-full'
                        >
                            Configure Sentinel
                        </button>
                    </form>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default SetupPage;
