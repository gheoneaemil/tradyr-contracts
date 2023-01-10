import { DeploySalesDependencies } from "../../common/dto/test/deploySalesDependencies";


export async function set(
  dependencies: DeploySalesDependencies
): Promise<void> {
  return new Promise((resolve, ) => {
    describe("Should set the QUsers", function () {
      it("Setting", async function () {
        await dependencies.users.setGlobalParams(dependencies.games.address);
        resolve();
      });
    });
  });
}