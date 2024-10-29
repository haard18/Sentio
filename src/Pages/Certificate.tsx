import { useLocation } from "react-router-dom";
import { ReportItem, ReportStats } from "../Components/ReportCard";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion

export default function Component() {
    const location = useLocation();
    const {
        report,
        reportStats,
    }: { report: ReportItem[]; reportStats: ReportStats } = location.state || {
        report: [],
        reportStats: null,
    };
    const reportRef = useRef<HTMLDivElement | null>(null);
    const generatePDF = () => {
        const input = reportRef.current;
        return new Promise<jsPDF>((resolve, reject) => {
            if (!input) {
                console.error("Report reference is not defined.");
                reject();
                return;
            }
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = 210; // A4 width in mm
            const pdfHeight = 297; // A4 height in mm
            const scale = 2;

            html2canvas(input, {
                scale: scale,
                useCORS: true,
                scrollY: -window.scrollY,
            }).then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const imgWidth = pdfWidth;
                const imgHeight = (canvas.height * pdfWidth) / canvas.width;

                let heightLeft = imgHeight;
                let position = 0;

                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pdfHeight;
                position = heightLeft - imgHeight;

                while (heightLeft > 0) {
                    pdf.addPage();
                    position = heightLeft - imgHeight;
                    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                    heightLeft -= pdfHeight;
                }

                resolve(pdf);
            }).catch(reject);
        });
    };

    const downloadPDF = async () => {
        try {
            const pdf = await generatePDF();
            pdf.save("Sentio-Audit.pdf");
        } catch (error) {
            console.error("Error generating PDF for download:", error);
        }
    };

    return (
        <div className="min-h-screen app-background py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-4 sm:mb-8">
                <Navbar />
            </div>
            <div className="Report">
                <motion.div
                    ref={reportRef}
                    className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 sm:p-8">
                        <div className="flex justify-center mb-4">
                            <img
                                src="../../src/assets/white.jpeg"
                                alt="Audit Logo"
                                className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-md"
                            />
                        </div>
                        <h1 className="text-3xl sm:text-5xl text-center font-extrabold text-white mb-2 tracking-tight">
                            Code Audit Report
                        </h1>
                        <h2 className="text-xl sm:text-2xl text-center font-semibold text-indigo-200">
                            Certificate of Analysis
                        </h2>
                    </div>

                    {/* Summary of Code Audit */}
                    {reportStats && (
                        <div className="p-4 sm:p-8 border-b border-gray-200">
                            <h3 className="text-2xl sm:text-3xl font-bold text-center text-indigo-700 mb-6 sm:mb-8">
                                Summary of Code Audit
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mb-6 sm:mb-8">
                                <div className="text-center p-4 bg-indigo-50 rounded-lg shadow-md">
                                    <p className="text-sm font-medium text-indigo-600 mb-1">
                                        Total Lines of Code
                                    </p>
                                    <p className="text-3xl sm:text-4xl font-bold text-indigo-700">
                                        {reportStats.totalLinesOfCode}
                                    </p>
                                </div>
                                <div className="text-center p-4 bg-red-50 rounded-lg shadow-md">
                                    <p className="text-sm font-medium text-red-600 mb-1">
                                        Vulnerable Lines of Code
                                    </p>
                                    <p className="text-3xl sm:text-4xl font-bold text-red-700">
                                        {reportStats.uniqueVulnerableLines}
                                    </p>
                                </div>
                                <div className="text-center p-4 bg-yellow-50 rounded-lg shadow-md">
                                    <p className="text-sm font-medium text-yellow-600 mb-1">
                                        Vulnerable Code Percentage
                                    </p>
                                    <p className="text-3xl sm:text-4xl font-bold text-yellow-700">
                                        {reportStats.vulnerableCodePercentage}%
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mt-6 sm:mt-8">
                                <div className="bg-red-100 p-4 sm:p-6 rounded-lg shadow-md">
                                    <p className="text-base sm:text-lg font-semibold text-red-700 mb-2">
                                        High Severity
                                    </p>
                                    <p className="text-3xl sm:text-4xl font-bold text-red-800">
                                        {reportStats.highSeverity}
                                    </p>
                                </div>
                                <div className="bg-yellow-100 p-4 sm:p-6 rounded-lg shadow-md">
                                    <p className="text-base sm:text-lg font-semibold text-yellow-700 mb-2">
                                        Medium Severity
                                    </p>
                                    <p className="text-3xl sm:text-4xl font-bold text-yellow-800">
                                        {reportStats.mediumSeverity}
                                    </p>
                                </div>
                                <div className="bg-green-100 p-4 sm:p-6 rounded-lg shadow-md">
                                    <p className="text-base sm:text-lg font-semibold text-green-700 mb-2">
                                        Low Severity
                                    </p>
                                    <p className="text-3xl sm:text-4xl font-bold text-green-800">
                                        {reportStats.lowSeverity}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 sm:mt-12">
                                <h4 className="text-xl sm:text-2xl font-semibold text-indigo-700 mb-4 sm:mb-6">
                                    Threat Checklist
                                </h4>
                                <ul className="space-y-4 bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md">
                                    {reportStats.threatChecklist.map((check, index) => (
                                        <li key={index} className="flex items-center">
                                            {check.exists ? (
                                                <svg
                                                    className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 mr-3"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mr-3"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            )}
                                            <span className="text-gray-800 text-base sm:text-lg">
                                                {check.label}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    <div className="p-4 sm:p-8">
                        <h3 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4 sm:mb-6">
                            Detailed Vulnerability Report
                        </h3>
                        <div className="space-y-6 sm:space-y-8">
                            {report.map((item: ReportItem, index: number) => (
                                <div
                                    key={index}
                                    className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200"
                                >
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                                        <p className="text-lg sm:text-xl font-semibold text-indigo-700 mb-2 sm:mb-0">
                                            {item.name}
                                        </p>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${item.severity === "high"
                                                ? "bg-red-100 text-red-800"
                                                : item.severity === "medium"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-green-100 text-green-800"
                                                }`}
                                        >
                                            {item.severity.charAt(0).toUpperCase() +
                                                item.severity.slice(1)}{" "}
                                            Severity
                                        </span>
                                    </div>
                                    <p className="text-gray-700 text-sm sm:text-base">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-4 sm:p-8 border-t border-gray-200">
                        <h3 className="text-2xl sm:text-3xl font-bold text-center text-indigo-700 mb-4 sm:mb-6">
                            Overall Conclusion
                        </h3>
                        <p className="text-lg sm:text-xl text-center text-gray-800 leading-relaxed">
                            Based on the results of the audit, your code contains{" "}
                            <span className="font-semibold text-indigo-700">
                                {reportStats.highSeverity > 0
                                    ? "critical"
                                    : reportStats.mediumSeverity > 0
                                        ? "moderate"
                                        : "minor"}
                            </span>{" "}
                            vulnerabilities.
                            {reportStats.highSeverity > 0 ? (
                                <>
                                    <br />
                                    <b>
                                        <i>
                                            Please address the high severity issues immediately before
                                            deploying the code to production.
                                        </i>
                                    </b>
                                </>
                            ) : (
                                <>
                                    <br />
                                    <b>
                                        <i>Your code is safe to upload on Arweave.</i>
                                    </b>
                                </>
                            )}
                        </p>
                    </div>
                </motion.div>

                <div className="flex justify-center mt-8 sm:mt-12 space-x-4">
                    <button
                        onClick={downloadPDF}
                        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg sm:text-xl rounded-lg shadow-lg transition-all duration-300"
                    >
                        Download Report
                    </button>
                    <button
                    onClick={() => alert("Upload to Permaweb is currently disabled.")}
                    className="px-8 py-3 bg-white text-black font-semibold text-lg sm:text-xl rounded-lg shadow-lg transition-all duration-300 cursor-not-allowed" 
                    disabled>
                        Push to Permaweb 🔜
                    </button>
                </div>
            </div>
            <div className="mt-8">
                <Footer />
            </div>
        </div>
    );
}