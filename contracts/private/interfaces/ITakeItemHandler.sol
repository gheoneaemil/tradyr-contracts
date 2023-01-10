// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;


contract BMarketTakeItemHandler {

    event TakeItem(
        address indexed user,
        uint indexed game,
        uint server,
        uint item,
        uint indexed id,
        uint[2] metadata
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

}