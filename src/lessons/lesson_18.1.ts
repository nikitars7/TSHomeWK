/**
 * Паттерн «Будівельник»
 *
 * Паттерн «Будівельник» (Builder) — це породжувальний паттерн проектування, що дає змогу створювати складні об'єкти,
 * крок за кроком, відокремлюючи процес створення від представлення кінцевого продукту.
 *
 * Це дає змогу використовувати один і той самий процес створення для різних уявлень об'єкта.
 */

/**
 * Основні учасники патерну:
 *
 * 1. Будівельник (Builder):
 *    Інтерфейс або абстрактний клас, який оголошує методи для покрокового створення об'єкта.
 *    Включає методи для встановлення різних властивостей об'єкта.
 *
 * 2. Конкретний будівельник (Concrete Builder):
 *    Реалізація інтерфейсу будівельника, яка реалізує методи для створення конкретного типу об'єкта.
 *    Кожен конкретний будівельник може мати свою власну логіку створення об'єкта.
 *
 * 3. Директор (Director):
 *    Керує процесом створення об'єкта за допомогою будівельника.
 *    Директор знає, які методи будівельника потрібно викликати, щоб створити певний об'єкт.
 *
 * 4. Продукт (Product):
 *    Складний об'єкт, який будівельник створює. Об'єкт, який ми хочемо отримати.
 */

/**
 * Проблема
 *
 * Паттерн «Будівельник» розв'язує проблему створення складних об'єктів із великою кількістю параметрів конструктора.
 * Коли в об'єкта занадто багато властивостей, їхнє передавання в конструктор може стати громіздким
 * і заплутаним завданням. Це може ускладнити код і зробити його менш підтримуваним і читабельним.
 *
 * Крім того, за допомогою цього патерну можна визначити різні будівельники для одного і того ж класу,
 * які створюють об'єкти з різними конфігураціями.
 *
 * Це дає змогу створювати об'єкти різної структури, використовуючи один і той самий процес створення.
 */

/**
 * Рішення
 *
 * «Будівельник» дає змогу керувати процесом створення складних об'єктів, робить код модульним і гнучкішим,
 * а також спрощує додавання нових типів об'єктів без зміни наявного коду.
 *
 * Клієнтський код працює з абстрактним класом будівельника, не знаючи про конкретні деталі створення об'єктів.
 * Це робить патерн потужним інструментом проектування для роботи зі складними об'єктами.
 */

/**
 * Структура
 *
 * Патерн складається з таких «частин»:
 *
 * Інтерфейс будівельника.
 * Інтерфейс будівельника оголошує кроки конструювання продуктів, спільні для всіх видів будівельників.
 *
 * Конкретні будівельники.
 * Будівельники реалізують будівельні кроки, кожен по-своєму. Конкретні будівельники можуть виробляти
 * різнорідні об'єкти, які не мають спільного інтерфейсу.
 *
 * Продукт.
 * Продукт — створюваний об'єкт. Продукти, зроблені різними будівельниками,
 * не зобов'язані мати спільний інтерфейс.
 *
 * Директор.
 * Директор визначає порядок виклику будівельних кроків для виробництва тієї чи іншої конфігурації продуктів.
 *
 * Клієнт.
 * Клієнт подає в конструктор директора вже готовий об'єкт-будівельник, і надалі цей директор використовує тільки його.
 * Але можливий і інший варіант, коли клієнт передає будівельника через параметр будівельного методу директора.
 * У цьому випадку можна щоразу застосовувати різних будівельників для виробництва різних подань об'єктів.
 */

/**
 * Кроки реалізації
 *
 * 1. Переконайтеся в тому, що створення різних уявлень об'єкта можна звести до загальних кроків.
 *
 * 2. Опишіть ці кроки в загальному інтерфейсі будівельників.
 *
 * 3. Для кожного з уявлень об'єкта-продукту створіть по одному класу-будівельнику і реалізуйте
 *    їхні методи будівництва. Не забудьте про метод отримання результату. Зазвичай конкретні будівельники
 *    визначають власні методи отримання результату будівництва.
 *    Ви не можете описати ці методи в інтерфейсі будівельників, оскільки продукти не обов'язково повинні
 *    мати спільний базовий клас або інтерфейс.
 *    Але ви завжди зможете додати метод отримання результату до загального інтерфейсу,
 *    якщо ваші будівельники виробляють однорідні продукти зі спільним предком.
 *
 * 4. Подумайте про створення класу директора. Його методи будуть створювати різні конфігурації продуктів,
 *    викликаючи різні кроки одного і того ж будівельника.
 *
 * 5. Клієнтський код повинен буде створювати і об'єкти будівельників, і об'єкт директора.
 *    Перед початком будівництва клієнт повинен зв'язати певного будівельника з директором.
 *    Це можна зробити або через конструктор, або через сеттер, або подавши будівельника безпосередньо
 *    в будівельний метод директора.
 *
 * 6. Результат будівництва можна повернути з директора, але тільки якщо метод повернення продукту вдалося
 *    помістити в загальний інтерфейс будівельників. Інакше ви жорстко прив'яжете директора до
 *    конкретних класів будівельників.
 */

