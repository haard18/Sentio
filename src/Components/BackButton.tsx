import { useNavigate } from "react-router-dom";

/* `mode` is accepted for call-site compatibility but ignored — the substrate
   is always dark now, so there is no light variant to switch to. */
type BackButtonProps = { mode?: string };

const BackButton = (props: BackButtonProps) => {
    void props;
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate('/')} className="btn btn-sm btn-ghost">
            Back
        </button>
    );
};

export default BackButton;
