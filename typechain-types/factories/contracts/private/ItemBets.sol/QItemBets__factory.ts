/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  QItemBets,
  QItemBetsInterface,
} from "../../../../contracts/private/ItemBets.sol/QItemBets";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "bgames",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "server",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "item",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "GiveItem",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "server",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "item",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum QItemBets.BetStatus",
        name: "status",
        type: "uint8",
      },
    ],
    name: "ItemGiven",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "ItemNotGiven",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "ItemNotRefunded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "ItemNotTakenOpponent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "ItemNotTakenOwner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "server",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "item",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum QItemBets.BetStatus",
        name: "status",
        type: "uint8",
      },
    ],
    name: "ItemRefunded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "server",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "item",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "ItemTakenOpponent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "server",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "item",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "ItemTakenOwner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "OpponentBetAccepted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "server",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "item",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "RefundItem",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "server",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "item",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[2]",
        name: "score",
        type: "uint256[2]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "status",
        type: "uint256",
      },
    ],
    name: "TakeItemOpponent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "theMatch",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "theGameOfMatch",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "server",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "item",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256[2]",
        name: "score",
        type: "uint256[2]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "status",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "forScore",
        type: "bool",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "TakeItemOwner",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bet",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "gamerValidation",
        type: "bool",
      },
    ],
    name: "acceptBetOffert",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bet",
        type: "uint256",
      },
    ],
    name: "cancelItemsBet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bet",
        type: "uint256",
      },
      {
        internalType: "uint256[2]",
        name: "score",
        type: "uint256[2]",
      },
      {
        internalType: "uint256",
        name: "status",
        type: "uint256",
      },
    ],
    name: "finishBet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "games",
    outputs: [
      {
        internalType: "contract IBMarketGames",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "id",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "itemsBet",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "opponent",
        type: "address",
      },
      {
        internalType: "address",
        name: "winner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "theMatch",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "forScore",
        type: "bool",
      },
      {
        internalType: "enum QItemBets.BetStatus",
        name: "status",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bet",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "companyValidation",
        type: "bool",
      },
    ],
    name: "opponentBetConfirmation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bet",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "companyValidation",
        type: "bool",
      },
    ],
    name: "ownerBetConfirmation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bet",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "server",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "item",
        type: "uint256",
      },
      {
        internalType: "uint256[2]",
        name: "score",
        type: "uint256[2]",
      },
      {
        internalType: "uint256",
        name: "status",
        type: "uint256",
      },
    ],
    name: "playTheBet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "bgames",
        type: "address",
      },
    ],
    name: "setGlobalParams",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bet",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "server",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "item",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        internalType: "bool",
        name: "companyValidation",
        type: "bool",
      },
    ],
    name: "setPlayerItemRefunded",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "bet",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "server",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "item",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
      {
        internalType: "bool",
        name: "companyValidation",
        type: "bool",
      },
    ],
    name: "setPlayerReceivedItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "theMatch",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "gameOfMatch",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "server",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "item",
        type: "uint256",
      },
      {
        internalType: "uint256[2]",
        name: "score",
        type: "uint256[2]",
      },
      {
        internalType: "uint256",
        name: "status",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "forScore",
        type: "bool",
      },
    ],
    name: "startItemsBet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080604052600160025534801561001557600080fd5b50604051611eca380380611eca83398101604081905261003491610067565b60008054336001600160a01b031991821617909155600180549091166001600160a01b0392909216919091179055610097565b60006020828403121561007957600080fd5b81516001600160a01b038116811461009057600080fd5b9392505050565b611e24806100a66000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c80638da5cb5b1161008c578063986161401161006657806398616140146102305780639dcf378b14610243578063af640d0f14610256578063b172b57a1461026d57600080fd5b80638da5cb5b146101df578063906809641461020a578063955a015b1461021d57600080fd5b8063479bf371116100c8578063479bf3711461012a5780634ae5de23146101a657806356361a7d146101b957806377f3d4f4146101cc57600080fd5b806302bd5e5e146100ef578063158408fa146101045780631a277c0314610117575b600080fd5b6101026100fd366004611a59565b610280565b005b610102610112366004611a59565b61043f565b610102610125366004611a9c565b610593565b61018a610138366004611af4565b60036020819052600091825260409091208054600182015460028301549383015460048401546011909401546001600160a01b0393841695928416949390921692909160ff8082169161010090041687565b60405161019d9796959493929190611b45565b60405180910390f35b6101026101b4366004611bab565b610923565b6101026101c7366004611a59565b610b8b565b6101026101da366004611c1a565b610d28565b6000546101f2906001600160a01b031681565b6040516001600160a01b03909116815260200161019d565b610102610218366004611c50565b611229565b6001546101f2906001600160a01b031681565b61010261023e366004611af4565b611262565b610102610251366004611a9c565b61138e565b61025f60025481565b60405190815260200161019d565b61010261027b366004611c72565b61161a565b6000828152600360205260409020546001600160a01b0316158015906102cf575060008083815260036020526040902060110154610100900460ff16600a8111156102cd576102cd611b0d565b145b6102d857600080fd5b600154600083815260036020526040908190206005810154600d82015460079092015492516332294f3960e11b81526001600160a01b03909416936364529e729361032b93339392909190600401611cda565b60006040518083038186803b15801561034357600080fd5b505afa158015610357573d6000803e3d6000fd5b5050505080156103e157600082815260036020526040812060118101805461ff00191661010017905560058101548154600d830154869492936001600160a01b03909216927f63ab5fd56a5095d3f5f38456384c6406cbc9ee6b8026aa90ebc4b2af2e9f1cfd92600701905b01546040805192835260208301919091520160405180910390a45050565b60008281526003602052604080822060118101805461ff001916610a00179055600581015490549151859391926001600160a01b0316917f6dd6ccee3d399b6ec1ebc190cf30313efe771ace11b5b9268c9eb62a72a9f49591a45050565b6003600083815260036020526040902060110154610100900460ff16600a81111561046c5761046c611b0d565b14801561048f57506000828152600360205260409020546001600160a01b031633145b61049857600080fd5b80156104f05760008281526003602052604080822060118101805461ff001916610400179055600601549051849233917f83e89f0c78636a6fcdaf196940e8fb0d1c09fda9d518b2a31162304c4a0e0dd59190a45050565b60008281526003602090815260409182902060068101546001820154600e830154600890930154855193845293830193909352859390926001600160a01b031691600080516020611daf833981519152910160405180910390a4506000908152600360205260408120600681018290556001810180546001600160a01b0319169055600e81018290556008810191909155601101805461ff001916610100179055565b8484846000831180156105a65750600082115b80156105b25750600081115b6105bb57600080fd5b6105c98960018a8a8a6119b5565b806105dd57506105dd8960008a8a8a6119b5565b6105e657600080fd5b600160008a815260036020526040902060110154610100900460ff16600a81111561061357610613611b0d565b148061067d5750600460008a815260036020526040902060110154610100900460ff16600a81111561064757610647611b0d565b148061067d5750600560008a815260036020526040902060110154610100900460ff16600a81111561067b5761067b611b0d565b145b61068657600080fd5b6000898152600360205260409020546001600160a01b03868116911614806106ca57506000898152600360205260409020600101546001600160a01b038681169116145b6106d357600080fd5b6001546040516332294f3960e11b81526001600160a01b03909116906364529e72906107099033908c908c908c90600401611cda565b60006040518083038186803b15801561072157600080fd5b505afa158015610735573d6000803e3d6000fd5b5050505083156108df57600160008a815260036020526040902060110154610100900460ff16600a81111561076c5761076c611b0d565b036107e357600089815260036020526040902060110180546009919061ff0019166101008302179055508888866001600160a01b03167fdf5286d499bdf2bc79804084c84b189c1788563ef158ce1367dbd2c9aad6ec858a8a60096040516107d693929190611d00565b60405180910390a4610918565b600460008a815260036020526040902060110154610100900460ff16600a81111561081057610810611b0d565b0361087a57600089815260036020526040902060110180546005919061ff0019166101008302179055508888866001600160a01b03167fdf5286d499bdf2bc79804084c84b189c1788563ef158ce1367dbd2c9aad6ec858a8a60056040516107d693929190611d00565b600089815260036020526040902060110180546006919061ff0019166101008302179055508888866001600160a01b03167fdf5286d499bdf2bc79804084c84b189c1788563ef158ce1367dbd2c9aad6ec858a8a60066040516107d693929190611d00565b8888866001600160a01b03167f0cb5255f0cb5f3c92b353e244e31454415d69c769fe5f634a6eb74849a862d7860405160405180910390a45b505050505050505050565b8585856000831180156109365750600082115b80156109425750600081115b61094b57600080fd5b84600b148061095a575084600c145b806109655750846016145b61096e57600080fd5b6001546040516320f1bf4160e01b81526001600160a01b03909116906320f1bf41906109a49033908d908d908d90600401611cda565b60006040518083038186803b1580156109bc57600080fd5b505afa1580156109d0573d6000803e3d6000fd5b505050508a6003600060025481526020019081526020016000206003018190555089600360006002548152602001908152602001600020600401819055503360036000600254815260200190815260200160002060000160006101000a8154816001600160a01b0302191690836001600160a01b0316021790555088600360006002548152602001908152602001600020600501600060028110610a7657610a76611cc4565b015560028054600090815260036020526040808220600d018b9055825482528082206007018a9055825482528082206011908101805460ff1916891580159190911790915593548352912001805461ff0019169055610b02576002805460009081526003602090815260408083208a356009909101559254825291902090870135600a90910155610b1a565b6002546000908152600360205260409020600f018590555b60025489336001600160a01b03167f2c67f92d3336bb756262b2fcfdac4333f8f0881de46dd4b4a6953ed7bf4e21f08e8e8d8d8d8d8d604051610b639796959493929190611d23565b60405180910390a4600260008154610b7a90611d63565b909155505050505050505050505050565b6002600083815260036020526040902060110154610100900460ff16600a811115610bb857610bb8611b0d565b14610bc257600080fd5b600154600083815260036020526040908190206006810154600e82015460089092015492516332294f3960e11b81526001600160a01b03909416936364529e7293610c1593339392909190600401611cda565b60006040518083038186803b158015610c2d57600080fd5b505afa158015610c41573d6000803e3d6000fd5b505050508015610cb357600082815260036020526040902060118101805461ff0019166103001790556006810154600180830154600e84015486946001600160a01b03909216927febd25ba41905e556aa199ad699dab2b69cc2e3a2df1d428980324e0408a731e692600701906103c3565b600082815260036020526040808220600681018390556001810180546001600160a01b0319169055600e810183905560088101839055601101805461ff0019166101001790555183919081907f6e738a908fd360deb523458b468d824ce6bc02c2d5367ce3d6b1e36bca31db63908290a45050565b6000546001600160a01b03163314610d3f57600080fd5b6004600084815260036020526040902060110154610100900460ff16600a811115610d6c57610d6c611b0d565b036111405760008381526003602052604090206011015460ff1615610eef576000838152600360205260409020600901548235148015610dc257506000838152600360209081526040909120600a015490830135145b8015610e0157506000838152600360205260409020600b01548235141580610e0157506000838152600360209081526040909120600c01549083013514155b15610e395760008381526003602052604090208054600290910180546001600160a01b0319166001600160a01b039092169190911790555b6000838152600360205260409020600b01548235148015610e7057506000838152600360209081526040909120600c015490830135145b8015610eaf57506000838152600360205260409020600901548235141580610eaf57506000838152600360209081526040909120600a01549083013514155b15610eea5760008381526003602052604090206001810154600290910180546001600160a01b0319166001600160a01b039092169190911790555b610fc4565b6000838152600360205260409020600f015481148015610f2057506000838152600360205260409020601001548114155b15610f585760008381526003602052604090208054600290910180546001600160a01b0319166001600160a01b039092169190911790555b60008381526003602052604090206010015481148015610f8957506000838152600360205260409020600f01548114155b15610fc45760008381526003602052604090206001810154600290910180546001600160a01b0319166001600160a01b039092169190911790555b6000838152600360205260409020600201546001600160a01b0316156110a95760008381526003602090815260409182902060058101546002820154600d830154600790930154855193845293830193909352869390926001600160a01b031691600080516020611dcf833981519152910160405180910390a460008381526003602052604090206006810154600282015485926001600160a01b0390911690600080516020611dcf83398151915290600d0160015b0154600088815260036020908152604091829020600801548251938452908301520160405180910390a4505050565b60008381526003602090815260409182902060058101548154600d830154600790930154855193845293830193909352869390926001600160a01b031691600080516020611dcf833981519152910160405180910390a46000838152600360205260409020600681015460018083015486936001600160a01b0390911691600080516020611dcf83398151915291600d019061107a565b6003600084815260036020526040902060110154610100900460ff16600a81111561116d5761116d611b0d565b036112245760008381526003602090815260409182902060058101548154600d830154600790930154855193845293830193909352869390926001600160a01b031691600080516020611daf833981519152910160405180910390a460008381526003602090815260409182902060068101546001820154600e830154600890930154855193845293830193909352869390926001600160a01b031691600080516020611daf833981519152910160405180910390a45b505050565b6000546001600160a01b0316331461124057600080fd5b600180546001600160a01b0319166001600160a01b0392909216919091179055565b6000818152600360205260409020546001600160a01b0316331480156112b257506001600082815260036020526040902060110154610100900460ff16600a8111156112b0576112b0611b0d565b145b6112bb57600080fd5b600154600082815260036020526040908190206005810154600d82015460079092015492516320f1bf4160e01b81526001600160a01b03909416936320f1bf419361130e93339392909190600401611cda565b60006040518083038186803b15801561132657600080fd5b505afa15801561133a573d6000803e3d6000fd5b5050506000828152600360209081526040918290206005810154600d82015460079092015484519283529282019290925284935090913391600080516020611daf833981519152910160405180910390a450565b8484846000831180156113a15750600082115b80156113ad5750600081115b6113b657600080fd5b600460008a815260036020526040902060110154610100900460ff16600a8111156113e3576113e3611b0d565b14806114195750600760008a815260036020526040902060110154610100900460ff16600a81111561141757611417611b0d565b145b61142257600080fd5b6000898152600360205260409020546001600160a01b038681169116148061146657506000898152600360205260409020600101546001600160a01b038681169116145b61146f57600080fd5b6001546040516332294f3960e11b81526001600160a01b03909116906364529e72906114a59033908c908c908c90600401611cda565b60006040518083038186803b1580156114bd57600080fd5b505afa1580156114d1573d6000803e3d6000fd5b5050505083156115d757600460008a815260036020526040902060110154610100900460ff16600a81111561150857611508611b0d565b0361157257600089815260036020526040902060110180546007919061ff0019166101008302179055508888866001600160a01b03167ff0e9a3d51d9bf9996fc6f3f111aec4400f98553c8730050cfbe33682a5e8b5e58a8a60076040516107d693929190611d00565b600089815260036020526040902060110180546008919061ff0019166101008302179055508888866001600160a01b03167ff0e9a3d51d9bf9996fc6f3f111aec4400f98553c8730050cfbe33682a5e8b5e58a8a60086040516107d693929190611d00565b8888866001600160a01b03167faf6b3032f8e3492c4bb6b4c79dcc6083c222fa059953718fd64af48b99e021c260405160405180910390a4505050505050505050565b84848460008311801561162d5750600082115b80156116395750600081115b61164257600080fd5b83600b1480611651575083600c145b8061165c5750836016145b80156116925750600160008a815260036020526040902060110154610100900460ff16600a81111561169057611690611b0d565b145b61169b57600080fd5b60015460008a815260036020526040908190205490516320f1bf4160e01b81526001600160a01b03928316926320f1bf41926116e2929116908c908c908c90600401611cda565b60006040518083038186803b1580156116fa57600080fd5b505afa15801561170e573d6000803e3d6000fd5b505060015460008c81526003602052604090819020600501549051630a64ff5360e31b8152600481018d905260248101919091526001600160a01b039091169250635327fa98915060440160006040518083038186803b15801561177157600080fd5b505afa158015611785573d6000803e3d6000fd5b50506001546040516320f1bf4160e01b81526001600160a01b0390911692506320f1bf4191506117bf9033908c908c908c90600401611cda565b60006040518083038186803b1580156117d757600080fd5b505afa1580156117eb573d6000803e3d6000fd5b505060015460008c815260036020526040908190206005810154600d82015460079092015492516320f1bf4160e01b81526001600160a01b0390941695506320f1bf41945061184293339391929190600401611cda565b60006040518083038186803b15801561185a57600080fd5b505afa15801561186e573d6000803e3d6000fd5b50505060008a815260036020526040902060118101805461ff0019811661020017909155600682018b90556001820180546001600160a01b03191633179055600e82018a9055600890910188905560ff1615905061192e5760008981526003602052604090206009015485351415806118fe57506000898152600360209081526040909120600a01549086013514155b61190757600080fd5b60008981526003602090815260409091208635600b82015590860135600c90910155611961565b6000898152600360205260409020600f015484900361194c57600080fd5b60008981526003602052604090206010018490555b8888336001600160a01b03167f28bdb554a2c3c243ec12984a1f59b395b26612e04794e2962b0fae471d8c9b808a8a8a8a6040516119a29493929190611d8a565b60405180910390a4505050505050505050565b6000858152600360205260408120849060050186600281106119d9576119d9611cc4565b0154148015611a0b575060008681526003602052604090208390600d018660028110611a0757611a07611cc4565b0154145b8015611a3a5750600086815260036020526040902082906007018660028110611a3657611a36611cc4565b0154145b9695505050505050565b80358015158114611a5457600080fd5b919050565b60008060408385031215611a6c57600080fd5b82359150611a7c60208401611a44565b90509250929050565b80356001600160a01b0381168114611a5457600080fd5b60008060008060008060c08789031215611ab557600080fd5b86359550602087013594506040870135935060608701359250611ada60808801611a85565b9150611ae860a08801611a44565b90509295509295509295565b600060208284031215611b0657600080fd5b5035919050565b634e487b7160e01b600052602160045260246000fd5b600b8110611b4157634e487b7160e01b600052602160045260246000fd5b9052565b6001600160a01b038881168252878116602083015286166040820152606081018590526080810184905282151560a082015260e08101611b8860c0830184611b23565b98975050505050505050565b8060408101831015611ba557600080fd5b92915050565b600080600080600080600080610120898b031215611bc857600080fd5b8835975060208901359650604089013595506060890135945060808901359350611bf58a60a08b01611b94565b925060e08901359150611c0b6101008a01611a44565b90509295985092959890939650565b600080600060808486031215611c2f57600080fd5b83359250611c408560208601611b94565b9150606084013590509250925092565b600060208284031215611c6257600080fd5b611c6b82611a85565b9392505050565b60008060008060008060e08789031215611c8b57600080fd5b86359550602087013594506040870135935060608701359250611cb18860808901611b94565b915060c087013590509295509295509295565b634e487b7160e01b600052603260045260246000fd5b6001600160a01b0394909416845260208401929092526040830152606082015260800190565b8381526020810183905260608101611d1b6040830184611b23565b949350505050565b60006101008201905088825287602083015286604083015285606083015260408560808401378360c083015282151560e083015298975050505050505050565b600060018201611d8357634e487b7160e01b600052601160045260246000fd5b5060010190565b8481526020810184905260a08101604084818401378260808301529594505050505056fee9af9e82f3c3eee0c87697791875b3d83c7286fe489d5b69620ae2cdcd828f356a391651e6925699d21e05a7839a1cd477cf124d1392eb575fdeed1b1b9fd6d9a2646970667358221220cecd1bbc24c51cd9886cc88d1f2568fee82499aae48dba4f51e32baa7bf9410d64736f6c63430008110033";

type QItemBetsConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: QItemBetsConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class QItemBets__factory extends ContractFactory {
  constructor(...args: QItemBetsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    bgames: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<QItemBets> {
    return super.deploy(bgames, overrides || {}) as Promise<QItemBets>;
  }
  override getDeployTransaction(
    bgames: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(bgames, overrides || {});
  }
  override attach(address: string): QItemBets {
    return super.attach(address) as QItemBets;
  }
  override connect(signer: Signer): QItemBets__factory {
    return super.connect(signer) as QItemBets__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): QItemBetsInterface {
    return new utils.Interface(_abi) as QItemBetsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): QItemBets {
    return new Contract(address, _abi, signerOrProvider) as QItemBets;
  }
}
