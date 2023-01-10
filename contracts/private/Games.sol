// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "./interfaces/IUsers.sol";


contract QGames {
    struct Authentication {
        address user;
        uint game;
        string username;
        string password;
        uint server;
        string email;
        string ign;
    }
    
    event Authenticate(address indexed user, uint indexed id, Authentication authentication);
    event Authenticated(address indexed user, uint indexed id, uint server);
    event NotAuthenticated(address indexed user, uint indexed id, uint server);
    event TwoFactorAuthenticate(address indexed user, uint indexed id, uint server, string temporaryPassword);
    event TwoFactorAuthenticated(address indexed user, uint indexed id, uint server);
    event TwoFactorNotAuthenticated(address indexed user, uint indexed id, uint server);
    event ItemsAdded(address indexed user, uint indexed id, uint[] items);
    event CompanyItemsAdded(address indexed user, uint indexed id, uint[] items);
    event ServersAdded(address indexed user, uint indexed id, uint[] servers);
    event TwoFactorStatusUpdate(address indexed user, uint indexed id,bool indexed status);
    event GameStatusUpdate(address indexed user, uint indexed id,bool indexed status);
    event GameIsConfiguring(address indexed user, uint id);
    event Permission(address indexed user, uint indexed id, address target, bool permission);
    event Permissions(address indexed user, uint indexed id, address[] targets, bool[] permissions);
    event GameFees(uint indexed id, address targets, uint[2] fees);
    event GameJoinRequest(address user, uint indexed id, uint indexed gameRequested);
    event GameJoinAccepted(address user, uint indexed id, uint indexed gameRequested);
    
    
    address public owner;
    IBMarketUsers public users;
    uint public id = 1;
    mapping(address => mapping(uint => mapping(uint => bool))) public requestsToJoinGame;
    struct Game {
        address owner;
        mapping(address => mapping(uint => uint)) players;
        mapping(uint => uint) items;
        mapping(uint => uint) companyItems;
        mapping(uint => uint) gamesAllowed;
        mapping(uint => uint) servers;
        mapping(address => bool) permissions;
        mapping(address => uint[2]) fees;
        bool readyForTransaction;
		bool twoFactorAuth;
    }
    mapping(uint => Game) public games;
    
    function playingOnServer(uint game, uint server) external view returns(uint) {
        return games[game].players[msg.sender][server];
    }
    
    function itemOf(uint game, uint item) external view returns(uint) {
        return games[game].items[item];
    }
    
    function companyItemOf(uint game, uint item) external view returns(uint) {
        return games[game].companyItems[item];
    }
    
    function gameAllowed(uint game, uint allowed) external view returns(uint) {
        return games[game].gamesAllowed[allowed];
    }
    
    function serverOf(uint game, uint server) external view returns(uint) {
        return games[game].servers[server];
    }
    
    function permission(uint game, address allowed) external view returns(bool) {
        return games[game].permissions[allowed];
    }
    
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }
    constructor(address busers) {
        owner = msg.sender;
        users = IBMarketUsers(busers);
    }
    
    
    function setGlobalParams(address busers) external onlyOwner {
        users = IBMarketUsers(busers);
    }

    function checkGameOwner(address gameOwner,uint game) external view returns(bool){
        return games[game].owner == gameOwner;
    }
    
    function requestAffiliateGame(uint game, uint targetGame) external {
        require(games[game].owner == msg.sender && targetGame < id);
        games[targetGame].gamesAllowed[game] = targetGame;
        emit GameJoinRequest(msg.sender,game,targetGame);
    }
    
    function acceptAffiliation(uint game, uint targetGame) external {
        require(games[game].owner == msg.sender && targetGame < id);
        require(games[game].gamesAllowed[targetGame] == game);
        games[game].gamesAllowed[targetGame] = targetGame;
        games[targetGame].gamesAllowed[game] = game;
        emit GameJoinAccepted(msg.sender,game,targetGame);
    }
    
    function checkGameAffiliation(uint gameFrom, uint gameTo) external view {
        require(games[gameFrom].gamesAllowed[gameTo] == gameTo && games[gameTo].gamesAllowed[gameFrom] == gameFrom,"BGNGA");
    }
    
    function checkUser(address user, uint game, uint server, uint item) external view {
        require(
            !users.isCompany(user) && 
            games[game].items[item] == item && 
            item > 0 && 
            server > 0 && 
            game > 0 && 
            games[game].servers[server] == server && 
            games[game].players[user][server] == server && 
            games[game].readyForTransaction && 
            games[game].permissions[msg.sender] && 
            users.checkGamePlaying(user,game) 
        );
    }

    function checkCompany(address user, uint game, uint server, uint item) external view {
        require(
            users.isCompany(user) && 
            games[game].owner == user && 
            games[game].readyForTransaction && 
            server > 0 && 
            game > 0 && 
            item > 0 && 
            games[game].permissions[msg.sender] && 
            ( games[game].companyItems[item] == item || games[game].items[item] == item ) && 
            games[game].servers[server] == server 
        );
    }
    
    function setPermissions(uint game,address[] calldata targets,bool[] calldata permissions) external {
        require(msg.sender == games[game].owner && game < id);
        require(targets.length == permissions.length);
        for ( uint i = 0 ; i < targets.length ; ++i )
            games[game].permissions[targets[i]] = permissions[i];
        emit Permissions(msg.sender,game,targets,permissions);
    }
    
    function setFees(uint game, address target, uint[2] calldata theFees) external onlyOwner {
        games[game].fees[target] = theFees;
        emit GameFees(game,target,theFees);
    }
    
    function getFees(uint game) external view returns(uint[2] memory) {
        require(games[game].fees[msg.sender][0] > 0 && games[game].fees[msg.sender][1] > 0);
        return games[game].fees[msg.sender];
    }
    
	function setPermission(uint game,address target,bool status) external {
        require(msg.sender == games[game].owner);
        games[game].permissions[target] = status;
        emit Permission(msg.sender,game,target,status);
    }
    
    function checkGameServerItem(address user,uint game,uint server,uint item) external view returns(bool){
        return games[game].items[item] == item && item > 0 && server > 0 && game > 0 && games[game].servers[server] == server && games[game].players[user][server] == server;
    }
    
    function checkGameServerCompanyItem(address user,uint game,uint server,uint item) external view returns(bool){
        return games[game].companyItems[item] == item && item > 0 && server > 0 && game > 0 && games[game].servers[server] == server && games[game].players[user][server] == server;
    }
    
    function authenticate(Authentication memory authentication) external {
        require(!users.isCompany(msg.sender));
		require(authentication.server > 0 && authentication.game > 0 && games[authentication.game].servers[authentication.server] == authentication.server);
		require(games[authentication.game].readyForTransaction);
		requestsToJoinGame[msg.sender][authentication.game][authentication.server] = true;
		emit Authenticate(msg.sender,authentication.game,authentication);
    }
    
    function authenticated(Authentication memory authentication, bool companyValidation) external {
        require(users.isCompany(msg.sender));
        require(requestsToJoinGame[authentication.user][authentication.game][authentication.server]);
        require(authentication.server > 0 && authentication.game > 0 && games[authentication.game].servers[authentication.server] == authentication.server);
        require(games[authentication.game].owner == msg.sender && games[authentication.game].readyForTransaction);
        if ( companyValidation ) {
            if ( !users.checkGamePlaying(authentication.user,authentication.game) )
		        games[authentication.game].players[authentication.user][authentication.server] = authentication.server;
            users.addGame(authentication.user,authentication.game);
            emit Authenticated(authentication.user,authentication.game,authentication.server);
        } else {
            emit NotAuthenticated(authentication.user,authentication.game,authentication.server);
        }
    }
    
    function twoFactorAuthenticate(uint game, uint server, string memory temporaryPassword) external {
        require(!users.isCompany(msg.sender));
		require(server > 0 && game > 0 && games[game].servers[server] == server && games[game].twoFactorAuth);
		require(games[game].readyForTransaction);
		requestsToJoinGame[msg.sender][game][server] = true;
		emit TwoFactorAuthenticate(msg.sender,game,server,temporaryPassword);
    }
    
    function twoFactorAuthenticated(Authentication memory authentication, bool companyValidation) external {
        require(users.isCompany(msg.sender));
        require(requestsToJoinGame[authentication.user][authentication.game][authentication.server]);
        require(authentication.server > 0 && authentication.game > 0 && games[authentication.game].servers[authentication.server] == authentication.server);
        require(games[authentication.game].owner == msg.sender && games[authentication.game].readyForTransaction);
        if ( companyValidation ) {
            if ( !users.checkGamePlaying(authentication.user,authentication.game) )
		        games[authentication.game].players[authentication.user][authentication.server] = authentication.server;
            users.addGame(authentication.user,authentication.game);
            emit TwoFactorAuthenticated(authentication.user,authentication.game,authentication.server);
        } else {
            emit TwoFactorNotAuthenticated(authentication.user,authentication.game,authentication.server);
        }
    }

    function configNewGame() external {
        require(users.isCompany(msg.sender));
        games[id].owner = msg.sender;
        games[id].gamesAllowed[id] = id;
		users.addGame(msg.sender,id);
        emit GameIsConfiguring(msg.sender,id);
        ++id;
    }
    
	function setGameTwoFactorAuth(uint game) external {
		require(games[game].owner == msg.sender);
		games[game].twoFactorAuth = !games[game].twoFactorAuth;
		emit TwoFactorStatusUpdate(msg.sender,game,games[game].twoFactorAuth);
	}
	
    function addGameItems(uint game, uint[] calldata items) external {
        require(games[game].owner == msg.sender);
		uint totalItems = items.length;
		require(totalItems > 0 && totalItems <= 25);
		for ( uint i = 0 ; i < totalItems ; ++i ){
			require(items[i] > 0 && games[game].items[items[i]] == 0);
			games[game].items[items[i]] = items[i];
		}
        emit ItemsAdded(msg.sender,game,items);
    }
    
    function addCompanyItems(uint game, uint[] calldata item) external {
        require(games[game].owner == msg.sender);
		uint totalItems = item.length;
		require(totalItems > 0);
		for ( uint i = 0 ; i < totalItems ; ++i ){
			require(item[i] > 0 && games[game].companyItems[item[i]] == 0);
			games[game].companyItems[item[i]] = item[i];
		}
        emit CompanyItemsAdded(msg.sender,game,item);
    }
    
    function addGameServers(uint game, uint[] calldata servers) external {
        require(games[game].owner == msg.sender);
        for ( uint i = 0 ; i < servers.length ; ++i ){
            require(servers[i] > 0 && games[game].servers[servers[i]] == 0);
            games[game].servers[servers[i]] = servers[i];
        }
        emit ServersAdded(msg.sender,game,servers);
    }
    
	function getGameOnMarketStatus(uint game) external view returns(bool){
		return games[game].readyForTransaction;
	}
    
    function getGameOwner(uint game) external view returns(address){
        return games[game].owner;
    }
    
    function changeGameStatus(uint game) external {
        require(games[game].owner == msg.sender);
        games[game].readyForTransaction = !games[game].readyForTransaction;
        emit GameStatusUpdate(games[game].owner,game,games[game].readyForTransaction);
    }
    
    
}
