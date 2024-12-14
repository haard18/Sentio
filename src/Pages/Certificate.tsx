// import { useLocation } from "react-router-dom";
// import { ReportStats, ReportItem } from "../Components/ReportCard";
// import Navbar from "../Components/Navbar";
// import Footer from "../Components/Footer";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import { useRef } from "react";
// import { motion } from "framer-motion"; // Import motion from framer-motion
// import sentiologo from "../assets/white.jpeg"
// export default function Component() {
//     const location = useLocation();
//     const {
//         report,
//         reportStats,
//     }: { report: ReportItem[]; reportStats: ReportStats } = location.state || {
//         report: [],
//         reportStats: null,
//     };
//     const reportRef = useRef<HTMLDivElement | null>(null);
//     const generatePDF = () => {
//         const input = reportRef.current;
//         return new Promise<jsPDF>((resolve, reject) => {
//             if (!input) {
//                 console.error("Report reference is not defined.");
//                 reject();
//                 return;
//             }
//             const pdf = new jsPDF("p", "mm", "a4");
//             const pdfWidth = 210; // A4 width in mm
//             const pdfHeight = 297; // A4 height in mm
//             const scale = 2;

//             html2canvas(input, {
//                 scale: scale,
//                 useCORS: true,
//                 scrollY: -window.scrollY,
//             }).then((canvas) => {
//                 const imgData = canvas.toDataURL("image/png");
//                 const imgWidth = pdfWidth;
//                 const imgHeight = (canvas.height * pdfWidth) / canvas.width;

//                 let heightLeft = imgHeight;
//                 let position = 0;

//                 pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//                 heightLeft -= pdfHeight;
//                 position = heightLeft - imgHeight;

//                 while (heightLeft > 0) {
//                     pdf.addPage();
//                     position = heightLeft - imgHeight;
//                     pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//                     heightLeft -= pdfHeight;
//                 }

//                 resolve(pdf);
//             }).catch(reject);
//         });
//     };

//     const downloadPDF = async () => {
//         try {
//             const pdf = await generatePDF();
//             pdf.save("Sentio-Audit.pdf");
//         } catch (error) {
//             console.error("Error generating PDF for download:", error);
//         }
//     };

//     return (
//         <div className="min-h-screen app-background py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-center mb-4 sm:mb-8">
//                 <Navbar />
//             </div>
//             <div className="Report">
//                 <motion.div
//                     ref={reportRef}
//                     className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden"
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                 >
//                     <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 sm:p-8">
//                         <div className="flex justify-center mb-4">
//                             <img
//                                 src={sentiologo}
//                                 alt="Audit Logo"
//                                 className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-md"
//                             />
//                         </div>
//                         <h1 className="text-3xl sm:text-5xl text-center font-extrabold text-white mb-2 tracking-tight">
//                             Code Audit Report
//                         </h1>
//                         <h2 className="text-xl sm:text-2xl text-center font-semibold text-indigo-200">
//                             Certificate of Analysis
//                         </h2>
//                     </div>

//                     {/* Summary of Code Audit */}
//                     {reportStats && (
//                         <div className="p-4 sm:p-8 border-b border-gray-200">
//                             <h3 className="text-2xl sm:text-3xl font-bold text-center text-indigo-700 mb-6 sm:mb-8">
//                                 Summary of Code Audit
//                             </h3>
//                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mb-6 sm:mb-8">
//                                 <div className="text-center p-4 bg-indigo-50 rounded-lg shadow-md">
//                                     <p className="text-sm font-medium text-indigo-600 mb-1">
//                                         Total Lines of Code
//                                     </p>
//                                     <p className="text-3xl sm:text-4xl font-bold text-indigo-700">
//                                         {reportStats.totalLinesOfCode}
//                                     </p>
//                                 </div>
//                                 <div className="text-center p-4 bg-red-50 rounded-lg shadow-md">
//                                     <p className="text-sm font-medium text-red-600 mb-1">
//                                         Vulnerable Lines of Code
//                                     </p>
//                                     <p className="text-3xl sm:text-4xl font-bold text-red-700">
//                                         {reportStats.uniqueVulnerableLines}
//                                     </p>
//                                 </div>
//                                 <div className="text-center p-4 bg-yellow-50 rounded-lg shadow-md">
//                                     <p className="text-sm font-medium text-yellow-600 mb-1">
//                                         Vulnerable Code Percentage
//                                     </p>
//                                     <p className="text-3xl sm:text-4xl font-bold text-yellow-700">
//                                         {reportStats.vulnerableCodePercentage}%
//                                     </p>
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mt-6 sm:mt-8">
//                                 <div className="bg-red-100 p-4 sm:p-6 rounded-lg shadow-md">
//                                     <p className="text-base sm:text-lg font-semibold text-red-700 mb-2">
//                                         High Severity
//                                     </p>
//                                     <p className="text-3xl sm:text-4xl font-bold text-red-800">
//                                         {reportStats.highSeverity}
//                                     </p>
//                                 </div>
//                                 <div className="bg-yellow-100 p-4 sm:p-6 rounded-lg shadow-md">
//                                     <p className="text-base sm:text-lg font-semibold text-yellow-700 mb-2">
//                                         Medium Severity
//                                     </p>
//                                     <p className="text-3xl sm:text-4xl font-bold text-yellow-800">
//                                         {reportStats.mediumSeverity}
//                                     </p>
//                                 </div>
//                                 <div className="bg-green-100 p-4 sm:p-6 rounded-lg shadow-md">
//                                     <p className="text-base sm:text-lg font-semibold text-green-700 mb-2">
//                                         Low Severity
//                                     </p>
//                                     <p className="text-3xl sm:text-4xl font-bold text-green-800">
//                                         {reportStats.lowSeverity}
//                                     </p>
//                                 </div>
//                             </div>

