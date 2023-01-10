// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "./interfaces/IGames.sol";
import "./interfaces/IUsers.sol";
import "./interfaces/ITakeItemHandler.sol";
import "./interfaces/IGiveItemHandler.sol";
import "./interfaces/IRefundItemHandler.sol";


contract QLotteries is BMarketTakeItemHandler, BMarketGiveItemHandler, BMarketRefundItemHandler {

    event AddPlayer(address indexed user, uint indexed game, uint server, uint item, uint indexed id);
    event PlayerAdded(address indexed user, uint indexed game, uint server, uint item, uint indexed id);
    event PlayerNotAdded(address indexed user, uint indexed game, uint indexed id);
    event CompanyLotteryCreated(address indexed user, uint indexed game, uint server, uint item, uint indexed id, uint tax, uint totalMoney);
    
    address public owner;
    IBMarketUsers public users;
    IBMarketGames public games;
    uint public id = 1;
    enum LotteryStatus {
        PENDING,
        APPROVED,
        CANCELLED,
        REVOKED,
        FINISHED
    }
    struct Lottery {
        mapping(address => address) playersToVerify;
        address[] players;
        address owner;
        uint game;
        uint victoryNumber;
        uint totalMoney;
		uint currentMoney;
		uint tax;
        uint item;
        uint server;
        LotteryStatus status;
    }
    mapping(uint => Lottery) public lotteries;

    function verifyPlayer(uint lottery, address player) external view returns(address) {
        return lotteries[lottery].playersToVerify[player];
    }
    
    function lotteryPlayers(uint lottery) external view returns(address[] memory) {
        return lotteries[lottery].players;
    }


    modifier onlyOwner {
        require(owner == msg.sender);
        _;
    }
    
    constructor(address busers, address bgames) {
        owner = msg.sender;
        users = IBMarketUsers(busers);
        games = IBMarketGames(bgames);
    }
    
    
    function setGlobalParams(address busers, address bgames) external onlyOwner {
        users = IBMarketUsers(busers);
        games = IBMarketGames(bgames);
    }

	
    function createLottery(
        uint game, 
        uint tax, 
        uint server, 
        uint item, 
        uint totalMoney
    ) external {

        require(game > 0 && server > 0 && item > 0);
        require(tax < ( totalMoney / 2 ) && totalMoney >= 100);

        games.checkUser(msg.sender,game,server,item);

        lotteries[id].owner = msg.sender;
        lotteries[id].game = game;
        lotteries[id].server = server;
        lotteries[id].item = item;
        lotteries[id].tax = tax;
        lotteries[id].totalMoney = totalMoney;
        

        if ( games.getGameOwner(game) == msg.sender ) {

            lotteries[id].status = LotteryStatus.APPROVED;
            emit CompanyLotteryCreated(
                msg.sender,
                game,
                server,
                item,
                id,
                tax,
                totalMoney
            );

        } else {

            lotteries[id].status = LotteryStatus.PENDING;
            emit BMarketTakeItemHandler.TakeItem(
                msg.sender,
                game,
                server,
                item,
                id,
                [uint256(tax),uint256(totalMoney)]
            );

        }
        ++id;
        
    }
    
    function companyLotteryValidation(
        uint lottery,
        bool companyValidation
    ) external {

        require(lotteries[lottery].status == LotteryStatus.PENDING);
        games.checkCompany(msg.sender,lotteries[lottery].game,lotteries[lottery].server,lotteries[lottery].item);

        if ( companyValidation ){

            lotteries[lottery].status = LotteryStatus.APPROVED;
            emit BMarketTakeItemHandler.ItemTaken(
                lotteries[lottery].owner,
                lotteries[lottery].game,
                lotteries[lottery].server,
                lotteries[lottery].item,
                lottery
            );

        } else {

            lotteries[lottery].status = LotteryStatus.REVOKED;
            emit BMarketTakeItemHandler.ItemNotTaken(
                lotteries[lottery].owner,
                lotteries[lottery].game,
                lottery
            );

        }

    }
    
    function addLotteryPlayer(
        uint lottery
    ) external {

        require(lotteries[lottery].status == LotteryStatus.APPROVED);
        require(msg.sender != lotteries[lottery].owner);
        games.checkUser(msg.sender,lotteries[lottery].game,lotteries[lottery].server,lotteries[lottery].item);
        lotteries[lottery].playersToVerify[msg.sender] = msg.sender;

        emit AddPlayer(
            msg.sender,
            lotteries[lottery].game,
            lotteries[lottery].server,
            lotteries[lottery].item,
            lottery
        );

    }
    
    function addLotteryPlayerValidation(
        uint lottery, 
        address player, 
        bool companyValidation
    ) external {

        require(lotteries[lottery].playersToVerify[player] == player && player != address(0));
        require(lotteries[lottery].status == LotteryStatus.APPROVED);
        lotteries[lottery].playersToVerify[player] = address(0);
        games.checkCompany(msg.sender,lotteries[lottery].game,lotteries[lottery].server,lotteries[lottery].item);

        
        if ( companyValidation ){

            users.userWithdraw(player,lotteries[lottery].tax);
            lotteries[lottery].players.push(player);
            lotteries[lottery].currentMoney += lotteries[lottery].tax;
            emit PlayerAdded(
                player,
                lotteries[lottery].game,
                lotteries[lottery].server,
                lotteries[lottery].item,
                lottery
            );

        } else 
            emit PlayerNotAdded(
                player,
                lotteries[lottery].game,
                lottery
            );
    }
    
    function cancelLottery(
        uint lottery
    ) external {

        require(lotteries[lottery].status == LotteryStatus.APPROVED);
        require(lotteries[lottery].owner == msg.sender);

        emit BMarketRefundItemHandler.RefundItem(lotteries[lottery].owner,lotteries[lottery].game,lotteries[lottery].server,lotteries[lottery].item,lottery);

    }
    
    function cancelledLottery(uint lottery, bool companyValidation) external {
        require(lotteries[lottery].status == LotteryStatus.APPROVED);
        games.checkCompany(msg.sender,lotteries[lottery].game,lotteries[lottery].server,lotteries[lottery].item);

        if ( companyValidation ) {

            lotteries[lottery].status = LotteryStatus.CANCELLED;
            for ( uint i = 0 ; i < lotteries[lottery].players.length ; ++i )
                users.userDeposit(lotteries[lottery].players[i], lotteries[lottery].tax);

            emit BMarketRefundItemHandler.ItemRefunded(
                lotteries[lottery].owner,
                lotteries[lottery].game,
                lotteries[lottery].server,
                lotteries[lottery].item,
                lottery
            );

        } else
            emit BMarketRefundItemHandler.ItemNotRefunded(
                lotteries[lottery].owner,
                lotteries[lottery].game,
                lottery
            );
    }
    
    function finishLottery(
        uint lottery
    ) external {

		require(lotteries[lottery].currentMoney >= lotteries[lottery].totalMoney && lotteries[lottery].status == LotteryStatus.APPROVED);
        require(lotteries[lottery].owner == msg.sender);

        uint randomnumber = uint(keccak256(abi.encodePacked(lottery, lotteries[lottery].owner, block.number))) % lotteries[lottery].players.length;

        lotteries[lottery].victoryNumber = randomnumber;

        emit BMarketGiveItemHandler.GiveItem(
            lotteries[lottery].players[randomnumber],
            lotteries[lottery].game,
            lotteries[lottery].server,
            lotteries[lottery].item,
            lottery
        );

    }
    
    function finishedLottery(
        uint lottery, 
        bool companyValidation
    ) external {

        games.checkCompany(msg.sender,lotteries[lottery].game,lotteries[lottery].server,lotteries[lottery].item);
        require(lotteries[lottery].status == LotteryStatus.APPROVED);

        if ( companyValidation ){

            lotteries[lottery].status = LotteryStatus.FINISHED;
            uint[2] memory theFees = games.getFees(lotteries[lottery].game);
            address referrer = users.getReferrer(lotteries[lottery].owner);

            users.userDeposit(owner,lotteries[lottery].currentMoney / theFees[0]);
            users.userDeposit(games.getGameOwner(lotteries[lottery].game),lotteries[lottery].currentMoney / theFees[1]);

            if ( referrer == address(0) ) {
                users.userDeposit(lotteries[lottery].owner,lotteries[lottery].totalMoney - lotteries[lottery].currentMoney / theFees[0] - lotteries[lottery].currentMoney / theFees[1]);
            } else {

                uint partnerFee = users.getPartnerFee(referrer);
                users.userDeposit(referrer,lotteries[lottery].currentMoney / partnerFee);
                users.userDeposit(lotteries[lottery].owner,lotteries[lottery].totalMoney -  lotteries[lottery].currentMoney / theFees[0] - lotteries[lottery].currentMoney / theFees[1] - lotteries[lottery].currentMoney / partnerFee);

            }

            emit BMarketGiveItemHandler.ItemGiven(
                lotteries[lottery].players[lotteries[lottery].victoryNumber],
                lotteries[lottery].game,
                lotteries[lottery].server,
                lotteries[lottery].item,
                lottery
            );
        
        } else
            emit BMarketGiveItemHandler.ItemNotGiven(
                lotteries[lottery].players[lotteries[lottery].victoryNumber],
                lotteries[lottery].game,
                lottery
            );
            
    }
    
}