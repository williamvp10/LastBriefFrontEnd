import { useEffect, useState } from 'react';

import { useEthers } from '@usedapp/core'
import { getDefaultProvider } from 'ethers'
import { Button } from 'react-bootstrap';

import '../styles/hooks/WalletButton.css'

function ConnectWallet() {
    const { activateBrowserWallet, account } = useEthers()
    return (
      <div>
        {!account? (
                <div className="button-sing-in">
                    <Button variant="dark" 
                    onClick={() => activateBrowserWallet()}>
                        Connect Wallet
                    </Button>
                </div>
        ):(
            <p className="text-sing-in"><strong>Connected:</strong> {account.substr(0,7)}...</p>
        )
        }
      </div>
    )
  }

export default ConnectWallet;