/// <reference types="node" />
import { PlatformAddressValue, U64Value } from "codechain-primitives/lib";
import { SDK } from "codechain-sdk";
import { PlatformAddress, U64 } from "codechain-sdk/lib/core/classes";
import { Custom } from "codechain-sdk/lib/core/transaction/Custom";
import ReportDoubleVote from "./actions/reportDoubleVote";
import { ConsensusMessage } from "./message";
export declare const TRANSFER_CCS_ACTION_ID = 1;
export declare const DELEGATE_CCS_ACTION_ID = 2;
export declare const REVOKE_ACTION_ID = 3;
export declare const SELF_NOMINATE_ACTION_ID = 4;
export declare const REPORT_DOUBLE_VOTE_ACTION_ID: number;
export declare const REDELEGATE_ACTION_ID = 6;
export declare const CHANGE_PARAMS_ACTION_ID = 255;
export declare function createTransferCCSTransaction(sdk: SDK, recipient: PlatformAddressValue, quantity: U64Value): Custom;
export declare function createDelegateCCSTransaction(sdk: SDK, delegatee: PlatformAddressValue, quantity: U64Value): Custom;
export declare function createRevokeTransaction(sdk: SDK, delegatee: PlatformAddressValue, quantity: U64Value): Custom;
export declare function createSelfNominateTransaction(sdk: SDK, deposit: U64Value, metadata: Buffer | string): Custom;
export declare function createReportDoubleVoteTransaction(sdk: SDK, message1: ConsensusMessage, message2: ConsensusMessage): Custom;
export declare function createRedelegateTransaction(sdk: SDK, prevDelegatee: PlatformAddressValue, nextDelegatee: PlatformAddressValue, quantity: U64Value): Custom;
interface TransferCCS {
    type: "transferCCS";
    recipient: PlatformAddress;
    quantity: U64;
}
interface DelegateCCS {
    type: "delegateCCS";
    delegatee: PlatformAddress;
    quantity: U64;
}
interface Revoke {
    type: "revoke";
    delegatee: PlatformAddress;
    quantity: U64;
}
interface SelfNominate {
    type: "selfNominate";
    deposit: U64;
    metadata: Buffer;
}
interface Redelegate {
    type: "redelegate";
    prevDelegatee: PlatformAddress;
    nextDelegatee: PlatformAddress;
    quantity: U64;
}
interface ChangeParams {
    type: "changeParams";
    metadataSeq: U64;
    params: any;
    signatures: any[];
}
declare type Action = TransferCCS | DelegateCCS | Revoke | SelfNominate | ReportDoubleVote | Redelegate | ChangeParams;
export declare function actionFromCustom(sdk: SDK, custom: Custom): Action | null;
export declare function actionFromRLP(sdk: SDK, rlp: Buffer): Action;
export {};
