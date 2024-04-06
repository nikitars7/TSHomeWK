/**
 * Принципи_проектування _ПЗ
 *
 */

/**
 * DRY (Don’t repeat yourself) та WET (We enjoy typing)
 *
 * Принцип DRY (Don't Repeat Yourself) свідчить, що кожна частина інформації повинна мати єдине,
 * несуперечливе представлення в системі.
 *
 * Сенс полягає в тому, що код не повинен повторюватися.
 *
 * Якщо у вас є код або логіка, що повторюється, це може призвести до дублювання помилок
 * і ускладнити підтримку та зміну програми.
 *
 *
 * Жартівливий принцип WET (We Enjoy Typing), навпаки, позитивно оцінює дублювання коду,
 * маючи на увазі, що краще явно повторювати код, ніж використовувати абстракції
 * або функції для усунення дублювання.
 *
 * Цей підхід протилежний принципу DRY і може призвести до більшого обсягу коду,
 * складнішого його розуміння та підтримки.
 */

/**
 * KISS (Keep it simple, stupid)
 *
 * Принцип KISS (Keep It Simple, Stupid) — це принцип розробки програмного забезпечення,
 * який передбачає, що проєкт має бути реалізовано максимально просто та зрозуміло.
 *
 * Принцип KISS передбачає, що простота і наочність рішення допомагають зменшити складність,
 * спростити розуміння коду і зробити програму надійною.
 *
 * Основна ідея принципу KISS полягає в тому, чим простіший і зрозуміліший код,
 * то простіше його підтримувати і розробляти, а також тим менша ймовірність помилок і недоліків.
 * Це особливо важливо в довгостроковій перспективі, коли проєкт розвивається
 * і підтримується протягом тривалого часу.
 */

// Приклад 1. Підрахувати середнє арифметичне чисел
{
    const numbers = [1, 2, 3, 4, 5];
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    const average = sum / numbers.length;
    // console.log(average);
}

// Приклад 2. Підрахувати середнє арифметичне чисел
{
    const numbers = [1, 2, 3, 4, 5];
    const sum = numbers.reduce((acc, val) => acc + val, 0);
    const average = sum / numbers.length;
    // console.log(average);
}

/**
 * YAGNI (You aren’t gonna need it)
 *
 * Принцип YAGNI (You Aren't Gonna Need It) — це принцип розроблення програмного забезпечення,
 * що полягає в тому, щоб уникати додавання функціональності, яка наразі не потрібна.
 *
 * Цей принцип передбачає, що розробники не повинні впроваджувати функції,
 * які вони вважають корисними або можливими в майбутньому, але які не потрібні
 * в поточній версії програми або не підтверджені реальними вимогами чи можливостями користувачів.
 *
 * Головне правило принципу YAGNI полягає в тому, щоб робити тільки те, що справді потрібно
 * на даний момент, і уникати додавання «зайвого» коду, який може ускладнити розробку,
 * тестування та підтримку програми.
 */

// Приклад 1.
// У цьому прикладі ми реалізуємо тільки ті методи, які наразі необхідні для роботи із замовленнями.

{
    interface IItem {
        readonly id: number;
        readonly price: number;
    }

    class Order {
        #items: IItem[] = [];

        constructor(private readonly id: number, private readonly customerName: string) {}

        addItem(item: IItem): void {
            this.#items = [...this.#items, item];
        }

        removeItem(itemId: number): void {
            this.#items = this.#items.filter(item => item.id !== itemId);
        }

        calculateTotal(): number {
            return this.#items.reduce((total, item) => total + item.price, 0);
        }
    }

    // Ми не додаємо методи сортування, фільтрації, пошуку та інші додаткові методи,
    // оскільки вони наразі не потрібні, і додавання такої функціональності може
    // порушити принцип YAGNI.
}

/**
 * SOLID
 *
 * SOLID — це абревіатура, що складається з перших літер п'яти базових принципів
 *
 * При створенні програмних систем використання принципів SOLID сприяє створенню такої системи,
 * яку буде легко підтримувати та розширювати протягом довгого часу.
 *
 * Принципи SOLID — це настанови, які також можуть застосовуватися під час роботи над наявним
 * програмним забезпеченням для його поліпшення, наприклад, для видалення коду,
 * що «погано пахне».
 */

