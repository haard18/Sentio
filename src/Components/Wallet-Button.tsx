import { ConnectButton } from 'arweave-wallet-kit';

/* The kit renders its own button; we cage it in a hard 1px frame and
   force the mono/uppercase treatment onto whatever it emits. */
const Wallet = () => {
    return (
        <div className="wallet-cage inline-flex items-center border border-phosphor">
            <ConnectButton
                accent="rgba(230, 25, 25, 0)"
                profileModal={false}
                showBalance={false}
            />
        </div>
    );
};

export default Wallet;