//                             <div className="mt-8 sm:mt-12">
//                                 <h4 className="text-xl sm:text-2xl font-semibold text-indigo-700 mb-4 sm:mb-6">
//                                     Threat Checklist
//                                 </h4>
//                                 <ul className="space-y-4 bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md">
//                                     {reportStats.threatChecklist.map((check, index) => (
//                                         <li key={index} className="flex items-center">
//                                             {check.exists ? (
//                                                 <svg
//                                                     className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 mr-3"
//                                                     fill="currentColor"
//                                                     viewBox="0 0 20 20"
//                                                 >
//                                                     <path
//                                                         fillRule="evenodd"
//                                                         d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                                                         clipRule="evenodd"
//                                                     />
//                                                 </svg>
//                                             ) : (
//                                                 <svg
//                                                     className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mr-3"
//                                                     fill="currentColor"
//                                                     viewBox="0 0 20 20"
//                                                 >
//                                                     <path
//                                                         fillRule="evenodd"
//                                                         d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                                                         clipRule="evenodd"
//                                                     />
//                                                 </svg>
//                                             )}
//                                             <span className="text-gray-800 text-base sm:text-lg">
//                                                 {check.label}
//                                             </span>
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </div>
//                     )}

//                     <div className="p-4 sm:p-8">
//                         <h3 className="text-xl sm:text-2xl font-bold text-indigo-700 mb-4 sm:mb-6">
//                             Detailed Vulnerability Report
//                         </h3>
//                         <div className="space-y-6 sm:space-y-8">
//                             {report.map((item: ReportItem, index: number) => (
//                                 <div
//                                     key={index}
//                                     className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200"
//                                 >
//                                     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
//                                         <p className="text-lg sm:text-xl font-semibold text-indigo-700 mb-2 sm:mb-0">
//                                             {item.name}
//                                         </p>
//                                         <span
//                                             className={`px-3 py-1 rounded-full text-sm font-medium ${item.severity === "high"
//                                                 ? "bg-red-100 text-red-800"
//                                                 : item.severity === "medium"
//                                                     ? "bg-yellow-100 text-yellow-800"
//                                                     : "bg-green-100 text-green-800"
//                                                 }`}
//                                         >
//                                             {item.severity.charAt(0).toUpperCase() +
//                                                 item.severity.slice(1)}{" "}
//                                             Severity
//                                         </span>
//                                     </div>
//                                     <p className="text-gray-700 text-sm sm:text-base">
//                                         {item.description}
//                                     </p>
//                                     <p>
//                                        The vulnerability is found in Line {item.line} 
//                                     </p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-4 sm:p-8 border-t border-gray-200">
//                         <h3 className="text-2xl sm:text-3xl font-bold text-center text-indigo-700 mb-4 sm:mb-6">
//                             Overall Conclusion
//                         </h3>
//                         <p className="text-lg sm:text-xl text-center text-gray-800 leading-relaxed">
//                             Based on the results of the audit, your code contains{" "}
//                             <span className="font-semibold text-indigo-700">
//                                 {reportStats.highSeverity > 0
//                                     ? "critical"
//                                     : reportStats.mediumSeverity > 0
//                                         ? "moderate"
//                                         : "minor"}
//                             </span>{" "}
//                             vulnerabilities.
//                             {reportStats.highSeverity > 0 ? (
//                                 <>
//                                     <br />
//                                     <b>
//                                         <i>
//                                             Please address the high severity issues immediately before
//                                             deploying the code to production.
//                                         </i>
//                                     </b>
//                                 </>
//                             ) : (
//                                 <>
//                                     <br />
//                                     <b>
//                                         <i>Your code is safe to upload on Arweave.</i>
//                                     </b>
//                                 </>
//                             )}
//                         </p>
//                     </div>
//                 </motion.div>

