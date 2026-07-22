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

            // Dynamically set the file name for the PDF
            const fileName = `Sentio-Audit-${new Date().toLocaleDateString()}.pdf`.replace(/\//g, '-');
            pdf.save(fileName);
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
    
        // Standalone stylesheet for the export — the app's Tailwind classes
        // are not available in the downloaded file, so mirror the design
        // tokens here by hand.
        const styleTag = document.createElement("style");
        styleTag.innerHTML = `
            body {
                font-family: 'JetBrains Mono', ui-monospace, monospace;
                margin: 0;
                padding: 40px 16px;
                background-color: #0A0A0A;
                color: #EAEAEA;
                font-size: 14px;
                line-height: 1.6;
            }
            .certificate-container {
                background-color: #121212;
                border: 1px solid #262626;
                padding: 40px;
                max-width: 800px;
                margin: 0 auto;
            }
            h1 { font-size: 32px; letter-spacing: -0.02em; margin: 8px 0; }
            h2, h3 { font-size: 14px; font-weight: 600; margin: 0 0 12px; }
            p { color: #8A8A8A; }
            img { height: 56px; width: 56px; }
            dl, ul { margin: 0; padding: 0; list-style: none; }
            dt { color: #8A8A8A; font-size: 11px; text-transform: uppercase; letter-spacing: 0.07em; }
            dd { margin: 0; color: #EAEAEA; }
            section, header, footer { border-bottom: 1px solid #262626; padding: 24px 0; }
            footer { border-bottom: 0; }
            .text-hazard, .text-hazard2 { color: #FF2A2A; }
            .text-signal { color: #4AF626; }
            .text-faint { color: #5A5A5A; }
            .tag { border: 1px solid #3D3D3D; padding: 2px 6px; font-size: 11px; text-transform: uppercase; }
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
            <body bgcolor="#0A0A0A">
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
    
    
    const severityTone = (severity: string) =>
        severity?.toLowerCase() === "high"
            ? "border-hazard text-hazard2"
            : severity?.toLowerCase() === "medium"
                ? "border-rule2 text-phosphor"
                : "border-rule text-dim";

    const hasStats = reportStats && Object.keys(reportStats).length > 0;
    const vulns: ReportItem[] = report.vulnerabilities ?? [];

    return (
        <div className="flex min-h-screen flex-col bg-void text-phosphor">
            <Navbar />

            <main className="shell mt-14 flex-1 py-12">
                {/* The certificate itself — this node is what html2canvas
                    rasterises, so everything inside must be self-contained. */}
                <article
                    ref={certificateRef}
                    className="mx-auto w-full max-w-3xl border border-rule bg-steel"
                >
                    <header className="border-b border-rule p-8 sm:p-10">
                        <div className="flex items-start justify-between gap-6">
                            <div>
                                <p className="t-meta text-hazard">Certificate</p>
                                <h1 className="t-display-lg mt-2">Certificate of analysis</h1>
                                <p className="t-body mt-3">
                                    Issued for code security assessment by Sentio.
                                </p>
                            </div>
                            <img src={sentiologo} alt="" className="h-14 w-14 shrink-0" />
                        </div>

                        <dl className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                            <div className="flex justify-between border-b border-rule pb-2">
                                <dt className="t-meta">Issued</dt>
                                <dd className="t-label">{new Date().toLocaleDateString()}</dd>
                            </div>
                            <div className="flex justify-between border-b border-rule pb-2">
                                <dt className="t-meta">Issuer</dt>
                                <dd className="t-label">Sentio</dd>
                            </div>
                        </dl>
                    </header>

                    {hasStats ? (
                        <>
                            <section className="border-b border-rule p-8 sm:p-10">
                                <h2 className="t-label text-phosphor">Report summary</h2>
                                <dl className="mt-5 grid gap-px border border-rule bg-rule sm:grid-cols-3">
                                    {[
                                        { label: "Total lines", value: reportStats?.totalLinesOfCode ?? "N/A" },
                                        { label: "Vulnerable lines", value: reportStats?.uniqueVulnerableLines ?? "N/A" },
                                        { label: "Vulnerable %", value: `${reportStats?.vulnerableCodePercentage || 0}%` },
                                    ].map((stat) => (
                                        <div key={stat.label} className="bg-void p-5">
                                            <dt className="t-meta">{stat.label}</dt>
                                            <dd className="t-display mt-2 text-3xl tabular-nums">
                                                {stat.value}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </section>

                            {reportStats.threatChecklist?.length > 0 && (
                                <section className="border-b border-rule p-8 sm:p-10">
                                    <h2 className="t-label text-phosphor">Threat checklist</h2>
                                    <dl className="mt-4">
                                        {reportStats.threatChecklist.map(
                                            (item: { exists: boolean; label: string }, index: number) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between gap-4 border-b border-rule py-2.5 last:border-0"
                                                >
                                                    <dt className="t-label text-dim">{item.label}</dt>
                                                    <dd
                                                        className={`t-meta shrink-0 ${
                                                            item.exists ? "text-hazard2" : "text-signal"
                                                        }`}
                                                    >
                                                        {item.exists ? "Detected" : "Clear"}
                                                    </dd>
                                                </div>
                                            )
                                        )}
                                    </dl>
                                </section>
                            )}
                        </>
                    ) : (
                        <p className="t-body p-8 sm:p-10">No report data available.</p>
                    )}

                    <section className="border-b border-rule p-8 sm:p-10">
                        <h2 className="t-label text-phosphor">Findings</h2>
                        {vulns.length > 0 ? (
                            <ul className="mt-4">
                                {vulns.map((vulnerability: ReportItem, index: number) => (
                                    <li key={index} className="border-b border-rule py-4 last:border-0">
                                        <div className="flex flex-wrap items-baseline justify-between gap-3">
                                            <h3 className="t-label text-phosphor">{vulnerability.name}</h3>
                                            <div className="flex items-center gap-3">
                                                <span className={`tag ${severityTone(vulnerability.severity)}`}>
                                                    {vulnerability.severity}
                                                </span>
                                                <span className="t-meta tabular-nums">L{vulnerability.line}</span>
                                            </div>
                                        </div>
                                        <p className="mt-2 font-mono text-xs leading-relaxed text-dim">
                                            {vulnerability.description}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="t-body mt-3">
                                No vulnerabilities to display. This source passed cleanly.
                            </p>
                        )}
                    </section>

                    <footer className="flex flex-col gap-1 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
                        <p className="t-meta">Certified by the Sentio security team</p>
                        <p className="t-meta text-faint">© {new Date().getFullYear()} Sentio</p>
                    </footer>
                </article>

                <div className="mx-auto mt-6 flex w-full max-w-3xl flex-col gap-3 sm:flex-row">
                    <button onClick={downloadPDF} className="btn btn-accent flex-1">
                        Download PDF
                    </button>
                    <button onClick={generateHTML} className="btn flex-1">
                        Export HTML
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Certificate;

