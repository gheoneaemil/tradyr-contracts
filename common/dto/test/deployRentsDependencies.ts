import { QUsers } from "../../../typechain-types/contracts/private/Users.sol/QUsers";
import { QGames } from "../../../typechain-types/contracts/private/Games.sol/QGames";

export interface DeployRentsDependencies {
    users: QUsers;
    games: QGames;
    validation: number;
}