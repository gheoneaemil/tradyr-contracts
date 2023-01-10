import { createReadStream, writeFileSync } from 'fs';
import { appParamsPath, deploymentLogsPath } from '../common/paths';
import { createInterface } from 'readline';
import networks from '../global/publicNetworks.json';


export async function synchronize(): Promise<void> {
  const readline = createInterface({
    input: createReadStream(deploymentLogsPath.fullPath)
  });

  let totalKeys: Array<string> = Object.keys(networks);
  totalKeys.pop();
  let _networks: any = networks;

  readline.on('line', (line: string) => {
    const deploy: any = JSON.parse(line);
    const message = deploy.message;
    const hasExport = message.split(" export ");
    const hasEqual = hasExport[1].split("=");
    const contractName = hasEqual[0];
    const contractAddress = hasEqual[1];
    const network = deploy.network;
    
    for ( let i = 0 , l = totalKeys.length ; i < l ; ++i ) {
      if ( network === totalKeys[i] ) {
        const existingNetwork: any = _networks[totalKeys[i]];
        for ( let j in existingNetwork ) {
          if ( j === contractName ) {
            existingNetwork[j] = contractAddress;
          }
        }
      }
    }


  })
  .on('close', () => {
    writeFileSync(appParamsPath.fullPath, String(
      "export const ETHEREUM_GOERLI_AUCTIONS = '" + _networks['0x5'].AUCTIONS + "';\n" + 
      "export const ETHEREUM_GOERLI_RENTS = '" + _networks['0x5'].RENTS + "';\n" +
      "export const ETHEREUM_GOERLI_SALES = '" + _networks['0x5'].SALES + "';\n\n" +
      
      "export const POLYGON_MAINNET_AUCTIONS = '" + _networks['0x89'].AUCTIONS + "';\n" + 
      "export const POLYGON_MAINNET_RENTS = '" + _networks['0x89'].RENTS + "';\n" + 
      "export const POLYGON_MAINNET_SALES = '" + _networks['0x89'].SALES + "';\n\n" +
      
      "export const POLYGON_MUMBAI_AUCTIONS = '" + _networks['0x13881'].AUCTIONS + "';\n" + 
      "export const POLYGON_MUMBAI_RENTS = '" + _networks['0x13881'].RENTS + "';\n" + 
      "export const POLYGON_MUMBAI_SALES = '" + _networks['0x13881'].SALES + "';\n\n" + 
      
      "export const BINANCE_SMARTCHAIN_TESTNET_AUCTIONS = '" + _networks['0x61'].AUCTIONS + "';\n" + 
      "export const BINANCE_SMARTCHAIN_TESTNET_RENTS = '" + _networks['0x61'].RENTS + "';\n" + 
      "export const BINANCE_SMARTCHAIN_TESTNET_SALES = '" + _networks['0x61'].SALES + "';\n\n" + 
      
      "export const BINANCE_SMARTCHAIN_MAINNET_AUCTIONS = '" + _networks['0x38'].AUCTIONS + "';\n" + 
      "export const BINANCE_SMARTCHAIN_MAINNET_RENTS = '" + _networks['0x38'].RENTS + "';\n" + 
      "export const BINANCE_SMARTCHAIN_MAINNET_SALES = '" + _networks['0x38'].SALES + "';"
    ));
  });
}

synchronize();