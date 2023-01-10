// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "./interfaces/IGames.sol";
import "./interfaces/IUsers.sol";


contract QSales {
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
        bool premium;
        SaleStatus status;
    }
    mapping(uint => Sale) public sales;


    event ItemNotTaken(address indexed user, uint indexed game, uint indexed id);
    event RefundItem(address indexed user, uint indexed game, uint server, uint item, uint indexed id);
    event ItemRefunded(address indexed user, uint indexed game, uint server, uint item, uint indexed id);
    event ItemNotRefunded(address indexed user, uint indexed game, uint indexed id);
    event GiveItem(address indexed user, uint indexed game, uint server, uint item, uint indexed id);
	event ItemGiven(address indexed user, uint indexed game, uint server, uint item, uint indexed id);
    event ItemNotGiven(address indexed user, uint indexed game, uint indexed id);
    event TakeItem(address indexed user, uint indexed game, uint server, uint item, uint indexed id, uint price, bool premium);
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


    function createSale(
        uint game, 
        uint item, 
        uint server, 
        uint price,
        bool premium
    ) external validIds(game,server,item) {

        require(price >= 100);
        games.checkUser(msg.sender,game,server,item);
        sales[id].game = game;
        sales[id].item = item;
        sales[id].server = server;
        sales[id].seller = msg.sender;
        sales[id].price = price;
        sales[id].status = SaleStatus.PENDING;
        sales[id].premium = premium;
        emit TakeItem(
            msg.sender,
            game,
            server,
            item,
            id,
            price,
            premium
        );
        ++id; 

    }

    
    function validateSale(
        uint sale, 
        bool companyValidation
    ) external {

        require(sales[sale].status == SaleStatus.PENDING);
        games.checkCompany(msg.sender,sales[sale].game,sales[sale].server,sales[sale].item);

        if ( companyValidation ) {

            sales[sale].status = SaleStatus.APPROVED;
            emit ItemTaken(
                sales[sale].seller,
                sales[sale].game,
                sales[sale].server,
                sales[sale].item,
                sale,
                sales[sale].price
            );

        } else {

            sales[sale].status = SaleStatus.REVOKED;
            emit ItemNotTaken(
                sales[sale].seller,
                sales[sale].game,
                sale
            );

        }

    }


    function cancelSale(
        uint sale
    ) external {

        require(sales[sale].status == SaleStatus.APPROVED);
		require(sales[sale].seller == msg.sender);

        emit RefundItem(
            sales[sale].seller,
            sales[sale].game,
            sales[sale].server,
            sales[sale].item,
            sale
        );

    }

	function saleCancelled(
        uint sale, 
        bool companyValidation
    ) external {

	    require(sales[sale].status == SaleStatus.APPROVED);
        games.checkCompany(msg.sender,sales[sale].game,sales[sale].server,sales[sale].item);

        if ( companyValidation ) {

            sales[sale].status = SaleStatus.CANCELLED;
	        emit ItemRefunded(
                sales[sale].seller,
                sales[sale].game,
                sales[sale].server,
                sales[sale].item,
                sale
            );

        } else
            emit ItemNotRefunded(
                sales[sale].seller,
                sales[sale].game,
                sale
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
        
        emit GiveItem(
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
                users.bmTransfer(buyer,sales[sale].seller,sales[sale].price - sales[sale].price / theFees[0] - sales[sale].price / theFees[1]);
            } else {
                uint partnerFee = users.getPartnerFee(referrer);
                users.bmTransfer(buyer,referrer,sales[sale].price / partnerFee);
                users.bmTransfer(buyer,sales[sale].seller,sales[sale].price - sales[sale].price / theFees[0] - sales[sale].price / theFees[1] - sales[sale].price / partnerFee);
            }

            emit ItemGiven(
                sales[sale].buyer,
                sales[sale].game,
                sales[sale].server,
                sales[sale].item,
                sale
            );

        } else {

            sales[sale].status == SaleStatus.APPROVED;
            emit ItemNotGiven(
                sales[sale].buyer,
                sales[sale].game,
                sale
            );

        }
    }


}