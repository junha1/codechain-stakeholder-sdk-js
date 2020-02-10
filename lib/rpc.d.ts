import { SDK } from "codechain-sdk";
import { PlatformAddress } from "codechain-sdk/lib/core/classes";
export interface TermMetadata {
    lastTermFinishedBlockNumber: number;
    currentTermId: number;
}
export declare function getTermMetadata(sdk: SDK, blockNumber?: number): Promise<TermMetadata | null>;
export declare function getPossibleAuthors(sdk: SDK, blockNumber?: number): Promise<PlatformAddress[] | null>;
