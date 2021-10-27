"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentExecutor = void 0;
var payment_systems = __importStar(require("./payment_systems"));
function paymentExecutor(type) {
    var paymentType;
    if (type == "creditcard") {
        var paymentType_1 = new payment_systems.CreditCardBuilder();
        paymentType_1.build();
        return paymentType_1.getExecutor();
    }
    else if (type == "bankdraft") {
        var paymentType_2 = new payment_systems.BankDraftBuilder();
        paymentType_2.build();
        return paymentType_2.getExecutor();
    }
    else if (type == "online") {
        var paymentType_3 = new payment_systems.OnlinePaymentBuilder();
        paymentType_3.build();
        return paymentType_3.getExecutor();
    }
    else if (type == "offline") {
        var paymentType_4 = new payment_systems.OfflinePaymentBuilder();
        paymentType_4.build();
        return paymentType_4.getExecutor();
    }
    else {
        return undefined;
    }
}
exports.paymentExecutor = paymentExecutor;
