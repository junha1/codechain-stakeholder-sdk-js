/// <reference types="node" />
import { PlatformAddressValue } from "codechain-primitives";
import { SDK } from "codechain-sdk";
import { H512, PlatformAddress, U64 } from "codechain-sdk/lib/core/classes";
export declare function getUndelegatedCCS(sdk: SDK, address: PlatformAddressValue, blockNumber?: number): Promise<U64>;
export declare function getCCSHolders(sdk: SDK, blockNumber?: number): Promise<PlatformAddress[]>;
export interface Delegation {
    delegatee: PlatformAddress;
    quantity: U64;
}
export declare function getDelegations(sdk: SDK, delegator: PlatformAddress, blockNumber?: number): Promise<Delegation[]>;
export interface Candidate {
    pubkey: H512;
    deposit: U64;
    nominationEndsAt: U64;
    metadata: Buffer;
}
export declare function getCandidates(sdk: SDK, blockNumber?: number): Promise<Candidate[]>;
export interface Prisoner {
    address: PlatformAddress;
    deposit: U64;
    custodyUntil: U64;
    releasedAt: U64;
}
export declare function getJailed(sdk: SDK, blockNumber?: number): Promise<Prisoner[]>;
export declare function getBanned(sdk: SDK, blockNumber?: number): Promise<PlatformAddress[]>;
export interface IntermediateRewards {
    previous: IntermediateReward[];
    current: IntermediateReward[];
}
export interface IntermediateReward {
    address: PlatformAddress;
    quantity: U64;
}
export declare function getIntermediateRewards(sdk: SDK, blockNumber?: number): Promise<IntermediateRewards>;
export interface Validator {
    weight: U64;
    delegation: U64;
    deposit: U64;
    pubkey: H512;
}
export declare function getValidators(sdk: SDK, blockNumber?: number): Promise<Validator[]>;
