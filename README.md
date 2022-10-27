# Le Division SM :knife:

This Smart Contract Project is a use case for division of received values.

-   What this contract **DO** :heavy_check_mark:

    -   Shares received values(from main token of the blockchain ex.: ETH, BNB..)
    -   Add n(uint256 max value) number of wallets
    -   Block an wallet to withdraw value (owner of contract)
    -   Inform to wallet owner how much an wallet has to withdraw
    -   Let wallet owner to withdraw values that he is able

-   What this contract **NOT DO** :x:

    -   Auto transfer to registred wallets (no loop, no fee)

-   Example of use

> Fees generated in another contract, needs to be shared between 3(or n) numbers of wallets.
> So you should deploy this contract, add the wallets that needs to receive part of division and then use the address of the deployed contract to receive the fees.  
> When the fee gets in the SM, the registred wallets are able to withdraw the divided fee by calling an function

-   Tools

    -   [Hardhat](https://hardhat.org/ 'Hardhat')
    -   Tests with [Chai](https://www.chaijs.com/ 'Chai')

-   Before Test or Deploy

    -   Configure [Hardhat](https://hardhat.org/ 'Hardhat') on you enviroment (check it [here](https://hardhat.org/tutorial/setting-up-the-environment 'here'))
    -   Copy sample.env and rename it to .env
    -   Change BSC_TESTNET_URL with the node URL that you will use
    -   Change BSC_TESTNET_PRIVATE_KEY with the private key from the wallet what will deploy the contract
    -   run `npm install`

-   Test

    -   run `npx hardhat test`

-   Deploy
    -   run `npx hardhat run`

:eyes: Did you like it? :eyes:

Buy me a beer :beer:

Any EVM Blockchain (ETH, Polygon, Binance)
0x8130ca084a97B0d249230C7ec522ab6Eb8702F5e
