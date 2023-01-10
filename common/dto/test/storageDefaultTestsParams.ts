import { QUsers } from "../../../typechain-types/contracts/private/Users.sol/QUsers";
import { QGames } from "../../../typechain-types/contracts/private/Games.sol/QGames";
import { QStorage } from "../../../typechain-types/contracts/private/Storage.sol/QStorage";

export interface StorageDefaultTestsParams {
    storage: QStorage;
    games: QGames;
    users: QUsers;
}