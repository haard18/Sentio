import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";

// Define the response structure from the backend
interface WebhookResponse {
  message: string;
}

const Webhook: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [repoName, setRepoName] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userName || !repoName) {
      setMessage("Please provide both GitHub username and repository name.");
      return;
    }

    try {
      // Send request to backend to set the webhook
      const response = await axios.post<WebhookResponse>("http://localhost:3000/setWebhook", {
        userName,
        repoName,
      });

      // Handle success message from the backend
      setMessage(response.data.message || "Webhook created successfully.");
    } catch (error) {
      // Handle error messages
      const errorMessage = `Error creating webhook. ${error}`;
      setMessage(errorMessage);
    }
  };

  return (
    <div className="app-background h-screen w-full bg-gray-900 text-white flex flex-col">
      <section className="mb-10">
        <Navbar />
      </section>

      <section className="flex-grow flex items-center justify-center">
        <div className="max-w-lg w-full bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">GitHub Webhook Setup</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-2"
              >
                GitHub Username
              </label>
              <input
                id="username"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter GitHub username"
                className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="reponame"
                className="block text-sm font-medium mb-2"
              >
                Repository Name
              </label>
              <input
                id="reponame"
                type="text"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                placeholder="Enter repository name"
                className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-all"
            >
              Set Webhook
            </button>
          </form>

          {message && (
            <p
              className={`mt-4 text-center ${
                message.includes("Error") ? "text-red-500" : "text-green-500"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Webhook;
