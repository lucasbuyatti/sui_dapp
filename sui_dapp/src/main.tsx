import ReactDOM from "react-dom/client";
import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from "./app";
import { tealTheme } from "./styles/theme";
import "@mysten/dapp-kit/dist/index.css";
import "@radix-ui/themes/styles.css";
import "./styles/global.css";
import { getFullnodeUrl } from "@mysten/sui/client";
import { UsersProvider } from "./contexts/UsersContext";
import { SocketProviders } from "./contexts/SocketContext";
import { GameProvider } from "./contexts/GameContext";



const queryClient = new QueryClient();

enum node {
  dev = "devnet",
  test = "testnet",
  main = "mainnet",
}

export const { networkConfig } = createNetworkConfig({
  mainnet: { url: getFullnodeUrl(node.main) },
  devnet: { url: getFullnodeUrl(node.dev) },
  testnet: { url: getFullnodeUrl(node.test) },
});




ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <SuiClientProvider networks={networkConfig} defaultNetwork={node.test}>
      <WalletProvider autoConnect={true} theme={tealTheme}>
        
      <GameProvider>
        <UsersProvider>
          <SocketProviders>
            <App />
          </SocketProviders>
        </UsersProvider>
        </GameProvider>

      </WalletProvider>
    </SuiClientProvider>
  </QueryClientProvider>
  // </React.StrictMode>
);