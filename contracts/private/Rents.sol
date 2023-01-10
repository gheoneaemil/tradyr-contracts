// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "./interfaces/IGames.sol";
import "./interfaces/IUsers.sol";
import "./interfaces/IGiveItemHandler.sol";
import "./interfaces/IRefundItemHandler.sol";


contract QRents is BMarketGiveItemHandler, BMarketRefundItemHandler {
    
    event TakeItem(
        address indexed user, 
        uint indexed game, 
        uint server, 
        uint item, 
        uint indexed id, 
        uint[3] metadata
    );

    event ItemTaken(
        address indexed user,
        uint indexed game,
        uint server,
        uint item,
        uint indexed id
    );

    event ItemNotTaken(
        address indexed user,
        uint indexed game,
        uint indexed id
    );

    event FinishRent(address indexed user, uint indexed game, uint server, uint item, uint indexed id);
    event FinishedRent(address indexed user, uint indexed game, uint server, uint item, uint indexed id, bool itemIntact);
    event RentNotFinished(address indexed user, uint indexed game, uint indexed id, bool itemIntact);
    event CompanyPlacingRent(address indexed user, uint indexed game, uint server, uint item, uint[5] metadata);
    event RefundItems(address indexed user, uint indexed game, uint[] ids);

    
    address public owner;
    IBMarketUsers public users;
    IBMarketGames public games;
    uint public id = 1;
    uint public validation = 86400000000000;
    enum RentStatus {
        PENDING,
        APPROVED,
        RENTED,
        CANCELLED,
        REVOKED,
        ITEM_BROKEN
    }
    struct Rent {
        address owner;
        address renter;
        uint valability;
        uint game;
        uint rentStop;
		uint item;
        uint price;
        uint fee;
        uint server;
        RentStatus status;
    }
    mapping(uint => Rent) public rents;
    
    
    modifier onlyOwner {
        require(owner == msg.sender);
        _;
    }

    modifier validIds(
        uint game, 
        uint server, 
        uint item
    ) {
        require(game > 0 && server > 0 && item > 0);
        _;
    }

    constructor(address busers, address bgames, uint _validation) {
        owner = msg.sender;
        users = IBMarketUsers(busers);
        games = IBMarketGames(bgames);
        validation = _validation;
    }
    
    function setGlobalParams(
        address busers,
        address bgames,
        uint _validation
    ) external onlyOwner {
        users = IBMarketUsers(busers);
        games = IBMarketGames(bgames);
        validation = _validation;
    }

    
    function createRent(
        uint game, 
        uint server, 
        uint item, 
        uint valability, 
        uint price, 
        uint fee
    ) external validIds(game,server,item) {
        require(fee * 2 < price && valability > 0 && price >= 100 && fee >= 100);
        games.checkUser(msg.sender,game,server,item);

        rents[id].owner = msg.sender;
        rents[id].valability = valability;
        rents[id].game = game;
        rents[id].server = server;
        rents[id].item = item;
        rents[id].price = price;
        rents[id].fee = fee;
        rents[id].status = RentStatus.PENDING;

        emit TakeItem(
            msg.sender,
            game,
            server,
            item,
            id,
            [valability,uint(price),uint(fee)]
        );
        ++id;
    }
    
    function createRents(
        uint game, 
        uint server, 
        uint item, 
        uint valability, 
        uint price, 
        uint fee, 
        uint qty
    ) external validIds(game,server,item) {

        require(fee * 2 < price && valability > 0 && price >= 100 && fee >= 100);
        games.checkCompany(msg.sender,game,server,item);

        require(qty <= 25 && qty > 0);

        uint256[5] memory metadata;
        metadata[0] = valability;
        metadata[1] = price;
        metadata[2] = fee;
        metadata[3] = id;
        metadata[4] = id+qty-1;

        emit CompanyPlacingRent(
            msg.sender,
            game,
            server,
            item,
            metadata
        );

        for ( uint i = 0 ; i < qty ; ++i ){
            rents[id].owner = msg.sender;
            rents[id].valability = valability;
            rents[id].game = game;
            rents[id].server = server;
            rents[id].item = item;
            rents[id].price = price;
            rents[id].fee = fee;
            rents[id].status = RentStatus.APPROVED;
            ++id;
        }

    }
    
    function validateRent(
        uint rent, 
        bool companyValidation
    ) external {

        require(rents[rent].status == RentStatus.PENDING);
        require(rents[rent].owner != address(0));
        games.checkCompany(msg.sender,rents[rent].game,rents[rent].server,rents[rent].item);

        if ( companyValidation ) {

            rents[rent].status = RentStatus.APPROVED;
            emit ItemTaken(
                rents[rent].owner,
                rents[rent].game,
                rents[rent].server,
                rents[rent].item,
                rent
            );

        } else {

            rents[rent].status = RentStatus.REVOKED;
            emit ItemNotTaken(
                rents[rent].owner,
                rents[rent].game,
                rent
            );

        }

    } 
    
    function rentItem(
        uint rent
    ) external {

        require(rents[rent].status == RentStatus.APPROVED);
        require(users.getBalanceUser(msg.sender) >= rents[rent].price);
        games.checkUser(msg.sender,rents[rent].game,rents[rent].server,rents[rent].item);
        rents[rent].renter = msg.sender;        
        emit BMarketGiveItemHandler.GiveItem(
            msg.sender,
            rents[rent].game,
            rents[rent].server,
            rents[rent].item,
            rent
        );

    }
    
    function validateRenting(
        uint rent,
        address renter,
        bool companyValidation
    ) external {

        require(rents[rent].status == RentStatus.APPROVED);
        require(users.getBalanceUser(renter) >= rents[rent].price);
        games.checkCompany(msg.sender,rents[rent].game,rents[rent].server,rents[rent].item);

        if ( companyValidation ) {

            rents[rent].renter = renter;
            rents[rent].rentStop = block.timestamp + (validation * rents[rent].valability);
            rents[rent].status = RentStatus.RENTED;
            users.userWithdraw(renter,rents[rent].price);

            emit BMarketGiveItemHandler.ItemGiven(
                renter,
                rents[rent].game,
                rents[rent].server,
                rents[rent].item,
                rent
            );

        } else 
            emit BMarketGiveItemHandler.ItemNotGiven(
                renter,
                rents[rent].game,
                rent
            );

    }
    
    function finishedRent(
        uint rent,
        bool companyValidation,
        bool itemIntact
    ) external {

        require(rents[rent].status == RentStatus.RENTED);
        require(rents[rent].rentStop <= block.timestamp);
        games.checkCompany(msg.sender,rents[rent].game,rents[rent].server,rents[rent].item);
            
        
        if ( companyValidation ) {

            uint[2] memory theFees = games.getFees(rents[rent].game);
            address referrer = users.getReferrer(rents[rent].renter);
            if ( itemIntact ) {

                rents[rent].status = RentStatus.APPROVED;
                // Sends the item price back to the renter
                users.userDeposit(rents[rent].renter,rents[rent].price-rents[rent].fee);

                users.userDeposit(owner,rents[rent].fee / theFees[0]);
                users.userDeposit(games.getGameOwner(rents[rent].game),rents[rent].fee / theFees[1]);

                if ( referrer == address(0) ) {
                    users.userDeposit(rents[rent].owner,rents[rent].fee - rents[rent].fee / theFees[0] - rents[rent].fee / theFees[1] );
                } else {
                    uint partnerFee = users.getPartnerFee(referrer);
                    users.userDeposit(referrer,rents[rent].fee / partnerFee);
                    users.userDeposit(rents[rent].owner,rents[rent].fee - rents[rent].fee / partnerFee - rents[rent].fee / theFees[0] - rents[rent].fee / theFees[1]);
                }

            } else {
                
                rents[rent].status = RentStatus.ITEM_BROKEN;
                users.userDeposit(games.getGameOwner(rents[rent].game),rents[rent].price / theFees[1]);
                users.userDeposit(owner,rents[rent].price / theFees[0]);

                if ( referrer == address(0) )  {
                    users.userDeposit(rents[rent].owner,rents[rent].fee - rents[rent].price / theFees[1] - rents[rent].price / theFees[0]);
                } else {
                    uint partnerFee = users.getPartnerFee(referrer);
                    users.userDeposit(referrer,rents[rent].price / partnerFee);
                    users.userDeposit(rents[rent].owner,rents[rent].price - rents[rent].price / theFees[1] - rents[rent].price / theFees[0] - rents[rent].price / partnerFee);
                }
                
            }

            rents[rent].renter = address(0);
            rents[rent].rentStop = 0;

            emit FinishedRent(
                rents[rent].renter,
                rents[rent].game,
                rents[rent].server,
                rents[rent].item,
                rent,
                itemIntact
            );

        } else

            emit RentNotFinished(
                rents[rent].renter,
                rents[rent].game,
                rent,
                itemIntact
            );

    }
    
    function finishRent(
        uint rent
    ) external {

        require(msg.sender == rents[rent].owner || msg.sender == rents[rent].renter);
        require(rents[rent].rentStop <= block.timestamp);
        require(rents[rent].status == RentStatus.RENTED);

        games.checkUser(msg.sender,rents[rent].game,rents[rent].server,rents[rent].item);

        emit FinishRent(
            rents[rent].renter,
            rents[rent].game,
            rents[rent].server,
            rents[rent].item,
            rent
        );

    }
    
    function rentCancelledValidation(
        uint rent, 
        bool companyValidation
    ) external {

        require(rents[rent].status == RentStatus.APPROVED);
        games.checkCompany(msg.sender,rents[rent].game,rents[rent].server,rents[rent].item);
        if ( companyValidation ) {

            rents[rent].status = RentStatus.CANCELLED;
            emit BMarketRefundItemHandler.ItemRefunded(
                rents[rent].owner,
                rents[rent].game,
                rents[rent].server,
                rents[rent].item,
                rent
            );

        } else

            emit BMarketRefundItemHandler.ItemNotRefunded(
                rents[rent].owner,
                rents[rent].game,
                rent
            );

    }
    
    function cancelRent(
        uint rent
    ) external {

        require(msg.sender == rents[rent].owner && rents[rent].status == RentStatus.APPROVED);
        games.checkUser(rents[rent].owner,rents[rent].game,rents[rent].server,rents[rent].item);

        emit BMarketRefundItemHandler.RefundItem(
            msg.sender,
            rents[rent].game,
            rents[rent].server,
            rents[rent].item,
            rent
        );

    }
    
    function cancelRents(
        uint[] memory _rents
    ) external {

        for ( uint i = 0; i < _rents.length; ++i ) {
            require(msg.sender == rents[_rents[i]].owner && rents[_rents[i]].status == RentStatus.APPROVED && rents[_rents[0]].game == rents[_rents[i]].game);
            games.checkCompany(rents[_rents[i]].owner,rents[_rents[i]].game,rents[_rents[i]].server,rents[_rents[i]].item);
            rents[_rents[i]].status = RentStatus.CANCELLED;
        }

        emit RefundItems(
            msg.sender,
            rents[_rents[0]].game,
            _rents
        );

    }

}