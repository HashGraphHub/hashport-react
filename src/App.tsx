import "./polyfills";
import "./App.css";
import { SelectSource } from "./components/SelectSource";
import {
  createHashPackSigner,
  useHashConnect,
  HashportClientProviderWithRainbowKit,
  ProcessingTransactionProvider,
} from "@hashport/react-client";
import { SelectTarget } from "./components/SelectTarget";
import { AmountInput } from "./components/AmountInput";
import { RecipientInput } from "./components/RecepientInput";
import { ExecuteButton } from "./components/Execute";

const App = () => {
  const { hashConnect, pairingData } = useHashConnect({ mode: "testnet" });
  const hederaSigner =
    pairingData && createHashPackSigner(hashConnect, pairingData);
  const accountId = pairingData?.accountIds[0];

  return (
    <HashportClientProviderWithRainbowKit
      mode="testnet"
      hederaSigner={hederaSigner}
      renderConnectButton={(children, RainbowKitButton) => (
        <main>
          <h1>hashport</h1>
          <div className="button-group">
            <RainbowKitButton />
            <button onClick={() => hashConnect.connectToLocalWallet()}>
              {accountId ?? "Connect HashPack"}
            </button>
          </div>
          {children}
        </main>
      )}
    >
      <ProcessingTransactionProvider>
        <AmountInput />
        <RecipientInput />
        <SelectSource />
        <SelectTarget />
        <ExecuteButton />
      </ProcessingTransactionProvider>
    </HashportClientProviderWithRainbowKit>
  );
};

export default App;
