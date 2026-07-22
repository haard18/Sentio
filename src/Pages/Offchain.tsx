/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import CodeEditor from "../Components/TextEditor";
import ReportCard, { Report } from "../Components/ReportCard";
import axios from 'axios';
import qs from 'qs';
import { motion } from 'framer-motion';
import Footer from "../Components/Footer";
import TransactionGif from "../assets/Transactiogif2.gif";
import { handleTokenTransfer } from "../lib/tokenServices";

interface Repository {
  id: number;
  name: string;
  full_name: string;
}

const Offchain = () => {
  const [showGif, setShowGif] = useState(false);
  const [code, setCode] = useState('');
  const [report, setReport] = useState<null | Report>(null);
  const [showProgress, setShowProgress] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [progress, setProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [selectedRepo, setSelectedRepo] = useState('');
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [importError, setImportError] = useState('');
  const textVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] },
    },
  };

  const handleCodeChange = (newValue: string) => {
    setCode(newValue);
  };

  const handleAnalyze = async () => {
    setShowGif(true);
    try {
      await handleTokenTransfer(window.arweaveWallet, 1); // Example amount and wallet, adjust as needed
      setShowGif(false);
    } catch (error) {
      console.error("Analysis canceled due to token transfer failure", error);
      setShowGif(false);
      return;
    }

    setShowProgress(true);
    setProgress(25);
    setProgressText('Creating AST for code');
    await new Promise(resolve => setTimeout(resolve, 750));

    setProgress(50);
    setProgressText('Analyzing');
    await new Promise(resolve => setTimeout(resolve, 750));

    setProgress(75);
    setProgressText('Finding vulnerabilities');
    await new Promise(resolve => setTimeout(resolve, 750));

    setProgress(100);
    setProgressText('Checking leaks');
    await new Promise(resolve => setTimeout(resolve, 750));

    try {
      const response = await axios.post('https://sam-offchain-dbedazdhd2dugrdk.eastus-01.azurewebsites.net/analyze',
        qs.stringify({ code }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      setReport(response.data);
    } catch (error) {
      console.error('Error analyzing code:', error);
    } finally {
      setShowGif(false);
      setShowProgress(false);
      setProgress(0);
    }
  };

  const handleGoBack = () => {
    setReport(null);
  };

  const handleGitHubImport = () => {
    const accessToken = localStorage.getItem('github_access_token');
    if (!accessToken) {
      window.location.href = `https://github.com/login/oauth/authorize?client_id=Ov23lirX5C66dCtCAcm3&scope=repo`;
    } else {
      fetchUserRepos(accessToken);
      setIsModalOpen(true);
    }
  };

  const handleImportSubmit = async () => {
    if (!selectedFile) {
      setImportError('Please select a file to import.');
      return;
    }

    if (!/\.(lua|luanb)$/.test(selectedFile)) {
      setImportError('Selected file must be a .lua or .luanb file.');
      return;
    }

    setShowProgress(true);
    setProgress(25);
    setProgressText('Fetching file content');
    setImportError('');

    try {
      const accessToken = localStorage.getItem('github_access_token');

      if (!accessToken) {
        setImportError('Authentication required.');
        return;
      }

      setProgress(50);
      const response = await axios.get(`https://api.github.com/repos/${selectedRepo}/contents/${selectedFile}`, {
        headers: {
          Authorization: `token ${accessToken}`,
          Accept: 'application/vnd.github.v3.raw',
        },
      });
      const content = response.data;
      setProgress(100);
      setProgressText('Loading file content');
      
      // Prepend the file name to the code content
      const updatedCode = `// File: ${selectedFile}\n\n${content}`;
      setCode(updatedCode);
      setIsModalOpen(false);
      setSelectedRepo('');
      setSelectedFile('');
    } catch (error) {
      console.error('Error importing file:', error);
      if (axios.isAxiosError(error)) {
        setImportError(error.response?.data?.message || 'Failed to import file');
      } else {
        setImportError('Failed to import file');
      }
    } finally {
      setShowProgress(false);
      setProgress(0);
    }
  };

  const fetchUserRepos = async (accessToken: string) => {
    try {
      const response = await axios.get('https://api.github.com/user/repos', {
        headers: {
          Authorization: `token ${accessToken}`,
        },
        params: {
          per_page: 100
        }
      });
      setRepositories(response.data);
    } catch (error) {
      console.error('Error fetching repositories:', error);
    }
  };

  const fetchRepoFiles = async (repo: string) => {
    try {
      const response = await axios.get(`https://api.github.com/repos/${repo}/contents`, {
        headers: {
          Authorization: `token ${localStorage.getItem('github_access_token')}`,
        },
      });
      const luaFiles = response.data
        .filter((file: any) => /\.(lua|luanb)$/.test(file.name))
        .map((file: any) => file.path);
      setFiles(luaFiles);
    } catch (error) {
      console.error('Error fetching repo files:', error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      const fetchAccessToken = async () => {
        try {
          const authResponse = await axios.post('https://sam-server.azurewebsites.net/api/github/exchange-code', { code });
          const token = authResponse.data.access_token;

          localStorage.setItem('github_access_token', token);
          await fetchUserRepos(token);
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (error) {
          console.error('Error exchanging code for access token:', error);
        }
      };

      fetchAccessToken();
    } else {
      const accessToken = localStorage.getItem('github_access_token');
      if (accessToken) {
        fetchUserRepos(accessToken);
      }
    }
  }, []);

  const STAGES = ['Creating AST', 'Analyzing', 'Finding vulnerabilities', 'Checking leaks'];

  return (
    <div className="flex min-h-screen flex-col bg-void text-phosphor">
      <Navbar />

      <header className="mt-14 border-b border-rule">
        <motion.div
          className="shell flex flex-col gap-6 py-12 lg:flex-row lg:items-end lg:justify-between"
          initial="hidden"
          animate="visible"
          variants={textVariant}
        >
          <div>
            <span className="t-meta text-hazard">Audit / Pre-Deploy</span>
            <h1 className="t-display-lg mt-3">
              Code audit
            </h1>
          </div>
          <p className="t-body lg:text-right">
            Static analysis of Lua source before it reaches the network. Be sure your code
            is free of vulnerabilities{" "}
            <span className="text-hazard2">before deployment.</span>
          </p>
        </motion.div>
      </header>

      <main className="shell flex-1 py-10">
        {showProgress && !report ? (
          <div className="panel mx-auto max-w-2xl">
            <div className="panel-head">
              <div className="flex items-center gap-2">
                <span className="led" aria-hidden />
                <span className="t-label">Analysis running</span>
              </div>
              <span className="t-display text-xl tabular-nums">{progress}%</span>
            </div>

            <div className="p-5">
              {/* Stepped progress — 40 discrete cells, no smooth fill. */}
              <div className="flex gap-[2px]">
                {Array.from({ length: 40 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-5 flex-1 transition-colors duration-150 ${
                      i < Math.round((progress / 100) * 40) ? 'bg-hazard' : 'bg-rule'
                    }`}
                  />
                ))}
              </div>

              <ol className="mt-6 border-t border-rule">
                {STAGES.map((stage, i) => {
                  const done = progress > (i + 1) * 25 - 1;
                  const active = stage === progressText;
                  return (
                    <li
                      key={stage}
                      className="flex items-center gap-3 border-b border-rule py-2"
                    >
                      <span className={`t-meta ${done ? 'text-signal' : 'text-faint'}`}>
                        {done ? '●' : active ? '◐' : '○'}
                      </span>
                      <span
                        className={`t-label ${active ? 'text-phosphor' : 'text-dim'}`}
                      >
                        {stage}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        ) : !report ? (
          <div className="mx-auto w-full max-w-5xl">
            <CodeEditor
              value={code}
              onChange={handleCodeChange}
              onAnalyze={handleAnalyze}
            />

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                className="btn btn-sm btn-ghost"
                onClick={handleGitHubImport}
                disabled={code.trim() !== ""}
                title={code.trim() !== "" ? "Clear the editor to import" : undefined}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.6c.4.08.55-.17.55-.38v-1.34c-2.23.48-2.69-1.07-2.69-1.07-.36-.91-.88-1.15-.88-1.15-.72-.49.05-.48.05-.48.8.06 1.22.82 1.22.82.71 1.22 1.87.87 2.33.66.07-.51.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.97 0-.88.31-1.6.82-2.16-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.52-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.16 0 3.09-1.87 3.76-3.65 3.96.29.25.54.74.54 1.5v2.22c0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                Import from GitHub
              </button>
              <span className="t-meta text-faint">Accepts .lua / .luanb</span>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <ReportCard report={report} onGoBack={handleGoBack} />
          </motion.div>
        )}

        {showGif && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 p-4">
            <div className="panel max-w-lg">
              <div className="panel-head">
                <div className="flex items-center gap-2">
                  <span className="led" aria-hidden />
                  <span className="t-label">Transfer in progress</span>
                </div>
              </div>
              <img src={TransactionGif} alt="" className="w-full" />
            </div>
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 p-4">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="panel w-full max-w-md"
            >
              <div className="panel-head">
                <span className="t-label">Import from GitHub</span>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="t-label text-dim hover:text-hazard2"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4 p-5">
                <label className="block">
                  <span className="t-meta">01 / Repository</span>
                  <select
                    className="field mt-2"
                    value={selectedRepo}
                    onChange={(e) => {
                      setSelectedRepo(e.target.value);
                      fetchRepoFiles(e.target.value);
                    }}
                  >
                    <option value="">Select a repository</option>
                    {repositories.map((repo) => (
                      <option key={repo.id} value={repo.full_name}>
                        {repo.name}
                      </option>
                    ))}
                  </select>
                </label>

                {selectedRepo && (
                  <label className="block">
                    <span className="t-meta">02 / File</span>
                    <select
                      className="field mt-2"
                      value={selectedFile}
                      onChange={(e) => setSelectedFile(e.target.value)}
                    >
                      <option value="">Select a file</option>
                      {files.map((file) => (
                        <option key={file} value={file}>
                          {file}
                        </option>
                      ))}
                    </select>
                  </label>
                )}

                {importError && (
                  <p className="border border-hazard px-3 py-2 t-label text-hazard2">
                    {importError}
                  </p>
                )}

                <div className="flex gap-3 pt-1">
                  <button className="btn btn-ghost flex-1" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>
                  <button className="btn btn-accent flex-1" onClick={handleImportSubmit}>
                    Import
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Offchain;