//                 <div className="flex justify-center mt-8 sm:mt-12 space-x-4">
//                     <button
//                         onClick={downloadPDF}
//                         className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg sm:text-xl rounded-xl shadow-lg transition-all duration-300"
//                     >
//                         Download Report
//                     </button>
//                     <button
//                     onClick={() => alert("Upload to Permaweb is currently disabled.")}
//                     className="px-8 py-3 bg-white text-black font-semibold text-lg sm:text-xl rounded-xl shadow-lg transition-all duration-300 cursor-not-allowed" 
//                     disabled>
//                         Push to Permaweb 🔜
//                     </button>
//                 </div>
//             </div>
//             <div className="mt-8">
//                 <Footer />
//             </div>
//         </div>
//     );
// }
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import sentiologo from "../assets/roundfinal.png";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { ReportItem } from "./Details";

const Certificate = () => {
    const location = useLocation();
    const { report = { vulnerabilities: [] }, reportStats = {} } = location.state || {}; // Provide safe fallbacks
    const certificateRef = useRef<HTMLDivElement | null>(null);

    const generatePDF = () => {
        const input = certificateRef.current;
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

    const generateHTML = () => {
        const input = certificateRef.current;
        if (!input) {
            console.error("Report reference is not defined.");
            return;
        }
    
        // Extract inner HTML of the certificate
        const htmlContent = input.innerHTML;
    
        // Create a style tag for the CSS to be embedded in the HTML
        const styleTag = document.createElement("style");
        styleTag.innerHTML = `
            body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f7fafc; /* Light background color */
            }
            .certificate-container {
                background-color: #ffffff; /* White background for the certificate */
                padding: 32px;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                max-width: 800px;
                margin: 0 auto;
                border: 1px solid #e5e7eb; /* Light gray border */
            }
            .text-center {
                text-align: center;
            }
            .font-semibold {
                font-weight: 600;
            }
            .text-gray-800 {
                color: #2d3748; /* Dark gray for main text */
            }
            .text-gray-500 {
                color: #6b7280; /* Medium gray for secondary text */
            }
            .text-gray-400 {
                color: #cbd5e0; /* Light gray for less emphasized text */
            }
            .bg-blue-50 {
                background-color: #eff6ff; /* Light blue for background */
            }
            .text-blue-600 {
                color: #3182ce; /* Medium blue for text */
            }
            .text-blue-900 {
                color: #1a365d; /* Dark blue for emphasized text */
            }
            .bg-green-50 {
                background-color: #f0fdf4; /* Light green for background */
            }
            .text-green-600 {
                color: #48bb78; /* Green color for success */
            }
            .text-red-600 {
                color: #e53e3e; /* Red color for errors or alerts */
            }
            .text-yellow-600 {
                color: #d69e2e; /* Yellow color for medium severity */
            }
            .gradient-button {
                background-image: linear-gradient(90deg, #4f46e5, #3b82f6); /* Gradient background */
                color: white;
            }
            /* Other custom styles can be added here */
        `;
    
        // Create a full HTML structure with styles and content
        const fullHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Certificate of Analysis</title>
                <style>
                    ${styleTag.innerHTML}
                </style>
            </head>
            <body bgcolor="#f7fafc">
                <div class="certificate-container">
                    ${htmlContent}
                </div>
            </body>
            </html>
        `;
    
        // Create a Blob from the HTML content
        const htmlBlob = new Blob([fullHTML], { type: "text/html" });
    
        // Create an object URL for the Blob and trigger the download
        const url = URL.createObjectURL(htmlBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Sentio-Audit.html";  // Name of the downloaded HTML file
        a.click();
    
        // Revoke the object URL after use
        URL.revokeObjectURL(url);
    };
    
    
    return (
        <div className="app-background">
            <div className="flex flex-col items-center justify-center min-h-screen app-background">
                <div className="w-full mb-10 pb-8">
                    <Navbar />
                </div>

                <div ref={certificateRef} className="bg-white p-8 sm:p-10 md:p-12 rounded-lg shadow-lg max-w-3xl w-full mt-10 mx-auto border border-gray-200">
                    <div className="text-center mb-8">
                        <img src={sentiologo} alt="Sentio Logo" className="w-20 sm:w-24 mx-auto mb-4" />
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">Certificate of Analysis</h1>
                        <p className="text-lg text-gray-500">Awarded for Code Security Assessment</p>
                        <p className="mt-3 text-xs text-gray-400">Issued Date: {new Date().toLocaleDateString()}</p>
                    </div>

                    {reportStats && Object.keys(reportStats).length > 0 ? (
                        <>
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Report Summary</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                                    {[{ label: "Total Lines of Code", value: reportStats?.totalLinesOfCode || "N/A" },
                                    { label: "Unique Vulnerable Lines", value: reportStats?.uniqueVulnerableLines || "N/A" },
                                    { label: "Vulnerable Code %", value: `${reportStats?.vulnerableCodePercentage || 0}%` }]
                                        .map((stat, index) => (
                                            <div key={index} className="bg-blue-50 p-4 rounded-lg shadow-md">
                                                <p className="text-sm font-semibold text-blue-600">{stat.label}</p>
                                                <p className="text-lg font-semibold text-blue-900">{stat.value}</p>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            {reportStats.threatChecklist && reportStats.threatChecklist.length > 0 ? (
                                <div className="mt-6 border-t pt-6">
                                    <h3 className="text-xl font-semibold text-gray-700 mb-3">Threat Checklist</h3>
                                    <ul className="list-disc ml-6 mt-2 text-gray-600">
                                        {reportStats.threatChecklist.map((item: { exists: boolean; label: string }, index: number) => (
                                            <li key={index} className={item.exists ? "text-red-600 font-semibold" : "text-gray-500"}>
                                                {item.label}: {item.exists ? "Yes" : "No"}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div className="mt-6 border-t pt-6 text-center text-green-600 font-semibold">
                                    No vulnerabilities found! 🎉 Your code is secure.
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center font-bold text-gray-600">No report data available.</div>
                    )}

                    {report.vulnerabilities && report.vulnerabilities.length > 0 ? (
                        <div className="mt-8 border-t pt-6">
                            <h3 className="text-xl font-semibold text-gray-700 mb-3">Report Details</h3>
                            <ul className="space-y-3 text-gray-700">
                                {report.vulnerabilities.map((vulnerability: ReportItem, index: number) => (
                                    <li key={index} className="border-b border-gray-200 pb-3">
                                        <p className="font-semibold text-gray-800">{vulnerability.name}</p>
                                        <p className="text-sm text-gray-600">Description: {vulnerability.description}</p>
                                        <p className="text-sm text-gray-500">
                                            Severity:{" "}
                                            <span className={`font-semibold ${vulnerability.severity === "high" ? "text-red-600" : vulnerability.severity === "medium" ? "text-yellow-600" : "text-green-600"}`}>
                                                {vulnerability.severity}
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-500">Line: {vulnerability.line}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="mt-6 text-center text-green-600 font-semibold">
                            No vulnerabilities to display. Excellent work!
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">Certified by Sentio Security Team</p>
                        <p className="text-xs text-gray-400">SENTIO Inc. © {new Date().getFullYear()}</p>
                    </div>
                </div>

                <div className="flex justify-center space-x-4 mt-8 my-7">
                    <button
                        onClick={downloadPDF}
                        className="px-6 py-2 gradient-button text-white rounded-lg shadow-lg duration-200 flex items-center transform hover:scale-105 hover:translate-y-1"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="white"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V3zm7 1a1 1 0 00-1 1v5H7a1 1 0 000 2h2v2a1 1 0 002 0v-2h2a1 1 0 000-2h-2V5a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Download PDF
                    </button>

                    <button
                        onClick={generateHTML}
                        className="px-6 py-2 gradient-button text-white rounded-lg shadow-lg duration-200 flex items-center transform hover:scale-105 hover:translate-y-1"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="white"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 9.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 011.414-1.414L10 8.586l2.293-2.293a1 1 0 011.414 1.414L11.414 10l2.293 2.293z"
                                clipRule="evenodd"
                            />
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9a1 1 0 112 0v2a1 1 0 11-2 0V9z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Export HTML
                    </button>
                </div>

            </div>
            <section>
                <Footer />
            </section>
        </div>
    );
};

export default Certificate;
