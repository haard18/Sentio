import { FaCopy } from "react-icons/fa";
import { motion } from "framer-motion";

interface Tag {
  name: string;
  value: string;
}

interface Process {
  id: string;
  tags: Tag[];
}

const ProcessCard: React.FC<{ process: Process; onCopy: () => void }> = ({ process, onCopy }) => {
  if (!process || !process.id) {
    return (
      <div className="panel p-4">
        <span className="t-label text-hazard2">Error / Process data unavailable</span>
      </div>
    );
  }

  const processId = process.id;
  const tags = process.tags ?? [];

  const handleCopyId = () => {
    navigator.clipboard.writeText(processId);
    onCopy();
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="panel group relative h-full transition-colors hover:border-rule2"
    >
      <div className="panel-head">
        <span className="t-meta">Process ID</span>
        <button
          onClick={handleCopyId}
          className="t-meta flex items-center gap-1.5 transition-colors hover:text-hazard2"
          aria-label="Copy process ID"
        >
          <FaCopy className="h-3 w-3" /> Copy
        </button>
      </div>

      <div className="border-b border-rule px-4 py-3">
        <p className="break-all font-mono text-xs leading-relaxed text-phosphor">{processId}</p>
      </div>

      <dl className="px-4 py-3">
        {tags.length === 0 ? (
          <span className="t-meta text-faint">No tags</span>
        ) : (
          tags.map((tag, index) => (
            <div key={index} className="flex justify-between gap-3 border-b border-rule py-1.5 last:border-0">
              <dt className="t-meta shrink-0">{tag.name}</dt>
              <dd className="truncate font-mono text-xs text-phosphor" title={tag.value}>
                {tag.value}
              </dd>
            </div>
          ))
        )}
      </dl>
    </motion.article>
  );
};

export default ProcessCard;
