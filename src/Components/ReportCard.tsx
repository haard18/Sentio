import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Vulnerability {
  description: string;
  line: number;
  name: string;
  pattern: string;
  severity: string;
}

export interface Report {
  total_lines: number;
  vulnerabilities: Vulnerability[];
  vulnerable_lines: number;
}

interface ReportStats {
  highSeverity: number;
  mediumSeverity: number;
  lowSeverity: number;
  totalLinesOfCode: number;
  uniqueVulnerableLines: number;
  vulnerableCodePercentage: string;
  threatChecklist: { label: string; exists: boolean }[];
}

interface ReportCardProps {
  report: Report;
  onGoBack: () => void;
}

const computeReportStats = (report: Report): ReportStats | null => {
  if (!report.vulnerabilities || report.vulnerabilities.length === 0) {
    return null;
  }

  const vulnerabilities = report.vulnerabilities;
  const bySeverity = (s: string) =>
    vulnerabilities.filter(item => item.severity?.toLowerCase() === s).length;

  const totalLinesOfCode = report.total_lines || 0;
  const uniqueVulnerableLines = report.vulnerable_lines || 0;
  const vulnerableCodePercentage = totalLinesOfCode
    ? ((uniqueVulnerableLines / totalLinesOfCode) * 100).toFixed(2)
    : '0';

  const named = (...names: string[]) =>
    vulnerabilities.some(v => names.includes(v.name?.toLowerCase()));

  const threatChecklist = [
    { label: 'Reentrancy permitted', exists: named('reentrancy') },
    { label: 'Floating pragma', exists: named('floating pragma') },
    { label: 'Unchecked external calls', exists: named('unchecked external calls') },
    { label: 'Integer overflow / underflow', exists: named('integer overflow', 'integer underflow') },
    { label: 'Denial of service', exists: named('denial of service') },
  ];

  return {
    highSeverity: bySeverity('high'),
    mediumSeverity: bySeverity('medium'),
    lowSeverity: bySeverity('low'),
    totalLinesOfCode,
    uniqueVulnerableLines,
    vulnerableCodePercentage,
    threatChecklist,
  };
};

/* Severity drives colour only through the accent + phosphor scale —
   no green/amber/red traffic light, which would break the palette. */
const severityClass = (severity: string) => {
  switch (severity?.toLowerCase()) {
    case 'high':
      return 'border-hazard text-hazard2';
    case 'medium':
      return 'border-rule2 text-phosphor';
    default:
      return 'border-rule text-dim';
  }
};

