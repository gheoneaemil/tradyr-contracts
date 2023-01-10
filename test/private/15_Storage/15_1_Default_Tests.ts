import { StorageDefaultTestsParams } from "../../../common/dto/test/storageDefaultTestsParams";
const { ethers } = require('hardhat');


export async function set(
  dependencies: StorageDefaultTestsParams
): Promise<void> {
  return new Promise((resolve, ) => {
    describe("Storage tests", function () {

      it("Set permissions for storage to game 1", async function () {
        const [, , sig3] = await ethers.getSigners();
        await dependencies.games.connect(sig3).setPermissions(1,[dependencies.storage.address],[true]);
      });

      it("Set permissions for exchanges on users", async function () {
        await dependencies.users.setPermissions([dependencies.storage.address],[true]);
      });

      it("Set game 1 fees for exchanges", async function () {
        await dependencies.games.setFees(1, dependencies.storage.address, [5,5]);
      });

      it("Store asset", async function () {
        const [, sig2] = await ethers.getSigners();
        await dependencies.storage.connect(sig2).depositItem(1,1,1);
      });

      it("Validate asset deposit", async function () {
        const [, sig2, sig3] = await ethers.getSigners();
        await dependencies.storage.connect(sig3).depositItemValidation(sig2.address,1,1,1,0,true);
      });

      it("Withdraw asset", async function () {
        const [, sig2] = await ethers.getSigners();
        await dependencies.storage.connect(sig2).withdrawItem(1,1,1,0);
      });

      it("Validate asset deposit", async function () {
        const [, sig2, sig3] = await ethers.getSigners();
        await dependencies.storage.connect(sig3).withdrawItemValidation(sig2.address,1,1,1,0,true);
      });

      it("Store asset", async function () {
        const [, sig2] = await ethers.getSigners();
        await dependencies.storage.connect(sig2).depositItem(1,1,1);
      });

      it("Validate asset deposit", async function () {
        const [, sig2, sig3] = await ethers.getSigners();
        await dependencies.storage.connect(sig3).depositItemValidation(sig2.address,1,1,1,1,true);
      });

      it("Force Withdraw asset", async function () {
        const [, sig2] = await ethers.getSigners();
        await dependencies.storage.forceWithdrawItem(sig2.address,1,1,1,1);
      });

    });
  });
}