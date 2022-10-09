import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';


import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config, Goerli, Polygon, Mumbai, Localhost } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import { getDefaultProvider } from 'ethers';

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mumbai.chainId]:'https://polygon-mumbai.gateway.pokt.network/v1/lb/b839568c2106fccf1683c38d',
    [Localhost.chainId]: 'HTTP://127.0.0.1:8545',
    //[Mainnet.chainId]: getDefaultProvider('mainnet'),
    //[Goerli.chainId]: getDefaultProvider('goerli'),
  },
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <DAppProvider config={config}>
    <App />
  </DAppProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
