
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";
import { deployContract } from "../plugins/deployContract";

const totalRuns = 10;
let ESalesMethods: Contract, ESalesTemplate: Contract, ERC721: Contract, Discounts: Contract, EERC20: Contract;

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

describe("Should deploy the ESales", function () {
  
  it("Should deploy the ESales for tests", async function () {

    ESalesMethods = await deployContract({
      name: 'SALESMETHODS',
      constructor: [],
      props: {}
    });

    ESalesTemplate = await deployContract({
      name: 'SALES',
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

  it("Should set ESales params", async function () {
    await ESalesTemplate.setParams(20,Discounts.address,ESalesMethods.address);
    let contractFee = await ESalesTemplate.fee();
    let contractDiscounts = await ESalesTemplate.discounts();
    let contractMethods = await ESalesTemplate.methods();
    expect(20 === Number(contractFee));
    expect(Discounts.address.toLowerCase() === contractDiscounts.toLowerCase());
    expect(ESalesMethods.address.toLowerCase() === contractMethods.toLowerCase());
  });

});

describe("ESales functionalities", function () {

  it("Should create " + totalRuns + "x erc721s", async function () {
    const [owner] = await ethers.getSigners();
    for ( let i = 0 ; i < totalRuns ; ++i )
      await ERC721.awardItem(owner.address,"");
  });

  it("Should create " + totalRuns + "x sales", async function () {
    for ( let i = 1 ; i < totalRuns ; ++i ) {
      await ERC721.approve(ESalesTemplate.address,i);
      await ESalesTemplate.sell(
        [ERC721.address],
        [i],
        [1],
        [0],
        50000000000,
        "0x0000000000000000000000000000000000000000"
      );  
    }
  });

  it("Should cancel a sale", async function () {
    let sale = await ESalesTemplate.get(2);
    await ESalesTemplate.cancel(2);  
  });

  it("Should purchase", async function () {
    const [, buyer] = await ethers.getSigners();
    let sale = await ESalesTemplate.get(1);
    await ESalesTemplate.connect(buyer).buy(1,{ value: sale.price });  
  });

  it('Should test the workflow using msg.value', async function () {
    const [owner, seller] = await ethers.getSigners();
    await ERC721.awardItem(owner.address, "");
    let tokenId = await ERC721.id();
    await ERC721.approve(ESalesTemplate.address,tokenId);
    await ESalesTemplate.sell(
      [ERC721.address],
      [tokenId],
      [1],
      [0],
      50000000000,
      "0x0000000000000000000000000000000000000000"
    );
    let currentSaleId = Number(await ESalesTemplate.id()) - 1;
    let currentSale = await ESalesTemplate.get(currentSaleId);
    let currentSalePrices = await ESalesTemplate.operationDiscountCosts(owner.address, currentSaleId);
    await Discounts.addDiscount(
      0, // erc 721
      ERC721.address,
      2,
      [tokenId]
    );
    let afterSalePrices = await ESalesTemplate.operationDiscountCosts(owner.address, currentSaleId);
    expect(Number(currentSalePrices.totalToPay) < Number(afterSalePrices.totalToPay));
    currentSale = await ESalesTemplate.get(currentSaleId);
    await ERC721.approve(ESalesTemplate.address,Number(tokenId));
    await ESalesTemplate.buy(currentSaleId,{
      value: currentSale.price
    });
  });

  it('Should test the workflow using erc20 tokens', async function () {
    const [owner, seller] = await ethers.getSigners();
    await ERC721.awardItem(owner.address, "");
    let tokenId = await ERC721.id();
    await ERC721.approve(ESalesTemplate.address,tokenId);
    await EERC20.approve(ESalesTemplate.address,500);
    await ESalesTemplate.sell(
      [ERC721.address],
      [tokenId],
      [1],
      [0],
      50000000000,
      "0x0000000000000000000000000000000000000000"
    );
    let currentSaleId = Number(await ESalesTemplate.id()) - 1;
    let currentSale = await ESalesTemplate.get(currentSaleId);
    let currentSalePrices = await ESalesTemplate.operationDiscountCosts(owner.address, currentSaleId);
    await Discounts.editDiscount(
      1,
      ERC721.address,
      4,
      [tokenId],
      0, // erc 721
    );
    let afterSalePrices = await ESalesTemplate.operationDiscountCosts(owner.address, currentSaleId);
    expect(Number(currentSalePrices.totalToPay) < Number(afterSalePrices.totalToPay));
    currentSale = await ESalesTemplate.get(currentSaleId);
    await ERC721.approve(ESalesTemplate.address,Number(tokenId));
    await ESalesTemplate.buy(currentSaleId, { value : currentSale.price });
  });

});