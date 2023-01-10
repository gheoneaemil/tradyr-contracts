import { GamesDefaultTestsParams } from "../../../common/dto/test/gamesDefaultTestsParams";
import { globalParams } from "../../../common/params";
import { expecting } from "../../../plugins/expecting";
const { ethers } = require('hardhat');


export async function set(
  dependencies: GamesDefaultTestsParams
): Promise<void> {
  return new Promise((resolve, ) => {
    describe("Games tests", function () {
      it("Create a game", async function () {
        const [, , sig3] = await ethers.getSigners();
        await dependencies.games.connect(sig3).configNewGame();
      });

      it("Enable two factor authentication for game 1", async function () {
        const [, , sig3] = await ethers.getSigners();
        await dependencies.games.connect(sig3).setGameTwoFactorAuth(1);
      });

      it("Add server 1 to game 1", async function () {
        const [, , sig3] = await ethers.getSigners();
        await dependencies.games.connect(sig3).addGameServers(1,[1]);
      });

      it("Add normal item 1 to game 1", async function () {
        const [, , sig3] = await ethers.getSigners();
        await dependencies.games.connect(sig3).addGameItems(1,[1]);
      });

      it("Add premium item 1 to game 1", async function () {
        const [, , sig3] = await ethers.getSigners();
        await dependencies.games.connect(sig3).addCompanyItems(1,[1]);
      });

      it("Check company for game 1, server 1, item 1", async function () {
        const [, , sig3] = await ethers.getSigners();
        await dependencies.games.connect(sig3).checkCompany(sig3.address,1,1,1);
      });

      it("Change game 1 status", async function () {
        const [, , sig3] = await ethers.getSigners();
        await dependencies.games.connect(sig3).changeGameStatus(1);
        const gameStatus: boolean = await dependencies.games.getGameOnMarketStatus(1);
        expecting(gameStatus, "Change game status bugged");
      });

      it("Set game 1 fees", async function () {
        await dependencies.games.setFees(1, globalParams.address0, [5,5]);
      });

      it("Authenticate user 1 to game 1", async function () {
        const [sig1] = await ethers.getSigners();
        await dependencies.games.connect(sig1).authenticate({
          game: 1,
          server: 1,
          user: sig1.address,
          password: "password",
          email: "test_email@yahoo.com",
          ign: "DIIMIIM",
          username: "username"
        });
      });

      it("Confirm user 1 authentication to game 1", async function () {
        const [sig1, , sig3] = await ethers.getSigners();
        await dependencies.games.connect(sig3).authenticated({
          game: 1,
          server: 1,
          user: sig1.address,
          password: "password",
          email: "test_email@yahoo.com",
          ign: "DIIMIIM",
          username: "username"
        }, true);
      });
      
      it("Check user 1 for game 1, server 1, item 1", async function () {
        const [sig1] = await ethers.getSigners();
        await dependencies.games.connect(sig1).checkUser(sig1.address,1,1,1);
        const verification: boolean = await dependencies.games.checkGameServerItem(sig1.address,1,1,1);
        expecting(verification, "Bugged authentication mechanism")
      });

      it("Two factor Authenticate user 2 to game 1", async function () {
        const [, sig2] = await ethers.getSigners();
        await dependencies.games.connect(sig2).twoFactorAuthenticate(1,1,"tmpPassword");
      });

      it("Confirm user 2 two factor authentication to game 1", async function () {
        const [, sig2, sig3] = await ethers.getSigners();
        await dependencies.games.connect(sig3).twoFactorAuthenticated({
          game: 1,
          server: 1,
          user: sig2.address,
          password: "password",
          email: "test_email@yahoo.com",
          ign: "DIIMIIM",
          username: "username"
        }, true);
      });

      it("Check user 2 for game 1, server 1, item 1", async function () {
        const [, sig2] = await ethers.getSigners();
        await dependencies.games.connect(sig2).checkUser(sig2.address,1,1,1);
        const verification: boolean = await dependencies.games.checkGameServerItem(sig2.address,1,1,1);
        expecting(verification, "Bugged authentication mechanism");
        resolve();
      });

    });
  });
}