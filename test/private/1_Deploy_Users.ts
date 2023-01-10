
import { DeployedUsers } from "../../common/dto/test/DeployedUsers";
import { globalParams } from "../../common/params";
import { deployContract } from "../../plugins/deployContract";
import { QUsers } from "../../typechain-types/contracts/private/Users.sol/QUsers";

let users: QUsers;

export async function run(): Promise<DeployedUsers> {
  return new Promise((resolve, ) => {
    describe("Should deploy the QUsers", function () {
      
      it("Deployment", async function () {
        users = await deployContract({
          name: 'USERS',
          constructor: [globalParams.address0],
          props: {}
        }) as QUsers;

        resolve({
          users: users 
        });
      });

    });
  });
}