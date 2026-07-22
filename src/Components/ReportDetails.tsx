import React, { useState } from 'react';

interface ReportDetailsProps {
  reportItems: {
    description: string;
    line: number;
    name: string;
    pattern: string;
    severity: string;
  }[];
  severityLabel: string;
  /** Tailwind class for the severity swatch, e.g. `bg-hazard`. */
  severityColor: string;
}

const ReportDetails: React.FC<ReportDetailsProps> = ({
  reportItems,
  severityLabel,
  severityColor,
}) => {
  const [isOpen, setIsOpen] = useState(reportItems.length > 0);

  return (
    <section className="panel">
      <button
        type="button"
        className="panel-head w-full text-left"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <span className={`h-2 w-2 ${severityColor}`} aria-hidden />
          <span className="t-label">{severityLabel}</span>
        </span>
        <span className="flex items-center gap-3">
          <span className="t-display text-lg tabular-nums">
            {String(reportItems.length).padStart(2, '0')}
          </span>
          <span
            className={`t-label text-dim transition-transform duration-150 ${
              isOpen ? 'rotate-45' : ''
            }`}
            aria-hidden
          >
            +
          </span>
        </span>
      </button>

      {isOpen && (
        <div>
          {reportItems.length > 0 ? (
            reportItems.map((item, index) => (
              <article key={index} className="border-b border-rule p-4 last:border-0">
                <div className="flex items-baseline justify-between gap-3">
                  <h4 className="t-label text-phosphor">{item.name}</h4>
                  <span className="t-meta shrink-0 tabular-nums">L{item.line}</span>
                </div>
                <p className="mt-2 font-mono text-xs leading-relaxed text-dim">
                  {item.description}
                </p>
                <pre className="mt-3 overflow-x-auto border border-rule bg-void p-2 font-mono text-[11px] text-faint">
                  {item.pattern}
                </pre>
              </article>
            ))
          ) : (
            <p className="t-meta p-4">No findings at this severity.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default ReportDetails;
