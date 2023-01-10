import { deployContract } from "../plugins/deployContract";
import { globalParams } from "../common/params";
import { QUsers } from "../typechain-types/Users.sol/QUsers";
import { QGames } from "../typechain-types/Games.sol/QGames";
import { QSales } from "../typechain-types/Sales.sol/QSales";
import { QAuctions } from "../typechain-types/Auctions.sol/QAuctions";
import { QStorage } from "../typechain-types/Storage.sol/QStorage";
import { QExchanges } from "../typechain-types/Exchanges.sol/QExchanges";
import { QLotteries } from "../typechain-types/Lotteries.sol/QLotteries";
import { QRents } from "../typechain-types/Rents.sol/QRents";
import { QItemBets } from "../typechain-types/ItemBets.sol/QItemBets";


async function main() {

  let users: QUsers = await deployContract({
    name: 'USERS',
    constructor: [globalParams.address0],
    props: {}
  }) as QUsers;
  
  let games: QGames = await deployContract({
    name: 'GAMES',
    constructor: [users.address],
    props: {}
  }) as QGames;

  await users.setGlobalParams(games.address);

  await deployContract({
    name: 'SALES',
    constructor: [users.address, games.address],
    props: {}
  }) as QSales;

  await deployContract({
    name: 'AUCTIONS',
    constructor: [users.address, games.address],
    props: {}
  }) as QAuctions;

  await deployContract({
    name: 'STORAGE',
    constructor: [users.address, games.address],
    props: {}
  }) as QStorage;

  await deployContract({
    name: 'EXCHANGES',
    constructor: [games.address],
    props: {}
  }) as QExchanges;

  await deployContract({
    name: 'LOTTERIES',
    constructor: [users.address,games.address],
    props: {}
  }) as QLotteries

  await deployContract({
    name: 'RENTS',
    constructor: [users.address,games.address,432000],
    props: {}
  }) as QRents;

  await deployContract({
    name: 'ITEMBETS',
    constructor: [games.address],
    props: {}
  }) as QItemBets;

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
