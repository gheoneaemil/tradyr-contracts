import { UsersDefaultTestsParams } from "../../../common/dto/test/usersDefaultTestsParams";
import { expecting } from "../../../plugins/expecting";
const { ethers } = require('hardhat');


export async function set(
  dependencies: UsersDefaultTestsParams
): Promise<void> {
  return new Promise((resolve, ) => {
    describe("Users tests", function () {
      it("Create 2 users", async function () {
        const [sig1, sig2] = await ethers.getSigners();
        await dependencies.users.addUser(false, sig1.address);
        await dependencies.users.addUser(false, sig2.address);
      });

      it("Create a company user", async function () {
        const [, , sig3] = await ethers.getSigners();
        await dependencies.users.addUser(true, sig3.address);
      });

      it("Set permissions for owner and games", async function () {
        const owner: string = await dependencies.users.owner();
        await dependencies.users.setPermissions([owner, dependencies.games.address],[true,true]);
      });

      it("Deposit to user", async function () {
        const [sig1] = await ethers.getSigners();
        await dependencies.users.userDeposit(sig1.address,500_000_000);
      });

      it("Withdraws from user", async function () {
        const [sig1] = await ethers.getSigners();
        await dependencies.users.withdrawMoney(sig1.address,100_000_000);
      });

      it("Get user balance", async function () {
        const [sig1] = await ethers.getSigners();
        const balance = Number(await dependencies.users.getBalanceUser(sig1.address));
        expecting(balance === 400_000_000, "Deposit - Withdraw bugged");
      });

      it("Transfer from user 1 to user 2 as owner", async function () {
        const [sig1, sig2] = await ethers.getSigners();
        await dependencies.users.bmTransfer(sig1.address,sig2.address,100_000_000);
        let balance = Number(await dependencies.users.getBalanceUser(sig1.address));
        expecting(balance === 300_000_000, "BM Transfer bugged");
        balance = Number(await dependencies.users.getBalanceUser(sig2.address));
        expecting(balance === 100_000_000, "BM Transfer bugged");
      });

      it("Transfer from user 1 to user 2", async function () {
        const [sig1, sig2] = await ethers.getSigners();
        await dependencies.users.connect(sig1).transfer(sig2.address,100_000_000);
        let balance = Number(await dependencies.users.getBalanceUser(sig1.address));
        expecting(balance === 200_000_000, "Transfer bugged");
        balance = Number(await dependencies.users.getBalanceUser(sig2.address));
        expecting(balance === 200_000_000, "Transfer bugged");
      });

      it("Give money to user 2", async function () {
        const [, sig2] = await ethers.getSigners();
        await dependencies.users.giveMoney(sig2.address,500_000_000);
        const balance = Number(await dependencies.users.getBalanceUser(sig2.address));
        expecting(balance === 700_000_000, "Give Money bugged");
      });

      it("Create a company user, for partnership", async function () {
        const [, , , sig4] = await ethers.getSigners();
        await dependencies.users.addUser(true, sig4.address);
      });

      it("Create a partnership between a company and owner", async function () {
        const [, , sig3] = await ethers.getSigners();
        await dependencies.users.addPartner(sig3.address, 5);
        const partnerFee: Number = Number(await dependencies.users.getPartnerFee(sig3.address));
        expecting(partnerFee === 5, "Add partner method bugged");
      });

      it("Create a partnership between a company and its users", async function () {
        const [, , , sig4, sig5] = await ethers.getSigners();
        await dependencies.users.connect(sig4).addReferralUser(sig5.address);
        const referred: string = await dependencies.users.getReferrer(sig5.address);
        expecting(referred === sig4.address, "Add referral user bugged");
        resolve();
      });
    });
  });
}