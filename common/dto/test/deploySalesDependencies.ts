import { QGames } from "../../../typechain-types/contracts/private/Games.sol/QGames";
import { QUsers } from "../../../typechain-types/contracts/private/Users.sol/QUsers";

export interface DeploySalesDependencies {
    users: QUsers;
    games: QGames
}