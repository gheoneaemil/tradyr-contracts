import { QUsers } from "../../../typechain-types/contracts/private/Users.sol/QUsers";
import { QGames } from "../../../typechain-types/contracts/private/Games.sol/QGames";
import { QSales } from "../../../typechain-types/contracts/private/Sales.sol/QSales";

export interface SalesDefaultTestsParams {
    sales: QSales;
    games: QGames;
    users: QUsers;
}