/**
 * S - Single Responsibility Principle (Принцип єдиного обов'язку/відповідальності)
 *
 * Принцип єдиної відповідальності означає, що кожен клас повинен мати тільки одну
 * відповідальність чи обов'язок і зміни повинні відбуватися тільки з однієї причини.
 *
 * Для розбору принципу Single Responsibility розглянемо приклад з BankAccount.
 * Клас BankAccount відповідатиме тільки за управління балансом рахунку та операції за ним
 * Клас TransactionHistory відповідатиме за зберігання і виведення історії транзакцій для рахунку
 */

// Приклад 1.
{
    interface ITransactionRecord {
        readonly transactionType: TransactionTypeEnum;
        readonly amount: number;
    }

    enum TransactionTypeEnum {
        DEPOSIT = 'Deposit',
        WITHDRAWAL = 'Withdrawal',
    }

    class TransactionHistory {
        private readonly transactions: ITransactionRecord[] = [];

        addTransaction(transaction: ITransactionRecord): void {
            this.transactions.push(transaction);
        }

        showTransactionHistory(): void {
            this.transactions.forEach(transaction => console.log(transaction));
        }
    }

    interface IBankClient {
        readonly firstName: string;
        readonly lastName: string;
    }

    class BankAccount {
        private readonly number: number;
        private readonly transactionHistory: TransactionHistory;
        private balance = 0;
        private _holderName!: string;

        constructor(client: IBankClient, private readonly currency: string) {
            this.#setHolderName(client);
            this.number = 12345678;
            this.transactionHistory = new TransactionHistory(); // асоціація, агрегація, композиція?
        }

        get balanceInfo(): string {
            return `${this.currency}${this.balance}`;
        }

        get holderName(): string {
            return this._holderName;
        }

        #setHolderName({ firstName, lastName }: IBankClient) {
            if (!firstName.trim()) throw new Error(`Client first name can't be empty!`);
            if (!lastName.trim()) throw new Error(`Client last name can't be empty!`);

            this._holderName = `${lastName} ${firstName}`;
        }

        deposit(amount: number): void {
            this.balance += amount;
            this.#recordTransaction(TransactionTypeEnum.DEPOSIT, amount);
        }

        withdraw(amount: number): void {
            if (this.balance < amount) throw new Error(`Sorry ${this._holderName}, you don't have enough funds!`);

            this.balance -= amount;
            this.#recordTransaction(TransactionTypeEnum.WITHDRAWAL, amount);
        }

        #recordTransaction(transactionType: TransactionTypeEnum, amount: number): void {
            const transaction: ITransactionRecord = { transactionType, amount };
            this.transactionHistory.addTransaction(transaction);
        }
    }

    // Кожен клас має свою окрему відповідальність, що робить код більш модульним і підтримуваним.
}

/**
 * O - Open/Closed Principle (Принцип відкритості/закритості)
 *
 * Принцип відкритості-закритості свідчить, що програмні сутності (класи, модулі, функції)
 * мають бути відкриті для розширення, але закриті для зміни.
 *
 * Це означає, що ми повинні прагнути до того, щоб вносити зміни в програмний код,
 * додаючи новий функціонал, не змінюючи наявного коду.
 *
 */

