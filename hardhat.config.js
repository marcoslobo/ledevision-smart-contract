require('@nomiclabs/hardhat-waffle')
require('dotenv').config()
require('@nomiclabs/hardhat-etherscan')

module.exports = {
    solidity: '0.8.14',
    networks: {
        bsc_testnet: {
            url: `${process.env.BSC_TESTNET_URL}`,
            accounts: [`${process.env.BSC_TESTNET_PRIVATE_KEY}`],
        },
    },
    etherscan: {
        // Your API key for Etherscan
        // Obtain one at https://etherscan.io/
        apiKey: 'xxx',
    },
}
