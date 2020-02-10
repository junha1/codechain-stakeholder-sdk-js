import { H256, H512, U64 } from "codechain-sdk/lib/core/classes";
export declare enum ConsensusStep {
    Propose = 0,
    Prevote = 1,
    Precommit = 2,
    Commit = 3
}
export interface ConsensusMessage {
    on: {
        step: {
            height: U64;
            view: U64;
            step: ConsensusStep;
        };
        blockHash: H256 | null;
    };
    signature: H512;
    signerIndex: U64;
}
export declare function messageToEncodeObject(message: ConsensusMessage): (string | number | (string | number)[][])[];
export declare function decodeMessage(list: any[]): ConsensusMessage;
