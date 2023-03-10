/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../../common";

export declare namespace SALESPARAMS {
  export type SaleStruct = {
    seller: PromiseOrValue<string>;
    buyer: PromiseOrValue<string>;
    currency: PromiseOrValue<string>;
    nftAddresses: PromiseOrValue<string>[];
    nftIds: PromiseOrValue<BigNumberish>[];
    nftAmounts: PromiseOrValue<BigNumberish>[];
    amounts: PromiseOrValue<BigNumberish>[];
    price: PromiseOrValue<BigNumberish>;
    nftTypes: PromiseOrValue<BigNumberish>[];
    status: PromiseOrValue<BigNumberish>;
  };

  export type SaleStructOutput = [
    string,
    string,
    string,
    string[],
    BigNumber[],
    BigNumber[],
    BigNumber[],
    BigNumber,
    number[],
    number
  ] & {
    seller: string;
    buyer: string;
    currency: string;
    nftAddresses: string[];
    nftIds: BigNumber[];
    nftAmounts: BigNumber[];
    amounts: BigNumber[];
    price: BigNumber;
    nftTypes: number[];
    status: number;
  };
}

export interface SALESPARAMSInterface extends utils.Interface {
  functions: {
    "checkItemsApproval(address,address[],uint256[],uint32[])": FunctionFragment;
    "checkTokensApproval(address,address)": FunctionFragment;
    "discounts()": FunctionFragment;
    "fee()": FunctionFragment;
    "id()": FunctionFragment;
    "methods()": FunctionFragment;
    "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)": FunctionFragment;
    "onERC1155Received(address,address,uint256,uint256,bytes)": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
    "owner()": FunctionFragment;
    "pay(address,address,address,uint256[],uint256[],uint8)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "sales(uint256)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "transferTokens(address,address,address[],uint256[],uint256[],uint32[])": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "checkItemsApproval"
      | "checkTokensApproval"
      | "discounts"
      | "fee"
      | "id"
      | "methods"
      | "onERC1155BatchReceived"
      | "onERC1155Received"
      | "onERC721Received"
      | "owner"
      | "pay"
      | "renounceOwnership"
      | "sales"
      | "supportsInterface"
      | "transferOwnership"
      | "transferTokens"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "checkItemsApproval",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "checkTokensApproval",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "discounts", values?: undefined): string;
  encodeFunctionData(functionFragment: "fee", values?: undefined): string;
  encodeFunctionData(functionFragment: "id", values?: undefined): string;
  encodeFunctionData(functionFragment: "methods", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "onERC1155BatchReceived",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC1155Received",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pay",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "sales",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferTokens",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>[]
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "checkItemsApproval",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "checkTokensApproval",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "discounts", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "fee", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "id", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "methods", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "onERC1155BatchReceived",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC1155Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pay", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "sales", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferTokens",
    data: BytesLike
  ): Result;

