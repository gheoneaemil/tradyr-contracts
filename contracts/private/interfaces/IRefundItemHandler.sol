// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;


contract BMarketRefundItemHandler {

    event RefundItem(
        address indexed user,
        uint indexed game,
        uint server,
        uint item,
        uint indexed id
    );

    event ItemRefunded(
        address indexed user,
        uint indexed game,
        uint server,
        uint item,
        uint indexed id
    );

    event ItemNotRefunded(
        address indexed user,
        uint indexed game,
        uint indexed id
    );

}