const ReportCard: React.FC<ReportCardProps> = ({ report, onGoBack }) => {
  const navigate = useNavigate();
  const reportStats = computeReportStats(report);

  const handleCertificate = () => {
    navigate('/certificates', { state: { report, reportStats } });
  };

  if (!reportStats) {
    return (
      <div className="panel mx-auto max-w-3xl">
        <div className="panel-head">
          <span className="t-label">Security assessment</span>
          
        </div>
        <div className="p-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="led" aria-hidden />
            <span className="t-meta text-signal">No findings</span>
          </div>
          <h2 className="t-display-md mt-4">Zero vulnerabilities</h2>
          <p className="t-body mx-auto mt-3">
            Static analysis returned no findings for this source. You are clear to
            proceed.
          </p>
        </div>
        <div className="flex flex-col gap-3 border-t border-rule p-5 sm:flex-row sm:justify-between">
          <button className="btn btn-ghost" onClick={onGoBack}> Go back
          </button>
          <button className="btn btn-accent" onClick={handleCertificate}>
            Generate certificate
          </button>
        </div>
      </div>
    );
  }

  const {
    highSeverity,
    mediumSeverity,
    lowSeverity,
    totalLinesOfCode,
    uniqueVulnerableLines,
    vulnerableCodePercentage,
    threatChecklist,
  } = reportStats;

  const totalFindings = highSeverity + mediumSeverity + lowSeverity;
  const pct = (n: number) => (totalFindings ? (n / totalFindings) * 100 : 0);

  return (
    <div className="mx-auto max-w-5xl">
      {/* Masthead */}
      <div className="border border-rule">
        <div className="panel-head">
          <div className="flex items-center gap-3">
            <span className="t-label">Audit report</span>
            
          </div>
          <button className="btn btn-sm btn-ghost" onClick={onGoBack}> Back
          </button>
        </div>

        {/* Headline metrics */}
        <dl className="grid-hair grid-cols-2 border-0 lg:grid-cols-4">
          {[
            ['Total lines', String(totalLinesOfCode)],
            ['Vulnerable lines', String(uniqueVulnerableLines)],
            ['Vulnerable %', `${vulnerableCodePercentage}%`],
            ['Findings', String(totalFindings)],
          ].map(([k, v]) => (
            <div key={k} className="p-5">
              <dt className="t-meta">{k}</dt>
              <dd className="t-display mt-2 text-4xl tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Severity distribution — stacked hard bar, no doughnut. */}
      <section className="panel mt-4">
        <div className="panel-head">
          <span className="t-label">Severity distribution</span>
          <span className="t-meta text-faint">
            {String(totalFindings).padStart(2, '0')} total
          </span>
        </div>
        <div className="p-5">
          <div className="flex h-8 w-full border border-rule">
            <div style={{ width: `${pct(highSeverity)}%` }} className="bg-hazard" title={`${highSeverity} high`} />
            <div style={{ width: `${pct(mediumSeverity)}%` }} className="bg-phosphor" title={`${mediumSeverity} medium`} />
            <div style={{ width: `${pct(lowSeverity)}%` }} className="bg-rule2" title={`${lowSeverity} low`} />
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-4">
            {[
              ['High', highSeverity, 'bg-hazard'],
              ['Medium', mediumSeverity, 'bg-phosphor'],
              ['Low', lowSeverity, 'bg-rule2'],
            ].map(([label, count, swatch]) => (
              <div key={label as string} className="border-t border-rule pt-2">
                <dt className="t-meta flex items-center gap-2">
                  <span className={`h-2 w-2 ${swatch}`} aria-hidden />
                  {label}
                </dt>
                <dd className="t-display mt-1 text-2xl tabular-nums">
                  {String(count).padStart(2, '0')}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Findings register — previously not surfaced at all. */}
      <section className="panel mt-4">
        <div className="panel-head">
          <span className="t-label">Findings register</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-rule bg-steel2">
                {['ID', 'Severity', 'Name', 'Line', 'Description'].map(h => (
                  <th key={h} className="t-meta px-4 py-2 text-left font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {report.vulnerabilities.map((v, i) => (
                <tr key={i} className="row-scan border-b border-rule align-top">
                  <td className="t-meta px-4 py-3 text-faint">
                    {String(i + 1).padStart(2, '0')}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`tag ${severityClass(v.severity)}`}>{v.severity}</span>
                  </td>
                  <td className="t-label px-4 py-3 text-phosphor">{v.name}</td>
                  <td className="px-4 py-3 font-mono text-xs tabular-nums text-dim">
                    L{v.line}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs leading-relaxed text-dim">
                    {v.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Threat model */}
      <section className="panel mt-4">
        <div className="panel-head">
          <span className="t-label">Generated threat model</span>
        </div>
        <dl className="p-5">
          {threatChecklist.map((check, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 border-b border-rule py-2.5 last:border-0"
            >
              <dt className="t-label text-dim">{check.label}</dt>
              <dd
                className={`t-meta shrink-0 ${
                  check.exists ? 'text-hazard2' : 'text-signal'
                }`}
              >
                {check.exists ? '[DETECTED]' : '[CLEAR]'}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-4 flex flex-col gap-3 border border-rule p-5 sm:flex-row sm:justify-between">
        <button className="btn btn-ghost" onClick={onGoBack}> Go back
        </button>
        <button className="btn btn-accent" onClick={handleCertificate}>
          Generate certificate
        </button>
      </div>
    </div>
  );
};

export default ReportCard;