// Приклад 1.
// Додамо новий тип рахунку — InvestmentAccount, який успадковуватиметься від BankAccount,
// але додасть свої специфічні функції.
// Також ми внесемо зміни в BankAccount і TransactionTypeEnum.
{
    interface ITransactionRecord {
        readonly transactionType: TransactionTypeEnum;
        readonly amount: number;
    }

    enum TransactionTypeEnum {
        DEPOSIT = 'Deposit',
        WITHDRAWAL = 'Withdrawal',
        STOCK = 'Stock', // <---- Додали новий тип транзакції
    }

    class TransactionHistory {
        private readonly transactions: ITransactionRecord[] = [];

        addTransaction(transaction: ITransactionRecord): void {
            this.transactions.push(transaction);
        }

        showTransactionHistory(): void {
            this.transactions.forEach(transaction => console.log(transaction));
        }
    }

    interface IBankClient {
        readonly firstName: string;
        readonly lastName: string;
    }

    class BankAccount {
        private readonly number: number;
        private readonly transactionHistory: TransactionHistory;
        protected balance = 0; // <---- Змінили модифікатор доступу на protected
        private _holderName!: string;

        constructor(client: IBankClient, private readonly currency: string) {
            this.#setHolderName(client);
            this.number = 12345678;
            this.transactionHistory = new TransactionHistory();
        }

        get balanceInfo(): string {
            return `${this.currency}${this.balance}`;
        }

        get holderName(): string {
            return this._holderName;
        }

        #setHolderName({ firstName, lastName }: IBankClient) {
            if (!firstName.trim()) throw new Error(`Client first name can't be empty!`);
            if (!lastName.trim()) throw new Error(`Client last name can't be empty!`);

            this._holderName = `${lastName} ${firstName}`;
        }

        deposit(amount: number): void {
            this.balance += amount;
            this.recordTransaction(TransactionTypeEnum.DEPOSIT, amount); // <---- Змінили метод на protected
        }

        withdraw(amount: number): void {
            if (this.balance < amount) throw new Error(`Sorry ${this._holderName}, you don't have enough funds!`);

            this.balance -= amount;
            this.recordTransaction(TransactionTypeEnum.WITHDRAWAL, amount); // <---- Змінили метод на protected
        }

        protected recordTransaction(
            // <---- Змінили модифікатор доступу на protected
            transactionType: TransactionTypeEnum,
            amount: number,
        ): void {
            const transaction: ITransactionRecord = { transactionType, amount };
            this.transactionHistory.addTransaction(transaction);
        }
    }

    // Додаємо новий клас InvestmentAccount, який успадковується від BankAccount
    class InvestmentAccount extends BankAccount {
        // constructor(client: IBankClient, currency: string) {
        //   super(client, currency);
        // }

        override withdraw(amount: number): never {
            throw new Error('Withdrawal from Investment Account is not allowed.');
        }

        buyStock(price: number): void {
            if (this.balance < price) throw new Error(`Sorry ${this.holderName}, you don't have enough funds!`);

            this.balance -= price;
            this.recordTransaction(TransactionTypeEnum.STOCK, price);
        }
    }

    // new InvestmentAccount();
}

/**
 * L - Liskov Substitution Principle (Принцип підстановки Лісков)
 *
 * Принцип підстановки Барбари Лісков свідчить, що об'єкти базового класу повинні бути
 * замінними на об'єкти його похідних класів без зміни правильності виконання програми.
 *
 * Для реалізації принципу Liskov Substitution у нашому прикладі з BankAccount,
 * ми маємо переконатися, що об'єкти похідного класу, як от InvestmentAccount,
 * можуть використовуватися замість об'єктів базового класу BankAccount,
 * не спричиняючи небажаних побічних ефектів.
 */

