import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SentinelProps {
  processes: { id: string }[]; // Assuming each process has an 'id' property
  onClose: () => void; // Callback to close the modal
  onSpawnSentinel: (processId: string) => void; // Callback to handle spawning the sentinel
}

const Sentinel: React.FC<SentinelProps> = ({ processes, onClose, onSpawnSentinel }) => {
  const [selectedProcessId, setSelectedProcessId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSpawn = () => {
    if (selectedProcessId) {
      onSpawnSentinel(selectedProcessId);
      navigate(`/setup/${selectedProcessId}`); // Navigate to the Sentinel page with the selected process ID
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="panel flex max-h-[80vh] w-full max-w-md flex-col">
        <div className="panel-head">
          <span className="t-label">Spawn sentinel</span>
          <button onClick={onClose} className="t-label text-dim hover:text-hazard2" aria-label="Close">
            ×
          </button>
        </div>

        <p className="t-meta border-b border-rule px-4 py-2">
          Select the process to watch
        </p>

        <div className="flex-1 overflow-y-auto">
          {processes.length === 0 ? (
            <p className="t-meta p-4 text-faint">No processes available</p>
          ) : (
            processes.map((process) => {
              const selected = selectedProcessId === process.id;
              return (
                <button
                  key={process.id}
                  onClick={() => setSelectedProcessId(process.id)}
                  className={`flex w-full items-center gap-3 border-b border-rule px-4 py-3 text-left transition-colors ${
                    selected ? 'bg-steel2' : 'hover:bg-steel2'
                  }`}
                >
                  <span
                    className={`h-2 w-2 shrink-0 ${selected ? 'bg-hazard' : 'bg-rule2'}`}
                    aria-hidden
                  />
                  <span className="break-all font-mono text-xs text-phosphor">
                    {process.id}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="flex gap-3 border-t border-rule p-4">
          <button className="btn btn-ghost flex-1" onClick={onClose}>
            Close
          </button>
          <button
            className="btn btn-accent flex-1"
            onClick={handleSpawn}
            disabled={!selectedProcessId}
          >
            Spawn
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sentinel;
