import { deployContract } from "../../plugins/deployContract";
import { DeploySalesDependencies } from "../../common/dto/test/deploySalesDependencies";
import { DeployedSales } from "../../common/dto/test/DeployedSales";
import { QSales } from "../../typechain-types/contracts/private/Sales.sol/QSales";

let sales: QSales;

export async function run(
  dependencies: DeploySalesDependencies
): Promise<DeployedSales> {
  return new Promise((resolve, ) => {
    describe("Should deploy the QSales", function () {
      
      it("Deployment", async function () {
        sales = await deployContract({
          name: 'QSales',
          constructor: [dependencies.users.address, dependencies.games.address],
          props: {}
        }) as QSales;

        resolve({
          sales: sales 
        });
      });

    });
  });
}