import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";

const Webhook: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [repos, setRepos] = useState<string[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("github_token")
  );

  const client_id = "Ov23li6B22aE7pvYNv3L";
  const backend_url = "http://localhost:3001"; // Replace with your backend URL

  const handleGitHubAuth = () => {
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo`;
    window.location.href = authUrl;
  };

  const exchangeCodeForToken = async (code: string) => {
    try {
      const { data } = await axios.post(`${backend_url}/getAccessToken`, {
        code,
      });
      const token = data.access_token;
      localStorage.setItem("github_token", token);
      setAccessToken(token);
    } catch {
      setMessage("Failed to exchange code for access token.");
    }
  };



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedRepo || !userName || !accessToken) {
      setMessage("Please select a repository and ensure you're authenticated.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`${backend_url}/setWebhook`, {
        userName,
        repoName: selectedRepo,
        github_access_token: accessToken, // Send github_access_token
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error); // Log error for debugging
      setMessage("Failed to set webhook.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code && !accessToken) {
      exchangeCodeForToken(code);
      window.history.replaceState({}, document.title, "/webhook");
    }
  }, [accessToken]);

  useEffect(() => {
    const fetchUserAndRepos = async () => {
      if (!accessToken) return;
  
      setLoading(true);
      try {
        const { data: user } = await axios.get("https://api.github.com/user", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUserName(user.login);
  
        const { data: reposData } = await axios.get("https://api.github.com/user/repos", {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: {
            per_page: 100
          }
        });
  
        setRepos(reposData.map((repo: { name: string }) => repo.name));
      } catch {
        setMessage("Failed to fetch user data or repositories.");
      } finally {
        setLoading(false);
      }
    };
    if (accessToken) {
      fetchUserAndRepos();
    }
  }, [accessToken]);

  return (
    <div className="h-screen flex app-background flex-col  text-white">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Set GitHub Webhook</h2>
          {!accessToken && (
            <button
              onClick={handleGitHubAuth}
              className="bg-green-600 hover:bg-green-500 text-white p-3 rounded mb-4"
            >
              Authenticate with GitHub
            </button>
          )}
          {accessToken && (
            <>
              {repos.length > 0 ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    type="text"
                    value={userName}
                    readOnly
                    className="p-3 bg-gray-700 rounded"
                  />
                  <select
                    value={selectedRepo}
                    onChange={(e) => setSelectedRepo(e.target.value)}
                    className="p-3 bg-gray-700 rounded"
                    required
                  >
                    <option value="" disabled>
                      Select a Repository
                    </option>
                    {repos.map((repo) => (
                      <option key={repo} value={repo}>
                        {repo}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Set Webhook"}
                  </button>
                </form>
              ) : (
                <p>Loading repositories...</p>
              )}
            </>
          )}
          {message && <p className="mt-4">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Webhook;