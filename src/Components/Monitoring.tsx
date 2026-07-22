"use client";

import { motion } from 'framer-motion';
import { FaBell, FaListAlt, FaPauseCircle, FaSearch } from 'react-icons/fa';

const ACTIONS = [
    { icon: FaBell, text: 'Notify you on suspicious activity.' },
    { icon: FaPauseCircle, text: 'Pause the process on a high-severity finding.' },
];

const FLOW = [
    { icon: FaListAlt, label: 'Process', note: 'Emits messages' },
    { icon: FaSearch, label: 'Sentinel', note: 'Observes and scores' },
    { icon: FaBell, label: 'You', note: 'Alerted on anomaly' },
];

export default function Monitoring() {
    return (
        <motion.div
            className="panel min-h-[500px] w-full"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="panel-head">
                <div className="flex items-center gap-2">
                    <FaBell className="h-3.5 w-3.5 text-hazard" />
                    <span className="t-label">Sentinel actions</span>
                </div>
                <span className="led" aria-hidden />
            </div>

            <div className="p-5">
                <ul className="border-b border-rule pb-4">
                    {ACTIONS.map((action, i) => (
                        <li
                            key={i}
                            className="flex items-center gap-3 border-b border-rule py-3 last:border-0"
                        >
                            <action.icon className="h-4 w-4 shrink-0 text-hazard" />
                            <span className="t-label text-dim">{action.text}</span>
                        </li>
                    ))}
                </ul>

                {/* Flow rendered as a plain hairline row — the previous version
                    stacked absolutely-positioned SVG arcs that collided on
                    narrow viewports. */}
                <p className="t-meta mt-6">Message flow</p>
                <div className="grid-hair mt-3 sm:grid-cols-3">
                    {FLOW.map((node) => (
                        <div key={node.label} className="flex items-center gap-3 p-5">
                            <node.icon className="h-5 w-5 shrink-0 text-dim" />
                            <div>
                                <p className="t-label text-phosphor">{node.label}</p>
                                <p className="t-meta mt-0.5">{node.note}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
