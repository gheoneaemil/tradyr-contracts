import { deployContract } from "../../plugins/deployContract";
import { QRents } from "../../typechain-types/contracts/private/Rents.sol/QRents";
import { DeployedRents } from "../../common/dto/test/DeployedRents";
import { DeployRentsDependencies } from "../../common/dto/test/deployRentsDependencies";

let rents: QRents;

export async function run(
  dependencies: DeployRentsDependencies
): Promise<DeployedRents> {
  return new Promise((resolve, ) => {
    describe("Should deploy the QRents", function () {
      
      it("Deployment", async function () {
        rents = await deployContract({
          name: 'QRents',
          constructor: [dependencies.users.address,dependencies.games.address,dependencies.validation],
          props: {}
        }) as QRents;

        resolve({
          rents: rents 
        });
      });

    });
  });
}