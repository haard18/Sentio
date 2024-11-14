// import { useEffect } from 'react';
import { ConnectButton } from 'arweave-wallet-kit';
// import { useNavigate } from 'react-router-dom';

const Wallet = () => {



    return (
        <div className='inline-flex items-center justify-center gap-2 whitespace-nowrap  text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-zinc-300 rounded-xl'>
            <ConnectButton
                accent="rgb(63, 63, 63 ,0)"
                profileModal={false}
                showBalance={false}
            />
        </div>
    );
};

export default Wallet;
