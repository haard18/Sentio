import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReportDetails from '../Components/ReportDetails';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export interface ReportItem {
  description: string;
  line: number;
  name: string;
  pattern: string;
  severity: string;
}

interface LocationState {
  report: ReportItem[];
}

const ReportDetailsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Reached directly (no navigation state) this page has nothing to render.
  const report = (location.state as LocationState | null)?.report ?? [];

  const bySeverity = (s: string) =>
    report.filter((item) => item.severity?.toLowerCase() === s);

  const groups = [
    { label: 'High severity', color: 'bg-hazard', items: bySeverity('high') },
    { label: 'Medium Severity', color: 'bg-phosphor', items: bySeverity('medium') },
    { label: 'Low Severity', color: 'bg-rule2', items: bySeverity('low') },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-void text-phosphor">
      <Navbar />

      <header className="mt-14 border-b border-rule">
        <div className="shell flex flex-col gap-4 py-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="t-meta text-hazard">Findings</span>
            <h1 className="t-display-lg mt-3">Detailed report</h1>
          </div>
          <div className="flex items-center gap-6">
            <div>
              <span className="t-meta">Total</span>
              <p className="t-display text-3xl tabular-nums">
                {String(report.length).padStart(2, '0')}
              </p>
            </div>
            <button className="btn btn-ghost" onClick={() => navigate(-1)}> Go back
            </button>
          </div>
        </div>
      </header>

      <main className="shell flex-1 py-10">
        {report.length === 0 ? (
          <div className="panel p-8 text-center">
            <p className="t-display-md text-rule2">∅</p>
            <p className="t-body mx-auto mt-4">
              No report data was passed to this page. Run an audit first.
            </p>
            <a href="/offchain" className="btn mt-6">Run an audit</a>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-3 lg:items-start">
            {groups.map((g) => (
              <ReportDetails
                key={g.label}
                reportItems={g.items}
                severityLabel={g.label}
                severityColor={g.color}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ReportDetailsPage;
