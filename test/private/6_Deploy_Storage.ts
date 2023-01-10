import { deployContract } from "../../plugins/deployContract";
import { QStorage } from "../../typechain-types/contracts/private/Storage.sol/QStorage";
import { DeployedStorage } from "../../common/dto/test/DeployedStorage";
import { DeployStorageDependencies } from "../../common/dto/test/deployStorageDependencies";

let storage: QStorage;

export async function run(
  dependencies: DeployStorageDependencies
): Promise<DeployedStorage> {
  return new Promise((resolve, ) => {
    describe("Should deploy the QStorage", function () {
      
      it("Deployment", async function () {
        storage = await deployContract({
          name: 'QStorage',
          constructor: [dependencies.users.address, dependencies.games.address],
          props: {}
        }) as QStorage;

        resolve({
          storage: storage 
        });
      });

    });
  });
}