  events: {
    "Cancellation(uint256,tuple)": EventFragment;
    "NewPayment(address,address,address,uint256[],uint256[],uint8)": EventFragment;
    "NewSale(uint256,tuple)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Purchase(uint256,tuple)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Cancellation"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewPayment"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewSale"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Purchase"): EventFragment;
}

export interface CancellationEventObject {
  id: BigNumber;
  sale: SALESPARAMS.SaleStructOutput;
}
export type CancellationEvent = TypedEvent<
  [BigNumber, SALESPARAMS.SaleStructOutput],
  CancellationEventObject
>;

export type CancellationEventFilter = TypedEventFilter<CancellationEvent>;

export interface NewPaymentEventObject {
  from: string;
  to: string;
  currency: string;
  ids: BigNumber[];
  amounts: BigNumber[];
  paymentType: number;
}
export type NewPaymentEvent = TypedEvent<
  [string, string, string, BigNumber[], BigNumber[], number],
  NewPaymentEventObject
>;

export type NewPaymentEventFilter = TypedEventFilter<NewPaymentEvent>;

export interface NewSaleEventObject {
  id: BigNumber;
  sale: SALESPARAMS.SaleStructOutput;
}
export type NewSaleEvent = TypedEvent<
  [BigNumber, SALESPARAMS.SaleStructOutput],
  NewSaleEventObject
>;

export type NewSaleEventFilter = TypedEventFilter<NewSaleEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface PurchaseEventObject {
  id: BigNumber;
  sale: SALESPARAMS.SaleStructOutput;
}
export type PurchaseEvent = TypedEvent<
  [BigNumber, SALESPARAMS.SaleStructOutput],
  PurchaseEventObject
>;

export type PurchaseEventFilter = TypedEventFilter<PurchaseEvent>;

export interface SALESPARAMS extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SALESPARAMSInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    checkItemsApproval(
      sender: PromiseOrValue<string>,
      nftAddressArray: PromiseOrValue<string>[],
      nftTokenIdArray: PromiseOrValue<BigNumberish>[],
      nftTokenTypeArray: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<[void]>;

    checkTokensApproval(
      from: PromiseOrValue<string>,
      currency: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    discounts(overrides?: CallOverrides): Promise<[string]>;

    fee(overrides?: CallOverrides): Promise<[BigNumber]>;

    id(overrides?: CallOverrides): Promise<[BigNumber]>;

    methods(overrides?: CallOverrides): Promise<[string]>;

    onERC1155BatchReceived(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>[],
      arg3: PromiseOrValue<BigNumberish>[],
      arg4: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    onERC1155Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BigNumberish>,
      arg4: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    onERC721Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pay(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      currency: PromiseOrValue<string>,
      ids: PromiseOrValue<BigNumberish>[],
      amounts: PromiseOrValue<BigNumberish>[],
      paymentType: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    sales(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, BigNumber, number] & {
        seller: string;
        buyer: string;
        currency: string;
        price: BigNumber;
        status: number;
      }
    >;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferTokens(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      nftAddresses: PromiseOrValue<string>[],
      nftIds: PromiseOrValue<BigNumberish>[],
      nftAmounts: PromiseOrValue<BigNumberish>[],
      nftTypes: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  checkItemsApproval(
    sender: PromiseOrValue<string>,
    nftAddressArray: PromiseOrValue<string>[],
    nftTokenIdArray: PromiseOrValue<BigNumberish>[],
    nftTokenTypeArray: PromiseOrValue<BigNumberish>[],
    overrides?: CallOverrides
  ): Promise<void>;

  checkTokensApproval(
    from: PromiseOrValue<string>,
    currency: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  discounts(overrides?: CallOverrides): Promise<string>;

  fee(overrides?: CallOverrides): Promise<BigNumber>;

  id(overrides?: CallOverrides): Promise<BigNumber>;

  methods(overrides?: CallOverrides): Promise<string>;

  onERC1155BatchReceived(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    arg2: PromiseOrValue<BigNumberish>[],
    arg3: PromiseOrValue<BigNumberish>[],
    arg4: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  onERC1155Received(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    arg2: PromiseOrValue<BigNumberish>,
    arg3: PromiseOrValue<BigNumberish>,
    arg4: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  onERC721Received(
    arg0: PromiseOrValue<string>,
    arg1: PromiseOrValue<string>,
    arg2: PromiseOrValue<BigNumberish>,
    arg3: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  pay(
    from: PromiseOrValue<string>,
    to: PromiseOrValue<string>,
    currency: PromiseOrValue<string>,
    ids: PromiseOrValue<BigNumberish>[],
    amounts: PromiseOrValue<BigNumberish>[],
    paymentType: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  sales(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [string, string, string, BigNumber, number] & {
      seller: string;
      buyer: string;
      currency: string;
      price: BigNumber;
      status: number;
    }
  >;

  supportsInterface(
    interfaceId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferTokens(
    from: PromiseOrValue<string>,
    to: PromiseOrValue<string>,
    nftAddresses: PromiseOrValue<string>[],
    nftIds: PromiseOrValue<BigNumberish>[],
    nftAmounts: PromiseOrValue<BigNumberish>[],
    nftTypes: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    checkItemsApproval(
      sender: PromiseOrValue<string>,
      nftAddressArray: PromiseOrValue<string>[],
      nftTokenIdArray: PromiseOrValue<BigNumberish>[],
      nftTokenTypeArray: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    checkTokensApproval(
      from: PromiseOrValue<string>,
      currency: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    discounts(overrides?: CallOverrides): Promise<string>;

    fee(overrides?: CallOverrides): Promise<BigNumber>;

    id(overrides?: CallOverrides): Promise<BigNumber>;

    methods(overrides?: CallOverrides): Promise<string>;

    onERC1155BatchReceived(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>[],
      arg3: PromiseOrValue<BigNumberish>[],
      arg4: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    onERC1155Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BigNumberish>,
      arg4: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    onERC721Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    pay(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      currency: PromiseOrValue<string>,
      ids: PromiseOrValue<BigNumberish>[],
      amounts: PromiseOrValue<BigNumberish>[],
      paymentType: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    sales(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, BigNumber, number] & {
        seller: string;
        buyer: string;
        currency: string;
        price: BigNumber;
        status: number;
      }
    >;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferTokens(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      nftAddresses: PromiseOrValue<string>[],
      nftIds: PromiseOrValue<BigNumberish>[],
      nftAmounts: PromiseOrValue<BigNumberish>[],
      nftTypes: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Cancellation(uint256,tuple)"(
      id?: PromiseOrValue<BigNumberish> | null,
      sale?: null
    ): CancellationEventFilter;
    Cancellation(
      id?: PromiseOrValue<BigNumberish> | null,
      sale?: null
    ): CancellationEventFilter;

    "NewPayment(address,address,address,uint256[],uint256[],uint8)"(
      from?: null,
      to?: null,
      currency?: null,
      ids?: null,
      amounts?: null,
      paymentType?: null
    ): NewPaymentEventFilter;
    NewPayment(
      from?: null,
      to?: null,
      currency?: null,
      ids?: null,
      amounts?: null,
      paymentType?: null
    ): NewPaymentEventFilter;

    "NewSale(uint256,tuple)"(
      id?: PromiseOrValue<BigNumberish> | null,
      sale?: null
    ): NewSaleEventFilter;
    NewSale(
      id?: PromiseOrValue<BigNumberish> | null,
      sale?: null
    ): NewSaleEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "Purchase(uint256,tuple)"(
      id?: PromiseOrValue<BigNumberish> | null,
      sale?: null
    ): PurchaseEventFilter;
    Purchase(
      id?: PromiseOrValue<BigNumberish> | null,
      sale?: null
    ): PurchaseEventFilter;
  };

  estimateGas: {
    checkItemsApproval(
      sender: PromiseOrValue<string>,
      nftAddressArray: PromiseOrValue<string>[],
      nftTokenIdArray: PromiseOrValue<BigNumberish>[],
      nftTokenTypeArray: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    checkTokensApproval(
      from: PromiseOrValue<string>,
      currency: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    discounts(overrides?: CallOverrides): Promise<BigNumber>;

    fee(overrides?: CallOverrides): Promise<BigNumber>;

    id(overrides?: CallOverrides): Promise<BigNumber>;

    methods(overrides?: CallOverrides): Promise<BigNumber>;

    onERC1155BatchReceived(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>[],
      arg3: PromiseOrValue<BigNumberish>[],
      arg4: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    onERC1155Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BigNumberish>,
      arg4: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    onERC721Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pay(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      currency: PromiseOrValue<string>,
      ids: PromiseOrValue<BigNumberish>[],
      amounts: PromiseOrValue<BigNumberish>[],
      paymentType: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    sales(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferTokens(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      nftAddresses: PromiseOrValue<string>[],
      nftIds: PromiseOrValue<BigNumberish>[],
      nftAmounts: PromiseOrValue<BigNumberish>[],
      nftTypes: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    checkItemsApproval(
      sender: PromiseOrValue<string>,
      nftAddressArray: PromiseOrValue<string>[],
      nftTokenIdArray: PromiseOrValue<BigNumberish>[],
      nftTokenTypeArray: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    checkTokensApproval(
      from: PromiseOrValue<string>,
      currency: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    discounts(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    fee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    id(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    methods(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    onERC1155BatchReceived(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>[],
      arg3: PromiseOrValue<BigNumberish>[],
      arg4: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    onERC1155Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BigNumberish>,
      arg4: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    onERC721Received(
      arg0: PromiseOrValue<string>,
      arg1: PromiseOrValue<string>,
      arg2: PromiseOrValue<BigNumberish>,
      arg3: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pay(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      currency: PromiseOrValue<string>,
      ids: PromiseOrValue<BigNumberish>[],
      amounts: PromiseOrValue<BigNumberish>[],
      paymentType: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    sales(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferTokens(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      nftAddresses: PromiseOrValue<string>[],
      nftIds: PromiseOrValue<BigNumberish>[],
      nftAmounts: PromiseOrValue<BigNumberish>[],
      nftTypes: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
