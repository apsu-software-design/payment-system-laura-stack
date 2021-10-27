import readlineSync = require('readline-sync');


export class PaymentSystemExecutor {

	private getInputs: () => {[info:string]:string};
	private validate: (input: {[info:string]:string}) =>boolean; // confirm info is valid

	public constructor (input:() => {[info:string]:string}, validate:(input:{[info:string]:string}) => boolean) {
		this.getInputs = input;
		this.validate = validate; 
	}

	execute(){
		let correct = this.validate(this.getInputs());

		if(correct){
			console.log("Your payment info is being encrypted.");
			console.log("The payment is being processed.");
		}

		else{
			console.log("The payment is invalid.");
		}

	}

}

export abstract class PaymentSystem {

	abstract getInputs:() => {[info:string]:string};
	abstract validatePay: (input: {[info:string]: string}) =>boolean; 
	
	private exec!:PaymentSystemExecutor; 

	build():void{
		this.exec = new PaymentSystemExecutor(this.getInputs, this.validatePay);
	}

	getExecutor(): PaymentSystemExecutor{
		return this.exec;
	}

}

export class CreditCardBuilder extends PaymentSystem{

	getInputs:() =>{[info:string]:string};
	validatePay: (input:{[info:string]:string})=>boolean; 


	constructor(){
		super();
		this.getInputs = this.paymentInfo;
		this.validatePay = this.validate; 
	}

	paymentInfo(): {[info:string]:string}{
		let input: {[info:string]:string} = {};
		console.log('Enter Credit Card Payment Details.');
		input['name'] = readlineSync.question('  Name: ');
		input['creditCardNumber'] = readlineSync.question('  Credit Card Number: ');
		input['creditCardExpirationDate'] = readlineSync.question('  Credit Card Expiration Date (MM/DD)'); 
		return input;
	}

	validate(input: {[info:string]:string}):boolean {
		return  /^[\w.' ]+$/.test(input.name) &&
         /\d{15,16}/.test(input.creditCardNumber) && 
         /\d\d\/\d\d/.test(input.creditCardExpirationDate)
	}

}

export class BankDraftBuilder extends PaymentSystem {

	getInputs: () => {[info:string] : string};
	validatePay: (input: {[info:string]:string}) => boolean;
	
	
	constructor(){
	super();
		this.getInputs = this.paymentInfo;
		this.validatePay = this.validate; 
	}


	paymentInfo(): {[info:string]: string;} {
		let input: {[info:string]:string} = {};
		console.log('Enter Bank Account Details.');
		input['name'] = readlineSync.question('  Name: ');
		input['bankRoutingNumber'] = readlineSync.question('  Bank Routing Number: ');
		input['bankAccountNumber'] = readlineSync.question('  Bank Account Number: ');
		return input;
	}

	validate(input: {[info:string]:string;}):boolean {
		 return /^[\w.' ]+$/.test(input.name) &&
        /\d{9}/.test(input.bankRoutingNumber) &&
        /\d{6,12}/.test(input.bankAccountNumber);
	}
}

export class OnlinePaymentBuilder extends PaymentSystem {

	getInputs: () => {[info:string]:string};
	validatePay: (input:{[info:string]: string}) => boolean;
	constructor(){
		super();
		this.getInputs = this.paymentInfo;
		this.validatePay = this.validate; 
	}

	paymentInfo(): {[info:string]: string; }{
		let input: {[info:string] :string} = {};
		console.log('Enter Online Payment Details.');
		input['email'] = readlineSync.question('  Enter Your Email Address: ');
		input['paymentPassword'] = readlineSync.question(  'Enter Your Payment Password: ');
		return input;
	}

	validate(input:{[info:string]:string;}): boolean {
		return /^[\w@.]+$/.test(input.email) &&
         /\w+/.test(input.paymentPassword); 
	}

}

export class OfflinePaymentBuilder extends PaymentSystem {

	getInputs: () => {[info:string] :string};
	validatePay:(input:{[info:string]:string}) => boolean;
	
	
	constructor(){
	super();
		this.getInputs = this.paymentInfo;
		this.validatePay = this.validate; 
	}

	paymentInfo(): {[info:string]:string;}{
		let input: {[info:string]:string} = {}; 
		console.log('Enter Offline Payment Details.');
		input['name'] = readlineSync.question('  Name: ');
		input['billingAddress'] = readlineSync.question('  Enter Your Billing Address: ');
		return input; 
	}

	validate(input:{[info:string]:string;}): boolean {
	return /^[\w.' ]+$/.test(input.name) && 
        /^[\w.' ]+$/.test(input.billingAddress);
	}
}
