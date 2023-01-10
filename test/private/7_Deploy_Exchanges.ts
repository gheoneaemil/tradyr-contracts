import { deployContract } from "../../plugins/deployContract";
import { QExchanges } from "../../typechain-types/contracts/private/Exchanges.sol/QExchanges";
import { DeployedExchanges } from "../../common/dto/test/DeployedExchanges";
import { DeployExchangesDependencies } from "../../common/dto/test/deployExchangesDependencies";

let exchanges: QExchanges;

export async function run(
  dependencies: DeployExchangesDependencies
): Promise<DeployedExchanges> {
  return new Promise((resolve, ) => {
    describe("Should deploy the QExchanges", function () {
      
      it("Deployment", async function () {
        exchanges = await deployContract({
          name: 'QExchanges',
          constructor: [dependencies.games.address],
          props: {}
        }) as QExchanges;

        resolve({
          exchanges: exchanges 
        });
      });

    });
  });
}