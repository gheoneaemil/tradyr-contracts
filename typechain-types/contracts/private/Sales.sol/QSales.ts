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
} from "../../../common";

export interface QSalesInterface extends utils.Interface {
  functions: {
    "cancelSale(uint256)": FunctionFragment;
    "confirmPurchase(uint256,address,bool)": FunctionFragment;
    "createSale(uint256,uint256,uint256,uint256,bool)": FunctionFragment;
    "games()": FunctionFragment;
    "id()": FunctionFragment;
    "owner()": FunctionFragment;
    "purchase(uint256)": FunctionFragment;
    "saleCancelled(uint256,bool)": FunctionFragment;
    "sales(uint256)": FunctionFragment;
    "setGlobalParams(address,address)": FunctionFragment;
    "users()": FunctionFragment;
    "validateSale(uint256,bool)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "cancelSale"
      | "confirmPurchase"
      | "createSale"
      | "games"
      | "id"
      | "owner"
      | "purchase"
      | "saleCancelled"
      | "sales"
      | "setGlobalParams"
      | "users"
      | "validateSale"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "cancelSale",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "confirmPurchase",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<boolean>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "createSale",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<boolean>
    ]
  ): string;
  encodeFunctionData(functionFragment: "games", values?: undefined): string;
  encodeFunctionData(functionFragment: "id", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "purchase",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "saleCancelled",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "sales",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setGlobalParams",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "users", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "validateSale",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<boolean>]
  ): string;

  decodeFunctionResult(functionFragment: "cancelSale", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "confirmPurchase",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "createSale", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "games", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "id", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "purchase", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "saleCancelled",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "sales", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setGlobalParams",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "users", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "validateSale",
    data: BytesLike
  ): Result;

  events: {
    "GiveItem(address,uint256,uint256,uint256,uint256)": EventFragment;
    "ItemGiven(address,uint256,uint256,uint256,uint256)": EventFragment;
    "ItemNotGiven(address,uint256,uint256)": EventFragment;
    "ItemNotRefunded(address,uint256,uint256)": EventFragment;
    "ItemNotTaken(address,uint256,uint256)": EventFragment;
    "ItemRefunded(address,uint256,uint256,uint256,uint256)": EventFragment;
    "ItemTaken(address,uint256,uint256,uint256,uint256,uint256)": EventFragment;
    "RefundItem(address,uint256,uint256,uint256,uint256)": EventFragment;
    "TakeItem(address,uint256,uint256,uint256,uint256,uint256,bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "GiveItem"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ItemGiven"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ItemNotGiven"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ItemNotRefunded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ItemNotTaken"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ItemRefunded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ItemTaken"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RefundItem"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TakeItem"): EventFragment;
}

export interface GiveItemEventObject {
  user: string;
  game: BigNumber;
  server: BigNumber;
  item: BigNumber;
  id: BigNumber;
}
export type GiveItemEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber, BigNumber],
  GiveItemEventObject
>;

export type GiveItemEventFilter = TypedEventFilter<GiveItemEvent>;

export interface ItemGivenEventObject {
  user: string;
  game: BigNumber;
  server: BigNumber;
  item: BigNumber;
  id: BigNumber;
}
export type ItemGivenEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber, BigNumber],
  ItemGivenEventObject
>;

export type ItemGivenEventFilter = TypedEventFilter<ItemGivenEvent>;

export interface ItemNotGivenEventObject {
  user: string;
  game: BigNumber;
  id: BigNumber;
}
export type ItemNotGivenEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  ItemNotGivenEventObject
>;

export type ItemNotGivenEventFilter = TypedEventFilter<ItemNotGivenEvent>;

export interface ItemNotRefundedEventObject {
  user: string;
  game: BigNumber;
  id: BigNumber;
}
export type ItemNotRefundedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  ItemNotRefundedEventObject
>;

export type ItemNotRefundedEventFilter = TypedEventFilter<ItemNotRefundedEvent>;

