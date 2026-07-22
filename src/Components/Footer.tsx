import { FaTwitter, FaEnvelope } from "react-icons/fa";

const COLUMNS = [
    {
        id: "A",
        title: "Contact",
        items: [
            { label: "Email", href: "mailto:connectsentio@gmail.com", icon: FaEnvelope },
            { label: "Twitter", href: "https://twitter.com/sentio_AR", icon: FaTwitter },
        ],
    },
    {
        id: "B",
        title: "Resources",
        items: [
            { label: "Documentation", href: "https://sentio-docs.vercel.app/" },
            { label: "Help Center", href: "mailto:connectsentio@gmail.com" },
        ],
    },
    {
        id: "C",
        title: "Systems",
        items: [
            { label: "Dashboard", href: "/dashboard" },
            { label: "Audit", href: "/offchain" },
            { label: "Faucet", href: "/faucets" },
        ],
    },
];

const Footer = () => {
    return (
        <footer className="relative border-t border-rule bg-void">
            <div className="shell py-14">
                <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
                    {/* Wordmark block */}
                    <div>
                        <div className="t-display-md leading-none">
                            Sentio<span className="text-hazard">.</span>
                        </div>
                        <p className="t-meta mt-4 leading-relaxed">
                            Security telemetry
                            <br />
                            for the AO compute layer
                        </p>
                        <div className="mt-6 flex items-center gap-2">
                            <span className="led" aria-hidden />
                            <span className="t-meta">All systems nominal</span>
                        </div>
                    </div>

                    {COLUMNS.map((col) => (
                        <nav key={col.id}>
                            <div className="flex items-baseline gap-2 border-b border-rule pb-2">
                                <span className="t-meta text-faint">{col.id}</span>
                                <h3 className="t-label text-phosphor">{col.title}</h3>
                            </div>
                            <ul className="mt-4 space-y-2">
                                {col.items.map((item) => (
                                    <li key={item.label}>
                                        <a
                                            href={item.href}
                                            target={item.href.startsWith("http") ? "_blank" : undefined}
                                            rel="noopener noreferrer"
                                            className="group inline-flex items-center gap-2 t-label text-dim hover:text-hazard2 transition-colors"
                                        >
                                            <span className="text-faint group-hover:text-hazard">
                                                {">"}
                                            </span>
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}
                </div>
            </div>

            <div className="border-t border-rule">
                <div className="shell flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="t-meta">
                        © {new Date().getFullYear()} Sentio. All rights reserved.
                    </p>
                    <p className="t-meta text-faint">Built on Arweave &amp; AO</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
