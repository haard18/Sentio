import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Webhook: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [repos, setRepos] = useState<string[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>(""); // Changed to userEmail
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
    if (!selectedRepo || !userName || !accessToken || !userEmail) { // Changed email to userEmail
      setMessage("Please fill out all fields.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const webhookResponse = await axios.post(`${backend_url}/setWebhook`, {
        userName,
        repoName: selectedRepo,
        email: userEmail, // Changed email to userEmail
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
    <div className="flex min-h-screen flex-col bg-void text-phosphor">
      <Navbar />

      <main className="mt-14 flex flex-1 items-start justify-center px-4 py-16">
        <section className="panel w-full max-w-lg">
          <div className="panel-head">
            <span className="t-label">GitHub webhook</span>
            
          </div>

          <div className="space-y-5 p-5">
            {!accessToken ? (
              <>
                <p className="t-body">
                  Authorise Sentio to install a push webhook on your repository. Audits
                  then run automatically on every commit.
                </p>
                <button onClick={handleGitHubAuth} className="btn btn-accent w-full">
                  Authenticate with GitHub
                </button>
              </>
            ) : repos.length > 0 ? (
              <>
                <div>
                  <span className="t-meta">01 / Account</span>
                  <input type="text" value={userName} readOnly className="field mt-2 text-dim" />
                </div>

                <label className="block">
                  <span className="t-meta">02 / Repository</span>
                  <select
                    value={selectedRepo}
                    onChange={(e) => setSelectedRepo(e.target.value)}
                    className="field mt-2"
                    required
                  >
                    <option value="" disabled>
                      Select a repository
                    </option>
                    {repos.map((repo) => (
                      <option key={repo} value={repo}>
                        {repo}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="t-meta">03 / Alert Email</span>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="field mt-2"
                    placeholder="you@domain.com"
                    required
                  />
                </label>

                <button
                  onClick={handleSetWebhook}
                  className="btn btn-accent w-full"
                  disabled={loading}
                >
                  {loading ? "Installing…" : "Set webhook"}
                </button>

                {message && (
                  <p className="border border-rule2 px-3 py-2 t-label text-dim" role="status">
                    {message}
                  </p>
                )}
              </>
            ) : (
              <div className="flex items-center gap-3 py-6">
                <span className="led" aria-hidden />
                <span className="t-label text-dim">Loading repositories…</span>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Webhook;
