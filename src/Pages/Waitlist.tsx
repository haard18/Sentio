import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackButton from '../Components/BackButton';
import Footer from '../Components/Footer';

const UPDATES = [
  { date: "05/09/2024", message: "Opened waitlist for masses" },
  { date: "28/08/2024", message: "LaunchPad kicks off" },
  { date: "26/07/2024", message: "Integration with BetterIDEa" },
  { date: "08/07/2024", message: "HackerHouse presentation" },
  { date: "06/07/2024", message: "Idea forging" },
];

const TOAST = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
} as const;

const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post("https://sam-server.azurewebsites.net/api/waitlist", { email, name });
      toast.success('Enrolled — you are on the waitlist.', TOAST);
      setShowConfirmation(true);
    } catch {
      toast.error('Transmission failed. Try again.', TOAST);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setShowConfirmation(false);
    setEmail("");
    setName("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-void text-phosphor">
      <ToastContainer theme="dark" />

      <div className="fixed left-4 top-4 z-40">
        <BackButton mode="dark" />
      </div>

      <main className="relative flex-1 border-b border-rule">
        <div className="blueprint pointer-events-none absolute inset-0 opacity-40" aria-hidden />

        <div className="shell relative grid gap-12 py-24 lg:grid-cols-[1fr_320px] lg:gap-16 lg:py-32">
          {/* Enrolment form */}
          <div>
            <span className="t-meta text-hazard">Access Request</span>
            <h1 className="t-display-xl mt-4">
              Join the
              <br />
              waitlist
            </h1>
            <div className="rule-accent my-8 max-w-md" />
            <p className="t-body">
              Sentio is onboarding in cohorts. Submit your identifier and you will be
              notified the moment a slot opens.
            </p>

            <form onSubmit={handleSubmit} className="mt-10 max-w-md space-y-4">
              <label className="block">
                <span className="t-meta">01 / Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Operator name"
                  className="field mt-2"
                  required
                />
              </label>

              <label className="block">
                <span className="t-meta">02 / Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="field mt-2"
                  required
                />
              </label>

              <button type="submit" className="btn btn-accent w-full" disabled={submitting}>
                {submitting ? "Transmitting…" : "Submit request"}
              </button>
            </form>
          </div>

          {/* Changelog — replaces the old bell/notification popover */}
          <aside className="relative self-start border-l border-rule lg:pl-8">
            <div className="flex items-center gap-2 border-b border-rule pb-2">
              <span className="led" aria-hidden />
              <h2 className="t-label">Log</h2>
              <span className="t-meta ml-auto text-faint">
                {String(UPDATES.length).padStart(2, "0")} entries
              </span>
            </div>
            <ol className="mt-4">
              {UPDATES.map((u) => (
                <li key={u.date} className="border-b border-rule py-3">
                  <span className="t-meta text-faint">{u.date}</span>
                  <p className="t-label mt-1 text-phosphor">{u.message}</p>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </main>

      {showConfirmation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="panel w-full max-w-md">
            <div className="panel-head">
              <span className="t-label">Confirmation</span>
              <button onClick={handleClose} className="t-label text-dim hover:text-hazard2" aria-label="Close">
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3">
                <span className="led" aria-hidden />
                <span className="t-meta text-signal">Enrolled</span>
              </div>
              <h2 className="t-display-md mt-4">You're on the list</h2>
              <p className="t-body mt-3">
                We will transmit as soon as your cohort opens.
              </p>
              <dl className="mt-6 border-t border-rule">
                <div className="flex justify-between gap-3 border-b border-rule py-2">
                  <dt className="t-meta">Name</dt>
                  <dd className="t-label truncate text-phosphor">{name}</dd>
                </div>
                <div className="flex justify-between gap-3 border-b border-rule py-2">
                  <dt className="t-meta">Email</dt>
                  <dd className="t-label truncate text-phosphor">{email}</dd>
                </div>
              </dl>
              <button onClick={handleClose} className="btn mt-6 w-full">Close</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Waitlist;
