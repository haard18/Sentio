import React from 'react';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import 'codemirror/mode/lua/lua';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import ReactGA from 'react-ga4';

const CodeEditor: React.FC<{
    value: string;
    onChange: (value: string) => void;
    onAnalyze: () => void;
}> = ({ value, onChange, onAnalyze }) => {
    const lineCount = value ? value.split('\n').length : 0;

    const handleAnalyze = () => {
        ReactGA.send({
            hitType: 'event',
            eventCategory: 'Code Analysis',
            eventAction: 'Analyze Button Clicked',
            eventLabel: 'AuditRequests',
        });
        onAnalyze();
    };

    return (
        <div className="panel w-full">
            <div className="panel-head">
                <div className="flex items-center gap-3">
                    <span className="t-label">Sentio analysis</span>
                    <span className="t-meta hidden text-faint sm:inline">/ LUA</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="t-meta hidden sm:inline">
                        {String(lineCount).padStart(3, '0')} LN
                    </span>
                    <button
                        onClick={handleAnalyze}
                        disabled={!value.trim()}
                        className="btn btn-sm btn-accent"
                    >
                        Analyze
                    </button>
                </div>
            </div>

            <div className="editor no-scroll">
                <ControlledEditor
                    value={typeof value === 'string' ? value : ''}
                    onBeforeChange={(_editor, _data, newValue) => {
                        if (typeof newValue === 'string') {
                            onChange(newValue);
                        }
                    }}
                    options={{
                        mode: 'lua',
                        theme: 'dracula',
                        lineNumbers: true,
                        tabSize: 2,
                        scrollbarStyle: null,
                    }}
                    className="editor"
                />
            </div>

            <div className="flex items-center justify-between border-t border-rule px-4 py-2">
                <span className="t-meta">
                    {value.trim() ? 'Buffer ready' : 'Paste or import Lua source'}
                </span>
                <span className="t-meta text-faint">UTF-8 / LF</span>
            </div>
        </div>
    );
};

export default CodeEditor;
