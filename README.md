# Front-End Last brief

Frontend: ReactJS and typescript. There is a dynamic form to add Heirs addresses that are then added to the array to be passed to the contract in the format: ["address1","adddress2"]

an impressive feature is a will writing/editing space if the user doesnt want to upload they can write and edit colors, bold, indentation, and many other features.

Smart Contract: smart contract is in solidity, it is a simple contract, has mappings from addresses to Owner structs and uses that to keep track of their Brief hashes, info, and death status.

Gelato: Gelato is an interesting smart contract automation tool. To use that, we choose the network, connect wallet and deposit some mumbai polygon to pay for function calls, and give the contract address on the mumbai network to Gelato; then, it should be able to find the contract and functions from the ABI and then we can choose a function name and a schedule for the function to be called on. Unfortunately, there is a bug from their side where they try to find the contract on etherscan even though we’re connected to polygon, and there is a manual ABI option that cannot detect the function, and there was no one from the team to solve the issue in time, so we did not make it work. I used gelato before, but it was interesting to try it again on Polygon.

Push Protocol: Push protocol is one of the sponsor solutions that made this happen! Notifying people on such important matters made us choose to utilize it. To utilize it we took 50 DAI from the faucet and started an alias channel on the mumbai network after making the original on the goerli network. Then we added our contract address as a delegate. For the code implementation, they had an easy interface that we integrated into our smart contract in the loops that sent notifications to Heirs and Owners.

Pocket network: we used a pocket network as a decentralized endpoint provider. We put the URLs of the target networks endpoints and credentials; it was very simple.


# contract address Polygon:

[0x8007287BcE84e7C1dD092ba31D4E8C5fDB833D33](https://mumbai.polygonscan.com/address/0x8007287BcE84e7C1dD092ba31D4E8C5fDB833D33)


## Live Demo

You can access the live application at [https://last-brief-front-end.vercel.app/](https://last-brief-front-end.vercel.app/). For testing purposes, ensure your wallet is connected to the Polygon Mumbai Testnet.