// Приклад 1.
{
    interface ITransactionRecord {
        readonly transactionType: TransactionTypeEnum;
        readonly amount: number;
    }

    enum TransactionTypeEnum {
        DEPOSIT = 'Deposit',
        WITHDRAWAL = 'Withdrawal',
        STOCK = 'Stock',
    }

    class TransactionHistory {
        private readonly transactions: ITransactionRecord[] = [];

        addTransaction(transaction: ITransactionRecord): void {
            this.transactions.push(transaction);
        }

        showTransactionHistory(): void {
            this.transactions.forEach(transaction => console.log(transaction));
        }
    }

    interface IBankClient {
        readonly firstName: string;
        readonly lastName: string;
    }

    class BankAccount {
        private readonly number: number;
        private readonly transactionHistory: TransactionHistory;
        protected balance = 0;
        private _holderName!: string;

        constructor(client: IBankClient, private readonly currency: string) {
            this.#setHolderName(client);
            this.number = 12345678;
            this.transactionHistory = new TransactionHistory();
        }

        get balanceInfo(): string {
            return `${this.currency}${this.balance}`;
        }

        get holderName(): string {
            return this._holderName;
        }

        #setHolderName({ firstName, lastName }: IBankClient) {
            if (!firstName.trim()) throw new Error(`Client first name can't be empty!`);
            if (!lastName.trim()) throw new Error(`Client last name can't be empty!`);

            this._holderName = `${lastName} ${firstName}`;
        }

        deposit(amount: number): void {
            this.balance += amount;
            this.recordTransaction(TransactionTypeEnum.DEPOSIT, amount);
        }

        withdraw(amount: number): void {
            if (this.balance < amount) throw new Error(`Sorry ${this._holderName}, you don't have enough funds!`);

            this.balance -= amount;
            this.recordTransaction(TransactionTypeEnum.WITHDRAWAL, amount);
        }

        protected recordTransaction(transactionType: TransactionTypeEnum, amount: number): void {
            const transaction: ITransactionRecord = { transactionType, amount };
            this.transactionHistory.addTransaction(transaction);
        }
    }

    // Клас InvestmentAccount, який успадковується від BankAccount
    class InvestmentAccount extends BankAccount {
        // constructor(client: IBankClient, currency: string) {
        //   super(client, currency);
        // }

        override withdraw(amount: number): never {
            throw new Error('Withdrawal from Investment Account is not allowed.');
        }

        buyStock(price: number): void {
            if (this.balance < price) throw new Error(`Sorry ${this.holderName}, you don't have enough funds!`);

            this.balance -= price;
            this.recordTransaction(TransactionTypeEnum.STOCK, price);
        }
    }

    // Функція processAccount, яка приймає об'єкт BankAccount
    function processAccount(account: BankAccount, amount: number) {
        account.deposit(amount);
        console.log(`Account Balance: ${account.balanceInfo}`);
    }

    const client: IBankClient = { firstName: 'Anna', lastName: 'Borisova' };

    const bankAccount = new BankAccount(client, 'USD');
    const investmentAccount = new InvestmentAccount(client, 'EUR');

    processAccount(bankAccount, 200);
    processAccount(investmentAccount, 1200);

    investmentAccount.buyStock(1000);
    // bankAccount.buyStock(1000);
    console.log(investmentAccount.balanceInfo);

    // У цьому прикладі ми використовували InvestmentAccount замість BankAccount
    // у функції processAccount, і програма виконується правильно без несподіваних побічних ефектів.
    // Клас InvestmentAccount успадковує від BankAccount, і ми можемо використовувати його
    // замість базового класу BankAccount, дотримуючись принципу Liskov Substitution.
    // Це дозволяє нам легко розширювати і додавати нові типи рахунків без необхідності
    // зміни існуючого коду.
}

/**
 * I - Interface Segregation Principle (Принцип розділення інтерфейсу)
 *
 * Принцип поділу інтерфейсу говорить, що клієнти не повинні залежати від інтерфейсів,
 * які вони не використовують.
 *
 * Це означає, що інтерфейси слід розділяти на дрібніші та специфічніші,
 * щоб кожен клієнт міг залежати тільки від тих методів, які йому дійсно потрібні.
 *
 * Для реалізації принципу Interface Segregation, давайте розділимо інтерфейс IAccount
 * на більш специфічні інтерфейси IDepositable і IWithdrawable,
 * щоб клієнти могли залежати тільки від тих методів, які відповідають їхнім вимогам.
 */

