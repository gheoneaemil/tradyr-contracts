import { deployContract } from "../../plugins/deployContract";
import { QLotteries } from "../../typechain-types/contracts/private/Lotteries.sol/QLotteries";
import { DeployedLotteries } from "../../common/dto/test/DeployedLotteries";
import { DeployLotteriesDependencies } from "../../common/dto/test/deployLotteriesDependencies";

let lotteries: QLotteries;

export async function run(
  dependencies: DeployLotteriesDependencies
): Promise<DeployedLotteries> {
  return new Promise((resolve, ) => {
    describe("Should deploy the QLotteries", function () {
      
      it("Deployment", async function () {
        lotteries = await deployContract({
          name: 'LOTTERIES',
          constructor: [dependencies.users.address,dependencies.games.address],
          props: {}
        }) as QLotteries;

        resolve({
          lotteries: lotteries 
        });
      });

    });
  });
}