/**
 * Концептуальний приклад
 */
{
    // Інтерфейс Будівельника оголошує створювальні методи для різних частин об'єктів - продуктів.
    interface IBuilder {
        producePartA(): void;
        producePartB(): void;
        producePartC(): void;
    }

    /**
     * Має сенс використовувати патерн Будівельник тільки тоді, коли ваші продукти
     * досить складні і вимагають великої конфігурації.
     *
     * На відміну від інших породжувальних патернів, різні конкретні будівельники
     * можуть виробляти непов'язані продукти. Іншими словами, результати різних
     * будівельників можуть не завжди слідувати одному й тому самому інтерфейсу.
     */
    class ProductA {
        readonly parts: string[] = [];

        listParts(): void {
            console.log(`Product parts: ${this.parts.join(', ')}\n`);
        }
    }

    /**
     * Класи Конкретного Будівельника слідують інтерфейсу Будівельника та надають
     * конкретні реалізації кроків побудови. Ваша програма може мати кілька
     * варіантів Будівельників, реалізованих по-різному.
     */
    class ConcreteBuilderA implements IBuilder {
        private product!: ProductA;

        /**
         * Новий екземпляр будівельника повинен містити порожній об'єкт продукту,
         * який використовується в подальшій збірці.
         */
        constructor() {
            this.reset();
        }

        reset(): void {
            this.product = new ProductA();
        }

        /**
         * Усі етапи виробництва працюють з одним і тим самим екземпляром продукту.
         */
        producePartA(): void {
            this.product.parts.push('PartA1');
        }

        producePartB(): void {
            this.product.parts.push('PartB1');
        }

        producePartC(): void {
            this.product.parts.push('PartC1');
        }

        /**
         * Конкретні Будівельники повинні надати свої власні методи
         * отримання результатів. Це пов'язано з тим, що різні типи будівельників
         * можуть створювати абсолютно різні продукти з різними інтерфейсами.
         * Тому такі методи не можуть бути оголошені в базовому інтерфейсі
         * Будівельника (принаймні, у статично типізованій мові
         * програмування).
         *
         * Як правило, після повернення кінцевого результату клієнту, екземпляр
         * будівельника має бути готовий до початку виробництва наступного продукту.
         * Тому звичайною практикою є виклик методу скидання в кінці тіла
         * методу getProduct. Однак така поведінка не є обов'язковою, ви
         * можете змусити своїх будівельників чекати явного запиту на скидання з коду
         * клієнта, перш ніж позбутися попереднього результату.
         */
        public getProduct(): ProductA {
            const result = this.product;
            this.reset();
            return result;
        }
    }

    /**
     * Директор відповідає тільки за виконання кроків побудови в певній
     * послідовності. Це корисно під час виробництва продуктів у певному
     * порядку або особливої конфігурації. Строго кажучи, клас Директор необов'язковий,
     * так як клієнт може безпосередньо керувати будівельниками.
     */
    class Director {
        private builder!: IBuilder;

        /**
         * Директор працює з будь-яким екземпляром будівельника, який передається йому
         * клієнтським кодом. Таким чином, клієнтський код може змінити кінцевий
         * тип новозбірного продукту.
         */
        setBuilder(builder: IBuilder): void {
            this.builder = builder;
        }

        /**
         * Директор може будувати кілька варіацій продукту, використовуючи однакові
         * кроки побудови.
         */
        buildMinimalViableProduct(): void {
            this.builder.producePartA();
        }

        buildFullFeaturedProduct(): void {
            this.builder.producePartA();
            this.builder.producePartC();
            this.builder.producePartB();
        }
    }

    /**
     * Клієнтський код створює об'єкт-будівельник, передає його директору, а потім
     * ініціює процес побудови. Кінцевий результат витягується з об'єкта-
     * будівельника.
     */
    function clientCode(director: Director) {
        const builder = new ConcreteBuilderA();
        director.setBuilder(builder);

        console.log('Standard basic product:');
        director.buildMinimalViableProduct();
        builder.getProduct().listParts();

        console.log('Standard full featured product:');
        director.buildFullFeaturedProduct();
        builder.getProduct().listParts();

        // Помните, что паттерн Строитель можно использовать без класса Директор.
        console.log('Custom product:');
        builder.producePartA();
        builder.producePartC();
        builder.getProduct().listParts();
    }

    const director = new Director();
    clientCode(director);
}

