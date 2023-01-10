import { DeployedAuctions } from '../../common/dto/test/DeployedAuctions';
import { DeployedExchanges } from '../../common/dto/test/DeployedExchanges';
import { DeployedGames } from '../../common/dto/test/DeployedGames';
import { DeployedItemBets } from '../../common/dto/test/DeployedItemBets';
import { DeployedLotteries } from '../../common/dto/test/DeployedLotteries';
import { DeployedRents } from '../../common/dto/test/DeployedRents';
import { DeployedSales } from '../../common/dto/test/DeployedSales';
import { DeployedStorage } from '../../common/dto/test/DeployedStorage';
import { DeployedUsers } from '../../common/dto/test/DeployedUsers';
import { run as runUsers } from './1_Deploy_Users';
import { run as runGames } from './2_Deploy_Games';
import { set as setUsers } from './3_Set_Users';
import { run as runSales } from './4_Deploy_Sales';
import { run as runAuctions } from './5_Deploy_Auctions';
import { run as runStorage } from './6_Deploy_Storage';
import { run as runExchanges } from './7_Deploy_Exchanges';
import { run as runLotteries } from './8_Deploy_Lotteries';
import { run as runRents } from './9_Deploy_Rents';
import { run as runItemBets } from './10_Deploy_ItemBets';
import { set as usersDefaultTests } from './11_Users/11_1_Default_Tests';
import { set as gamesDefaultTests } from './12_Games/12_1_Default_Tests';
import { set as salesDefaultTests } from './13_Sales/13_1_Default_Tests';
import { set as exchangesDefaultTests } from './14_Exchanges/14_1_Default_Tests';
import { set as storageDefaultTests } from './15_Storage/15_1_Default_Tests';


async function main() {

    const users: DeployedUsers = await runUsers();
    
    const games: DeployedGames = await runGames({
        users: users.users
    });

    await setUsers({
        games: games.games,
        users: users.users
    });

    const sales: DeployedSales = await runSales({
        games: games.games,
        users: users.users
    });

    const auctions: DeployedAuctions = await runAuctions({
        games: games.games,
        users: users.users
    });

    const storage: DeployedStorage = await runStorage({
        games: games.games,
        users: users.users
    });

    const exchanges: DeployedExchanges = await runExchanges({
        games: games.games
    });

    const lotteries: DeployedLotteries = await runLotteries({
        users: users.users,
        games: games.games
    });

    const rents: DeployedRents = await runRents({
        games: games.games,
        users: users.users,
        validation: 432000
    });

    const itemBets: DeployedItemBets = await runItemBets({
        games: games.games
    });

    await usersDefaultTests({
        users: users.users,
        games: games.games
    });

    await gamesDefaultTests({
        games: games.games
    });

    await salesDefaultTests({
        sales: sales.sales,
        games: games.games,
        users: users.users
    });

    await exchangesDefaultTests({
        exchanges: exchanges.exchanges,
        games: games.games,
        users: users.users
    });

    await storageDefaultTests({
        games: games.games,
        storage: storage.storage,
        users: users.users
    });
    
}

main();