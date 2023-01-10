import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { deployContract } from "../plugins/deployContract";

const totalRuns = 10;
let ERentsMethods: Contract, ERentsTemplate: Contract, ERC721: Contract, Discounts: Contract, EERC20: Contract;

describe("Should deploy the ERC721", function () {
  
  it("Deployment", async function () {
    ERC721 = await deployContract({
      name: 'EERC721',
      constructor: [],
      props: {}
    });
  });

});

describe("Should deploy the ERC20", function () {
  
  it("Deployment", async function () {
    EERC20 = await deployContract({
      name: 'EERC20',
      constructor: ['9999999999999999'],
      props: {}
    });
  });

});

describe("Should deploy the Discounts", function () {
  
  it("Deployment", async function () {
    Discounts = await deployContract({
      name: 'Discounts',
      constructor: [],
      props: {}
    });
  });

});

describe("Should deploy the ERents", function () {
  
  it("Deployment", async function () {

    ERentsMethods = await deployContract({
      name: 'RENTSMETHODS',
      constructor: [],
      props: {}
    });

    ERentsTemplate = await deployContract({
      name: 'RENTS',
      constructor: [],
      props: {}
    });

  });

});

describe("Should set the contracts configuration", function () {

  it("Should create discounts", async function () {
    await Discounts.addDiscount(
      1,
      ERC721.address,
      10,
      Array.from(Array(totalRuns).keys())
    );
  });

  it("Should set ERents params", async function () {
    await ERentsTemplate.setParams(20,Discounts.address,ERentsMethods.address);
    let contractFee = await ERentsTemplate.fee();
    let contractDiscounts = await ERentsTemplate.discounts();
    let contractMethods = await ERentsTemplate.methods();
    expect(20 === Number(contractFee));
    expect(Discounts.address.toLowerCase() === contractDiscounts.toLowerCase());
    expect(ERentsMethods.address.toLowerCase() === contractMethods.toLowerCase());
  });

});

