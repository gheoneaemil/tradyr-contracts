// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "./interfaces/IGames.sol";
import "./interfaces/IUsers.sol";


contract QStorage {

    address public owner;
    IBMarketUsers public users;
    IBMarketGames public games;

    mapping(address => mapping(uint => mapping(uint => uint[]))) public deposits;
    mapping(address => mapping(uint => mapping(uint => uint[]))) public depositsAux;
	mapping(address => uint) public totalItems;

    event TakeItem(address indexed user, uint indexed game, uint server, uint indexed item,uint position);
    event ItemTaken(address indexed user, uint indexed game, uint server, uint indexed item, uint position);
    event ItemNotTaken(address indexed user, uint indexed game, uint server, uint indexed item);
    event WithdrawItem(address indexed user, uint indexed game, uint server, uint indexed item, uint position);
    event ItemWithdrawn(address indexed user, uint indexed game, uint server, uint indexed item, uint position);
    event ItemNotWithdrawn(address indexed user, uint indexed game, uint server, uint indexed item);


    modifier onlyOwner {
        require(msg.sender == owner);
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


    function depositItem(
        uint game, 
        uint server, 
        uint item
    ) external validIds(game,server,item) {

		require(totalItems[msg.sender] < 50);

        games.checkUser(msg.sender,game,server,item);

        emit TakeItem(
            msg.sender,
            game,
            server,
            item,
            depositsAux[msg.sender][game][server].length
        );

        depositsAux[msg.sender][game][server].push(item);

    }
    
    function depositItemValidation(
        address depositOwner, 
        uint game, 
        uint server, 
        uint item, 
        uint itemPosition, 
        bool companyValidation
    ) external validIds(game,server,item) {

        
        require(depositsAux[depositOwner][game][server][itemPosition] == item);
        games.checkCompany(msg.sender,game,server,item);
        
        if ( companyValidation ) {

			++totalItems[depositOwner];
            depositsAux[depositOwner][game][server][itemPosition] = 0;
            emit ItemTaken(
                depositOwner,
                game,
                server,
                item,
                deposits[depositOwner][game][server].length
            );
            deposits[depositOwner][game][server].push(item);

        } else
            emit ItemNotTaken(
                depositOwner,
                game,
                server,
                item
            );

    }

    function withdrawItem(
        uint game, 
        uint server, 
        uint item, 
        uint itemPosition
    ) external validIds(game,server,item) {

        require(deposits[msg.sender][game][server][itemPosition] == item);
        emit WithdrawItem(
            msg.sender,
            game,
            server,
            item,
            itemPosition
        );

    }

    function forceWithdrawItem(
        address user, 
        uint game, 
        uint server, 
        uint item, 
        uint itemPosition
    ) external onlyOwner validIds(game,server,item) {

        require(deposits[user][game][server][itemPosition] == item);
        emit WithdrawItem(
            user,
            game,
            server,
            item,
            itemPosition
        );

    }
    function withdrawItemValidation(
        address depositOwner, 
        uint game, 
        uint server, 
        uint item, 
        uint itemPosition, 
        bool companyValidation
    ) external validIds(game,server,item) {

        games.checkCompany(msg.sender,game,server,item);
        require(deposits[depositOwner][game][server][itemPosition] == item);
        if ( companyValidation ) {
			--totalItems[depositOwner];
            deposits[depositOwner][game][server][itemPosition] = 0;
            emit ItemWithdrawn(
                depositOwner,
                game,
                server,
                item,
                itemPosition
            );
        } else
            emit ItemNotWithdrawn(
                depositOwner,
                game,
                server,
                item
            );

    }


}