// Приклад 1.
{
    // Інтерфейс IAccount, який містить тепер тільки balanceInfo
    interface IAccount {
        get balanceInfo(): string;
    }

    // Новий інтерфейс IDepositable, який містить метод deposit
    interface IDepositable {
        deposit(amount: number): void;
    }

    // Новий інтерфейс IWithdrawable, який містить метод withdraw
    interface IWithdrawable {
        withdraw(amount: number): void;
    }

    interface IBankClient {
        readonly firstName: string;
        readonly lastName: string;
    }

    interface ITransactionRecord {
        readonly transactionType: TransactionTypeEnum;
        readonly amount: number;
    }

    enum TransactionTypeEnum {
        DEPOSIT = 'Deposit',
        WITHDRAWAL = 'Withdrawal',
        STOCK = 'Stock',
    }

    class TransactionHistory {
        private readonly transactions: ITransactionRecord[] = [];

        addTransaction(transaction: ITransactionRecord): void {
            this.transactions.push(transaction);
        }

        showTransactionHistory(): void {
            this.transactions.forEach(transaction => console.log(transaction));
        }
    }

    abstract class BaseBankAccount implements IAccount, IDepositable {
        protected balance = 0;

        private readonly number: number;
        private readonly transactionHistory: TransactionHistory;
        private _holderName!: string;

        constructor(client: IBankClient, private readonly currency: string) {
            this.#setHolderName(client);
            this.number = 12345678;
            this.transactionHistory = new TransactionHistory();
        }

        get balanceInfo(): string {
            return `${this.currency}${this.balance}`;
        }

        get holderName(): string {
            return this._holderName;
        }

        #setHolderName({ firstName, lastName }: IBankClient) {
            if (!firstName.trim()) throw new Error(`Client first name can't be empty!`);
            if (!lastName.trim()) throw new Error(`Client last name can't be empty!`);

            this._holderName = `${lastName} ${firstName}`;
        }

        deposit(amount: number): void {
            this.balance += amount;
            this.recordTransaction(TransactionTypeEnum.DEPOSIT, amount);
        }

        protected recordTransaction(transactionType: TransactionTypeEnum, amount: number): void {
            const transaction: ITransactionRecord = { transactionType, amount };
            this.transactionHistory.addTransaction(transaction);
        }
    }

    class BankAccount extends BaseBankAccount implements IWithdrawable {
        withdraw(amount: number): void {
            if (this.balance < amount) throw new Error(`Sorry ${this.holderName}, you don't have enough funds!`);

            this.balance -= amount;
            this.recordTransaction(TransactionTypeEnum.WITHDRAWAL, amount);
        }
    }

    class InvestmentAccount extends BaseBankAccount {
        buyStock(price: number): void {
            if (this.balance < price) throw new Error(`Sorry ${this.holderName}, you don't have enough funds!`);

            this.balance -= price;
            this.recordTransaction(TransactionTypeEnum.STOCK, price);
        }
    }

    // Функція processAccount, яка приймає об'єкт BankAccount
    function processAccount(account: IAccount & IDepositable, amount: number) {
        // <---- Змінили тип параметра
        account.deposit(amount);
        console.log(`Account Balance: ${account.balanceInfo}`);
    }

    const client: IBankClient = { firstName: 'Anna', lastName: 'Borisova' };

    const bankAccount = new BankAccount(client, 'USD');
    const investmentAccount = new InvestmentAccount(client, 'EUR');

    processAccount(bankAccount, 200);
    processAccount(investmentAccount, 1200);

    investmentAccount.buyStock(1000);
    console.log(investmentAccount.balanceInfo);
}

/**
 * D - Dependency inversion principle (Принцип інверсії залежностей)
 *
 * Принцип інверсії залежності свідчить, що високорівневі модулі не повинні залежати від
 * низькорівневих модулів. Обидва типи модулів мають залежати від абстракцій.
 *
 * Абстракції не повинні залежати від деталей. Деталі повинні залежати від абстракцій.
 *
 * Для демонстрації принципу Dependency Inversion і додавання абстрактної платіжної системи,
 * давайте створимо інтерфейс PaymentSystem, який представлятиме абстракцію для платіжної системи.
 * Потім ми створимо дві конкретні реалізації цього інтерфейсу - одну для PayPal та іншу для Stripe.
 * Потім у класі BankAccount реалізуємо метод makePayment, який делегуватиме платіжній системі
 * виконання платежу.
 */

