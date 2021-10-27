import * as payment_systems from './payment_systems';

export function paymentExecutor (type:string): payment_systems.PaymentSystemExecutor|undefined{
	let paymentType: payment_systems.PaymentSystem; 


	if(type == "creditcard"){
		let paymentType = new payment_systems.CreditCardBuilder();
		paymentType.build();
		return paymentType.getExecutor(); 
	}

	else if(type == "bankdraft"){
		let paymentType = new payment_systems.BankDraftBuilder(); 
		paymentType.build();
		return paymentType.getExecutor(); 
	}

	else if(type == "online"){
		let paymentType = new payment_systems.OnlinePaymentBuilder(); 
		paymentType.build();
		return paymentType.getExecutor(); 
	}

	else if(type == "offline"){
		let paymentType = new payment_systems.OfflinePaymentBuilder(); 
		paymentType.build();
		return paymentType.getExecutor(); 
	}

	else{
		return undefined;
	}

}