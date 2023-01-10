// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "./interfaces/IGames.sol";


contract QUsers {
    
    event UserAdded(address indexed user, uint id, bool typeAccount);
    event Deposit(address indexed user, uint amount);
    event Withdraw(address indexed user, uint amount);
    event Transfer(address indexed from, address indexed to, uint amount);
    event BMarketTransfer(address indexed from, address indexed to, uint amount);
    event NewPartner(address indexed partner, uint fee);

    
    address public owner;
    uint public id = 1;
    mapping(address => bool) public permissions;
    IBMarketGames public games;
    
    struct User {
        mapping(uint => uint) games;
        address referrer;
        uint balance;
        uint id;
        bool isCompany;
    }
    mapping(address => User) public users;
    mapping(address => uint) public partners;
    
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    
    modifier isBMarket {
        require(permissions[msg.sender]);
        _;
    }
	
    constructor(address bgames) {
        owner = msg.sender;
        games = IBMarketGames(bgames);
    }

    function setGlobalParams(address bgames) external onlyOwner {
        games = IBMarketGames(bgames);
    }
    
    
    function setPermissions(address[] calldata targets, bool[] calldata values) external onlyOwner {
        for ( uint i = 0 ; i < targets.length && targets.length == values.length ; ++i )
            permissions[targets[i]] = values[i];
    }
    
    function hasGame(uint game) external view returns(uint) {
        return users[msg.sender].games[game];
    }

    function userDeposit(address user,uint amount) external isBMarket {
        require(users[user].balance+amount>=users[user].balance);
        users[user].balance+=amount;
        emit Deposit(user,amount);
    }
    
    function userWithdraw(address user,uint amount) external isBMarket {
        require(users[user].balance>=amount&&users[user].balance-amount<=users[user].balance);
        users[user].balance-=amount;
    }
    
	function getBalanceUser(address user) external view returns(uint) {
		return users[user].balance;
	}
	
	function giveMoney(address user,uint value) external onlyOwner {
        require(users[user].balance+value>=users[user].balance);
	    users[user].balance+=value;
        emit Deposit(user,value);
	}
	
    function withdrawMoney(address user,uint value) external onlyOwner {
        require(users[user].balance-value<=users[user].balance);
	    users[user].balance-=value;
        emit Withdraw(user,value);
	}
	
    function bmTransfer(address from, address to,uint amount) external isBMarket {
        require( users[from].balance >= amount && users[from].balance - amount <= users[from].balance && users[to].balance + amount >= users[to].balance );
        users[from].balance-=amount;
        users[to].balance+=amount;
        emit BMarketTransfer(from,to,amount);
    }
    
    function transfer(address to, uint amount) external {
        require(users[msg.sender].balance>=amount&&users[msg.sender].balance-amount<=users[msg.sender].balance&&users[to].balance+amount>=users[to].balance);
        users[msg.sender].balance-=amount;
        users[to].balance+=amount;
        emit Transfer(msg.sender,to,amount);
    }
    
    function checkGamePlaying(address user,uint game) external view returns(bool){
        return users[user].games[game] == game && game > 0;
    }
    
    function addGame(address user,uint game) external isBMarket {
        users[user].games[game] = game;
    }
    
    function isCompany(address user) external view returns(bool){
        return users[user].isCompany;
    }
    
	function addPlayingGame(address user,uint game) external isBMarket {
        require(users[user].games[game] == 0);
		users[user].games[game] = game;
	}
    
    function getReferrer(address user) external view returns(address) {
        return users[user].referrer;
    }

    function addUser(bool companyStatus, address user) external onlyOwner {
        users[user].isCompany = companyStatus;
        users[user].id = id;
        emit UserAdded(user, id, companyStatus);
        ++id;
    }

    function addPartner(address partner, uint fee) external onlyOwner {
        partners[partner] = fee;
        emit NewPartner(partner, fee);
    }

    function getPartnerFee(address partner) external view returns(uint) {
        return partners[partner];
    }

    function addReferralUser(address user) external {
        require(users[user].id == 0);
        require(users[user].referrer == address(0));
        users[user].referrer = msg.sender;
        users[user].isCompany = false;
        users[user].id = id;
        emit UserAdded(user, id, false);
        ++id;
    }
}