describe("ERents functionalities", function () {

  it("Should create " + totalRuns + "x erc721s", async function () {
    const [owner] = await ethers.getSigners();
    for ( let i = 0 ; i < totalRuns ; ++i )
      await ERC721.awardItem(owner.address, "");
  });

  it("Should create " + totalRuns + "x rents", async function () {
    for ( let i = 1 ; i < totalRuns ; ++i ) {
      await ERC721.approve(ERentsTemplate.address,i);
      await ERentsTemplate.create(
        [ERC721.address],
        [i],
        [1],
        [0],
        500000,
        50000000000,
        50000000,
        "0x0000000000000000000000000000000000000000"
      );  
    }
  });

  it("Should cancel a rent", async function () {
    let rent = await ERentsTemplate.get(2);
    await ERentsTemplate.cancel(2);
  });

  it("Should use a rent", async function () {
    const [, renter] = await ethers.getSigners();
    let rent = await ERentsTemplate.get(1);
    await ERentsTemplate.connect(renter).rent(
      1, { value : rent.price }
    );  
  });

  it("Should finish a rent", async function () {
    const [, renter] = await ethers.getSigners();
    let rent = await ERentsTemplate.get(1);
    for ( let i = 0 , l = rent.nftIds.length ; i < l ; ++i ) {
      await ERC721.connect(renter).approve(ERentsTemplate.address,Number(rent.nftIds[i]));
      await ERentsTemplate.connect(renter).finish(1);  
    }
  });

  it('Should test the workflow using msg.value', async function () {
    const [owner, renter] = await ethers.getSigners();
    await ERC721.awardItem(owner.address, "");
    let tokenId = await ERC721.id();
    await ERC721.approve(ERentsTemplate.address,tokenId);
    await ERentsTemplate.create(
      [ERC721.address],
      [tokenId],
      [1],
      [0],
      500000,
      50000000000,
      50000000,
      "0x0000000000000000000000000000000000000000"
    );
    let currentRentId = Number(await ERentsTemplate.id()) - 1;
    let currentRent = await ERentsTemplate.get(currentRentId);
    let currentRentPrices = await ERentsTemplate.operationDiscountCosts(owner.address, currentRentId);
    await Discounts.addDiscount(
      0, // erc 721
      ERC721.address,
      2,
      [tokenId]
    );
    let afterRentPrices = await ERentsTemplate.operationDiscountCosts(owner.address, currentRentId);
    expect(Number(currentRentPrices.totalToPay) < Number(afterRentPrices.totalToPay));
    let ownerOfToken = await ERC721.ownerOf(tokenId);
    await ERentsTemplate.rent(
      currentRentId, { value : currentRent.price }
    );
    ownerOfToken = await ERC721.ownerOf(tokenId);
    currentRent = await ERentsTemplate.get(currentRentId);
    await ERC721.approve(ERentsTemplate.address,Number(tokenId));
    await ERentsTemplate.finish(currentRentId);
  });

  it('Should test the workflow using erc20 tokens', async function () {
    const [owner, renter] = await ethers.getSigners();
    await ERC721.awardItem(owner.address, "");
    let tokenId = await ERC721.id();
    await ERC721.approve(ERentsTemplate.address,tokenId);
    await EERC20.approve(ERentsTemplate.address,500);
    await ERentsTemplate.create(
      [ERC721.address],
      [tokenId],
      [1],
      [0],
      500000,
      500,
      100,
      EERC20.address
    );
    let currentRentId = Number(await ERentsTemplate.id()) - 1;
    let currentRent = await ERentsTemplate.get(currentRentId);
    let currentRentPrices = await ERentsTemplate.operationDiscountCosts(owner.address, currentRentId);
    await Discounts.editDiscount(
      1,
      ERC721.address,
      4,
      [tokenId],
      0, // erc 721
    );
    let afterRentPrices = await ERentsTemplate.operationDiscountCosts(owner.address, currentRentId);
    expect(Number(currentRentPrices.totalToPay) < Number(afterRentPrices.totalToPay));
    let ownerOfToken = await ERC721.ownerOf(tokenId);
    await ERentsTemplate.rent(
      currentRentId, { value : currentRent.price }
    );
    ownerOfToken = await ERC721.ownerOf(tokenId);
    currentRent = await ERentsTemplate.get(currentRentId);
    await ERC721.approve(ERentsTemplate.address,Number(tokenId));
    await ERentsTemplate.finish(currentRentId);
  });

  it('Should test the workflow using erc20 tokens for terminate', async function () {
    const [owner, renter] = await ethers.getSigners();
    await ERC721.awardItem(owner.address, "");
    let tokenId = await ERC721.id();
    await ERC721.approve(ERentsTemplate.address,tokenId);
    await EERC20.approve(ERentsTemplate.address,500);
    await ERentsTemplate.create(
      [ERC721.address],
      [tokenId],
      [1],
      [0],
      1,
      500,
      100,
      EERC20.address
    );
    let currentRentId = Number(await ERentsTemplate.id()) - 1;
    let currentRent = await ERentsTemplate.get(currentRentId);
    let currentRentPrices = await ERentsTemplate.operationDiscountCosts(owner.address, currentRentId);
    await Discounts.editDiscount(
      1,
      ERC721.address,
      4,
      [tokenId],
      0, // erc 721
    );
    let afterRentPrices = await ERentsTemplate.operationDiscountCosts(owner.address, currentRentId);
    expect(Number(currentRentPrices.totalToPay) < Number(afterRentPrices.totalToPay));
    let ownerOfToken = await ERC721.ownerOf(tokenId);
    await ERentsTemplate.rent(
      currentRentId, { value : currentRent.price }
    );
    ownerOfToken = await ERC721.ownerOf(tokenId);
    currentRent = await ERentsTemplate.get(currentRentId);
    await ERC721.approve(ERentsTemplate.address,Number(tokenId));
  });

});