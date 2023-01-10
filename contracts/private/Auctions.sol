// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "./interfaces/IGames.sol";
import "./interfaces/IUsers.sol";
import "./interfaces/ITakeItemHandler.sol";
import "./interfaces/IGiveItemHandler.sol";
import "./interfaces/IRefundItemHandler.sol";


contract QAuctions is BMarketTakeItemHandler, BMarketGiveItemHandler, BMarketRefundItemHandler {
    address public owner;
    IBMarketUsers public users;
    IBMarketGames public games;
    uint public id = 1;
    enum AuctionStatus {
        PENDING,
        APPROVED,
        CANCELLED,
        REVOKED,
        FINISHED
    }

    struct Auction {
        address owner;
        address winner;
        uint game;
        uint item;
        uint price;
        uint toAdd;
        uint server;
        AuctionStatus status;
    }

    event NewHighPayer(address indexed user, uint price, uint indexed id);

    mapping(uint => Auction) public auctions;

    modifier onlyOwner {
        require(owner == msg.sender);
        _;
    }


    constructor(address busers, address bgames) {
        owner = msg.sender;
        users = IBMarketUsers(busers);
        games = IBMarketGames(bgames);
    }


    function setGlobalParams(
        address busers,
        address bgames
    ) external onlyOwner {
        users = IBMarketUsers(busers);
        games = IBMarketGames(bgames);
    }


    function createAuction(
        uint game, 
        uint server, 
        uint item, 
        uint price, 
        uint toAdd
    ) external {

        require(game > 0 && item > 0 && server > 0);
        require(toAdd * 3 < price && price >= 100 && toAdd >= 100);
        games.checkUser(msg.sender,game,server,item);
        auctions[id].owner = msg.sender;
        auctions[id].game = game;
        auctions[id].server = server;
        auctions[id].item = item;
        auctions[id].price = price;
        auctions[id].toAdd = toAdd;
        auctions[id].status = AuctionStatus.PENDING;

        emit BMarketTakeItemHandler.TakeItem(
            msg.sender,
            game,
            server,
            item,
            id,
            [uint(price),uint(toAdd)]
        );
        ++id;

    }

    function validateAuction(
        uint auction, 
        bool companyValidation
    ) external {

        require(auctions[auction].status == AuctionStatus.PENDING && auctions[auction].owner != address(0));
        games.checkCompany(msg.sender,auctions[auction].game,auctions[auction].server,auctions[auction].item);

        if ( companyValidation ) {

            auctions[auction].status = AuctionStatus.APPROVED;
            emit BMarketTakeItemHandler.ItemTaken(
                auctions[auction].owner,
                auctions[auction].game,
                auctions[auction].server,
                auctions[auction].item,
                auction
            );

        } else {

            auctions[auction].status = AuctionStatus.REVOKED;
            emit BMarketTakeItemHandler.ItemNotTaken(
                auctions[auction].owner,
                auctions[auction].game,
                auction
            );

        }

    }

    function payForAuction(
        uint auction, 
        uint price
    ) external {

        require(auctions[auction].status == AuctionStatus.APPROVED);
        require((price >= auctions[auction].price + auctions[auction].toAdd) || (price == auctions[auction].price && auctions[auction].winner == address(0)));
        
        games.checkUser(msg.sender,auctions[auction].game,auctions[auction].server,auctions[auction].item);
        
        if ( auctions[auction].winner == address(0) )
            users.userWithdraw(msg.sender,price);
        else {
            users.userDeposit(auctions[auction].winner,auctions[auction].price);
            users.userWithdraw(msg.sender,price);
        }

        auctions[auction].price = price;
        auctions[auction].winner = msg.sender;
        
        emit NewHighPayer(
            msg.sender,
            price,
            auction
        );

    }


    function finishAuction(
        uint auction
    ) external {

        require(auctions[auction].winner != address(0));
        require(auctions[auction].status == AuctionStatus.APPROVED);
        require(msg.sender == auctions[auction].owner);

        if ( users.isCompany(auctions[auction].owner) )
            games.checkCompany(auctions[auction].owner,auctions[auction].game,auctions[auction].server,auctions[auction].item);
        else
            games.checkUser(auctions[auction].owner,auctions[auction].game,auctions[auction].server,auctions[auction].item);

        emit BMarketGiveItemHandler.GiveItem(
            auctions[auction].winner,
            auctions[auction].game,
            auctions[auction].server,
            auctions[auction].item,
            auction
        );

    }


    function finishedAuction(
        uint auction,
        bool companyValidation
    ) external {
        require(auctions[auction].status == AuctionStatus.APPROVED);
        games.checkCompany(msg.sender,auctions[auction].game,auctions[auction].server,auctions[auction].item);
        
        if ( companyValidation ) {

            auctions[auction].status == AuctionStatus.FINISHED;
            uint[2] memory theFees = games.getFees(auctions[auction].game);
            address referrer = users.getReferrer(auctions[auction].owner);

            users.userDeposit(games.getGameOwner(auctions[auction].game),auctions[auction].price - auctions[auction].price / theFees[1]);
            users.userDeposit(owner,auctions[auction].price - auctions[auction].price / theFees[0]);

            if ( referrer == owner ) {
                users.userDeposit(auctions[auction].owner,auctions[auction].price - auctions[auction].price / theFees[1] - auctions[auction].price / theFees[0]);
            } else {

                uint partnerFee = users.getPartnerFee(referrer);
                users.userDeposit(referrer,auctions[auction].price - auctions[auction].price / partnerFee);
                users.userDeposit(auctions[auction].owner,auctions[auction].price - auctions[auction].price / theFees[1] - auctions[auction].price / theFees[0] - auctions[auction].price / partnerFee);

            }

            emit BMarketGiveItemHandler.ItemGiven(
                auctions[auction].winner,
                auctions[auction].game,
                auctions[auction].server,
                auctions[auction].item,
                auction
            );

        } else 
            emit BMarketGiveItemHandler.ItemNotGiven(
                auctions[auction].winner,
                auctions[auction].game,
                auction
            );

    }


    function cancelAuction(
        uint auction
    ) external {
        require(auctions[auction].status == AuctionStatus.APPROVED);
        require(msg.sender == auctions[auction].owner);
        emit BMarketRefundItemHandler.RefundItem(
            auctions[auction].owner,
            auctions[auction].game,
            auctions[auction].server,
            auctions[auction].item,
            auction
        );
    }


    function cancelledAuction(
        uint auction,
        bool companyValidation
    ) external {
        require(auctions[auction].status == AuctionStatus.APPROVED);
        games.checkCompany(msg.sender,auctions[auction].game,auctions[auction].server,auctions[auction].item);
        
        if ( companyValidation ){

            if ( auctions[auction].winner != address(0) )
                users.userDeposit(auctions[auction].winner,auctions[auction].price);

            auctions[auction].status = AuctionStatus.CANCELLED;
            emit BMarketRefundItemHandler.ItemRefunded(
                auctions[auction].owner,
                auctions[auction].game,
                auctions[auction].server,
                auctions[auction].item,
                auction
            );

        } else 
            emit BMarketRefundItemHandler.ItemNotRefunded(
                auctions[auction].owner,
                auctions[auction].game,
                auction
            );

    }

}