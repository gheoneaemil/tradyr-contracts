import '@nomiclabs/hardhat-etherscan';
import '@typechain/hardhat';
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomiclabs/hardhat-ethers";
import 'solidity-coverage';
import '@nomicfoundation/hardhat-toolbox';
import "hardhat-deploy-ethers"
import { HardhatUserConfig } from 'hardhat/config';

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  paths: {
    sources: "./contracts",
    tests: "./test/*",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        }
      }
    ],
  },
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0, // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
    },
    ethereumGoerli: {
      url: String(process.env.HTTP_GOERLI_PROVIDER),
      accounts: [String(process.env.PUBLIC_PRIVATE_KEY)]
    },
    polygonMainnet: {
      url: String(process.env.HTTP_POLYGON_MAINNET),
      accounts: [String(process.env.PUBLIC_PRIVATE_KEY)]
    },
    polygonMumbai: {
      url: String(process.env.HTTP_POLYGON_MUMBAI),
      accounts: [String(process.env.PUBLIC_PRIVATE_KEY)]
    },
    binanceMainnet: {
      url: String(process.env.HTTP_BINANCE_MAINNET),
      accounts: [String(process.env.PUBLIC_PRIVATE_KEY)]
    },
    binanceTestnet: {
      url: String(process.env.HTTP_BINANCE_TESTNET),
      accounts: [String(process.env.PUBLIC_PRIVATE_KEY)]
    },
    quorum: {
      url: String(process.env.HTTP_QUORUM),
      accounts: [String(process.env.PRIVATE_PRIVATE_KEY)]
    }
  },
  etherscan: {
    apiKey: process.env.BSCSCAN_API_KEY
  }
}
export default config;