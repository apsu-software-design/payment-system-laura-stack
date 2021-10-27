"use strict";
//User Interface for The Payment System
//@author James Church
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
var readlineSync = require("readline-sync"); //for easier repeated prompts
var paymentExecutor_1 = require("./paymentExecutor");
/**
 * Function to run the UI
 */
function start() {
    showMainMenu();
}
exports.start = start;
/**
 * The main menu. Will show until the user exits
 */
function showMainMenu() {
    while (true) { //run until we exit
        console.log("Welcome to the Payment System! You wish to purchase an item for $5. Pick an option:\n  1. Use a credit card.\n  2. Use a bank draft.\n  3. Use an online payment system.\n  4. Use an offline payment system.\n  5. Quit.");
        var response = readlineSync.question('> ');
        if (response === '5' || response.slice(0, 2).toLowerCase() === ':q') {
            break; //stop looping, thus leaving method
        }
        switch (response) { //handle each response
            case '1':
                showCreditCardPaymentMenu();
                break;
            case '2':
                showBankDraftPaymentMenu();
                break;
            case '3':
                showOnlinePaymentMenu();
                break;
            case '4':
                showOfflinePaymentMenu();
                break;
            default: console.log('Invalid option!');
        }
        console.log(''); //extra empty line for revisiting
    }
}
function showCreditCardPaymentMenu() {
    var _a;
    (_a = (0, paymentExecutor_1.paymentExecutor)("creditcard")) === null || _a === void 0 ? void 0 : _a.execute();
}
function showBankDraftPaymentMenu() {
    var _a;
    (_a = (0, paymentExecutor_1.paymentExecutor)("bankdraft")) === null || _a === void 0 ? void 0 : _a.execute();
}
function showOnlinePaymentMenu() {
    var _a;
    (_a = (0, paymentExecutor_1.paymentExecutor)("online")) === null || _a === void 0 ? void 0 : _a.execute();
}
function showOfflinePaymentMenu() {
    var _a;
    (_a = (0, paymentExecutor_1.paymentExecutor)("offline")) === null || _a === void 0 ? void 0 : _a.execute();
}
