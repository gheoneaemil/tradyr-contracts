/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  Payable,
  PayableInterface,
} from "../../../../contracts/public/plugins/Payable";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "currency",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "enum Payable.PaymentTypes",
        name: "paymentType",
        type: "uint8",
      },
    ],
    name: "NewPayment",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
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
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "address",
        name: "currency",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "enum Payable.PaymentTypes",
        name: "paymentType",
        type: "uint8",
      },
    ],
    name: "pay",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50600160005561001f33610024565b610076565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b610911806100856000396000f3fe60806040526004361061003f5760003560e01c8063715018a6146100445780638da5cb5b1461005b578063c01f59c214610087578063f2fde38b1461009a575b600080fd5b34801561005057600080fd5b506100596100ba565b005b34801561006757600080fd5b50600154604080516001600160a01b039092168252519081900360200190f35b6100596100953660046106b0565b6100ce565b3480156100a657600080fd5b506100596100b536600461075d565b610460565b6100c26104de565b6100cc6000610538565b565b6100d661058a565b6100de6104de565b60008160038111156100f2576100f261077f565b0361019357836001600160a01b03166342842e0e87878660008151811061011b5761011b610795565b60209081029190910101516040516001600160e01b031960e086901b1681526001600160a01b03938416600482015292909116602483015260448201526064015b600060405180830381600087803b15801561017657600080fd5b505af115801561018a573d6000803e3d6000fd5b5050505061040d565b60018160038111156101a7576101a761077f565b036101de57604051631759616b60e11b81526001600160a01b03851690632eb2c2d69061015c9089908990889088906004016107e6565b60028160038111156101f2576101f261077f565b03610319576001600160a01b03861630146102bd57836001600160a01b03166323b872dd87878560008151811061022b5761022b610795565b60209081029190910101516040516001600160e01b031960e086901b1681526001600160a01b03938416600482015292909116602483015260448201526064015b6020604051808303816000875af115801561028b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102af9190610841565b6102b857600080fd5b61040d565b836001600160a01b031663a9059cbb86846000815181106102e0576102e0610795565b60200260200101516040518363ffffffff1660e01b815260040161026c9291906001600160a01b03929092168252602082015260400190565b600381600381111561032d5761032d61077f565b0361040d576001600160a01b0385163b156103c2576000856001600160a01b03168360008151811061036157610361610795565b602002602001015160405160006040518083038185875af1925050503d80600081146103a9576040519150601f19603f3d011682016040523d82523d6000602084013e6103ae565b606091505b50509050806103bc57600080fd5b5061040d565b846001600160a01b03166108fc836000815181106103e2576103e2610795565b60200260200101519081150290604051600060405180830381858888f1935050505061040d57600080fd5b7f4f74c37cf0470b045087a8c6291e730e0623175419cdc46c332bb8a15f8de99e86868686868660405161044696959493929190610863565b60405180910390a16104586001600055565b505050505050565b6104686104de565b6001600160a01b0381166104d25760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b6104db81610538565b50565b6001546001600160a01b031633146100cc5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016104c9565b600180546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6002600054036105dc5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064016104c9565b6002600055565b80356001600160a01b03811681146105fa57600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b600082601f83011261062657600080fd5b8135602067ffffffffffffffff80831115610643576106436105ff565b8260051b604051601f19603f83011681018181108482111715610668576106686105ff565b60405293845285810183019383810192508785111561068657600080fd5b83870191505b848210156106a55781358352918301919083019061068c565b979650505050505050565b60008060008060008060c087890312156106c957600080fd5b6106d2876105e3565b95506106e0602088016105e3565b94506106ee604088016105e3565b9350606087013567ffffffffffffffff8082111561070b57600080fd5b6107178a838b01610615565b9450608089013591508082111561072d57600080fd5b5061073a89828a01610615565b92505060a08701356004811061074f57600080fd5b809150509295509295509295565b60006020828403121561076f57600080fd5b610778826105e3565b9392505050565b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b600081518084526020808501945080840160005b838110156107db578151875295820195908201906001016107bf565b509495945050505050565b6001600160a01b0385811682528416602082015260a060408201819052600090610812908301856107ab565b828103606084015261082481856107ab565b838103608090940193909352505060008152602001949350505050565b60006020828403121561085357600080fd5b8151801515811461077857600080fd5b6001600160a01b03878116825286811660208301528516604082015260c060608201819052600090610897908301866107ab565b82810360808401526108a981866107ab565b915050600483106108ca57634e487b7160e01b600052602160045260246000fd5b8260a083015297965050505050505056fea264697066735822122040af585e7526755381f01ea2db74d7acf1f75836de749d706d1f11b7b384193764736f6c63430008110033";

type PayableConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PayableConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Payable__factory extends ContractFactory {
  constructor(...args: PayableConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Payable> {
    return super.deploy(overrides || {}) as Promise<Payable>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Payable {
    return super.attach(address) as Payable;
  }
  override connect(signer: Signer): Payable__factory {
    return super.connect(signer) as Payable__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PayableInterface {
    return new utils.Interface(_abi) as PayableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Payable {
    return new Contract(address, _abi, signerOrProvider) as Payable;
  }
}