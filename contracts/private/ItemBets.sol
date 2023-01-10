// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "./interfaces/IGames.sol";


contract QItemBets {
    address public owner;
    IBMarketGames public games;
    uint public id = 1;
    enum BetStatus {
        PENDING,
        APPROVED,
        MATCHED,
        CONFIRMED,
        ACCEPTED,
        REFUNDED_FIRST,
        REFUNDED,
        RECEIVED_FIRST,
        RECEIVED,
        CANCELLED,
        REVOKED
    }
    struct ItemsBet {
        address owner;
        address opponent;
        address winner;
        uint theMatch;
        uint game;
        uint[2] games;
        uint[2] items;
        uint[4] finalScore;
        uint[2] servers;
        uint[2] finalStatus;
        bool forScore;
        BetStatus status;
    }
    mapping(uint => ItemsBet) public itemsBet;

    event TakeItemOpponent(address indexed user, uint indexed game, uint server, uint item, uint indexed id, uint[2] score, uint status);
    event TakeItemOwner(address indexed user, uint theMatch, uint theGameOfMatch, uint indexed game, uint server, uint item, uint[2] score, uint status, bool forScore, uint indexed id);
    event ItemTakenOwner(address indexed user, uint indexed game, uint server, uint item, uint indexed id);
    event ItemNotTakenOwner(address indexed user, uint indexed game, uint indexed id);
    event ItemTakenOpponent(address indexed user, uint indexed game, uint server, uint item, uint indexed id);
    event ItemNotTakenOpponent(address indexed user, uint indexed game, uint indexed id);
    event OpponentBetAccepted(address indexed user, uint indexed game, uint indexed id);

    event GiveItem(
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

    event ItemRefunded(
        address indexed user, 
        uint indexed game, 
        uint server, 
        uint item, 
        uint indexed id, 
        BetStatus status
    );

    event ItemGiven(
        address indexed user, 
        uint indexed game, 
        uint server, 
        uint item, 
        uint indexed id, 
        BetStatus status
    );

    event RefundItem(
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


    modifier onlyOwner {
        require(owner == msg.sender);
        _;
    }

    modifier validIds(uint game, uint server, uint item) {
        require(game > 0 && server > 0 && item > 0);
        _;
    }

    constructor(address bgames) {
        owner = msg.sender;
        games = IBMarketGames(bgames);
    }

    function setGlobalParams(address bgames) external onlyOwner {
        games = IBMarketGames(bgames);
    }


    function startItemsBet(
        uint theMatch, 
        uint gameOfMatch, 
        uint game, 
        uint server, 
        uint item, 
        uint[2] calldata score, 
        uint status, 
        bool forScore
    ) external validIds(game,server,item) {
        require(status == 11 || status == 12 || status == 22);
        games.checkUser(msg.sender,game,server,item);
        itemsBet[id].theMatch = theMatch;
        itemsBet[id].game = gameOfMatch;
        itemsBet[id].owner = msg.sender;
        itemsBet[id].games[0] = game;
        itemsBet[id].servers[0] = server;
        itemsBet[id].items[0] = item;
        itemsBet[id].forScore = forScore;
        itemsBet[id].status = BetStatus.PENDING;
        if ( forScore ){
            itemsBet[id].finalScore[0] = score[0];
            itemsBet[id].finalScore[1] = score[1];
        }else
            itemsBet[id].finalStatus[0] = status;

        emit TakeItemOwner(
            msg.sender, 
            theMatch, 
            gameOfMatch, 
            game, 
            server, 
            item, 
            score, 
            status, 
            forScore, 
            id
        );
        ++id;
    }


    function ownerBetConfirmation(
        uint bet, 
        bool companyValidation
    ) external {

        require(itemsBet[bet].owner != address(0) && itemsBet[bet].status == BetStatus.PENDING);
        games.checkCompany(msg.sender,itemsBet[bet].games[0],itemsBet[bet].servers[0],itemsBet[bet].items[0]);
        if ( companyValidation ) {

            itemsBet[bet].status = BetStatus.APPROVED;
            emit ItemTakenOwner(
                itemsBet[bet].owner,
                itemsBet[bet].games[0],
                itemsBet[bet].servers[0],
                itemsBet[bet].items[0],
                bet
            );

        } else {

            itemsBet[bet].status = BetStatus.REVOKED;
            emit ItemNotTakenOwner(
                itemsBet[bet].owner,
                itemsBet[bet].games[0],
                bet
            );

        }

    }


    function acceptBetOffert(
        uint bet, 
        bool gamerValidation
    ) external {

        require(itemsBet[bet].status == BetStatus.CONFIRMED && itemsBet[bet].owner == msg.sender);

        if ( gamerValidation ) {
            itemsBet[bet].status = BetStatus.ACCEPTED;
            emit OpponentBetAccepted(
                msg.sender,
                itemsBet[bet].games[1],
                bet
            );
        } else {
            emit RefundItem(
                itemsBet[bet].opponent,
                itemsBet[bet].games[1],
                itemsBet[bet].servers[1],
                itemsBet[bet].items[1],
                bet
            );
            itemsBet[bet].games[1] = 0;
            itemsBet[bet].opponent = address(0);
            itemsBet[bet].servers[1] = 0;
            itemsBet[bet].items[1] = 0;
            itemsBet[bet].status = BetStatus.APPROVED;
        }

    }


	function cancelItemsBet(
        uint bet
    ) external {
        require(itemsBet[bet].owner == msg.sender && itemsBet[bet].status == BetStatus.APPROVED);
        games.checkUser(msg.sender,itemsBet[bet].games[0],itemsBet[bet].servers[0],itemsBet[bet].items[0]);
        emit RefundItem(
            msg.sender,
            itemsBet[bet].games[0],
            itemsBet[bet].servers[0],
            itemsBet[bet].items[0],
            bet
        );
    }


    function setPlayerItemRefunded(
        uint bet, 
        uint game, 
        uint server, 
        uint item, 
        address player, 
        bool companyValidation
    ) external validIds(game,server,item) {
        
        require(checkBetInfosRow(bet,1,game,server,item) || checkBetInfosRow(bet,0,game,server,item));
        require(itemsBet[bet].status == BetStatus.APPROVED || ( itemsBet[bet].status == BetStatus.ACCEPTED || itemsBet[bet].status == BetStatus.REFUNDED_FIRST));
        require(itemsBet[bet].owner == player || itemsBet[bet].opponent == player);

        games.checkCompany(msg.sender,game,server,item);

        if ( companyValidation ) {
            if ( itemsBet[bet].status == BetStatus.APPROVED ) {
                itemsBet[bet].status = BetStatus.CANCELLED;
                emit ItemRefunded(
                    player,
                    game,
                    server,
                    item,
                    bet,
                    BetStatus.CANCELLED
                );
            } else if ( itemsBet[bet].status == BetStatus.ACCEPTED ) {
                itemsBet[bet].status = BetStatus.REFUNDED_FIRST;
                emit ItemRefunded(
                    player,
                    game,
                    server,
                    item,
                    bet,
                    BetStatus.REFUNDED_FIRST
                );
            } else {
                itemsBet[bet].status = BetStatus.REFUNDED;
                emit ItemRefunded(
                    player,
                    game,
                    server,
                    item,
                    bet,
                    BetStatus.REFUNDED
                );
            }
        } else
            emit ItemNotRefunded(
                player,
                game,
                bet
            );

    }


    function setPlayerReceivedItem(
        uint bet, 
        uint game, 
        uint server, 
        uint item, 
        address player, 
        bool companyValidation
    ) external validIds(game,server,item) {

        require(itemsBet[bet].status == BetStatus.ACCEPTED || itemsBet[bet].status == BetStatus.RECEIVED_FIRST);
        require(itemsBet[bet].owner == player || itemsBet[bet].opponent == player);
        
        games.checkCompany(msg.sender,game,server,item);

        if ( companyValidation ) {
            if ( itemsBet[bet].status == BetStatus.ACCEPTED ) {
                itemsBet[bet].status = BetStatus.RECEIVED_FIRST;
                emit ItemGiven(
                    player,
                    game,
                    server,
                    item,
                    bet,
                    BetStatus.RECEIVED_FIRST
                );
            } else { 
                itemsBet[bet].status = BetStatus.RECEIVED;
                emit ItemGiven(
                    player,
                    game,
                    server,
                    item,
                    bet,
                    BetStatus.RECEIVED
                );
            }
        } else
            emit ItemNotGiven(
                player,
                game,
                bet
            );

    }


	function opponentBetConfirmation(
        uint bet, 
        bool companyValidation
    ) external {

        require(itemsBet[bet].status == BetStatus.MATCHED);
        games.checkCompany(msg.sender,itemsBet[bet].games[1],itemsBet[bet].servers[1],itemsBet[bet].items[1]);
        
        if ( companyValidation ){

            itemsBet[bet].status = BetStatus.CONFIRMED;
            emit ItemTakenOpponent(
                itemsBet[bet].opponent,
                itemsBet[bet].games[1],
                itemsBet[bet].servers[1],
                itemsBet[bet].items[1],
                bet
            );  

        } else {

            itemsBet[bet].games[1] = 0;
            itemsBet[bet].opponent = address(0);
            itemsBet[bet].servers[1] = 0;
            itemsBet[bet].items[1] = 0;
            itemsBet[bet].status = BetStatus.APPROVED;

            emit ItemNotTakenOpponent(
                itemsBet[bet].opponent,
                itemsBet[bet].games[1],
                bet
            );

        }

    }


    function playTheBet(
        uint bet, 
        uint game, 
        uint server, 
        uint item, 
        uint[2] calldata score,
        uint status
    ) external validIds(game,server,item) {

        require(( status == 11 || status == 12 || status == 22 ) && itemsBet[bet].status == BetStatus.APPROVED);
        games.checkUser(itemsBet[bet].owner,game,server,item);
        games.checkGameAffiliation(game,itemsBet[bet].games[0]);
        games.checkUser(msg.sender,game,server,item);
        games.checkUser(msg.sender,itemsBet[bet].games[0],itemsBet[bet].servers[0],itemsBet[bet].items[0]);

        itemsBet[bet].status = BetStatus.MATCHED;
        itemsBet[bet].games[1] = game;
        itemsBet[bet].opponent = msg.sender;
        itemsBet[bet].servers[1] = server;
        itemsBet[bet].items[1] = item;

        if ( itemsBet[bet].forScore ) {

            require(itemsBet[bet].finalScore[0] != score[0] || itemsBet[bet].finalScore[1] != score[1]);
            itemsBet[bet].finalScore[2] = score[0];
            itemsBet[bet].finalScore[3] = score[1];

        } else {

            require(itemsBet[bet].finalStatus[0] != status);
            itemsBet[bet].finalStatus[1] = status;

        }

        emit TakeItemOpponent(
            msg.sender,
            game,
            server,
            item,
            bet,
            score,
            status
        );

    }


	function finishBet(uint bet, uint[2] calldata score, uint status) external onlyOwner {
        if ( itemsBet[bet].status == BetStatus.ACCEPTED ){
            if ( itemsBet[bet].forScore ){
                if ( itemsBet[bet].finalScore[0] == score[0] && itemsBet[bet].finalScore[1] == score[1] && ( itemsBet[bet].finalScore[2] != score[0] || itemsBet[bet].finalScore[3] != score[1] ) )
                    itemsBet[bet].winner = itemsBet[bet].owner;
                if ( itemsBet[bet].finalScore[2] == score[0] && itemsBet[bet].finalScore[3] == score[1] && ( itemsBet[bet].finalScore[0] != score[0] || itemsBet[bet].finalScore[1] != score[1] ) )
                    itemsBet[bet].winner = itemsBet[bet].opponent;
            }else{
                if ( itemsBet[bet].finalStatus[0] == status && itemsBet[bet].finalStatus[1] != status )
                    itemsBet[bet].winner = itemsBet[bet].owner;
                if ( itemsBet[bet].finalStatus[1] == status && itemsBet[bet].finalStatus[0] != status )
                    itemsBet[bet].winner = itemsBet[bet].opponent;
            }
        
            if ( itemsBet[bet].winner != address(0) ) {

                emit GiveItem(
                    itemsBet[bet].winner,
                    itemsBet[bet].games[0],
                    itemsBet[bet].servers[0],
                    itemsBet[bet].items[0],
                    bet
                );

                emit GiveItem(
                    itemsBet[bet].winner,
                    itemsBet[bet].games[1],
                    itemsBet[bet].servers[1],
                    itemsBet[bet].items[1],
                    bet
                );

            } else {

                emit GiveItem(
                    itemsBet[bet].owner,
                    itemsBet[bet].games[0],
                    itemsBet[bet].servers[0],
                    itemsBet[bet].items[0],
                    bet
                );

                emit GiveItem(
                    itemsBet[bet].opponent,
                    itemsBet[bet].games[1],
                    itemsBet[bet].servers[1],
                    itemsBet[bet].items[1],
                    bet
                );

            }
        } else if ( itemsBet[bet].status == BetStatus.CONFIRMED ) {

            emit RefundItem(
                itemsBet[bet].owner,
                itemsBet[bet].games[0],
                itemsBet[bet].servers[0],
                itemsBet[bet].items[0],
                bet
            );

            emit RefundItem(
                itemsBet[bet].opponent,
                itemsBet[bet].games[1],
                itemsBet[bet].servers[1],
                itemsBet[bet].items[1],
                bet
            );

        }
    }


    function checkBetInfosRow(uint bet, uint row, uint game, uint server, uint item) internal view returns(bool) {
        return itemsBet[bet].games[row] == game && itemsBet[bet].servers[row] == server && itemsBet[bet].items[row] == item;
    }

}