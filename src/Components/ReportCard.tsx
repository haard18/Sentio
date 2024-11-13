import React from 'react';
import { FaCode, FaBug, FaSkull, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { Doughnut } from 'react-chartjs-2';

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

const computeReportStats = (report: Report): ReportStats => {
  const vulnerabilities = report.vulnerabilities;

  // Filter vulnerabilities by severity
  const highSeverityItems = vulnerabilities.filter(item => item.severity.toLowerCase() === 'high');
  const mediumSeverityItems = vulnerabilities.filter(item => item.severity.toLowerCase() === 'medium');
  const lowSeverityItems = vulnerabilities.filter(item => item.severity.toLowerCase() === 'low');

  // Calculate total lines of code and unique vulnerable lines
  const totalLinesOfCode = report.total_lines || 0;
  const uniqueVulnerableLines = report.vulnerable_lines || 0;
  const vulnerableCodePercentage = totalLinesOfCode
    ? ((uniqueVulnerableLines / totalLinesOfCode) * 100).toFixed(2)
    : '0';

  const threatChecklist = [
    { label: 'Does the code allow reentrancy?', exists: vulnerabilities.some(vul => vul.name.toLowerCase() === 'reentrancy') },
    { label: 'Is there a floating pragma issue?', exists: vulnerabilities.some(vul => vul.name.toLowerCase() === 'floating pragma') },
    { label: 'Are there unchecked external calls?', exists: vulnerabilities.some(vul => vul.name.toLowerCase() === 'unchecked external calls') },
    { label: 'Does the code have integer overflow or underflow vulnerabilities?', exists: vulnerabilities.some(vul => ['integer overflow', 'integer underflow'].includes(vul.name.toLowerCase())) },
    { label: 'Is there a denial of service vulnerability?', exists: vulnerabilities.some(vul => vul.name.toLowerCase() === 'denial of service') },
  ];

  return {
    highSeverity: highSeverityItems.length,
    mediumSeverity: mediumSeverityItems.length,
    lowSeverity: lowSeverityItems.length,
    totalLinesOfCode,
    uniqueVulnerableLines,
    vulnerableCodePercentage,
    threatChecklist,
  };
};

const ReportCard: React.FC<ReportCardProps> = ({ report, onGoBack }) => {
  const reportStats = computeReportStats(report);
  const { 
    highSeverity, 
    mediumSeverity, 
    lowSeverity, 
    totalLinesOfCode, 
    uniqueVulnerableLines, 
    vulnerableCodePercentage, 
    threatChecklist
  } = reportStats;

  // Dummy Doughnut Chart Data (Replace with actual data)
  const data = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [{
      data: [highSeverity, mediumSeverity, lowSeverity],
      backgroundColor: ['#f87171', '#fbbf24', '#34d399'],
    }]
  };

  return (
    <div className="min-h-[50vh] flex flex-col justify-between bg-[#1E1E1E] text-white p-6 rounded-xl shadow-lg" style={{ fontFamily: "'Roboto'" }}>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Summary + Security Assessment</h2>
          <button className="bg-[#3b3f5c] gradient-button text-sm px-4 py-2 rounded-xl" onClick={onGoBack}>
            Go Back
          </button>
        </div>
        
        {/* Code Analysis Summary */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
          <div className="flex-1 bg-[#2E2E2E] p-4 rounded-xl shadow-md mb-4 sm:mb-0">
            <h3 className="text-xl font-semibold mb-2">Code Analysis Summary</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FaCode className="text-purple-500" />
                <div className="text-white text-lg">
                  Total Lines of Code: <strong>{totalLinesOfCode}</strong>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FaBug className="text-red-500" />
                <div className="text-white text-lg">
                  Lines with Vulnerabilities: <strong>{uniqueVulnerableLines}</strong>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FaSkull className="text-yellow-500" />
                <div className="text-white text-lg">
                  Vulnerable Code Percentage: <strong>{vulnerableCodePercentage}%</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Vulnerabilities Discovered */}
          <div className="flex-1 bg-[#2E2E2E] p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">Vulnerabilities Discovered</h3>
            <div className="flex flex-col sm:flex-row sm:space-x-4 items-center sm:items-start">
              <div className="w-full sm:w-1/2">
                <Doughnut data={data} />
              </div>
              <div className="w-full sm:w-1/2 sm:ml-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <FaSkull className="text-red-500" />
                  <div className="bg-red-500 text-white px-2 py-1 rounded-xl">
                    {highSeverity} High
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FaExclamationTriangle className="text-yellow-500" />
                  <div className="bg-yellow-500 text-white px-2 py-1 rounded-xl">
                    {mediumSeverity} Medium
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCheckCircle className="text-green-500" />
                  <div className="bg-green-500 text-white px-2 py-1 rounded-xl">
                    {lowSeverity} Low
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Threat Model */}
        <div className="bg-[#2E2E2E] p-4 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-2 bg-slate-700 px-4 py-1 rounded-xl">Generated Threat Model</h3>
          <ul className="text-gray-300 text-sm pl-5">
            {threatChecklist.map((check, index) => (
              <li key={index}>
                {check.exists ? (
                  <span className="text-red-500">✔️</span>
                ) : (
                  <span className="text-green-500">✖️</span>
                )}{' '}
                {check.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex space-x-4">
        <button className="bg-green-500 gradient-button text-white px-6 py-2 rounded-xl hover:bg-green-600 transition duration-300" onClick={() => console.log('View Details')}>
          View Details
        </button>
        <button className="bg-purple-500 gradient-button text-white px-6 py-2 rounded-xl hover:bg-purple-600 transition duration-300" onClick={() => console.log('Get Certification')}>
          Get Security Certification
        </button>
      </div>
    </div>
  );
};

export default ReportCard;