// Приклад 1.
{
    interface IAccount {
        get balanceInfo(): string;
        // Додаємо новий метод makePayment, який приймає суму платежу та платіжну систему
        makePayment(amount: number, paymentSystem: IPaymentSystem): void;
    }

    // Інтерфейс IPaymentSystem, який містить метод makePayment та властивість name
    interface IPaymentSystem {
        get name(): PaymentSystemEnum;
        makePayment(amount: number): void;
    }

    interface IDepositable {
        deposit(amount: number): void;
    }

    interface IWithdrawable {
        withdraw(amount: number): void;
    }

    interface IBankClient {
        readonly firstName: string;
        readonly lastName: string;
    }

    interface ITransactionRecord {
        readonly transactionType: TransactionTypeEnum;
        readonly amount: number;
    }

    enum TransactionTypeEnum {
        DEPOSIT = 'Deposit',
        WITHDRAWAL = 'Withdrawal',
        STOCK = 'Stock',
    }

    // Перерахування PaymentSystemEnum, яке містить дві платіжні системи - PayPal та Stripe
    enum PaymentSystemEnum {
        PAY_PAL = 'PayPal',
        STRIP = 'Strip',
    }

    class TransactionHistory {
        private readonly transactions: ITransactionRecord[] = [];

        addTransaction(transaction: ITransactionRecord): void {
            this.transactions.push(transaction);
        }

        showTransactionHistory(): void {
            this.transactions.forEach(transaction => console.log(transaction));
        }
    }

    // Клас PayPalPaymentSystem, який реалізує інтерфейс IPaymentSystem
    class PayPalPaymentSystem implements IPaymentSystem {
        private readonly _name = PaymentSystemEnum.PAY_PAL;

        constructor(private readonly email: string) {}

        get name(): PaymentSystemEnum {
            return this._name;
        }

        makePayment(amount: number): void {
            console.log(`Payment of ${amount} via ${this.name} to ${this.email}`);
        }
    }

    // Клас StripePaymentSystem, який реалізує інтерфейс IPaymentSystem
    class StripePaymentSystem implements IPaymentSystem {
        private readonly _name = PaymentSystemEnum.STRIP;

        constructor(private readonly cardNumber: string) {}

        get name(): PaymentSystemEnum {
            return this._name;
        }

        makePayment(amount: number): void {
            console.log(`Payment of ${amount} via ${this.name} with card number ${this.cardNumber}`);
        }
    }

    abstract class BaseBankAccount implements IAccount, IDepositable {
        protected balance = 0;

        private readonly number: number;
        private readonly transactionHistory: TransactionHistory;
        private _holderName!: string;

        constructor(client: IBankClient, private readonly currency: string) {
            this.#setHolderName(client);
            this.number = 12345678;
            this.transactionHistory = new TransactionHistory();
        }

        get balanceInfo(): string {
            return `${this.currency}${this.balance}`;
        }

        get holderName(): string {
            return this._holderName;
        }

        #setHolderName({ firstName, lastName }: IBankClient) {
            if (!firstName.trim()) throw new Error(`Client first name can't be empty!`);
            if (!lastName.trim()) throw new Error(`Client last name can't be empty!`);

            this._holderName = `${lastName} ${firstName}`;
        }

        deposit(amount: number): void {
            this.balance += amount;
            this.recordTransaction(TransactionTypeEnum.DEPOSIT, amount);
        }

        // додаємо новий метод makePayment, який приймає суму платежу та платіжну систему
        // Агрегація???
        makePayment(amount: number, paymentSystem: IPaymentSystem): void {
            console.log(`Processing payment of ${amount} via ${paymentSystem.name}...`);
            paymentSystem.makePayment(amount);
        }

        protected recordTransaction(transactionType: TransactionTypeEnum, amount: number): void {
            const transaction: ITransactionRecord = { transactionType, amount };
            this.transactionHistory.addTransaction(transaction);
        }
    }

    class BankAccount extends BaseBankAccount implements IWithdrawable {
        withdraw(amount: number): void {
            if (this.balance < amount) throw new Error(`Sorry ${this.holderName}, you don't have enough funds!`);

            this.balance -= amount;
            this.recordTransaction(TransactionTypeEnum.WITHDRAWAL, amount);
        }
    }

    class InvestmentAccount extends BaseBankAccount {
        buyStock(price: number): void {
            if (this.balance < price) throw new Error(`Sorry ${this.holderName}, you don't have enough funds!`);

            this.balance -= price;
            this.recordTransaction(TransactionTypeEnum.STOCK, price);
        }
    }

    const paypalPaymentProcessor = new PayPalPaymentSystem('example@example.com');
    const stripePaymentProcessor = new StripePaymentSystem('4242 4242 4242 4242');

    const client: IBankClient = { firstName: 'Anna', lastName: 'Borisova' };

    const bankAccount = new BankAccount(client, 'USD');
    const investmentAccount = new InvestmentAccount(client, 'EUR');

    bankAccount.makePayment(1000, paypalPaymentProcessor);
    investmentAccount.makePayment(500, stripePaymentProcessor);

    // У цьому прикладі ми додали метод makePayment в інтерфейс IAccount,
    // який дозволяє рахункам взаємодіяти з платіжною системою, передаючи платіжну систему
    // в параметрах. Класи BankAccount і InvestmentAccount реалізують цей метод,
    // і тепер вони можуть делегувати платежі платіжним системам, які реалізують
    // інтерфейс PaymentSystem. Це дозволяє рахункам взаємодіяти з різними платіжними системами,
    // не залежачи від їхньої конкретної реалізації, що відповідає принципу Dependency Inversion.
}

