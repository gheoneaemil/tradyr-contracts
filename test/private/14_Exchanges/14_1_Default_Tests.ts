import { ExchangesDefaultTestsParams } from "../../../common/dto/test/exchangesDefaultTestsParams";
const { ethers } = require('hardhat');


export async function set(
  dependencies: ExchangesDefaultTestsParams
): Promise<void> {
  return new Promise((resolve, ) => {
    describe("Exchanges tests", function () {

      it("Set permissions for exchanges to game 1", async function () {
        const [, , sig3] = await ethers.getSigners();
        await dependencies.games.connect(sig3).setPermissions(1,[dependencies.exchanges.address],[true]);
      });

      it("Set permissions for exchanges on users", async function () {
        await dependencies.users.setPermissions([dependencies.exchanges.address],[true]);
      });

      it("Set game 1 fees for exchanges", async function () {
        await dependencies.games.setFees(1, dependencies.exchanges.address, [5,5]);
      });

      it("Create an exchange", async function () {
        const [, sig2] = await ethers.getSigners();
        await dependencies.exchanges.connect(sig2).createExchange(1,1,1,1,1,1);
      });

      it("Validate exchange 1", async function () {
        const [, , sig3] = await ethers.getSigners();
        await dependencies.exchanges.connect(sig3).validateExchangeOwner(1,true);
      });

      it("Cancel exchange 1", async function () {
        const [, sig2] = await ethers.getSigners();
        await dependencies.exchanges.connect(sig2).cancelExchange(1);
      });

      it("Validate exchange 1 cancellation", async function () {
        const [, , sig3] = await ethers.getSigners();
        await dependencies.exchanges.connect(sig3).exchangeCancelled(1,true);
      });

      it("Create an exchange", async function () {
        const [, sig2] = await ethers.getSigners();
        await dependencies.exchanges.connect(sig2).createExchange(1,1,1,1,1,1);
      });

      it("Validate exchange 2", async function () {
        const [, , sig3] = await ethers.getSigners();
        await dependencies.exchanges.connect(sig3).validateExchangeOwner(2,true);
        await dependencies.exchanges.connect(sig3).itemTakenOwner(2,true);
      });

      it("Exchange 2", async function () {
        const [sig1, ] = await ethers.getSigners();
        await dependencies.exchanges.connect(sig1).triggerExchange(2);
      });

      it("Validate exchange 2", async function () {
        const [sig1, , sig3] = await ethers.getSigners();
        await dependencies.exchanges.connect(sig3).validateExchangeClient(2,sig1.address,true);
        let exchange = await dependencies.exchanges.exchanges(2);
        await dependencies.exchanges.connect(sig3).itemTakenClient(2,sig1.address,true);
        await dependencies.exchanges.connect(sig3).itemGiven(2,exchange.owner,true);
        exchange = await dependencies.exchanges.exchanges(2);
        await dependencies.exchanges.connect(sig3).itemGiven(2,exchange.client,true);
        resolve();
      });

    });
  });
}