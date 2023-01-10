import { deployContract } from "../../plugins/deployContract";
import { QItemBets } from "../../typechain-types/contracts/private/ItemBets.sol/QItemBets";
import { DeployedItemBets } from "../../common/dto/test/DeployedItemBets";
import { DeployItemBetsDependencies } from "../../common/dto/test/deployItemBetsDependencies";

let itemBets: QItemBets;

export async function run(
  dependencies: DeployItemBetsDependencies
): Promise<DeployedItemBets> {
  return new Promise((resolve, ) => {
    describe("Should deploy the QItemBets", function () {
      
      it("Deployment", async function () {
        itemBets = await deployContract({
          name: 'ITEMBETS',
          constructor: [dependencies.games.address],
          props: {}
        }) as QItemBets;

        resolve({
          itemBets: itemBets 
        });
      });

    });
  });
}