/**
 * Декомпозиція
 *
 * В ООП, декомпозиція являє собою процес поділу складних завдань на більш дрібні
 * та керовані компоненти, які називаються об'єктами.
 *
 * Декомпозиція — це розбиття програми на простіші та зрозуміліші частини,
 * щоб спростити аналіз, проєктування, реалізацію та підтримку програмного коду.
 */

/**
 * Декомпозиція необхідна для
 *
 * Покращення керованості.
 * Розбиття складної задачі на дрібніші та зрозуміліші компоненти полегшує розуміння
 * та управління кодом. Кожен об'єкт відповідає за певну функціональність,
 * що спрощує його супровід, тестування і налагодження.
 *
 * Повторне використання коду.
 * Декомпозиція дає змогу створювати повторно використовувані компоненти та бібліотеки,
 * які можуть бути використані в різних частинах програми або навіть у різних проектах.
 * Це скорочує час розробки і підвищує якість програми.
 *
 * Чистота і ясність коду.
 * Дрібні та добре визначені компоненти сприяють створенню чистішого, зрозумілішого та
 * легшого для читання коду. Кожен об'єкт має певну відповідальність, що робить код легшим
 * для розуміння.
 *
 * Покращена сумісність і розширюваність.
 * Компоненти, отримані в результаті декомпозиції, можуть бути замінені або модифіковані
 * незалежно один від одного, що полегшує спільну розробку і підтримку.
 *
 * Зменшення залежностей.
 * Декомпозиція допомагає зменшити зв'язність між різними компонентами програми,
 * що робить код більш стійким до змін і зменшує ймовірність виникнення помилок через
 * зміни в одній частині програми.
 *
 * Легкість тестування.
 * Простіші та ізольовані компоненти легше тестувати, оскільки їхню поведінку можна перевірити
 * окремо від інших компонентів. Декомпозиція дає змогу розбити складну задачу на
 * простіші підзадачі, які можуть бути розв'язані незалежно одне від одного,
 * що полегшує розподіл роботи між членами команди.
 */

// Приклад 1. До декомпозиції
// У цьому прикладі клас BankAccount представляє банківський рахунок із методами для депозиту, виведення коштів і отримання балансу.
// Усі методи пов'язані з одним класом, що робить його доволі складним і заважає повторному використанню та тестуванню.

{
    interface IBankClient {
        readonly firstName: string;
        readonly lastName: string;
    }

    class BankAccount {
        private readonly number: number;
        private balance = 0;
        private _holderName!: string;

        constructor(client: IBankClient, private readonly currency: string) {
            this.#setHolderName(client);
            this.number = 12345678;
        }

        get balanceInfo(): string {
            return `${this.currency}${this.balance}`;
        }

        get holderName(): string {
            return this._holderName;
        }

        #setHolderName({ firstName, lastName }: IBankClient) {
            if (!firstName.trim()) throw new Error(`Client first name can't be empty!`);
            if (!lastName.trim()) throw new Error(`Client last name can't be empty!`);

            this._holderName = `${lastName} ${firstName}`;
        }

        deposit(amount: number): void {
            this.balance += amount;
        }

        withdraw(amount: number): void {
            if (this.balance < amount) throw new Error(`Sorry ${this._holderName}, you don't have enough funds!`);

            this.balance -= amount;
        }
    }
}