/**
 * Приклад з життя
 *
 * Для реалізації патерну «Будівельник» використаємо клас BankAccount, припустімо, що в нас є клас BankAccount,
 * який представляє банківський рахунок.
 *
 * Щоб створити об'єкт BankAccount, у нас є різні властивості, як-от accountNumber, accountHolder, balance,
 * interestRate, і так далі.
 *
 * Замість того, щоб передавати всі ці параметри до конструктора, ми можемо використати паттерн «Будівельник»,
 * щоб покроково створити об'єкт BankAccount.
 */
{
    interface IBankClient {
        readonly firstName: string;
        readonly lastName: string;
    }

    enum CurrencyTypeEnum {
        USD = 'USD',
        EUR = 'EUR',
        UAH = 'UAH',
    }

    interface IBankAccountBuilder<T> {
        setBalance(balance: number): IBankAccountBuilder<T>;
        setCurrency(currency: CurrencyTypeEnum): IBankAccountBuilder<T>;
        setHolder(client: IBankClient): IBankAccountBuilder<T>;
        build(): T;
        reset(): void;
    }

    class BaseBankAccount {
        protected balance = 0;

        private readonly number: number;
        private _currency!: string;
        private _holderName!: string;

        constructor() {
            this.number = 12345678;
        }

        get balanceInfo(): string {
            return `${this._currency}${this.balance}`;
        }

        set currency(value: CurrencyTypeEnum) {
            this._currency = value;
        }

        get holderName(): string {
            return this._holderName;
        }

        set holderName({ firstName, lastName }: IBankClient) {
            if (!firstName.trim()) throw new Error(`Client first name can't be empty!`);
            if (!lastName.trim()) throw new Error(`Client last name can't be empty!`);

            this._holderName = `${lastName} ${firstName}`;
        }

        deposit(amount: number): void {
            this.balance += amount;
        }
    }

    class BankAccount extends BaseBankAccount {
        withdraw(amount: number): void {
            if (this.balance < amount) throw new Error(`Sorry ${this.holderName}, you don't have enough funds!`);

            this.balance -= amount;
        }
    }

    class BankAccountBuilder implements IBankAccountBuilder<BankAccount> {
        private account!: BankAccount;

        constructor() {
            this.reset();
        }

        setHolder(client: IBankClient): BankAccountBuilder {
            this.account.holderName = client;
            return this;
        }

        setBalance(balance: number): BankAccountBuilder {
            this.account.deposit(balance);
            return this;
        }

        setCurrency(currency: CurrencyTypeEnum): BankAccountBuilder {
            this.account.currency = currency;
            return this;
        }

        build(): BankAccount {
            return this.account;
        }

        reset(): void {
            this.account = new BankAccount();
        }
    }

    class SavingsAccount extends BaseBankAccount {
        private _interestRate!: number;

        constructor() {
            super();
        }

        public set interestRate(rate: number) {
            this._interestRate = rate;
        }

        public calculateInterest(): number {
            return this.balance * (this._interestRate / 100);
        }
    }

    class SavingsAccountBuilder implements IBankAccountBuilder<SavingsAccount> {
        private account!: SavingsAccount;

        constructor() {
            this.reset();
        }

        setHolder(client: IBankClient): SavingsAccountBuilder {
            this.account.holderName = client;
            return this;
        }

        setBalance(balance: number): SavingsAccountBuilder {
            this.account.deposit(balance);
            return this;
        }

        setCurrency(currency: CurrencyTypeEnum): SavingsAccountBuilder {
            this.account.currency = currency;
            return this;
        }

        setInterestRate(interestRate: number): SavingsAccountBuilder {
            this.account.interestRate = interestRate;
            return this;
        }

        build(): SavingsAccount {
            return this.account;
        }

        reset(): void {
            this.account = new SavingsAccount();
        }
    }
    /* eslint no-underscore-dangle: 0 */
    class BankManager {
        private _builder!: IBankAccountBuilder<BaseBankAccount>;

        set builder(builder: IBankAccountBuilder<BaseBankAccount>) {
            this._builder = builder;
        }

        createEmptyRegularAccount(client: IBankClient, currency: CurrencyTypeEnum): BankAccount {
            if (!(this._builder instanceof BankAccountBuilder)) throw new Error('Incorrect builder type');

            return this._builder.setHolder(client).setCurrency(currency).build();
        }

        createRegularAccount(client: IBankClient, currency: CurrencyTypeEnum, balance: number): BankAccount {
            if (!(this._builder instanceof BankAccountBuilder)) throw new Error('Incorrect builder type');

            return this._builder.setHolder(client).setCurrency(currency).setBalance(balance).build();
        }

        createSavingsAccountRate5(client: IBankClient, currency: CurrencyTypeEnum, balance: number): SavingsAccount {
            if (!(this._builder instanceof SavingsAccountBuilder)) throw new Error('Incorrect builder type');

            return this._builder.setHolder(client).setCurrency(currency).setBalance(balance).setInterestRate(5).build();
        }
    }
}
/**
 * У цьому прикладі було створено клас BaseBankAccount, що представляє базовий банківський рахунок
 * і містить властивості та методи, спільні для всіх банківських рахунків.
 *
 * Він має поля balance, _currency, _holderName, і методи для депозиту та виведення інформації про баланс.
 *
 * BankAccount, який успадковується від BaseBankAccount і представляє звичайний банківський рахунок.
 * Він додає метод для виведення коштів з рахунку.
 *
 * BankAccountBuilder, який реалізує інтерфейс IBankAccountBuilder і дає змогу конструювати екземпляри
 * класу BankAccount за допомогою патерну «Будівельник». Він встановлює значення для балансу,
 * валюти та власника рахунку.
 *
 * SavingsAccount, що реалізує BaseBankAccount і являє собою рахунок заощаджень.
 * Так само він додає властивість interestRate і метод для розрахунку відсотків.
 *
 * SavingsAccountBuilder білдер, що реалізує інтерфейс IBankAccountBuilder і дозволяє конструювати екземпляри
 * класу SavingsAccount. Він встановлює значення для балансу, валюти, відсоткової ставки і власника рахунку.
 *
 * BankManager — клас діє як директор зі створення рахунків. Він приймає різні будівельники
 * (BankAccountBuilder або SavingsAccountBuilder) і використовує їхні методи для створення різних типів рахунків.
 * Клас BankManager забезпечує більш зручну взаємодію з різними будівельниками і створює екземпляри рахунків
 * з певними параметрами (наприклад, рахунок заощаджень із заданою процентною ставкою).
 */

