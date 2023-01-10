// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;


interface IBMarketGames {
    
    struct Authentication {
        address user;
        uint game;
        string username;
        string password;
        uint server;
        string email;
        string ign;
    }

    function playingOnServer(uint game, uint server) external view returns(uint);
    
    function itemOf(uint game, uint item) external view returns(uint);
    
    function companyItemOf(uint game, uint item) external view returns(uint);
    
    function gameAllowed(uint game, uint allowed) external view returns(uint);

    function serverOf(uint game, uint server) external view returns(uint);

    function permission(uint game, address allowed) external view returns(bool);
    
    function setBUsers(address busers) external;

    function checkGameOwner(address gameOwner,uint game) external view returns(bool);
    
    function requestAffiliateGame(uint game, uint targetGame) external;
    
    function acceptAffiliation(uint game, uint targetGame) external;
    
    function checkGameAffiliation(uint gameFrom, uint gameTo) external view;
    
    function checkUser(address user, uint game, uint server, uint item) external view;

    function checkCompany(address user, uint game, uint server, uint item) external view;
    
    function setPermissions(uint game,address[] calldata targets,bool[] calldata permissions) external;
    
    function setFees(uint game, address target, uint[2] calldata theFees) external;
    
    function getFees(uint game) external view returns(uint[2] memory);
    
	function setPermission(uint game,address target,bool status) external;
    
    function checkGameServerItem(address user,uint game,uint server,uint item) external view returns(bool);
    
    function checkGameServerCompanyItem(address user,uint game,uint server,uint item) external view returns(bool);
    
    function authenticate(Authentication memory authentication) external;
    
    function authenticated(Authentication memory authentication, bool companyValidation) external;
    
    function twoFactorAuthenticate(uint game, uint server, string memory temporaryPassword) external;
    
    function twoFactorAuthenticated(Authentication memory authentication, bool companyValidation) external;

    function configNewGame() external;
    
	function setGameTwoFactorAuth(uint game) external;
	
    function addGameItems(uint game, uint[] calldata items) external;
    
    function addCompanyItems(uint game, uint[] calldata item) external;
    
    function addGameServers(uint game, uint[] calldata servers) external;
    
	function getGameOnMarketStatus(uint game) external view returns(bool);
    
    function getGameOwner(uint game) external view returns(address);
    
    function changeGameStatus(uint game) external;
    
}
