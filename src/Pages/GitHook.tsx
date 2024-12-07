import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";

const Webhook: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [repos, setRepos] = useState<string[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>(""); // Updated state variable name
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("github_access_token")
  );

  const client_id = "Ov23li6B22aE7pvYNv3L";
  const backend_url = "http://localhost:3001";

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
      localStorage.setItem("github_access_token", token);
      setAccessToken(token);
    } catch {
      setMessage("Failed to exchange code for access token.");
    }
  };

  const handleSetWebhook = async () => {
    if (!selectedRepo || !userName || !accessToken || !userEmail) { // Updated to userEmail
      setMessage("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const webhookResponse = await axios.post(`${backend_url}/setWebhook`, {
        userName,
        repoName: selectedRepo,
        userEmail, // Pass userEmail here
        github_access_token: accessToken,
      });

      setMessage(webhookResponse.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Failed to set up webhook.");
    } finally {
      setLoading(false);
    }
  };

  const handleTriggerWebhook = async () => {
    if (!selectedRepo || !userName || !accessToken || !userEmail) { // Updated to userEmail
      setMessage("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const webhookTriggerResponse = await axios.post(`${backend_url}/webhook`, {
        userName,
        repoName: selectedRepo,
        userEmail, // Pass userEmail here as well
        github_access_token: accessToken,
      });

      setMessage(webhookTriggerResponse.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Failed to trigger webhook.");
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

        const { data: reposData } = await axios.get(
          "https://api.github.com/user/repos",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            params: {
              per_page: 100,
            },
          }
        );
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
    <div className="h-screen flex app-background flex-col text-white">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Set GitHub Webhook</h2>
          {!accessToken ? (
            <button
              onClick={handleGitHubAuth}
              className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded mb-4"
            >
              Authenticate with GitHub
            </button>
          ) : (
            <>
              {repos.length > 0 ? (
                <div className="flex flex-col gap-4">
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
                  <input
                    type="email"
                    value={userEmail} // Updated to userEmail
                    onChange={(e) => setUserEmail(e.target.value)} // Updated to setUserEmail
                    className="p-3 bg-gray-700 rounded"
                    placeholder="Enter your email"
                    required
                  />
                  <button
                    onClick={handleSetWebhook}
                    className="bg-purple-500 hover:bg-purple-700 text-white p-3 rounded"
                    disabled={loading}
                  >
                    {loading ? "Setting Webhook..." : "Set Webhook"}
                  </button>
                  <button
                    onClick={handleTriggerWebhook}
                    className="bg-blue-500 hover:bg-blue-700 text-white p-3 rounded mt-4"
                    disabled={loading}
                  >
                    {loading ? "Triggering Webhook..." : "Trigger Webhook"}
                  </button>
                  {message && <p className="mt-4">{message}</p>}
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
                  <p className="ml-4">Loading repositories...</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Webhook;
