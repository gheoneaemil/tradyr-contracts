
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { deployContract } from "../plugins/deployContract";

const totalRuns = 10;
let EAuctionsTemplate: Contract, EAuctionsMethods: Contract, ERC721: Contract, Discounts: Contract, EERC20: Contract;

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

describe("Should deploy the EAuctions", function () {
  
  it("Deployment", async function () {
    EAuctionsMethods = await deployContract({
      name: 'AUCTIONSMETHODS',
      constructor: [],
      props: {}
    });

    EAuctionsTemplate = await deployContract({
      name: 'AUCTIONS',
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

  it("Should set EAuctions params", async function () {
    await EAuctionsTemplate.setParams(20,Discounts.address, EAuctionsMethods.address);
    let contractFee = await EAuctionsTemplate.fee();
    let contractDiscounts = await EAuctionsTemplate.discounts();
    let contractMethods = await EAuctionsTemplate.methods();
    expect(20 === Number(contractFee));
    expect(Discounts.address.toLowerCase() === contractDiscounts.toLowerCase());
    expect(EAuctionsMethods.address.toLowerCase() === contractMethods.toLowerCase());
  });

});

describe("EAuctions functionalities", function () {

  it("Should create " + totalRuns + "x erc721s", async function () {
    const [owner] = await ethers.getSigners();
    for ( let i = 0 ; i < totalRuns ; ++i )
      await ERC721.awardItem(owner.address,"");
  });

  it("Should create " + totalRuns + "x auctions", async function () {
    for ( let i = 1 ; i < totalRuns ; ++i ) {
      await ERC721.approve(EAuctionsTemplate.address,i);
      await EAuctionsTemplate.create(
        [ERC721.address],
        [i],
        [1],
        [0],
        50000000000,
        3000000000,
        "0x0000000000000000000000000000000000000000"
      );  
    }
  });

  it("Should cancel an auction", async function () {
    await EAuctionsTemplate.cancel(2);  
  });

  it("Should bid", async function () {
    const [, buyer] = await ethers.getSigners();
    let auction = await EAuctionsTemplate.get(1);
    await EAuctionsTemplate.connect(buyer).bid(1,{ value: Number(auction.price) + Number(auction.tax) });  
  });

  it("Should finish auction", async function () {
    await EAuctionsTemplate.finish(1);  
  });

  it('Should test the workflow using msg.value', async function () {
    const [owner, seller] = await ethers.getSigners();
    await ERC721.awardItem(owner.address, "");
    let tokenId = await ERC721.id();
    await ERC721.approve(EAuctionsTemplate.address,tokenId);
    await EAuctionsTemplate.create(
      [ERC721.address],
      [tokenId],
      [1],
      [0],
      50000000000,
      3000000000,
      "0x0000000000000000000000000000000000000000"
    );
    let currentAuctionId = Number(await EAuctionsTemplate.id()) - 1;
    let currentAuction = await EAuctionsTemplate.get(currentAuctionId);
    let currentAuctionPrices = await EAuctionsTemplate.operationDiscountCosts(owner.address, currentAuctionId);
    await Discounts.addDiscount(
      0, // erc 721
      ERC721.address,
      2,
      [tokenId]
    );
    let afterAuctionPrices = await EAuctionsTemplate.operationDiscountCosts(owner.address, currentAuctionId);
    expect(Number(currentAuctionPrices.totalToPay) < Number(afterAuctionPrices.totalToPay));
    let ownerOfToken = await ERC721.ownerOf(tokenId);

    ownerOfToken = await ERC721.ownerOf(tokenId);
    currentAuction = await EAuctionsTemplate.get(currentAuctionId);
    await ERC721.approve(EAuctionsTemplate.address,Number(tokenId));

    let toPay = Number(currentAuction.price);
    await EAuctionsTemplate.bid(currentAuctionId,{
      value: toPay
    });

    toPay += Number(currentAuction.tax);
    await EAuctionsTemplate.bid(currentAuctionId,{
      value: toPay
    });

    toPay += Number(currentAuction.tax);
    await EAuctionsTemplate.bid(currentAuctionId,{
      value: toPay
    });

    toPay += Number(currentAuction.tax);
    await EAuctionsTemplate.bid(currentAuctionId,{
      value: toPay
    });

    toPay += Number(currentAuction.tax);
    await EAuctionsTemplate.bid(currentAuctionId,{
      value: toPay
    });

    await EAuctionsTemplate.finish(currentAuctionId);

  });

  it('Should test the workflow using erc20 tokens', async function () {
    const [owner, seller] = await ethers.getSigners();
    await ERC721.awardItem(owner.address, "");
    let tokenId = await ERC721.id();
    await ERC721.approve(EAuctionsTemplate.address,tokenId);
    await EERC20.approve(EAuctionsTemplate.address,500);
    await EAuctionsTemplate.create(
      [ERC721.address],
      [tokenId],
      [1],
      [0],
      50000000000,
      3000000000,
      EERC20.address
    );
    let currentAuctionId = Number(await EAuctionsTemplate.id()) - 1;
    let currentAuction = await EAuctionsTemplate.get(currentAuctionId);
    let currentAuctionPrices = await EAuctionsTemplate.operationDiscountCosts(owner.address, currentAuctionId);
    await Discounts.editDiscount(
      1,
      ERC721.address,
      4,
      [tokenId],
      0, // erc 721
    );
    let afterSalePrices = await EAuctionsTemplate.operationDiscountCosts(owner.address, currentAuctionId);
    expect(Number(currentAuctionPrices.totalToPay) < Number(afterSalePrices.totalToPay));
    let ownerOfToken = await ERC721.ownerOf(tokenId);
    ownerOfToken = await ERC721.ownerOf(tokenId);
    currentAuction = await EAuctionsTemplate.get(currentAuctionId);
    await ERC721.approve(EAuctionsTemplate.address,Number(tokenId));
    
    let toPay = Number(currentAuction.price);
    await EERC20.approve(EAuctionsTemplate.address,Number(currentAuction.price));
    await EAuctionsTemplate.bid(currentAuctionId);

    toPay += Number(currentAuction.tax);
    await EERC20.approve(EAuctionsTemplate.address,toPay);
    await EAuctionsTemplate.bid(currentAuctionId);

    toPay += Number(currentAuction.tax);
    await EERC20.approve(EAuctionsTemplate.address,toPay);
    await EAuctionsTemplate.bid(currentAuctionId);

    toPay += Number(currentAuction.tax);
    await EERC20.approve(EAuctionsTemplate.address,toPay);
    await EAuctionsTemplate.bid(currentAuctionId);

    toPay += Number(currentAuction.tax);
    await EERC20.approve(EAuctionsTemplate.address,toPay);
    await EAuctionsTemplate.bid(currentAuctionId);
    
    await EAuctionsTemplate.finish(currentAuctionId);

  });

});