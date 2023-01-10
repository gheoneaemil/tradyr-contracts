import { run } from "hardhat";
import { deployContract } from "../plugins/deployContract";
import { network } from 'hardhat';


async function main() {

  const discounts = await deployContract({
    name: 'Discounts',
    constructor: [],
    props: {}
  });
  
  const evmRentsMethods = await deployContract({
    name: 'RENTSMETHODS',
    constructor: [],
    props: {}
  });

  const evmRentsTemplate = await deployContract({
    name: 'RENTS',
    constructor: [],
    props: {}
  });

  const evmSalesMethods = await deployContract({
    name: 'SALESMETHODS',
    constructor: [],
    props: {}
  });

  const evmSalesTemplate = await deployContract({
    name: 'SALES',
    constructor: [],
    props: {}
  });

  const evmAuctionsMethods = await deployContract({
    name: 'AUCTIONSMETHODS',
    constructor: [],
    props: {}
  });

  const evmAuctionsTemplate = await deployContract({
    name: 'AUCTIONS',
    constructor: [],
    props: {}
  });

  try {
    await evmSalesTemplate.setParams(20,discounts.address,evmSalesMethods.address);
  } catch (err) {
    console.error(err);
  }

  try {
    await evmRentsTemplate.setParams(20,discounts.address,evmRentsMethods.address);
  } catch (err) {
    console.error(err);
  }

  try {
    await evmAuctionsTemplate.setParams(20,discounts.address,evmAuctionsMethods.address);
  } catch (err) {
    console.error(err);
  }

  if ( network.name !== "hardhat" ) {

    try {
      await run("verify:verify", {
        address: discounts.address
      });
    } catch (err) {
      console.error(err);
    }

    try {
      await run("verify:verify", {
        address: evmSalesMethods.address
      });
    } catch (err) {
      console.error(err);
    }
    
    try {
      await run("verify:verify", {
        address: evmSalesTemplate.address
      });
    } catch (err) {
      console.error(err);
    }

    try {
      await run("verify:verify", {
        address: evmAuctionsMethods.address
      });
    } catch (err) {
      console.error(err);
    }

    try {
      await run("verify:verify", {
        address: evmAuctionsTemplate.address
      });
    } catch (err) {
      console.error(err);
    }

    try {
      await run("verify:verify", {
        address: evmRentsMethods.address
      });
    } catch (err) {
      console.error(err);
    }

    try {
      await run("verify:verify", {
        address: evmRentsTemplate.address
      });
    } catch (err) {
      console.error(err);
    }

  }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
