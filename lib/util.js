"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var classes_1 = require("codechain-sdk/lib/core/classes");
function isArrayOf(list, predicate) {
    if (list == null) {
        return false;
    }
    if (!Array.isArray(list)) {
        return false;
    }
    return list.every(predicate);
}
exports.isArrayOf = isArrayOf;
function decodeUInt(buffer) {
    if (buffer.length === 0) {
        return 0;
    }
    return buffer.readUIntBE(0, buffer.length);
}
exports.decodeUInt = decodeUInt;
function decodeU64(buffer) {
    if (buffer.length === 0) {
        return new classes_1.U64(0);
    }
    return classes_1.U64.ensure("0x" + buffer.toString("hex"));
}
exports.decodeU64 = decodeU64;
function decodeH256(buffer) {
    return classes_1.H256.ensure("0x" + buffer.toString("hex"));
}
exports.decodeH256 = decodeH256;
function decodeH512(buffer) {
    return classes_1.H512.ensure("0x" + buffer.toString("hex"));
}
exports.decodeH512 = decodeH512;
function decodePlatformAddress(sdk, buffer) {
    var accountId = buffer.toString("hex");
    return classes_1.PlatformAddress.fromAccountId(accountId, {
        networkId: sdk.networkId
    });
}
exports.decodePlatformAddress = decodePlatformAddress;
