/// <reference types="node" />
import { H512 } from "codechain-primitives";
import { ConsensusMessage } from "../message";
export interface ReportDoubleVoteJSON {
    message1: ConsensusMessage;
    message2: ConsensusMessage;
}
export default class ReportDoubleVote {
    static ACTION_ID: number;
    static fromEncodeObject(object: any): ReportDoubleVote;
    readonly message1: ConsensusMessage;
    readonly message2: ConsensusMessage;
    constructor(message1: ConsensusMessage, message2: ConsensusMessage);
    get type(): "reportDoubleVote";
    criminal(): H512;
    toBytes(): Buffer;
}
