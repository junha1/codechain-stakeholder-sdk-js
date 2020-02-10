/// <reference types="node" />
import { SDK } from "codechain-sdk";
import { H256, H512, PlatformAddress, U64 } from "codechain-sdk/lib/core/classes";
export declare function isArrayOf<T>(list: any, predicate: (entry: any) => entry is T): list is Array<T>;
export declare function decodeUInt(buffer: Buffer): number;
export declare function decodeU64(buffer: Buffer): U64;
export declare function decodeH256(buffer: Buffer): H256;
export declare function decodeH512(buffer: Buffer): H512;
export declare function decodePlatformAddress(sdk: SDK, buffer: Buffer): PlatformAddress;
