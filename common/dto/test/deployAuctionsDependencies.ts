import { QGames } from "../../../typechain-types/contracts/private/Games.sol/QGames";
import { QUsers } from "../../../typechain-types/contracts/private/Users.sol/QUsers";

export interface DeployAuctionsDependencies {
    users: QUsers;
    games: QGames
}