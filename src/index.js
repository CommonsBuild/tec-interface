import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Main } from '@1hive/1hive-ui'

import App from './App'
import MainView from './components/MainView'
import { WalletProvider } from './providers/Wallet'
import { AppStateProvider } from './providers/AppState'

ReactDOM.render(
  <WalletProvider>
    <AppStateProvider>
      <Main
        assetsUrl="/aragon-ui/"
        theme={{
          _name: 'themeDarkCustom',
          _appearance: 'dark',
          yellow: '#DEFB48',
          blue: '#03B3FF',
          purple: '#7622A8',
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
  document.getElementById('root')
)
