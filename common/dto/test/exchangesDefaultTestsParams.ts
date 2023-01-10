import { QUsers } from "../../../typechain-types/contracts/private/Users.sol/QUsers";
import { QGames } from "../../../typechain-types/contracts/private/Games.sol/QGames";
import { QExchanges } from "../../../typechain-types/contracts/private/Exchanges.sol/QExchanges";

export interface ExchangesDefaultTestsParams {
    exchanges: QExchanges;
    games: QGames;
    users: QUsers;
}