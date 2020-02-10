"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var ConsensusStep;
(function (ConsensusStep) {
    ConsensusStep[ConsensusStep["Propose"] = 0] = "Propose";
    ConsensusStep[ConsensusStep["Prevote"] = 1] = "Prevote";
    ConsensusStep[ConsensusStep["Precommit"] = 2] = "Precommit";
    ConsensusStep[ConsensusStep["Commit"] = 3] = "Commit";
})(ConsensusStep = exports.ConsensusStep || (exports.ConsensusStep = {}));
function isStep(val) {
    return (val === ConsensusStep.Propose ||
        val === ConsensusStep.Prevote ||
        val === ConsensusStep.Precommit ||
        val === ConsensusStep.Commit);
}
function messageToEncodeObject(message) {
    return [
        [
            [
                message.on.step.height.toEncodeObject(),
                message.on.step.view.toEncodeObject(),
                message.on.step.step
            ],
            message.on.blockHash == null
                ? []
                : [message.on.blockHash.toEncodeObject()]
        ],
        message.signature.toEncodeObject(),
        message.signerIndex.toEncodeObject()
    ];
}
exports.messageToEncodeObject = messageToEncodeObject;
function decodeMessage(list) {
    if (list.length !== 3) {
        throw new Error("The raw value of ConsensusMessage should be a list of length 3");
    }
    if (!Array.isArray(list[0]) || list[0].length !== 2) {
        throw new Error("The raw value of VoteOn should be a list of length 3");
    }
    if (!Array.isArray(list[0][0]) || list[0][0].length !== 3) {
        throw new Error("The raw value of VoteStep should be a list of length 3");
    }
    var step = util_1.decodeUInt(list[0][0][2]);
    if (!isStep(step)) {
        throw new Error("The consensus step should be in valid range");
    }
    var voteStep = {
        height: util_1.decodeU64(list[0][0][0]),
        view: util_1.decodeU64(list[0][0][1]),
        step: step
    };
    if (!Array.isArray(list[0][1])) {
        throw new Error("The raw value of blockHash should be a list");
    }
    var blockHash;
    if (list[0][1].length === 0) {
        blockHash = null;
    }
    else if (list[0][1].length === 1) {
        blockHash = util_1.decodeH256(list[0][1][0]);
    }
    else {
        throw new Error("The raw value of blockHash should be a list of length 0 or 1");
    }
    var signature = util_1.decodeH512(list[1]);
    var signerIndex = util_1.decodeU64(list[2]);
    return {
        on: {
            step: voteStep,
            blockHash: blockHash
        },
        signature: signature,
        signerIndex: signerIndex
    };
}
exports.decodeMessage = decodeMessage;
