// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "./interfaces/IGames.sol";
import "./interfaces/IUsers.sol";
import "./interfaces/ITakeItemHandler.sol";
import "./interfaces/IGiveItemHandler.sol";
import "./interfaces/IRefundItemHandler.sol";


contract SALESCOMPANY is BMarketTakeItemHandler, BMarketGiveItemHandler, BMarketRefundItemHandler {
    address public owner;
    IBMarketUsers public users;
    IBMarketGames public games;
    uint public id = 1;
    enum SaleStatus {
        PENDING,
        APPROVED,
        REVOKED,
        MATCHED,
        CONFIRMED,
        CANCELLED
    }
    struct Sale {
        mapping(address => bool) buyers;
        address seller;
        address buyer;
        uint game;
		uint item;
        uint price;
        uint server;
        SaleStatus status;
    }
    mapping(uint => Sale) public sales;

    event CompanySellingItems(address indexed user, uint indexed game, uint server, uint item, uint[3] metadata);
    event SalesCancelled(address indexed user, uint indexed game, uint server, uint item, uint[] indexed ids);
    event TakeItem(address indexed user, uint indexed game, uint server, uint item, uint indexed id, uint price);
    event ItemTaken(address indexed user, uint indexed game, uint server, uint item, uint indexed id, uint price);



    modifier onlyOwner {
        require(owner == msg.sender);
        _;
    }

    modifier validIds(uint game, uint server, uint item) {
        require(game > 0 && server > 0 && item > 0);
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


    function createSales(
        uint game,
        uint server,
        uint item,
        uint price,
        uint qty
    ) external validIds(game,server,item) {

        games.checkCompany(msg.sender,game,server,item);
        require(qty > 0 && qty <= 25);
        uint256[3] memory metadata;
        metadata[0] = price;
        metadata[1] = id;
        metadata[2] = id+qty-1;

        emit CompanySellingItems(
            msg.sender,
            game,
            server,
            item,
            metadata
        );

		for(uint i = 0 ; i < qty ; ++i){
            sales[id].game = game;
            sales[id].item = item;
            sales[id].server = server;
            sales[id].seller = msg.sender;
            sales[id].price = price;
            sales[id].status = SaleStatus.APPROVED;
            ++id;
        }

    }


    function cancelSales(
        /*
         * @DIIMIIM: sales is already declared, being the sales mapping
         * @DIIMIIM: this is required to avoid the shadow param warning and potential logic flaws
         */
        uint[] calldata _sales, 
        uint game, 
        uint server, 
        uint item
    ) external validIds(game,server,item) {

        games.checkCompany(sales[_sales[0]].seller,game,server,item);

        for ( uint i = 0 ; i < _sales.length ; ++i ){
            require(sales[_sales[i]].seller == msg.sender);
            require(sales[_sales[i]].status == SaleStatus.APPROVED);
            require(sales[_sales[i]].game == game && sales[_sales[i]].server == server && sales[_sales[i]].item == item);
            sales[_sales[i]].status = SaleStatus.CANCELLED;
        }

        emit SalesCancelled(
            sales[_sales[0]].seller,
            game,
            server,
            item,
            _sales
        );

    }


	function purchase(
        uint sale
    ) external {

        require(sales[sale].status == SaleStatus.APPROVED || sales[sale].status == SaleStatus.MATCHED);
        require(users.getBalanceUser(msg.sender) >= sales[sale].price);
        
        games.checkUser(msg.sender,sales[sale].game,sales[sale].server,sales[sale].item);
        
        // To avoid possible bugs on company pilot app side
        sales[sale].buyers[msg.sender] = true;

        sales[sale].status = SaleStatus.MATCHED;
        
        emit BMarketGiveItemHandler.GiveItem(
            msg.sender,
            sales[sale].game,
            sales[sale].server,
            sales[sale].item,
            sale
        );

    }


    function confirmPurchase(
        uint sale, 
        address buyer, 
        bool companyValidation
    ) external {

        require(sales[sale].buyers[buyer] && sales[sale].status == SaleStatus.MATCHED);
        games.checkCompany(msg.sender,sales[sale].game,sales[sale].server,sales[sale].item);

        if ( companyValidation ) {

            sales[sale].buyer = buyer;
            sales[sale].status == SaleStatus.CONFIRMED;

            uint[2] memory theFees = games.getFees(sales[sale].game);
            address referrer = users.getReferrer(buyer);
            
            users.bmTransfer(buyer,owner,sales[sale].price / theFees[0]);
            users.bmTransfer(buyer,games.getGameOwner(sales[sale].game),sales[sale].price / theFees[1]);

            if ( referrer == address(0) ) {
            
                users.bmTransfer(buyer,sales[sale].seller,sales[sale].price - sales[sale].price / theFees[1] - sales[sale].price / theFees[0]);
            
            } else {
            
                uint partnerFee = users.getPartnerFee(referrer);
                users.bmTransfer(buyer,referrer,sales[sale].price / partnerFee);
                users.bmTransfer(buyer,sales[sale].seller,sales[sale].price - sales[sale].price / theFees[1] - sales[sale].price / theFees[0] - sales[sale].price / partnerFee);
            
            }

            emit BMarketGiveItemHandler.ItemGiven(
                sales[sale].buyer,
                sales[sale].game,
                sales[sale].server,
                sales[sale].item,
                sale
            );

        } else {

            sales[sale].status == SaleStatus.APPROVED;
            emit BMarketGiveItemHandler.ItemNotGiven(
                sales[sale].buyer,
                sales[sale].game,
                sale
            );

        }
    }


}