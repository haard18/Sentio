import { Timeline } from "../Components/ui/timeline";

type Entry = {
    title: string;
    meta: string;
    paras: string[];
    images: string[];
};

const ENTRIES: Entry[] = [
    {
        title: "Arweave India Hacker House",
        meta: "Mussoorie / 72 HRS",
        paras: [
            "The idea began with securing the Arweave and AO space, providing security both on-chain and off-chain.",
            "After 72 hours of development at the Mussoorie Hacker House, we pitched the concept to the Arweave team.",
        ],
        images: [
            "https://i.imgur.com/ftz6Le9.jpeg",
            "https://i.imgur.com/53sivBN.jpeg",
            "https://i.imgur.com/JpVhIbQ.jpeg",
            "https://i.imgur.com/qtWL7fl.png",
        ],
    },
    {
        title: "Phase 1",
        meta: "Singapore / Arweave Day",
        paras: [
            "After the Hacker House, we refined the idea at Arweave Day in Singapore, focusing on sharper use cases and user experience.",
            "This phase included collaboration with BetterIDEa and early access for beta users.",
        ],
        images: [
            "https://i.imgur.com/qg3fftU.jpeg",
            "https://i.imgur.com/rYlPzvN.jpeg",
            "https://i.imgur.com/NLIS1n5.jpeg",
            "https://i.imgur.com/hbucfkt.jpeg",
        ],
    },
    {
        title: "Phase 2",
        meta: "Launchpad / V1",
        paras: [
            "Sentio was selected for the Arweave India Launchpad program, providing funding, mentorship, and resources for product development.",
            "We aim to launch v1 on the Arweave network, giving beta users access to the platform by Demo Day.",
        ],
        images: [
            "https://i.imgur.com/MP3R2Fw.png",
            "https://i.imgur.com/cLRFGKC.jpeg",
            "https://i.imgur.com/S57uBPD.jpeg",
            "https://i.imgur.com/mMaHESG.jpeg",
        ],
    },
];

export function TimelineDemo() {
    const data = ENTRIES.map((entry) => ({
        title: entry.title,
        meta: entry.meta,
        content: (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
                <div className="space-y-4">
                    {entry.paras.map((p, i) => (
                        <p key={i} className="t-body">
                            {p}
                        </p>
                    ))}
                </div>

                {/* Contact sheet: hairline grid, desaturated until hover. */}
                <div className="grid-hair grid-cols-2">
                    {entry.images.map((src, idx) => (
                        <img
                            key={idx}
                            src={src}
                            alt={`${entry.title} — frame ${idx + 1}`}
                            loading="lazy"
                            className="h-28 w-full object-cover grayscale contrast-125 transition-all duration-200 hover:grayscale-0 md:h-44"
                        />
                    ))}
                </div>
            </div>
        ),
    }));

    return <Timeline data={data} />;
}
