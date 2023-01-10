// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;


contract BMarketGiveItemHandler {

    event GiveItem(
        address indexed user,
        uint indexed game,
        uint server,
        uint item,
        uint indexed id
    );

	event ItemGiven(
        address indexed user,
        uint indexed game,
        uint server,
        uint item,
        uint indexed id
    );

    event ItemNotGiven(
        address indexed user,
        uint indexed game,
        uint indexed id
    );

}