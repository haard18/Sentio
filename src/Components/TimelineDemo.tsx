import { Timeline } from "../Components/ui/timeline";

export function TimelineDemo() {
    const data = [
        {
            title: "Arweave India Hacker House",
            content: (
                <div>
                    <p className="text-white dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        The idea began with securing Arweave and AO space, providing security on-chain and off-chain.
                    </p>
                    <p className="text-white dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        After 72 hours of development at the Mussoorie Hacker-House, we pitched the concept to the Arweave team.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        {["https://i.imgur.com/ftz6Le9.jpeg", "https://i.imgur.com/53sivBN.jpeg", "https://i.imgur.com/JpVhIbQ.jpeg", "https://i.imgur.com/qtWL7fl.png"].map((src, idx) => (
                            <img
                                key={idx}
                                src={src}
                                alt={`Hacker House ${idx + 1}`}
                                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                            />
                        ))}
                    </div>
                </div>
            ),
        },
        {
            title: "Phase 1",
            content: (
                <div>
                    <p className="text-white dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        After the Hacker-House, we refined the idea at Arweave Day in Singapore, focusing on better use cases and user experience.
                    </p>
                    <p className="text-white dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        This phase included collaboration with Better Idea and early access for beta users.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        {["https://i.imgur.com/qg3fftU.jpeg", "https://i.imgur.com/rYlPzvN.jpeg", "https://i.imgur.com/NLIS1n5.jpeg", "https://i.imgur.com/hbucfkt.jpeg"].map((src, idx) => (
                            <img
                                key={idx}
                                src={src}
                                alt={`Phase 1 ${idx + 1}`}
                                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                            />
                        ))}
                    </div>
                </div>
            ),
        },
        {
            title: "Phase 2",
            content: (
                <div>
                    <p className="text-white dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        SENTIO was selected for the Arweave India Launchpad program, offering funding, mentorship, and resources for product development.
                    </p>
                    <p className="text-white dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        We aim to launch v1 on the Arweave network, providing beta users access to the platform by Demo Day.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        {["https://i.imgur.com/MP3R2Fw.png", "https://i.imgur.com/cLRFGKC.jpeg", "https://i.imgur.com/S57uBPD.jpeg", "https://i.imgur.com/mMaHESG.jpeg"].map((src, idx) => (
                            <img
                                key={idx}
                                src={src}
                                alt={`Phase 2 ${idx + 1}`}
                                className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                            />
                        ))}
                    </div>
                </div>
            ),
        },
    ];

    return <Timeline data={data} />;
}
