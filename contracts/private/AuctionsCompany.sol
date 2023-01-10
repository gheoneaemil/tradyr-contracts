// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "./interfaces/IGames.sol";
import "./interfaces/IUsers.sol";
import "./interfaces/IGiveItemHandler.sol";


contract AUCTIONSCOMPANY is BMarketGiveItemHandler {
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
    event CompanyAuctionsCreated(address indexed user, uint indexed game, uint server, uint item, uint[4] metadata);
    event CompanyAuctionsCancelled(address indexed user, uint indexed game, uint[] ids);

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
    

    function createAuctions(
        uint game, 
        uint server, 
        uint item, 
        uint price, 
        uint toAdd, 
        uint qty
    ) external {

        require(game > 0 && item > 0 && server > 0);
        require(toAdd * 3 < price && price >= 100 && toAdd >= 100);
        require(qty <= 25 && qty > 0);
        games.checkCompany(msg.sender,game,server,item);

        emit CompanyAuctionsCreated(
            msg.sender,
            game,
            server,
            item,
            [uint(price),uint(toAdd),uint(id),uint(id+qty-1)]
        );

        for ( uint i = 0 ; i < qty ; ++i ){
            require(msg.sender == games.getGameOwner(game));
            auctions[id].owner = msg.sender;
            auctions[id].game = game;
            auctions[id].server = server;
            auctions[id].item = item;
            auctions[id].price = price;
            auctions[id].toAdd = toAdd;
            auctions[id].status = AuctionStatus.APPROVED;
            ++id;
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

        games.checkCompany(msg.sender,auctions[auction].game,auctions[auction].server,auctions[auction].item);

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

            users.userDeposit(owner,auctions[auction].price / theFees[0]);

            if ( referrer == address(0) ) {
                users.userDeposit(auctions[auction].owner,auctions[auction].price - auctions[auction].price / theFees[0]);
            } else {

                uint partnerFee = users.getPartnerFee(referrer);
                users.userDeposit(referrer,auctions[auction].price - auctions[auction].price / partnerFee );
                users.userDeposit(auctions[auction].owner,auctions[auction].price - auctions[auction].price / theFees[0] - auctions[auction].price / partnerFee);

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


    function cancelAuctions(
        uint[] memory _auctions
    ) external {
        for ( uint i = 0; i < _auctions.length; ++i ) {
            require(auctions[_auctions[i]].status == AuctionStatus.APPROVED && auctions[_auctions[0]].game == auctions[_auctions[i]].game);
            require(msg.sender == auctions[_auctions[i]].owner);
    
            auctions[_auctions[i]].status = AuctionStatus.CANCELLED;
            if ( auctions[_auctions[i]].winner != address(0) )
                users.userDeposit(auctions[_auctions[i]].winner,auctions[_auctions[i]].price); 
        }

        
        emit CompanyAuctionsCancelled(
            msg.sender,
            auctions[_auctions[0]].game,
            _auctions
        );


    }

}