// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;


interface IBMarketUsers {
    
    function setPermissions(address[] calldata targets, bool[] calldata values) external;
    
    function hasGame(uint game) external view returns(uint);
    
    function setBGames(address bgames) external;

    function userDeposit(address user,uint amount) external;
    
    function userWithdraw(address user,uint amount) external;
    
	function getBalanceUser(address user) external view returns(uint);
	
	function giveMoney(address user,uint value) external;
	
    function withdrawMoney(address user,uint value) external;
	
    function bmTransfer(address from, address to,uint amount) external;
    
    function transfer(address to, uint amount) external;
    
    function checkGamePlaying(address user,uint game) external view returns(bool);
    
    function addGame(address user,uint game) external;
    
    function isCompany(address user) external view returns(bool);
    
	function addPlayingGame(address user,uint game) external;
    
    function getReferrer(address user) external view returns(address);

    function addUser(bool companyStatus, address user) external;

    function addPartner(address partner, uint fee) external;

    function getPartnerFee(address partner) external view returns(uint);

    function addReferralUser(address user) external;
}