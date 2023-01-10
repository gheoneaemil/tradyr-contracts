import { createReadStream, writeFileSync } from 'fs';
import { deploymentLogsPath, globalParamsPath } from '../common/paths';
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
    writeFileSync(globalParamsPath.fullPath, JSON.stringify(_networks,null,2));
  });
}

synchronize();