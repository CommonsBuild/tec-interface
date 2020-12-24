import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Main } from "@tecommons/ui";

import App from "./App";
import customTheme from "./base/theme";
import MainView from "./components/MainView";
import { WalletProvider } from "./providers/Wallet";
import { AppStateProvider } from "./providers/AppState";

ReactDOM.render(
  <WalletProvider>
    <AppStateProvider>
      <Main
        assetsUrl="/aragon-ui/"
        theme={{
          _name: "themeDarkCustom",
          _appearance: "dark",
          ...customTheme
        }}
        layout={false}
      >
        <HashRouter>
          <MainView>
            <App />
          </MainView>
        </HashRouter>
      </Main>
    </AppStateProvider>
  </WalletProvider>,
  document.getElementById("root")
);
