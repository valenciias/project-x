import { Switch, Route } from "wouter";
import { useState, useMemo } from "react";
import Home from "@/pages/Home";
import IntroAnimation from "@/components/IntroAnimation";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  // Setup Solana wallet configuration
  const endpoint = useMemo(() => clusterApiUrl('mainnet-beta'), []);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <>
            {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
            <Switch>
              <Route path="/" component={Home} />
            </Switch>
          </>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;