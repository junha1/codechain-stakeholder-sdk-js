"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var classes_1 = require("codechain-sdk/lib/core/classes");
var index_1 = require("./index");
var util_1 = require("./util");
var RLP = require("rlp");
function getUndelegatedCCS(sdk, address, blockNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.rpc.engine.getCustomActionData(index_1.HANDLER_ID, [
                        "Account",
                        classes_1.PlatformAddress.ensure(address)
                            .getAccountId()
                            .toEncodeObject()
                    ], blockNumber)];
                case 1:
                    data = _a.sent();
                    if (data == null) {
                        return [2 /*return*/, new classes_1.U64(0)];
                    }
                    return [2 /*return*/, util_1.decodeU64(RLP.decode(Buffer.from(data, "hex")))];
            }
        });
    });
}
exports.getUndelegatedCCS = getUndelegatedCCS;
function getCCSHolders(sdk, blockNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var data, decoded;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.rpc.engine.getCustomActionData(index_1.HANDLER_ID, ["StakeholderAddresses"], blockNumber)];
                case 1:
                    data = _a.sent();
                    if (data == null) {
                        throw Error("Expected non-null value, but got a null");
                    }
                    decoded = RLP.decode(Buffer.from(data, "hex"));
                    if (!util_1.isArrayOf(decoded, Buffer.isBuffer)) {
                        throw Error("Expected a rlp of Array<Buffer>, but got an invalid shaped value");
                    }
                    return [2 /*return*/, decoded.map(function (buf) { return util_1.decodePlatformAddress(sdk, buf); })];
            }
        });
    });
}
exports.getCCSHolders = getCCSHolders;
function getDelegations(sdk, delegator, blockNumber) {
    return __awaiter(this, void 0, void 0, function () {
        function isDelegationShape(entry) {
            return entry != null && Array.isArray(entry) && entry.length === 2;
        }
        var data, decoded;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.rpc.engine.getCustomActionData(index_1.HANDLER_ID, ["Delegation", delegator.accountId.toEncodeObject()], blockNumber)];
                case 1:
                    data = _a.sent();
                    if (data == null) {
                        return [2 /*return*/, []];
                    }
                    decoded = RLP.decode(Buffer.from(data, "hex"));
                    if (!util_1.isArrayOf(decoded, isDelegationShape)) {
                        throw new Error("Expected a rlp of Array<Buffer[4]>, but got an invalid shaped value");
                    }
                    return [2 /*return*/, decoded.map(function (_a) {
                            var _b = __read(_a, 2), delegatee = _b[0], quantity = _b[1];
                            return {
                                delegatee: util_1.decodePlatformAddress(sdk, delegatee),
                                quantity: util_1.decodeU64(quantity)
                            };
                        })];
            }
        });
    });
}
exports.getDelegations = getDelegations;
function getCandidates(sdk, blockNumber) {
    return __awaiter(this, void 0, void 0, function () {
        function isCandidateShape(entry) {
            return entry != null && Array.isArray(entry) && entry.length === 4;
        }
        var data, decoded;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.rpc.engine.getCustomActionData(index_1.HANDLER_ID, ["Candidates"], blockNumber)];
                case 1:
                    data = _a.sent();
                    if (data == null) {
                        return [2 /*return*/, []];
                    }
                    decoded = RLP.decode(Buffer.from(data, "hex"));
                    if (!util_1.isArrayOf(decoded, isCandidateShape)) {
                        throw new Error("Expected a rlp of Array<Buffer[4]>, but got an invalid shaped value");
                    }
                    return [2 /*return*/, decoded.map(function (_a) {
                            var _b = __read(_a, 4), pubkey = _b[0], deposit = _b[1], nominationEndsAt = _b[2], metadata = _b[3];
                            return ({
                                pubkey: util_1.decodeH512(pubkey),
                                deposit: util_1.decodeU64(deposit),
                                nominationEndsAt: util_1.decodeU64(nominationEndsAt),
                                metadata: metadata
                            });
                        })];
            }
        });
    });
}
exports.getCandidates = getCandidates;
function getJailed(sdk, blockNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var data, decoded, isCandidateShape;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.rpc.engine.getCustomActionData(index_1.HANDLER_ID, ["Jail"], blockNumber)];
                case 1:
                    data = _a.sent();
                    if (data == null) {
                        return [2 /*return*/, []];
                    }
                    decoded = RLP.decode(Buffer.from(data, "hex"));
                    isCandidateShape = function (entry) {
                        return entry != null && Array.isArray(entry) && entry.length === 4;
                    };
                    if (!util_1.isArrayOf(decoded, isCandidateShape)) {
                        throw new Error("Expected a rlp of Array<Buffer[4]>, but got an invalid shaped value");
                    }
                    return [2 /*return*/, decoded.map(function (_a) {
                            var _b = __read(_a, 4), address = _b[0], deposit = _b[1], custodyUntil = _b[2], releasedAt = _b[3];
                            return ({
                                address: util_1.decodePlatformAddress(sdk, address),
                                deposit: util_1.decodeU64(deposit),
                                custodyUntil: util_1.decodeU64(custodyUntil),
                                releasedAt: util_1.decodeU64(releasedAt)
                            });
                        })];
            }
        });
    });
}
exports.getJailed = getJailed;
function getBanned(sdk, blockNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var data, decoded;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.rpc.engine.getCustomActionData(index_1.HANDLER_ID, ["Banned"], blockNumber)];
                case 1:
                    data = _a.sent();
                    if (data == null) {
                        return [2 /*return*/, []];
                    }
                    decoded = RLP.decode(Buffer.from(data, "hex"));
                    if (!util_1.isArrayOf(decoded, Buffer.isBuffer)) {
                        throw new Error("Expected a rlp of Array<Buffer>, but an invalid shaped value");
                    }
                    return [2 /*return*/, decoded.map(function (address) { return util_1.decodePlatformAddress(sdk, address); })];
            }
        });
    });
}
exports.getBanned = getBanned;
function getIntermediateRewards(sdk, blockNumber) {
    return __awaiter(this, void 0, void 0, function () {
        function isIntermediateRewardShape(entry) {
            return entry != null && Array.isArray(entry) && entry.length === 2;
        }
        function isIntermediateRewardsFieldShape(entry) {
            return util_1.isArrayOf(entry, isIntermediateRewardShape);
        }
        function convert(entries) {
            return entries.map(function (_a) {
                var _b = __read(_a, 2), address = _b[0], quantity = _b[1];
                return ({
                    address: util_1.decodePlatformAddress(sdk, address),
                    quantity: util_1.decodeU64(quantity)
                });
            });
        }
        var data, decoded;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.rpc.engine.getCustomActionData(index_1.HANDLER_ID, ["IntermediateRewards"], blockNumber)];
                case 1:
                    data = _a.sent();
                    if (data == null) {
                        return [2 /*return*/, {
                                previous: [],
                                current: []
                            }];
                    }
                    decoded = RLP.decode(Buffer.from(data, "hex"));
                    if (!util_1.isArrayOf(decoded, isIntermediateRewardsFieldShape) ||
                        decoded.length !== 2) {
                        throw new Error("Expected a rlp of Buffer[2][][2], but an invalid shaped value");
                    }
                    return [2 /*return*/, {
                            previous: convert(decoded[0]),
                            current: convert(decoded[1])
                        }];
            }
        });
    });
}
exports.getIntermediateRewards = getIntermediateRewards;
function getValidators(sdk, blockNumber) {
    return __awaiter(this, void 0, void 0, function () {
        function isValidatorShape(entry) {
            return entry != null && Array.isArray(entry) && entry.length === 4;
        }
        var data, decoded;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sdk.rpc.engine.getCustomActionData(index_1.HANDLER_ID, ["Validators"], blockNumber)];
                case 1:
                    data = _a.sent();
                    if (data == null) {
                        return [2 /*return*/, []];
                    }
                    decoded = RLP.decode(Buffer.from(data, "hex"));
                    if (!util_1.isArrayOf(decoded, isValidatorShape)) {
                        throw new Error("Expected a rlp of Buffer[4][], but an invalid shaped value");
                    }
                    return [2 /*return*/, decoded.map(function (_a) {
                            var _b = __read(_a, 4), weight = _b[0], delegation = _b[1], deposit = _b[2], pubkey = _b[3];
                            return ({
                                weight: util_1.decodeU64(weight),
                                delegation: util_1.decodeU64(delegation),
                                deposit: util_1.decodeU64(deposit),
                                pubkey: util_1.decodeH512(pubkey)
                            });
                        })];
            }
        });
    });
}
exports.getValidators = getValidators;
