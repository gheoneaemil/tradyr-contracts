import { SalesDefaultTestsParams } from "../../../common/dto/test/salesDefaultTestsParams";
import { expecting } from "../../../plugins/expecting";
const { ethers } = require('hardhat');


export async function set(
  dependencies: SalesDefaultTestsParams
): Promise<void> {
  return new Promise((resolve, ) => {
    describe("Sales tests", function () {

      it("Set permissions for sales to game 1", async function () {
        const [, , sig3] = await ethers.getSigners();
        await dependencies.games.connect(sig3).setPermissions(1,[dependencies.sales.address],[true]);
      });

      it("Set permissions for sales on users", async function () {
        const owner: string = await dependencies.users.owner();
        await dependencies.users.setPermissions([dependencies.sales.address],[true]);
      });

      it("Set game 1 fees for sales", async function () {
        await dependencies.games.setFees(1, dependencies.sales.address, [5,5]);
      });

      it("Create a sale", async function () {
        const [sig1] = await ethers.getSigners();
        await dependencies.sales.connect(sig1).createSale(1,1,1,5000,false);
      });

      it("Validate sale 1", async function () {
        const [, , sig3] = await ethers.getSigners();
        await dependencies.sales.connect(sig3).validateSale(1,true);
      });

      it("Cancel sale 1", async function () {
        const [sig1] = await ethers.getSigners();
        await dependencies.sales.connect(sig1).cancelSale(1);
      });

      it("Validate sale 1 cancellation", async function () {
        const [, , sig3] = await ethers.getSigners();
        await dependencies.sales.connect(sig3).saleCancelled(1,true);
      });

      it("Create a sale", async function () {
        const [sig1] = await ethers.getSigners();
        await dependencies.sales.connect(sig1).createSale(1,1,1,50000,false);
      });

      it("Validate sale 2", async function () {
        const [, , sig3] = await ethers.getSigners();
        await dependencies.sales.connect(sig3).validateSale(2,true);
      });

      it("Purchase sale 2", async function () {
        const [, sig2] = await ethers.getSigners();
        await dependencies.sales.connect(sig2).purchase(2);
      });

      it("Validate purchase of sale 2", async function () {
        const [, sig2, sig3] = await ethers.getSigners();
        const balanceBefore: string = String(await dependencies.users.getBalanceUser(sig2.address));
        await dependencies.sales.connect(sig3).confirmPurchase(2,sig2.address,true);
        const balanceAfter: string = String(await dependencies.users.getBalanceUser(sig2.address));
        expecting(balanceBefore !== balanceAfter, "Purchase bugged");
        resolve();
      });

    });
  });
}