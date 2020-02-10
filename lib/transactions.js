"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var classes_1 = require("codechain-sdk/lib/core/classes");
var RLP = require("rlp");
var reportDoubleVote_1 = require("./actions/reportDoubleVote");
var index_1 = require("./index");
var util_1 = require("./util");
exports.TRANSFER_CCS_ACTION_ID = 1;
exports.DELEGATE_CCS_ACTION_ID = 2;
exports.REVOKE_ACTION_ID = 3;
exports.SELF_NOMINATE_ACTION_ID = 4;
exports.REPORT_DOUBLE_VOTE_ACTION_ID = reportDoubleVote_1.default.ACTION_ID;
exports.REDELEGATE_ACTION_ID = 6;
exports.CHANGE_PARAMS_ACTION_ID = 0xff;
function createTransferCCSTransaction(sdk, recipient, quantity) {
    return sdk.core.createCustomTransaction({
        handlerId: index_1.HANDLER_ID,
        bytes: RLP.encode([
            exports.TRANSFER_CCS_ACTION_ID,
            classes_1.PlatformAddress.ensure(recipient).accountId.toEncodeObject(),
            classes_1.U64.ensure(quantity).toEncodeObject()
        ])
    });
}
exports.createTransferCCSTransaction = createTransferCCSTransaction;
function createDelegateCCSTransaction(sdk, delegatee, quantity) {
    return sdk.core.createCustomTransaction({
        handlerId: index_1.HANDLER_ID,
        bytes: RLP.encode([
            exports.DELEGATE_CCS_ACTION_ID,
            classes_1.PlatformAddress.ensure(delegatee).accountId.toEncodeObject(),
            classes_1.U64.ensure(quantity).toEncodeObject()
        ])
    });
}
exports.createDelegateCCSTransaction = createDelegateCCSTransaction;
function createRevokeTransaction(sdk, delegatee, quantity) {
    return sdk.core.createCustomTransaction({
        handlerId: index_1.HANDLER_ID,
        bytes: RLP.encode([
            exports.REVOKE_ACTION_ID,
            classes_1.PlatformAddress.ensure(delegatee).accountId.toEncodeObject(),
            classes_1.U64.ensure(quantity).toEncodeObject()
        ])
    });
}
exports.createRevokeTransaction = createRevokeTransaction;
function createSelfNominateTransaction(sdk, deposit, metadata) {
    return sdk.core.createCustomTransaction({
        handlerId: index_1.HANDLER_ID,
        bytes: RLP.encode([
            exports.SELF_NOMINATE_ACTION_ID,
            classes_1.U64.ensure(deposit).toEncodeObject(),
            metadata
        ])
    });
}
exports.createSelfNominateTransaction = createSelfNominateTransaction;
function createReportDoubleVoteTransaction(sdk, message1, message2) {
    var action = new reportDoubleVote_1.default(message1, message2);
    return sdk.core.createCustomTransaction({
        handlerId: index_1.HANDLER_ID,
        bytes: action.toBytes()
    });
}
exports.createReportDoubleVoteTransaction = createReportDoubleVoteTransaction;
function createRedelegateTransaction(sdk, prevDelegatee, nextDelegatee, quantity) {
    return sdk.core.createCustomTransaction({
        handlerId: index_1.HANDLER_ID,
        bytes: RLP.encode([
            exports.REDELEGATE_ACTION_ID,
            classes_1.PlatformAddress.ensure(prevDelegatee).accountId.toEncodeObject(),
            classes_1.PlatformAddress.ensure(nextDelegatee).accountId.toEncodeObject(),
            classes_1.U64.ensure(quantity).toEncodeObject()
        ])
    });
}
exports.createRedelegateTransaction = createRedelegateTransaction;
function actionFromCustom(sdk, custom) {
    var _a = custom, handlerId = _a.handlerId, bytes = _a.bytes;
    if (!classes_1.U64.ensure(handlerId).eq(index_1.HANDLER_ID)) {
        return null;
    }
    if (!Buffer.isBuffer(bytes)) {
        throw new Error("bytes should be a number");
    }
    return actionFromRLP(sdk, bytes);
}
exports.actionFromCustom = actionFromCustom;
function actionFromRLP(sdk, rlp) {
    var decoded = RLP.decode(rlp);
    if (!Array.isArray(decoded) ||
        decoded.length < 1 ||
        !Buffer.isBuffer(decoded[0])) {
        throw new Error("RLP of a stake action must be an array and it should have at least a tag as a first item");
    }
    switch (util_1.decodeUInt(decoded[0])) {
        case exports.TRANSFER_CCS_ACTION_ID:
            if (decoded.length !== 3) {
                throw new Error("A length of a RLP list of a transferCCS action must be 3");
            }
            return {
                type: "transferCCS",
                recipient: util_1.decodePlatformAddress(sdk, decoded[1]),
                quantity: util_1.decodeU64(decoded[2])
            };
        case exports.DELEGATE_CCS_ACTION_ID:
            if (decoded.length !== 3) {
                throw new Error("A length of a RLP list of a delegateCCS action must be 3");
            }
            return {
                type: "delegateCCS",
                delegatee: util_1.decodePlatformAddress(sdk, decoded[1]),
                quantity: util_1.decodeU64(decoded[2])
            };
        case exports.REVOKE_ACTION_ID:
            if (decoded.length !== 3) {
                throw new Error("A length of a RLP list of a revoke action must be 3");
            }
            return {
                type: "revoke",
                delegatee: util_1.decodePlatformAddress(sdk, decoded[1]),
                quantity: util_1.decodeU64(decoded[2])
            };
        case exports.SELF_NOMINATE_ACTION_ID:
            if (decoded.length !== 3) {
                throw new Error("A length of a RLP list of a selfNominate action must be 3");
            }
            if (!Buffer.isBuffer(decoded[2])) {
                throw new Error("The metadata field of a RLP encoded selfNominate action must be a string");
            }
            return {
                type: "selfNominate",
                deposit: util_1.decodeU64(decoded[1]),
                metadata: decoded[2]
            };
        case exports.REPORT_DOUBLE_VOTE_ACTION_ID:
            return reportDoubleVote_1.default.fromEncodeObject(decoded);
        case exports.REDELEGATE_ACTION_ID:
            if (decoded.length !== 4) {
                throw new Error("A length of a RLP list of a redelegate action must be 4");
            }
            return {
                type: "redelegate",
                prevDelegatee: util_1.decodePlatformAddress(sdk, decoded[1]),
                nextDelegatee: util_1.decodePlatformAddress(sdk, decoded[2]),
                quantity: util_1.decodeU64(decoded[3])
            };
        case exports.CHANGE_PARAMS_ACTION_ID:
            if (decoded.length <= 3) {
                throw new Error("A length of a RLP list of a changeParams action should be more than 3");
            }
            var signatures = decoded.slice(3);
            return {
                type: "changeParams",
                metadataSeq: util_1.decodeU64(decoded[1]),
                params: decoded[2],
                signatures: signatures
            };
        default:
            throw new Error("Invalid tag for a stake action");
    }
}
exports.actionFromRLP = actionFromRLP;