export interface ItemNotTakenEventObject {
  user: string;
  game: BigNumber;
  id: BigNumber;
}
export type ItemNotTakenEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  ItemNotTakenEventObject
>;

export type ItemNotTakenEventFilter = TypedEventFilter<ItemNotTakenEvent>;

export interface ItemRefundedEventObject {
  user: string;
  game: BigNumber;
  server: BigNumber;
  item: BigNumber;
  id: BigNumber;
}
export type ItemRefundedEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber, BigNumber],
  ItemRefundedEventObject
>;

export type ItemRefundedEventFilter = TypedEventFilter<ItemRefundedEvent>;

export interface ItemTakenEventObject {
  user: string;
  game: BigNumber;
  server: BigNumber;
  item: BigNumber;
  id: BigNumber;
  price: BigNumber;
}
export type ItemTakenEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber],
  ItemTakenEventObject
>;

export type ItemTakenEventFilter = TypedEventFilter<ItemTakenEvent>;

export interface RefundItemEventObject {
  user: string;
  game: BigNumber;
  server: BigNumber;
  item: BigNumber;
  id: BigNumber;
}
export type RefundItemEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber, BigNumber],
  RefundItemEventObject
>;

export type RefundItemEventFilter = TypedEventFilter<RefundItemEvent>;

export interface TakeItemEventObject {
  user: string;
  game: BigNumber;
  server: BigNumber;
  item: BigNumber;
  id: BigNumber;
  price: BigNumber;
  premium: boolean;
}
export type TakeItemEvent = TypedEvent<
  [string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, boolean],
  TakeItemEventObject
>;

export type TakeItemEventFilter = TypedEventFilter<TakeItemEvent>;

