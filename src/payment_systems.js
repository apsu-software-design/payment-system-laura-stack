"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfflinePaymentBuilder = exports.OnlinePaymentBuilder = exports.BankDraftBuilder = exports.CreditCardBuilder = exports.PaymentSystem = exports.PaymentSystemExecutor = void 0;
var readlineSync = require("readline-sync");
var PaymentSystemExecutor = /** @class */ (function () {
    function PaymentSystemExecutor(input, validate) {
        this.getInputs = input;
        this.validate = validate;
    }
    PaymentSystemExecutor.prototype.execute = function () {
        var correct = this.validate(this.getInputs());
        if (correct) {
            console.log("Your payment info is being encrypted.");
            console.log("The payment is being processed.");
        }
        else {
            console.log("The payment is invalid.");
        }
    };
    return PaymentSystemExecutor;
}());
exports.PaymentSystemExecutor = PaymentSystemExecutor;
var PaymentSystem = /** @class */ (function () {
    function PaymentSystem() {
    }
    PaymentSystem.prototype.build = function () {
        this.exec = new PaymentSystemExecutor(this.getInputs, this.validatePay);
    };
    PaymentSystem.prototype.getExecutor = function () {
        return this.exec;
    };
    return PaymentSystem;
}());
exports.PaymentSystem = PaymentSystem;
var CreditCardBuilder = /** @class */ (function (_super) {
    __extends(CreditCardBuilder, _super);
    function CreditCardBuilder() {
        var _this = _super.call(this) || this;
        _this.getInputs = _this.paymentInfo;
        _this.validatePay = _this.validate;
        return _this;
    }
    CreditCardBuilder.prototype.paymentInfo = function () {
        var input = {};
        console.log('Enter Credit Card Payment Details.');
        input['name'] = readlineSync.question('  Name: ');
        input['creditCardNumber'] = readlineSync.question('  Credit Card Number: ');
        input['creditCardExpirationDate'] = readlineSync.question('  Credit Card Expiration Date (MM/DD)');
        return input;
    };
    CreditCardBuilder.prototype.validate = function (input) {
        return /^[\w.' ]+$/.test(input.name) &&
            /\d{15,16}/.test(input.creditCardNumber) &&
            /\d\d\/\d\d/.test(input.creditCardExpirationDate);
    };
    return CreditCardBuilder;
}(PaymentSystem));
exports.CreditCardBuilder = CreditCardBuilder;
var BankDraftBuilder = /** @class */ (function (_super) {
    __extends(BankDraftBuilder, _super);
    function BankDraftBuilder() {
        var _this = _super.call(this) || this;
        _this.getInputs = _this.paymentInfo;
        _this.validatePay = _this.validate;
        return _this;
    }
    BankDraftBuilder.prototype.paymentInfo = function () {
        var input = {};
        console.log('Enter Bank Account Details.');
        input['name'] = readlineSync.question('  Name: ');
        input['bankRoutingNumber'] = readlineSync.question('  Bank Routing Number: ');
        input['bankAccountNumber'] = readlineSync.question('  Bank Account Number: ');
        return input;
    };
    BankDraftBuilder.prototype.validate = function (input) {
        return /^[\w.' ]+$/.test(input.name) &&
            /\d{9}/.test(input.bankRoutingNumber) &&
            /\d{6,12}/.test(input.bankAccountNumber);
    };
    return BankDraftBuilder;
}(PaymentSystem));
exports.BankDraftBuilder = BankDraftBuilder;
var OnlinePaymentBuilder = /** @class */ (function (_super) {
    __extends(OnlinePaymentBuilder, _super);
    function OnlinePaymentBuilder() {
        var _this = _super.call(this) || this;
        _this.getInputs = _this.paymentInfo;
        _this.validatePay = _this.validate;
        return _this;
    }
    OnlinePaymentBuilder.prototype.paymentInfo = function () {
        var input = {};
        console.log('Enter Online Payment Details.');
        input['email'] = readlineSync.question('  Enter Your Email Address: ');
        input['paymentPassword'] = readlineSync.question('Enter Your Payment Password: ');
        return input;
    };
    OnlinePaymentBuilder.prototype.validate = function (input) {
        return /^[\w@.]+$/.test(input.email) &&
            /\w+/.test(input.paymentPassword);
    };
    return OnlinePaymentBuilder;
}(PaymentSystem));
exports.OnlinePaymentBuilder = OnlinePaymentBuilder;
var OfflinePaymentBuilder = /** @class */ (function (_super) {
    __extends(OfflinePaymentBuilder, _super);
    function OfflinePaymentBuilder() {
        var _this = _super.call(this) || this;
        _this.getInputs = _this.paymentInfo;
        _this.validatePay = _this.validate;
        return _this;
    }
    OfflinePaymentBuilder.prototype.paymentInfo = function () {
        var input = {};
        console.log('Enter Offline Payment Details.');
        input['name'] = readlineSync.question('  Name: ');
        input['billingAddress'] = readlineSync.question('  Enter Your Billing Address: ');
        return input;
    };
    OfflinePaymentBuilder.prototype.validate = function (input) {
        return /^[\w.' ]+$/.test(input.name) &&
            /^[\w.' ]+$/.test(input.billingAddress);
    };
    return OfflinePaymentBuilder;
}(PaymentSystem));
exports.OfflinePaymentBuilder = OfflinePaymentBuilder;
