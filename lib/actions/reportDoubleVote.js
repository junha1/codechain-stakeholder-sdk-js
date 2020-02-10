"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var codechain_primitives_1 = require("codechain-primitives");
var RLP = require("rlp");
var message_1 = require("../message");
var util_1 = require("../util");
var ReportDoubleVote = /** @class */ (function () {
    function ReportDoubleVote(message1, message2) {
        this.message1 = message1;
        this.message2 = message2;
    }
    ReportDoubleVote.fromEncodeObject = function (object) {
        if (!Array.isArray(object) || object.length !== 3) {
            throw new Error("RLP of the ReportDoublevote action must be an array of length 3");
        }
        if (util_1.decodeUInt(object[0]) !== ReportDoubleVote.ACTION_ID) {
            throw new Error("Tag of the ReportDoublevote action must be " + ReportDoubleVote.ACTION_ID);
        }
        return new ReportDoubleVote(message_1.decodeMessage(object[1]), message_1.decodeMessage(object[2]));
    };
    Object.defineProperty(ReportDoubleVote.prototype, "type", {
        get: function () {
            return "reportDoubleVote";
        },
        enumerable: true,
        configurable: true
    });
    ReportDoubleVote.prototype.criminal = function () {
        var message1 = this.message1;
        var digest = codechain_primitives_1.blake256(RLP.encode(message_1.messageToEncodeObject(message1)[0]));
        var signature = message1.signature.toString();
        var pubkey = codechain_primitives_1.recoverSchnorr(digest, {
            r: signature.slice(0, 64),
            s: signature.slice(64)
        });
        return codechain_primitives_1.H512.ensure(pubkey);
    };
    ReportDoubleVote.prototype.toBytes = function () {
        var _a = this, message1 = _a.message1, message2 = _a.message2;
        return RLP.encode([
            ReportDoubleVote.ACTION_ID,
            message_1.messageToEncodeObject(message1),
            message_1.messageToEncodeObject(message2)
        ]);
    };
    ReportDoubleVote.ACTION_ID = 5;
    return ReportDoubleVote;
}());
exports.default = ReportDoubleVote;