export interface QSales extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: QSalesInterface;

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
    cancelSale(
      sale: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    confirmPurchase(
      sale: PromiseOrValue<BigNumberish>,
      buyer: PromiseOrValue<string>,
      companyValidation: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createSale(
      game: PromiseOrValue<BigNumberish>,
      item: PromiseOrValue<BigNumberish>,
      server: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      premium: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    games(overrides?: CallOverrides): Promise<[string]>;

    id(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    purchase(
      sale: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    saleCancelled(
      sale: PromiseOrValue<BigNumberish>,
      companyValidation: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    sales(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean,
        number
      ] & {
        seller: string;
        buyer: string;
        game: BigNumber;
        item: BigNumber;
        price: BigNumber;
        server: BigNumber;
        premium: boolean;
        status: number;
      }
    >;

    setGlobalParams(
      busers: PromiseOrValue<string>,
      bgames: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    users(overrides?: CallOverrides): Promise<[string]>;

    validateSale(
      sale: PromiseOrValue<BigNumberish>,
      companyValidation: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  cancelSale(
    sale: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  confirmPurchase(
    sale: PromiseOrValue<BigNumberish>,
    buyer: PromiseOrValue<string>,
    companyValidation: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createSale(
    game: PromiseOrValue<BigNumberish>,
    item: PromiseOrValue<BigNumberish>,
    server: PromiseOrValue<BigNumberish>,
    price: PromiseOrValue<BigNumberish>,
    premium: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  games(overrides?: CallOverrides): Promise<string>;

  id(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  purchase(
    sale: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  saleCancelled(
    sale: PromiseOrValue<BigNumberish>,
    companyValidation: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  sales(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [
      string,
      string,
      BigNumber,
      BigNumber,
      BigNumber,
      BigNumber,
      boolean,
      number
    ] & {
      seller: string;
      buyer: string;
      game: BigNumber;
      item: BigNumber;
      price: BigNumber;
      server: BigNumber;
      premium: boolean;
      status: number;
    }
  >;

  setGlobalParams(
    busers: PromiseOrValue<string>,
    bgames: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  users(overrides?: CallOverrides): Promise<string>;

  validateSale(
    sale: PromiseOrValue<BigNumberish>,
    companyValidation: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    cancelSale(
      sale: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    confirmPurchase(
      sale: PromiseOrValue<BigNumberish>,
      buyer: PromiseOrValue<string>,
      companyValidation: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    createSale(
      game: PromiseOrValue<BigNumberish>,
      item: PromiseOrValue<BigNumberish>,
      server: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      premium: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    games(overrides?: CallOverrides): Promise<string>;

    id(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    purchase(
      sale: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    saleCancelled(
      sale: PromiseOrValue<BigNumberish>,
      companyValidation: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    sales(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean,
        number
      ] & {
        seller: string;
        buyer: string;
        game: BigNumber;
        item: BigNumber;
        price: BigNumber;
        server: BigNumber;
        premium: boolean;
        status: number;
      }
    >;

    setGlobalParams(
      busers: PromiseOrValue<string>,
      bgames: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    users(overrides?: CallOverrides): Promise<string>;

    validateSale(
      sale: PromiseOrValue<BigNumberish>,
      companyValidation: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "GiveItem(address,uint256,uint256,uint256,uint256)"(
      user?: PromiseOrValue<string> | null,
      game?: PromiseOrValue<BigNumberish> | null,
      server?: null,
      item?: null,
      id?: PromiseOrValue<BigNumberish> | null
    ): GiveItemEventFilter;
    GiveItem(
      user?: PromiseOrValue<string> | null,
      game?: PromiseOrValue<BigNumberish> | null,
      server?: null,
      item?: null,
      id?: PromiseOrValue<BigNumberish> | null
    ): GiveItemEventFilter;

    "ItemGiven(address,uint256,uint256,uint256,uint256)"(
      user?: PromiseOrValue<string> | null,
      game?: PromiseOrValue<BigNumberish> | null,
      server?: null,
      item?: null,
      id?: PromiseOrValue<BigNumberish> | null
    ): ItemGivenEventFilter;
    ItemGiven(
      user?: PromiseOrValue<string> | null,
      game?: PromiseOrValue<BigNumberish> | null,
      server?: null,
      item?: null,
      id?: PromiseOrValue<BigNumberish> | null
    ): ItemGivenEventFilter;

    "ItemNotGiven(address,uint256,uint256)"(
      user?: PromiseOrValue<string> | null,
      game?: PromiseOrValue<BigNumberish> | null,
      id?: PromiseOrValue<BigNumberish> | null
    ): ItemNotGivenEventFilter;
    ItemNotGiven(
      user?: PromiseOrValue<string> | null,
      game?: PromiseOrValue<BigNumberish> | null,
      id?: PromiseOrValue<BigNumberish> | null
    ): ItemNotGivenEventFilter;

    "ItemNotRefunded(address,uint256,uint256)"(
      user?: PromiseOrValue<string> | null,
      game?: PromiseOrValue<BigNumberish> | null,
      id?: PromiseOrValue<BigNumberish> | null
    ): ItemNotRefundedEventFilter;
    ItemNotRefunded(
      user?: PromiseOrValue<string> | null,
      game?: PromiseOrValue<BigNumberish> | null,
      id?: PromiseOrValue<BigNumberish> | null
    ): ItemNotRefundedEventFilter;

    "ItemNotTaken(address,uint256,uint256)"(
      user?: PromiseOrValue<string> | null,
      game?: PromiseOrValue<BigNumberish> | null,
      id?: PromiseOrValue<BigNumberish> | null
    ): ItemNotTakenEventFilter;
    ItemNotTaken(
      user?: PromiseOrValue<string> | null,
      game?: PromiseOrValue<BigNumberish> | null,
      id?: PromiseOrValue<BigNumberish> | null
    ): ItemNotTakenEventFilter;

    "ItemRefunded(address,uint256,uint256,uint256,uint256)"(
      user?: PromiseOrValue<string> | null,
      game?: PromiseOrValue<BigNumberish> | null,
      server?: null,
      item?: null,
      id?: PromiseOrValue<BigNumberish> | null
    ): ItemRefundedEventFilter;
    ItemRefunded(
      user?: PromiseOrValue<string> | null,
      game?: PromiseOrValue<BigNumberish> | null,
      server?: null,
      item?: null,
      id?: PromiseOrValue<BigNumberish> | null
    ): ItemRefundedEventFilter;

    "ItemTaken(address,uint256,uint256,uint256,uint256,uint256)"(
      user?: PromiseOrValue<string> | null,
      game?: PromiseOrValue<BigNumberish> | null,
      server?: null,
      item?: null,
      id?: PromiseOrValue<BigNumberish> | null,
      price?: null
    ): ItemTakenEventFilter;
    ItemTaken(
      user?: PromiseOrValue<string> | null,
      game?: PromiseOrValue<BigNumberish> | null,
      server?: null,
      item?: null,
      id?: PromiseOrValue<BigNumberish> | null,
      price?: null
    ): ItemTakenEventFilter;

    "RefundItem(address,uint256,uint256,uint256,uint256)"(
      user?: PromiseOrValue<string> | null,
      game?: PromiseOrValue<BigNumberish> | null,
      server?: null,
      item?: null,
      id?: PromiseOrValue<BigNumberish> | null
    ): RefundItemEventFilter;
    RefundItem(
      user?: PromiseOrValue<string> | null,
      game?: PromiseOrValue<BigNumberish> | null,
      server?: null,
      item?: null,
      id?: PromiseOrValue<BigNumberish> | null
    ): RefundItemEventFilter;

    "TakeItem(address,uint256,uint256,uint256,uint256,uint256,bool)"(
      user?: PromiseOrValue<string> | null,
      game?: PromiseOrValue<BigNumberish> | null,
      server?: null,
      item?: null,
      id?: PromiseOrValue<BigNumberish> | null,
      price?: null,
      premium?: null
    ): TakeItemEventFilter;
    TakeItem(
      user?: PromiseOrValue<string> | null,
      game?: PromiseOrValue<BigNumberish> | null,
      server?: null,
      item?: null,
      id?: PromiseOrValue<BigNumberish> | null,
      price?: null,
      premium?: null
    ): TakeItemEventFilter;
  };

  estimateGas: {
    cancelSale(
      sale: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    confirmPurchase(
      sale: PromiseOrValue<BigNumberish>,
      buyer: PromiseOrValue<string>,
      companyValidation: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createSale(
      game: PromiseOrValue<BigNumberish>,
      item: PromiseOrValue<BigNumberish>,
      server: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      premium: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    games(overrides?: CallOverrides): Promise<BigNumber>;

    id(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    purchase(
      sale: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    saleCancelled(
      sale: PromiseOrValue<BigNumberish>,
      companyValidation: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    sales(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setGlobalParams(
      busers: PromiseOrValue<string>,
      bgames: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    users(overrides?: CallOverrides): Promise<BigNumber>;

    validateSale(
      sale: PromiseOrValue<BigNumberish>,
      companyValidation: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    cancelSale(
      sale: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    confirmPurchase(
      sale: PromiseOrValue<BigNumberish>,
      buyer: PromiseOrValue<string>,
      companyValidation: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createSale(
      game: PromiseOrValue<BigNumberish>,
      item: PromiseOrValue<BigNumberish>,
      server: PromiseOrValue<BigNumberish>,
      price: PromiseOrValue<BigNumberish>,
      premium: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    games(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    id(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    purchase(
      sale: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    saleCancelled(
      sale: PromiseOrValue<BigNumberish>,
      companyValidation: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    sales(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setGlobalParams(
      busers: PromiseOrValue<string>,
      bgames: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    users(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    validateSale(
      sale: PromiseOrValue<BigNumberish>,
      companyValidation: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
