// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "./interfaces/IGames.sol";


contract QExchanges {
    uint public id = 1;
    address public owner;
    IBMarketGames public games;

    enum Status {
        PENDING,
        OWNER_VALIDATED,
        APPROVED,
        REVOKED,
        PENDING_CLIENT_VALIDATE,
        CLIENT_VALIDATED,
        EXCHANGE_TRIGGERED,
        CANCEL_PENDING,
        CANCELLED,
        ITEM_GIVEN_OWNER,
        ITEM_GIVEN_CLIENT,
        EXCHANGE_FINISHED
    }

    struct Exchange {
        address owner;
        address client;
        uint game;
        uint item;
        uint server;
        uint gameTo;
        uint itemTo;
        uint serverTo;
        Status status;
    }
    mapping(uint => mapping(address => bool)) public exchangeProof;

    event TakeItemOwner(address indexed user, uint indexed game, uint server, uint item, uint indexed id);
    event ItemTakenOwner(address indexed user, uint indexed game, uint server, uint item, uint indexed id);
    event ItemNotTakenOwner(address indexed user, uint indexed game, uint indexed id);
    event TakeItemClient(address indexed user, uint indexed game, uint server, uint item, uint indexed id);
    event ItemTakenClient(address indexed user, uint indexed game, uint server, uint item, uint indexed id);
    event ItemNotTakenClient(address indexed user,uint indexed game,uint indexed id);
    event RefundItem(address indexed user, uint indexed game, uint server, uint item, uint indexed id);
    event ItemRefunded(address indexed user, uint indexed game, uint server, uint item, uint indexed id);
    event ItemNotRefunded(address indexed user, uint indexed game, uint indexed id);
    event ValidateOwner(address indexed user, uint indexed game, uint server, uint item, uint indexed id, uint[3] metadata);
    event ValidateClient(address indexed user, uint indexed game, uint server, uint item, uint indexed id);
    event OwnerValidated(address indexed user, uint indexed game, uint server, uint item, uint indexed id);
    event OwnerNotValidated(address indexed user, uint indexed game, uint indexed id);
    event ClientValidated(address indexed user, uint indexed game, uint server, uint item, uint indexed id);
    event ClientNotValidated(address indexed user, uint indexed game, uint indexed id);
    event GiveItemOwner(address indexed user, uint indexed game, uint server, uint item, uint indexed id);
    event ItemGivenOwner(address indexed user, uint indexed game, uint server, uint item, uint indexed id, uint status);
    event ItemNotGivenOwner(address indexed user, uint indexed game, uint indexed id);
    event GiveItemClient(address indexed user, uint indexed game, uint server, uint item, uint indexed id);
    event ItemGivenClient(address indexed user, uint indexed game, uint server, uint item, uint indexed id, uint status);
    event ItemNotGivenClient(address indexed user, uint indexed game, uint indexed id);

    mapping(uint => Exchange) public exchanges;
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    constructor(address bgames) {
        owner = msg.sender;
        games = IBMarketGames(bgames);
    }

    function setGlobalParams(address bgames) external onlyOwner {
        games = IBMarketGames(bgames);
    }

    function createExchange(
        uint game,
        uint item,
        uint server,
        uint askedGame,
        uint askedItem,
        uint askedServer
    ) external {
        require(game > 0 && item > 0 && server > 0);
        require(askedGame > 0 && askedItem > 0 && askedServer > 0);

        games.checkGameAffiliation(game, askedGame);
        games.checkUser(msg.sender, game, server, item);
        games.checkUser(msg.sender, askedGame, askedServer, askedItem);

        exchanges[id].owner = msg.sender;
        exchanges[id].game = game;
        exchanges[id].gameTo = askedGame;
        exchanges[id].server = server;
        exchanges[id].serverTo = askedServer;
        exchanges[id].item = item;
        exchanges[id].itemTo = askedItem;
        exchanges[id].status = Status.PENDING;

        emit ValidateOwner(
            msg.sender,
            askedGame,
            askedServer,
            askedItem,
            id,
            [game, server, item]
        );
        ++id;
    }

    function validateExchangeOwner(uint _id, bool companyValidation)
        external
    {
        require(exchanges[_id].owner != address(0));
        require(exchanges[_id].status == Status.PENDING);
        games.checkCompany(
            msg.sender,
            exchanges[_id].gameTo,
            exchanges[_id].serverTo,
            exchanges[_id].itemTo
        );

        if (companyValidation) {
            exchanges[_id].status = Status.OWNER_VALIDATED;
            emit OwnerValidated(
                exchanges[_id].owner,
                exchanges[_id].gameTo,
                exchanges[_id].serverTo,
                exchanges[_id].itemTo,
                _id
            );
            emit TakeItemOwner(
                exchanges[_id].owner,
                exchanges[_id].game,
                exchanges[_id].server,
                exchanges[_id].item,
                _id
            );
        } else {
            exchanges[_id].status = Status.PENDING;
            emit OwnerNotValidated(
                exchanges[_id].owner,
                exchanges[_id].gameTo,
                _id
            );
        }
    }

    function itemTakenOwner(uint _id, bool companyValidation) external {
        require(exchanges[_id].status == Status.OWNER_VALIDATED);

        games.checkCompany(
            msg.sender,
            exchanges[_id].game,
            exchanges[_id].server,
            exchanges[_id].item
        );

        if (companyValidation) {
            exchanges[_id].status = Status.APPROVED;
            emit ItemTakenOwner(
                exchanges[_id].owner,
                exchanges[_id].game,
                exchanges[_id].server,
                exchanges[_id].item,
                _id
            );
        } else {
            exchanges[_id].status = Status.REVOKED;
            emit ItemNotTakenOwner(
                exchanges[_id].owner,
                exchanges[_id].game,
                _id
            );
        }
    }

    function cancelExchange(uint _id) external {
        require(
            exchanges[_id].owner == msg.sender &&
                (
                    exchanges[_id].status == Status.APPROVED ||
                    exchanges[_id].status == Status.CANCEL_PENDING ||
                    exchanges[_id].status == Status.PENDING_CLIENT_VALIDATE ||
                    exchanges[_id].status == Status.OWNER_VALIDATED
                )
        );

        exchanges[_id].status = Status.CANCEL_PENDING;

        emit RefundItem(
            exchanges[_id].owner,
            exchanges[_id].game,
            exchanges[_id].server,
            exchanges[_id].item,
            _id
        );
    }

    function exchangeCancelled(uint _id, bool companyValidation) external {
        require(exchanges[_id].status == Status.CANCEL_PENDING);
        games.checkCompany(
            msg.sender,
            exchanges[_id].game,
            exchanges[_id].server,
            exchanges[_id].item
        );

        if (companyValidation) {
            exchanges[_id].status = Status.CANCELLED;
            emit ItemRefunded(
                exchanges[_id].owner,
                exchanges[_id].game,
                exchanges[_id].server,
                exchanges[_id].item,
                _id
            );
        } else {
            exchanges[_id].status = Status.APPROVED;
            emit ItemNotRefunded(
                exchanges[_id].owner,
                exchanges[_id].game,
                _id
            );
        }
    }

    function triggerExchange(uint _id) external {
        require(
            (
                exchanges[_id].status == Status.APPROVED ||
                exchanges[_id].status == Status.PENDING_CLIENT_VALIDATE
            ) && msg.sender != exchanges[_id].owner
        );

        games.checkUser(
            msg.sender,
            exchanges[_id].game,
            exchanges[_id].server,
            exchanges[_id].item
        );
        games.checkUser(
            msg.sender,
            exchanges[_id].gameTo,
            exchanges[_id].serverTo,
            exchanges[_id].itemTo
        );

        exchanges[_id].status = Status.PENDING_CLIENT_VALIDATE;
        exchangeProof[_id][msg.sender] = true;

        emit ValidateClient(
            msg.sender,
            exchanges[_id].game,
            exchanges[_id].server,
            exchanges[_id].item,
            _id
        );
    }

    function validateExchangeClient(
        uint _id,
        address client,
        bool companyValidation
    ) external {
        require(exchangeProof[_id][client]);
        require(
            exchanges[_id].status == Status.APPROVED ||
                exchanges[_id].status == Status.PENDING_CLIENT_VALIDATE
        );

        games.checkCompany(
            msg.sender,
            exchanges[_id].game,
            exchanges[_id].server,
            exchanges[_id].item
        );

        if (companyValidation) {
            exchanges[_id].status = Status.CLIENT_VALIDATED;

            emit ClientValidated(
                client,
                exchanges[_id].game,
                exchanges[_id].server,
                exchanges[_id].item,
                _id
            );

            emit TakeItemClient(
                client,
                exchanges[_id].gameTo,
                exchanges[_id].serverTo,
                exchanges[_id].itemTo,
                _id
            );
        } else {
            exchanges[_id].status = Status.APPROVED;
            emit ClientNotValidated(client, exchanges[_id].game, _id);
        }
    }

    function itemTakenClient(
        uint _id,
        address user,
        bool companyValidation
    ) external {
        require(exchangeProof[_id][user]);
        require(
            exchanges[_id].status == Status.APPROVED ||
                exchanges[_id].status == Status.PENDING_CLIENT_VALIDATE ||
                exchanges[_id].status == Status.CLIENT_VALIDATED
        );

        games.checkCompany(
            msg.sender,
            exchanges[_id].gameTo,
            exchanges[_id].serverTo,
            exchanges[_id].itemTo
        );

        if (companyValidation) {
            exchanges[_id].status = Status.EXCHANGE_TRIGGERED;
            exchanges[_id].client = user;

            emit ItemTakenClient(
                user,
                exchanges[_id].gameTo,
                exchanges[_id].serverTo,
                exchanges[_id].itemTo,
                _id
            );

            emit GiveItemOwner(
                exchanges[_id].owner,
                exchanges[_id].gameTo,
                exchanges[_id].serverTo,
                exchanges[_id].itemTo,
                _id
            );

            emit GiveItemClient(
                user,
                exchanges[_id].game,
                exchanges[_id].server,
                exchanges[_id].item,
                _id
            );
        } else {
            exchanges[_id].status = Status.APPROVED;
            emit ItemNotTakenClient(user, exchanges[_id].gameTo, _id);
        }
    }

    function itemGiven(
        uint _id,
        address user,
        bool companyValidation
    ) external {
        require(user == exchanges[_id].owner || user == exchanges[_id].client);

        require(exchanges[_id].status < Status.EXCHANGE_FINISHED);

        if (user == exchanges[_id].owner) {

            games.checkCompany(
                msg.sender,
                exchanges[_id].gameTo,
                exchanges[_id].serverTo,
                exchanges[_id].itemTo
            );

            if (companyValidation) {

                if (exchanges[_id].status == Status.ITEM_GIVEN_CLIENT)
                    exchanges[_id].status = Status.EXCHANGE_FINISHED;
                else {
                    require(exchanges[_id].status != Status.ITEM_GIVEN_OWNER);
                    exchanges[_id].status = Status.ITEM_GIVEN_OWNER;
                }

                emit ItemGivenOwner(
                    msg.sender,
                    exchanges[_id].gameTo,
                    exchanges[_id].serverTo,
                    exchanges[_id].itemTo,
                    _id,
                    uint(exchanges[_id].status)
                );
            } else
                emit ItemNotGivenOwner(
                    msg.sender,
                    exchanges[_id].gameTo,
                    _id
                );
        } else {

            games.checkCompany(
                msg.sender,
                exchanges[_id].game,
                exchanges[_id].server,
                exchanges[_id].item
            );

            if (companyValidation) {

                if (exchanges[_id].status == Status.ITEM_GIVEN_OWNER)
                    exchanges[_id].status = Status.EXCHANGE_FINISHED;
                else {
                    require(exchanges[_id].status != Status.ITEM_GIVEN_CLIENT);
                    exchanges[_id].status = Status.ITEM_GIVEN_CLIENT;
                }

                emit ItemGivenClient(
                    msg.sender,
                    exchanges[_id].game,
                    exchanges[_id].server,
                    exchanges[_id].item,
                    _id,
                    uint(exchanges[_id].status)
                );
            } else
                emit ItemNotGivenClient(
                    msg.sender,
                    exchanges[_id].game,
                    _id
                );
        }
    }
}