// Приклад 2. Після декомпозиції
{
    interface IBankClient {
        readonly firstName: string;
        readonly lastName: string;
    }

    class BankAccount {
        private readonly number: number;
        private _balance = 0;
        private _holderName!: string;

        constructor(client: IBankClient, private readonly currency: string) {
            this.#setHolderName(client);
            this.number = 12345678;
        }

        get balance(): number {
            return this._balance;
        }

        set balance(value: number) {
            this._balance = value;
        }

        get holderName(): string {
            return this._holderName;
        }

        #setHolderName({ firstName, lastName }: IBankClient) {
            if (!firstName.trim()) throw new Error(`Client first name can't be empty!`);
            if (!lastName.trim()) throw new Error(`Client last name can't be empty!`);

            this._holderName = `${lastName} ${firstName}`;
        }
    }

    // Агрегація???
    class Transaction {
        constructor(private readonly account: BankAccount) {}

        deposit(amount: number): void {
            this.account.balance += amount;
        }

        withdraw(amount: number): void {
            if (this.account.balance < amount)
                throw new Error(`Sorry ${this.account.holderName}, you don't have enough funds!`);

            this.account.balance -= amount;
        }
    }
}

/**
 * Залежність між компонентами системи
 *
 * Зв'язаність (Coupling)
 * Зв'язаність визначає міру залежності між різними компонентами програми.
 * Це означає, наскільки один компонент залежить від іншого.
 *
 * Що вища зв'язаність, то сильніша залежність між компонентами.
 */

/**
 * Виділяють 2 види зв'язаності:
 *
 * Слабка зв'язаність (Low coupling):
 * Компоненти взаємодіють один з одним через мінімальний і чітко визначений інтерфейс.
 * Зміни в одному компоненті мало впливають на інші компоненти.
 * Слабка зв'язаність сприяє легкому тестуванню, перевикористанню та зміні компонентів
 * незалежно один від одного.
 *
 * Сильна зв'язаність (High coupling):
 * Компоненти сильно залежать один від одного, і зміни в одному компоненті можуть викликати
 * каскадні зміни в інших компонентах. Це робить програму менш гнучкою і її складніше підтримувати.
 *
 * Метою під час проектування програмної системи є мінімізація зв'язаності між компонентами,
 * щоб поліпшити перевикористання, розширюваність і підтримуваність коду.
 */

/**
 * Зачеплення (Cohesion)
 *
 * Зачеплення оцінює, наскільки сильно пов'язані елементи всередині окремого компонента
 * або модуля. Це визначає ступінь, у якій завдання і відповідальність елементів усередині
 * компонента пов'язані та узгоджуються одне з одним.
 */

/**
 * Виділяють 2 види зачеплення:
 *
 * Високе зачеплення (High cohesion):
 * Елементи всередині компонента тісно пов'язані і виконують одну основну функцію або завдання.
 * Кожен елемент має чітко визначену роль, що робить компонент легким для розуміння і використання.
 *
 * Низьке зачеплення (Low cohesion):
 * Елементи всередині компонента слабко пов'язані і виконують різні завдання, які можуть
 * бути не пов'язані один з одним. Низьке зачеплення призводить до менш організованого
 * і складного коду.
 *
 * Метою під час проектування компонентів є досягнення високого зачеплення,
 * щоб кожен компонент виконував чітко визначені функції та мав чітку відповідальність.
 * Це покращує читабельність, підтримуваність і перевикористання коду.
 */

/**
 * Вплив на структуру програми
 *
 * Структура програми та її якість безпосередньо залежать від зв'язаності та зачеплення компонентів.
 *
 * Низька зв'язаність і високе зачеплення сприяють створенню добре структурованого і
 * легко підтримуваного коду. Чим краще управляються зв'язаність і зачеплення,
 * тим більш модульною і розширюваною стає програмна система.
 *
 * Це полегшує роботу команди розробників і покращує якість програмного продукту загалом.
 */