/**
 * Переваги
 *
 * «Будівельник» має кілька переваг, які роблять його корисним під час проектування ПЗ:
 *
 * 1. Відокремлення складної логіки від клієнтського коду.
 *    Паттерн дає змогу виділити складну логіку створення складного об'єкта в окремий клас (будівельник),
 *    відокремлюючи її від клієнтського коду. Клієнтський код працює з абстрактним будівельником,
 *    не знаючи про деталі створення об'єкта.
 *
 * 2. Поступове створення об'єкта.
 *    «Будівельник» надає покроковий процес створення об'єкта, що робить код більш читабельним і зрозумілим.
 *    Кожен метод будівельника відповідає за встановлення певної властивості об'єкта, і клієнтський код викликає
 *    тільки потрібні методи для створення об'єкта з потрібними характеристиками.
 *
 * 3. Можливість створення різних уявлень одного об'єкта.
 *    Паттерн дає змогу визначити різні будівельники для одного й того самого класу, що дає змогу створювати
 *    об'єкти з різними конфігураціями, не змінюючи сам клас.
 *
 * 4. Приховування складних деталей.
 *    Клієнтський код не знає про складну логіку створення об'єкта і не залежить від конкретних класів продуктів.
 *    Це дає змогу приховати деталі реалізації та надати клієнту тільки необхідний функціонал.
 *
 * 5. Покращення читабельності та підтримуваності коду.
 *    Паттерн допомагає поліпшити структуру й організацію коду, роблячи його більш читабельним і легко підтримуваним.
 */

/**
 * Недоліки
 *
 * «Будівельник» має кілька недоліків і обмежень, які варто враховувати при його застосуванні:
 *
 * 1. Ускладнення коду
 *    Використання патерну може призвести до збільшення обсягу коду. Необхідно створювати окремий клас
 *    будівельника для кожного складного об'єкта, що може призвести до збільшення числа класів і
 *    ускладнення структури програми. При роботі з простими об'єктами або об'єктами з малим числом властивостей,
 *    використання патерну «Будівельник» може здатися надлишковим, оскільки додавання окремих
 *    будівельників може ускладнити код без значної вигоди.
 *
 * 2. Можливі проблеми узгодженості:
 *    Якщо у різних будівельників об'єктів є різні інтерфейси або методи, це може призвести до проблем узгодженості,
 *    коли потрібно створити об'єкти з різними типами будівельників.
 *
 * 3. Обмежена підтримка для зміни структури об'єкта.
 *    Паттерн передбачає покрокове створення об'єкта, що робить його менш придатним для об'єктів
 *    зі складною структурою, яка може змінюватися під час виконання програми.
 */

// https://refactoring.guru/uk/design-patterns

/// <reference path="utils.ts" />
BuilderPattern.f1();
