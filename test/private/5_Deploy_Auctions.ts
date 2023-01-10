import { deployContract } from "../../plugins/deployContract";
import { QAuctions } from "../../typechain-types/contracts/private/Auctions.sol/QAuctions";
import { DeployAuctionsDependencies } from "../../common/dto/test/deployAuctionsDependencies";
import { DeployedAuctions } from "../../common/dto/test/DeployedAuctions";

let auctions: QAuctions;

export async function run(
  dependencies: DeployAuctionsDependencies
): Promise<DeployedAuctions> {
  return new Promise((resolve, ) => {
    describe("Should deploy the QAuctions", function () {
      
      it("Deployment", async function () {
        auctions = await deployContract({
          name: 'AUCTIONS',
          constructor: [dependencies.users.address, dependencies.games.address],
          props: {}
        }) as QAuctions;

        resolve({
          auctions: auctions 
        });
      });

    });
  });
}