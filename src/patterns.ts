/* eslint no-underscore-dangle: 0 */
/*
Патерн "Стратегія"

Створіть інтерфейс PaymentStrategy, який міститиме метод pay(amount: number): void.

Реалізуйте кілька класів, які реалізують цей інтерфейс, наприклад, CreditCardPaymentStrategy, PaypalPaymentStrategy, BitcoinPaymentStrategy, кожен з них має відповідний метод pay.

Створіть клас PaymentContext, який має властивість paymentStrategy типу PaymentStrategy.

Додайте метод executePayment(amount: number): void в клас PaymentContext, який викликає метод pay відповідної стратегії.
*/

interface PaymentStrategy {
    pay(amount: number): void;
}

class CreditCardPaymentStrategy implements PaymentStrategy {
    constructor(private readonly accountNumber: string) {}
    pay(amount: number): void {
        console.log(`Transaction was made with CreditCard ${this.accountNumber} in amount of ${amount}`);
    }
}
class PaypalPaymentStrategy implements PaymentStrategy {
    constructor(private readonly email: string) {}
    pay(amount: number): void {
        console.log(`Transaction was made with Paypal ${this.email} in amount of ${amount}`);
    }
}

class BitcoinPaymentStrategy implements PaymentStrategy {
    constructor(private readonly walletNumb: string) {}
    pay(amount: number): void {
        console.log(`Transaction was made with BitcoinPayment ${this.walletNumb} in amount of ${amount}`);
    }
}

class PaymentContext {
    private _paymentStrategy: PaymentStrategy;
    constructor(paymentStrategy: PaymentStrategy) {
        this._paymentStrategy = paymentStrategy;
    }
    set paymentStrategy(paymentStrategy: PaymentStrategy) {
        this._paymentStrategy = paymentStrategy;
    }
    executePayment(amount: number): void {
        this._paymentStrategy.pay(amount);
    }
}

const creditCard = new CreditCardPaymentStrategy('414732546831');
const paypal = new PaypalPaymentStrategy('user@gmail.com');
const bitcoin = new BitcoinPaymentStrategy('4147325468313443433343434343');

export const payment = new PaymentContext(creditCard);
payment.executePayment(10000);
payment.paymentStrategy = paypal;
payment.executePayment(100000);
payment.paymentStrategy = bitcoin;
payment.executePayment(100000);

/*
Патерн "Спостерігач"

Створіть інтерфейс Observer з методом update(data: any): void.

Створіть клас Subject, який буде володіти списком об'єктів, які слухають його зміни. Має методи subscribe(observer: Observer): void і unsubscribe(observer: Observer): void.

В класі Subject додайте метод notify(data: any): void, який викликає метод update для всіх підписаних об'єктів.

Створіть клас, який реалізує інтерфейс Observer і має внутрішній стан. Наприклад, StockObserver зі змінною stockPrice.

Перевірте роботу, підписавши об'єкти на зміни в Subject і спостерігаючи, як вони отримують оновлення.
*/

interface Observer {
    update(data: any): void;
}
interface ISubject {
    subscribe(observer: Observer): void;
    unsubscribe(observer: Observer): void;
    notify(data: any): void;
}
type Subscribers = {
    vehicles: Observer[];
    food: Observer[];
};
abstract class Subject implements ISubject {
    protected readonly subscribers: Subscribers = { vehicles: [], food: [] };

    abstract subscribe(observer: Observer): void;

    abstract unsubscribe(observer: Observer): void;

    abstract notify(data: any): void;
}
export class Volkswagen extends Subject {
    private _vagInfo = 'Something about cars';
    get foodInfo(): string {
        return this._vagInfo;
    }
    subscribe(observer: Observer): void {
        const alreadyExist = this.subscribers.vehicles.includes(observer);
        if (alreadyExist) {
            return console.log('You are already subscribe');
        }
        this.subscribers.vehicles.push(observer);
        console.log('You have been successfully subscribed to this subject');
    }
    unsubscribe(observer: Observer): void {
        const isExist = this.subscribers.vehicles.indexOf(observer);
        if (isExist === -1) {
            return console.log('You are not a subscriber');
        }
        this.subscribers.vehicles.splice(isExist, 1);
        console.log('You have been successfully unsubscribed from this subject');
    }
    notify(data: any): void {
        for (let i = 0; i < this.subscribers.vehicles.length; i += 1) {
            this.subscribers.vehicles[i].update(data);
        }
    }
    updateInfo(info: string): void {
        this._vagInfo = info;
        this.notify(info);
        console.log(`Information has changed to ${this._vagInfo}`);
    }
}
export class ATB extends Subject {
    private _foodInfo = 'Something about food';
    get foodInfo(): string {
        return this._foodInfo;
    }
    subscribe(observer: Observer): void {
        const alreadyExist = this.subscribers.food.includes(observer);
        if (alreadyExist) {
            return console.log('You are already subscribe');
        }
        this.subscribers.food.push(observer);
        console.log('You have been successfully subscribed to this subject');
    }
    unsubscribe(observer: Observer): void {
        const isExist = this.subscribers.food.indexOf(observer);
        if (isExist === -1) {
            return console.log('You are not a subscriber');
        }
        this.subscribers.food.splice(isExist, 1);
        console.log('You have been successfully unsubscribed from this subject');
    }
    notify(data: any): void {
        for (let i = 0; i < this.subscribers.food.length; i += 1) {
            this.subscribers.food[i].update(data);
        }
    }
    updateInfo(info: string): void {
        this._foodInfo = info;
        this.notify(info);
        console.log(`Information has changed to ${this._foodInfo}`);
    }
}

export class CarsObserver implements Observer {
    update(data: any): void {
        console.log(data);
    }
}
export class FoodObserver implements Observer {
    update(data: any): void {
        console.log(data);
    }
}
const volkswagen = new Volkswagen();
const atb = new ATB();

const carsobserver1 = new CarsObserver();
const carsobserver2 = new CarsObserver();

const foodsobserver1 = new FoodObserver();
const foodsobserver2 = new FoodObserver();

volkswagen.subscribe(carsobserver1);
volkswagen.subscribe(carsobserver2);
volkswagen.updateInfo('New cars have arrived');
volkswagen.unsubscribe(carsobserver2);
volkswagen.updateInfo('Introducing the brand new model');

atb.subscribe(foodsobserver1);
atb.subscribe(foodsobserver2);

atb.updateInfo('We have a great sale , come and find something that you need');
atb.unsubscribe(foodsobserver1);

atb.updateInfo('Fish, meat and so on on sale');

// погрався з синглтоном , як без нього)
// class Counter {
//     count!: number;
//     static instance: Counter;
//     constructor() {
//         if (typeof Counter.instance === 'object') {
//             return Counter.instance;
//         }
//         this.count = 0;
//         Counter.instance = this;
//         return this;
//     }
//     getCount() {
//         return this.count;
//     }
//     increaseCount() {
//         return this.count++;
//     }
// }

// export const myCount1 = new Counter();
// export const myCount2 = new Counter();
// myCount1.increaseCount();
// myCount1.increaseCount();
// myCount2.increaseCount();
// myCount2.increaseCount();
