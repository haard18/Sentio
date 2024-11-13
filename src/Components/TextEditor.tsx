import React, { useState } from 'react';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import 'codemirror/mode/lua/lua'; // Import Lua mode
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';  // Optional: import a theme
import ReactGA from 'react-ga4';
const CodeEditor: React.FC<{ value: string, onChange: (value: string) => void, onAnalyze: () => void }> = ({ value, onChange, onAnalyze }) => {
    const [language] = useState('lua'); // Only Lua language available

    if (language !== 'lua') {
        throw new Error('Invalid language');
    }
    const handleAnalyze=()=>{
        ReactGA.send({
            hitType: 'event',
            eventCategory: 'Code Analysis',
            eventAction: 'Analyze Button Clicked',
            eventLabel: 'AuditRequests'
        });
        
        // Call the provided onAnalyze function
        onAnalyze();
    }
    return (
        <div
            className="items-center justify-center rounded-xl shadow-md max-w-4xl w-full"
            style={{
                background: 'linear-gradient(145deg, #1F1F1F, #141414)', // Outer gradient background
                padding: '20px',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                color: '#d8d8d8'
            }}
        >
            {/* Top section with Lua Code Editor and Analyze button */}
            <div
                className="flex justify-between items-center"
                style={{
                    background: '#1F1F1F', // Match the top section to outer container's background
                    color: '#f0f0f0',
                    borderRadius: '15px 15px 0 0',
                    padding: '10px 20px',
                }}
            >
                <h2 className="text-xl font-bold">SENTIO ANALYSIS</h2>
                <button
                    onClick={handleAnalyze}
                    className="gradient-button rounded-xl p-1 px-5 text-white font-semibold hover:bg-black"
                >
                    Analyze
                </button>
            </div>

            {/* Code editor with synchronized background and color */}
            <div
                className="editor no-scroll"
                style={{
                    background: 'linear-gradient(145deg, #1F1F1F, #141414)', // Match the background to outer div
                    border: '1px solid #2c2c2c',
                    borderRadius: '15px',
                    color: '#f0f0f0',
                }}
            >
                <ControlledEditor
                    value={typeof value === 'string' ? value : ''} // Ensure value is a string
                    onBeforeChange={(editor, data, newValue) => {                
                        console.log(editor,data)        // Validate that newValue is a string before calling onChange
                        if (typeof newValue === 'string') {
                            onChange(newValue);
                        }
                    }}
                    options={{
                        mode: 'lua',
                        theme: 'dracula',
                        lineNumbers: true,
                        tabSize: 2,
                        scrollbarStyle: null, // Ensure scrollbar styles are set to null to avoid default scrollbars
                    }}
                    className="editor"
                />
            </div>
        </div>
    );
};

export default CodeEditor;
