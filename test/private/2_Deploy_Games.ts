import { deployContract } from "../../plugins/deployContract";
import { DeployedGames } from "../../common/dto/test/DeployedGames";
import { QGames } from "../../typechain-types/contracts/private/Games.sol/QGames";
import { DeployGamesDependencies } from "../../common/dto/test/deployGamesDependencies";

let games: QGames;

export async function run(
  dependencies: DeployGamesDependencies
): Promise<DeployedGames> {
  return new Promise((resolve, ) => {
    describe("Should deploy the QGames", function () {
      
      it("Deployment", async function () {
        games = await deployContract({
          name: 'QGames',
          constructor: [dependencies.users.address],
          props: {}
        }) as QGames;

        resolve({
          games: games 
        });
      });

    });
  });
}