/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IBMarketGames,
  IBMarketGamesInterface,
} from "../../../../../contracts/private/interfaces/IGames.sol/IBMarketGames";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "targetGame",
        type: "uint256",
      },
    ],
    name: "acceptAffiliation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "item",
        type: "uint256[]",
      },
    ],
    name: "addCompanyItems",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "items",
        type: "uint256[]",
      },
    ],
    name: "addGameItems",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "servers",
        type: "uint256[]",
      },
    ],
    name: "addGameServers",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "game",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "username",
            type: "string",
          },
          {
            internalType: "string",
            name: "password",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "server",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "email",
            type: "string",
          },
          {
            internalType: "string",
            name: "ign",
            type: "string",
          },
        ],
        internalType: "struct IBMarketGames.Authentication",
        name: "authentication",
        type: "tuple",
      },
    ],
    name: "authenticate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "game",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "username",
            type: "string",
          },
          {
            internalType: "string",
            name: "password",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "server",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "email",
            type: "string",
          },
          {
            internalType: "string",
            name: "ign",
            type: "string",
          },
        ],
        internalType: "struct IBMarketGames.Authentication",
        name: "authentication",
        type: "tuple",
      },
      {
        internalType: "bool",
        name: "companyValidation",
        type: "bool",
      },
    ],
    name: "authenticated",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
    ],
    name: "changeGameStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
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
    ],
    name: "checkCompany",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameFrom",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "gameTo",
        type: "uint256",
      },
    ],
    name: "checkGameAffiliation",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "gameOwner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
    ],
    name: "checkGameOwner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
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
    ],
    name: "checkGameServerCompanyItem",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
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
    ],
    name: "checkGameServerItem",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
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
    ],
    name: "checkUser",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "item",
        type: "uint256",
      },
    ],
    name: "companyItemOf",
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
    inputs: [],
    name: "configNewGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "allowed",
        type: "uint256",
      },
    ],
    name: "gameAllowed",
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
        name: "game",
        type: "uint256",
      },
    ],
    name: "getFees",
    outputs: [
      {
        internalType: "uint256[2]",
        name: "",
        type: "uint256[2]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
    ],
    name: "getGameOnMarketStatus",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
    ],
    name: "getGameOwner",
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
        name: "game",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "item",
        type: "uint256",
      },
    ],
    name: "itemOf",
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
        name: "game",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "allowed",
        type: "address",
      },
    ],
    name: "permission",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
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
    ],
    name: "playingOnServer",
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
        name: "game",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "targetGame",
        type: "uint256",
      },
    ],
    name: "requestAffiliateGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
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
    ],
    name: "serverOf",
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
        internalType: "address",
        name: "busers",
        type: "address",
      },
    ],
    name: "setBUsers",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "uint256[2]",
        name: "theFees",
        type: "uint256[2]",
      },
    ],
    name: "setFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
    ],
    name: "setGameTwoFactorAuth",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
      {
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "setPermission",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "game",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "targets",
        type: "address[]",
      },
      {
        internalType: "bool[]",
        name: "permissions",
        type: "bool[]",
      },
    ],
    name: "setPermissions",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
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
        internalType: "string",
        name: "temporaryPassword",
        type: "string",
      },
    ],
    name: "twoFactorAuthenticate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "game",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "username",
            type: "string",
          },
          {
            internalType: "string",
            name: "password",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "server",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "email",
            type: "string",
          },
          {
            internalType: "string",
            name: "ign",
            type: "string",
          },
        ],
        internalType: "struct IBMarketGames.Authentication",
        name: "authentication",
        type: "tuple",
      },
      {
        internalType: "bool",
        name: "companyValidation",
        type: "bool",
      },
    ],
    name: "twoFactorAuthenticated",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IBMarketGames__factory {
  static readonly abi = _abi;
  static createInterface(): IBMarketGamesInterface {
    return new utils.Interface(_abi) as IBMarketGamesInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IBMarketGames {
    return new Contract(address, _abi, signerOrProvider) as IBMarketGames;
  }
}