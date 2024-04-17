/**
 * Паттерн «Стратегія»
 *
 * Патерн «Стратегія» (Strategy) — це поведінковий патерн проєктування,
 * який визначає сімейство схожих алгоритмів і розміщує кожен з них у власному класі.
 *
 * Після цього алгоритми можна заміняти один на інший прямо під час виконання програми.
 *
 * Цей патерн дозволяє клієнтському коду вибирати відповідний алгоритм під час виконання,
 * без необхідності зміни самого клієнтського коду.
 */

/**
 * Проблема
 *
 * «Стратегія» розв'язує проблему зміни алгоритмів або поведінки об'єкта під час виконання програми,
 * а також зменшує залежність між клієнтським кодом і конкретними реалізаціями алгоритмів.
 *
 * Коли в системі існують різні варіанти алгоритмів або стратегій, які можуть бути обрані залежно від умов або вимог,
 * «Стратегія» надає гнучкий і розширюваний механізм для їхнього вибору та використання.
 *
 * Приклад з навігатором:
 *  - машрут для автомобілів
 *  - маршрут для пішоходів
 *  - маршрут для громадського транспорту
 *  - маршрут для велосепидистів
 *  - ...
 */

/**
 * Рішення
 *
 * «Стратегія» пропонує визначити сімейство схожих алгоритмів, які часто змінюються або розширюються,
 * і винести їх у власні класи, звані стратегіями.
 *
 * Замість того, щоб початковий клас сам виконував той чи інший алгоритм, він відіграватиме роль контексту,
 * посилаючись на одну зі стратегій і делегуючи їй виконання роботи.
 *
 * Щоб змінити алгоритм, вам буде достатньо підставити в контекст інший об'єкт-стратегію.
 *
 * Важливо, щоб усі стратегії мали спільний інтерфейс.
 * Використовуючи цей інтерфейс, контекст буде незалежним від конкретних класів стратегій.
 * З іншого боку, це дасть змогу змінювати і додавати нові види алгоритмів, не чіпаючи код контексту.
 */

/**
 * Структура
 *
 * Патерн складається з таких «частин»:
 *
 * Контекст.
 * Контекст зберігає посилання на об'єкт конкретної стратегії, працюючи з ним через загальний інтерфейс стратегій.
 *
 * Стратегія.
 * Стратегія визначає інтерфейс, спільний для всіх варіацій алгоритму.
 * Контекст використовує цей інтерфейс для виклику алгоритму.
 * Для контексту неважливо, яку саме варіацію алгоритму буде обрано, оскільки всі вони мають однаковий інтерфейс.
 *
 * Конкретні стратегії,
 * що реалізують різні варіації алгоритму. Під час виконання програми контекст отримує виклики від клієнта
 * і делегує їх об'єкту конкретної стратегії.
 * Клієнт має створити об'єкт конкретної стратегії та передати його в конструктор контексту.
 * Крім цього, клієнт повинен мати можливість замінити стратегію на льоту, використовуючи сеттер.
 * Завдяки цьому, контекст не знатиме про те, яку саме стратегію зараз обрано.
 */

/**
 * Кроки реалізації
 *
 * Для реалізації патерну «Стратегія», нам необхідно виконати такі кроки:
 *
 * 1. Визначити алгоритм, який схильний до частих змін. Також підійде алгоритм, що має кілька варіацій,
 *    які обираються під час виконання програми.
 *
 * 2. Створити інтерфейс стратегій, що описує цей алгоритм. Він має бути спільним для всіх варіантів алгоритму.
 *
 * 3. Помістити варіації алгоритму у власні класи, які реалізують цей інтерфейс.
 *
 * 4. У класі контексту створити поле для зберігання посилання на поточний об'єкт-стратегію,
 *    а також метод для його зміни.
 *    Переконатися в тому, що контекст працює з цим об'єктом тільки через загальний інтерфейс стратегій.
 *    Клієнти контексту повинні подавати в нього відповідний об'єкт-стратегію,
 *    коли хочуть, щоб контекст поводився певним чином.
 */

/** Концептуальний приклад */

{
    /**
     * Інтерфейс cтратегії оголошує операції, спільні для всіх підтримуваних версій
     * деякого алгоритму.
     *
     * Контекст використовує цей інтерфейс для виклику алгоритму, визначеного
     * конкретними стратегіями.
     */

    interface IStrategy {
        doAlgorithm(data: string[]): string[];
    }

    /**
     * Конкретні cтратегії реалізують алгоритм, дотримуючись базового інтерфейсу
     * cтратегії.
     *
     * Цей інтерфейс робить їх взаємозамінними в контексті.
     */
    class StrategyA implements IStrategy {
        doAlgorithm(data: string[]): string[] {
            return data.sort();
        }
    }

    class StrategyB implements IStrategy {
        doAlgorithm(data: string[]): string[] {
            return data.reverse();
        }
    }

    /**
     * Контекст визначає інтерфейс, що становить інтерес для клієнтів.
     */
    class Context {
        //  Контекст зберігає посилання на один з об'єктів стратегії.
        //  Контекст не знає конкретного класу стратегії.
        //  Він повинен працювати з усіма стратегіями через інтерфейс стратегії.
        private _strategy: IStrategy;

        // Зазвичай контекст приймає стратегію через конструктор,
        constructor(strategy: IStrategy) {
            this._strategy = strategy;
        }

        // а також надає сеттер для її зміни під час виконання.
        set strategy(strategy: IStrategy) {
            this._strategy = strategy;
        }

        // Замість того, щоб самостійно реалізовувати множинні версії
        // алгоритму, контекст делегує деяку роботу об'єкту стратегії.
        doSomeBusinessLogic(): void {
            // ...

            const result = this._strategy.doAlgorithm(['a', 'b', 'c', 'd', 'e']);
            console.log(result.join(','));

            // ...
        }
    }

    /**
     * Клієнтський код вибирає конкретну стратегію і передає її в контекст. Клієнт
     * повинен знати про відмінності між стратегіями, щоб зробити правильний вибір.
     */
    const context = new Context(new StrategyA());
    console.log('Client: Strategy is set to normal sorting.');
    context.doSomeBusinessLogic();

    console.log('');

    console.log('Client: Strategy is set to reverse sorting.');
    context.strategy = new StrategyB();
    context.doSomeBusinessLogic();
}

/**
 * Приклад з життя
 *
 * Давайте розглянемо приклад реалізації патерну «Стратегія» з використанням класу BankAccount і стратегій
 * для різних валютних операцій.
 *
 * Припустимо, що у нас є клас BankAccount, який підтримує операції в різних валютах,
 * і ми хочемо використовувати стратегії для конвертації суми транзакції в потрібну валюту.
 */
{
    // перелік валют
    enum CurrencyTypeEnum {
        USD = 'USD',
        EUR = 'EUR',
        UAH = 'UAH',
    }

    // тип, що описує коєфіцієнт конвертації для валют
    type CurrencyRate = Record<CurrencyTypeEnum, number>;

    // інтрерфейс стратегії
    interface ICurrencyConversionStrategy {
        convert(amount: number, currency?: CurrencyTypeEnum): number;
    }

    class CurrentRateConversionStrategy implements ICurrencyConversionStrategy {
        constructor(private readonly exchangeRates: CurrencyRate) {}

        convert(amount: number, currency: CurrencyTypeEnum): number {
            const rate = this.exchangeRates[currency];

            if (!rate) throw new Error(`Exchange rate not available for currency: ${currency}`);

            return amount * rate;
        }
    }

    class FixedRateConversionStrategy implements ICurrencyConversionStrategy {
        constructor(private readonly fixedRate: number) {}

        convert(amount: number, currency?: CurrencyTypeEnum): number {
            return amount * this.fixedRate;
        }
    }

    interface IBankClient {
        readonly firstName: string;
        readonly lastName: string;
    }

    class BankClient implements IBankClient {
        constructor(
            private readonly _firstName: string,
            private readonly _lastName: string,
            private readonly _age: number,
            private _accountNumber: number | null = null,
        ) {}

        get accountNumber(): number {
            if (!this._accountNumber) throw new Error('New client');

            return this._accountNumber;
        }

        set accountNumber(value: number) {
            this._accountNumber = value;
        }

        get age(): number {
            return this._age;
        }

        get firstName(): string {
            return this._firstName;
        }

        get lastName(): string {
            return this._lastName;
        }
    }

    class BankAccount {
        private readonly number: number;
        private balance = 0;
        private _conversionStrategy: ICurrencyConversionStrategy;
        private _holderName!: string;

        constructor(
            client: BankClient,
            private readonly currency: string,
            conversionStrategy: ICurrencyConversionStrategy,
        ) {
            this._conversionStrategy = conversionStrategy; // встановити стратегію
            this.setHolderName(client);
            this.number = 12345678;
        }

        get balanceInfo(): string {
            return `${this.currency}${this.balance}`;
        }

        // сетер для зміни стратегії
        set conversionStrategy(strategy: ICurrencyConversionStrategy) {
            this._conversionStrategy = strategy;
        }

        get holderName(): string {
            return this._holderName;
        }

        private setHolderName({ firstName, lastName }: BankClient) {
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

        makeTransaction(amount: number, targetCurrency: CurrencyTypeEnum): void {
            const convertedAmount = this._conversionStrategy.convert(amount, targetCurrency);
            this.balance -= convertedAmount;

            console.log(
                `Transaction: ${amount} ${this.currency} => ${targetCurrency}, Converted Amount: ${convertedAmount} ${targetCurrency}, Balance: ${this.balance} ${targetCurrency}`,
            );
        }
    }

    const exchangeRates = {
        [CurrencyTypeEnum.USD]: 1.1,
        [CurrencyTypeEnum.EUR]: 0.9,
        [CurrencyTypeEnum.UAH]: 37,
    };

    const currentRateStrategy = new CurrentRateConversionStrategy(exchangeRates);
    const fixedRateStrategy = new FixedRateConversionStrategy(0.8); // Фіксований курс

    const accountWithCurrentRate = new BankAccount(
        new BankClient('Anna', 'Borisova', 30),
        CurrencyTypeEnum.USD,
        currentRateStrategy,
    );
    accountWithCurrentRate.makeTransaction(100, CurrencyTypeEnum.EUR);

    const accountWithFixedRate = new BankAccount(
        new BankClient('Anna', 'Borisova', 30),
        CurrencyTypeEnum.USD,
        fixedRateStrategy,
    );
    accountWithFixedRate.makeTransaction(100, CurrencyTypeEnum.UAH);

    /**
     * У цьому прикладі ми створили дві конкретні стратегії для конвертації валюти: CurrentRateConversionStrategy,
     * яка використовує поточні обмінні курси, і FixedRateConversionStrategy,
     * яка застосовує фіксований курс обміну.
     *
     * Потім ми використовували ці стратегії при створенні об'єктів BankAccount,
     * і кожна стратегія застосовується для конвертації суми транзакції в потрібну валюту при здійсненні операції.
     *
     * Таким чином, ми використовували патерн «Стратегія» для забезпечення гнучкості та різних варіантів конвертації
     * валюти для об'єктів BankAccount.
     */
}

/**
 * Переваги
 *
 * Паттерн «Стратегія» має безліч переваг, які роблять його дуже корисним і цінним у проектуванні ПЗ.
 * Ось деякі з головних переваг:
 *
 * Гнучкість і розширюваність.
 * «Стратегія» дає змогу легко додавати нові алгоритми без зміни клієнтського коду.
 * Це робить систему більш гнучкою і сприяє легкому розширенню функціональності.
 *
 * Повторне використання коду.
 * Кожна стратегія інкапсулюється в окремому класі, що дає змогу повторно використовувати
 * код різних алгоритмів у різних контекстах.
 * Це зменшує дублювання коду та сприяє його повторному використанню.
 *
 * Розподіл відповідальності.
 * «Стратегія» дає змогу розділити відповідальність за вибір і застосування алгоритмів між контекстом і стратегіями.
 * Це робить код чистішим і зрозумілішим, що покращує структурованість системи.
 *
 * Спрощення тестування.
 * Кожна стратегія може бути протестована незалежно, що спрощує тестування алгоритмів і підвищує надійність системи.
 *
 * Інкапсуляція та приховування деталей.
 * Кожна стратегія інкапсулює свою власну логіку та деталі реалізації алгоритму.
 * Це дає змогу приховати деталі від клієнтського коду і знижує рівень зв'язності.
 */

/**
 * Недоліки
 *
 * Хоча «Стратегія» має безліч переваг, також має деякі недоліки, які варто враховувати під час застосування:
 *
 * 1. Збільшення кількості класів.
 *    Використання патерну «Стратегія» призводить до збільшення кількості класів у системі
 *    через створення окремих класів для кожної стратегії.
 *    Це може ускладнити структуру системи та збільшити складність обслуговування коду.
 *
 * 2. Залежність від клієнта.
 *    Клієнтський код повинен знати про існування різних стратегій і бути здатним
 *    вибирати відповідну стратегію.
 *    Це може призвести до високої зв'язності між клієнтським кодом і стратегіями.
 *
 *
 * Незважаючи на перелічені недоліки, патерн «Стратегія» залишається потужним інструментом для управління алгоритмами
 * та поведінкою в програмних системах.
 *
 * Правильне застосування цього патерну дає змогу створювати гнучкий, розширюваний і легко підтримуваний код.
 *
 * Важливо аналізувати конкретні вимоги та особливості системи, щоб визначити,
 * наскільки підходить цей патерн для розв'язання конкретних завдань.
 */

/**
 * Паттерн «Спостерігач»
 *
 * Паттерн «Спостерігач» (Observer) — це поведінковий паттерн проєктування, що надає механізм для
 * сповіщення об'єктів про зміни стану в інших об'єктів.
 *
 * Також відомий як патерн «Видавець-передплатник» або «Подія-обробник».
 *
 * Він дає змогу створити залежність «один до багатьох» між об'єктами, де один об'єкт (видавець)
 * містить список залежних об'єктів (передплатників) і автоматично повідомляє їх про зміни.
 */

/**
 * Проблема
 *
 * Коли об'єкти мають взаємозалежність, і один об'єкт змінює свій стан,
 * інші об'єкти мають бути повідомлені про цю зміну.
 *
 * При цьому об'єкти можуть бути реалізовані різними класами, і вони не повинні тісно зв'язуватися між собою,
 * щоб уникнути порушення принципів SOLID і призвести до жорсткої залежності між компонентами системи.
 */

/**
 * Рішення
 *
 * «Спостерігач» надає механізм, що дає змогу розділити видавців (класи, що продукують зміни стану)
 * і передплатників (класи, що мають реагувати на зміни стану) через спільний інтерфейс.
 *
 * Видавці не залежать від конкретних передплатників, а передплатники не залежать від конкретних видавців.
 * Передплатники реєструються у видавцеві та отримують сповіщення про зміни через методи, визначені в інтерфейсі.
 */

/**
 * Структура
 *
 * Патерн складається з таких «частин»:
 *
 * Видавець.
 * Видавець володіє внутрішнім станом, зміну якого цікаво відстежувати передплатникам.
 * Видавець містить механізм підписки: список передплатників і методи підписки/відписки.
 * Коли внутрішній стан видавця змінюється, він сповіщає своїх передплатників.
 * Для цього видавець проходить за списком передплатників і викликає їхній метод оповіщення,
 * заданий у загальному інтерфейсі передплатників.
 *
 * Підписник.
 * Підписник визначає інтерфейс, яким користується видавець для надсилання сповіщення.
 * У більшості випадків для цього достатньо єдиного методу.
 *
 * Конкретні передплатники.
 * Виконують щось у відповідь на сповіщення, що надійшло від видавця.
 * Ці класи повинні слідувати загальному інтерфейсу передплатників,
 * щоб видавець не залежав від конкретних класів передплатників.
 * Після приходу сповіщення передплатнику потрібно отримати оновлений стан видавця.
 * Видавець може передати цей стан через параметри методу сповіщення.
 * Більш гнучкий варіант — передавати через параметри весь об'єкт видавця, щоб передплатник міг сам отримати необхідні дані.
 * Як варіант, передплатник може постійно зберігати посилання на об'єкт видавця, переданий йому в конструкторі.
 *
 * Клієнт.
 * Клієнт створює об'єкти видавців і передплатників, а потім реєструє передплатників на оновлення у видавцях.
 */

/**
 * Кроки реалізації
 *
 * Для реалізації патерну «Спостерігач», нам необхідно виконати такі кроки:
 *
 * 1. Розбийте вашу функціональність на дві частини: незалежне ядро та опціональні залежні частини.
 *    Незалежне ядро стане видавцем. Залежні частини стануть передплатниками.
 *
 * 2. Створіть інтерфейс передплатників. Зазвичай у ньому достатньо визначити єдиний метод сповіщення.
 *
 * 3. Створіть інтерфейс видавців і опишіть у ньому операції управління підпискою.
 *    Пам'ятайте, що видавець має працювати тільки із загальним інтерфейсом передплатників.
 *
 * 4. Вам потрібно вирішити, куди помістити код ведення підписки, адже він зазвичай буває однаковий для всіх типів видавців.
 *    Найочевидніший спосіб — винести цей код у проміжний абстрактний клас, від якого будуть успадковуватися всі видавці.
 *
 * 5. Створіть класи конкретних видавців. Реалізуйте їх так, щоб після кожної зміни стану вони надсилали сповіщення
 *    всім своїм передплатникам.
 *
 * 6. Реалізуйте метод сповіщення в конкретних передплатниках. Не забудьте передбачити параметри,
 *    через які видавець міг би надсилати якісь дані, пов'язані з подією, що відбулася.
 *    Можливий і інший варіант, коли передплатник, отримавши сповіщення, сам візьме з об'єкта видавця потрібні дані.
 *    Але в цьому разі ви будете змушені прив'язати клас передплатника до конкретного класу видавця.
 *
 * 7. Клієнт має створювати необхідну кількість об'єктів передплатників і підписувати їх у видавців.
 */

/**
 * Концептуальний приклад
 */
{
    // Інтерфейс видавця оголошує набір методів для управліннями передплатниками
    interface IObservable {
        // Приєднує передплатника до видавця
        attach(observer: IObserver): void;

        // Відєднує передплатника від видавця
        detach(observer: IObserver): void;

        // Повідомляє всіх передплатників про подію
        notify(): void;
    }

    // Інтерфейс передплатника оголошує метод повідомлення, який видавці
    // використовують для сповіщення своїх передплатників
    interface IObserver {
        // Отримати оновлення від видавця
        update(observable: IObservable): void;
    }

    abstract class Observable implements IObservable {
        // Список передплатників.
        // У реальному житті список передплатників може зберігатися в більш детальному вигляді
        //  (класифікується за типом події тощо)
        private readonly observers: IObserver[] = [];

        // Методи керування підпискою.
        attach(observer: IObserver): void {
            const isExist = this.observers.includes(observer);

            if (isExist) return console.log('Observable: Observer has been attached already.');

            this.observers.push(observer);
            console.log('Observable: Attached an observer.');
        }

        detach(observer: IObserver): void {
            const observerIndex = this.observers.indexOf(observer);

            if (observerIndex == -1) return console.log('Observable: Nonexistent observer.');

            this.observers.splice(observerIndex, 1);
            console.log('Observable: Detached an observer.');
        }

        // Запуск оновлення в кожному передплатнику.
        notify(): void {
            console.log('Observable: Notifying observers...');
            for (const observer of this.observers) {
                observer.update(this);
            }
        }
    }

    /**
     * Видавець володіє деяким важливим станом і сповіщає передплатників про його
     * зміни.
     */
    class ConcreteObservable extends Observable {
        // У цій змінній зберігається стан видавця, необхідний усім передплатникам
        private _state = 0;

        get state(): number {
            return this._state;
        }

        /**
         * Зазвичай логіка підписки - лише частина того, що робить видавець. Видавці
         * часто містять деяку важливу бізнес-логіку, яка запускає метод
         * повідомлення щоразу, коли має відбутися щось важливе (або після цього).
         */
        someBusinessLogic(): void {
            console.log("Observable: I'm doing something important.");
            this._state = Math.floor(Math.random() * (10 + 1));

            this.notify();
            console.log(`Observable: My state has just changed to: ${this.state}`);
        }
    }

    /**
     * Конкретні передплатники реагують на оновлення, випущені видавцем,
     * до якого вони прикріплені.
     */
    class ObserverA implements IObserver {
        update(observable: ConcreteObservable): void {
            if (observable.state < 3) {
                console.log('ConcreteObserverA: Reacted to the event.');
            }
        }
    }

    class ObserverB implements IObserver {
        update(observable: ConcreteObservable): void {
            if (observable.state === 0 || observable.state >= 2) {
                console.log('ConcreteObserverB: Reacted to the event.');
            }
        }
    }

    // Клієнтський код.
    const observable = new ConcreteObservable();

    const observer1 = new ObserverA();
    observable.attach(observer1);

    const observer2 = new ObserverB();
    observable.attach(observer2);

    observable.someBusinessLogic();
    observable.someBusinessLogic();

    observable.detach(observer2);

    observable.someBusinessLogic();
}

/**
 * Приклад з життя
 *
 * Створимо класи SMSNotification, EmailNotification і PushNotification,
 * які будуть передплатниками та стежитимуть за станом рахунку,
 * щоб надсилати повідомлення клієнту в разі зміни балансу.
 */
{
    interface IObservable {
        // Приєднує передплатника до видавця
        attach(observer: IObserver): void;

        // Відєднує передплатника від видавця
        detach(observer: IObserver): void;

        // Повідомляє всіх передплатників про подію
        notify(): void;
    }

    interface IObserver {
        // Отримати оновлення від видавця
        update(observable: IObservable): void;
    }

    abstract class Observable implements IObservable {
        private readonly observers: IObserver[] = [];

        attach(observer: IObserver): void {
            const isExist = this.observers.includes(observer);
            if (!isExist) this.observers.push(observer);
        }

        detach(observer: IObserver): void {
            const observerIndex = this.observers.indexOf(observer);
            if (observerIndex > -1) this.observers.splice(observerIndex, 1);
        }

        notify(): void {
            for (const observer of this.observers) {
                observer.update(this);
            }
        }
    }

    // перелік валют
    enum CurrencyTypeEnum {
        USD = 'USD',
        EUR = 'EUR',
        UAH = 'UAH',
    }

    // тип, що описує коєфіцієнт конвертації для валют
    type CurrencyRate = Record<CurrencyTypeEnum, number>;

    // інтрерфейс стратегії
    interface ICurrencyConversionStrategy {
        convert(amount: number, currency?: CurrencyTypeEnum): number;
    }

    class CurrentRateConversionStrategy implements ICurrencyConversionStrategy {
        constructor(private readonly exchangeRates: CurrencyRate) {}

        convert(amount: number, currency: CurrencyTypeEnum): number {
            const rate = this.exchangeRates[currency];

            if (!rate) throw new Error(`Exchange rate not available for currency: ${currency}`);

            return amount * rate;
        }
    }

    class FixedRateConversionStrategy implements ICurrencyConversionStrategy {
        constructor(private readonly fixedRate: number) {}

        convert(amount: number, currency?: CurrencyTypeEnum): number {
            return amount * this.fixedRate;
        }
    }

    interface IBankClient {
        readonly firstName: string;
        readonly lastName: string;
    }

    class BankClient implements IBankClient {
        constructor(
            private readonly _firstName: string,
            private readonly _lastName: string,
            private readonly _age: number,
            private _accountNumber: number | null = null,
        ) {}

        get accountNumber(): number {
            if (!this._accountNumber) throw new Error('New client');

            return this._accountNumber;
        }

        set accountNumber(value: number) {
            this._accountNumber = value;
        }

        get age(): number {
            return this._age;
        }

        get firstName(): string {
            return this._firstName;
        }

        get lastName(): string {
            return this._lastName;
        }
    }

    // extends Observable
    class BankAccount extends Observable {
        private readonly number: number;
        private balance = 0;
        private _conversionStrategy: ICurrencyConversionStrategy;
        private _holderName!: string;

        constructor(
            client: BankClient,
            private readonly currency: string,
            conversionStrategy: ICurrencyConversionStrategy,
        ) {
            super(); // <-- call super
            this._conversionStrategy = conversionStrategy; // встановити стратегію
            this.setHolderName(client);
            this.number = 12345678;
        }

        get balanceInfo(): string {
            return `${this.currency}${this.balance}`;
        }

        // сетер для зміни стратегії
        set conversionStrategy(strategy: ICurrencyConversionStrategy) {
            this._conversionStrategy = strategy;
        }

        get holderName(): string {
            return this._holderName;
        }

        private setHolderName({ firstName, lastName }: BankClient) {
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

        makeTransaction(amount: number, targetCurrency: CurrencyTypeEnum): void {
            const convertedAmount = this._conversionStrategy.convert(amount, targetCurrency);
            this.balance -= convertedAmount;

            this.notify(); // <-- повідомити всіх спостерігачів

            console.log(
                `Transaction: ${amount} ${this.currency} => ${targetCurrency}, Converted Amount: ${convertedAmount} ${targetCurrency}, Balance: ${this.balance} ${targetCurrency}`,
            );
        }
    }

    // Клас спостерігача для надсилання SMS-повідомлень про баланс
    class SMSNotification implements IObserver {
        update(account: BankAccount): void {
            console.log(`SMS notification: Your account balance has changed. Current balance: ${account.balanceInfo}`);
            // Далі відправити SMS
        }
    }

    // Клас спостерігача для надсилання email-повідомлень про баланс
    class EmailNotification implements IObserver {
        update(account: BankAccount): void {
            console.log(
                `Email notification: Your account balance has changed. Current balance: ${account.balanceInfo}`,
            );
            // Далі відправити email
        }
    }

    // Клас спостерігача для надсилання push-повідомлень про баланс
    class PushNotification implements IObserver {
        update(account: BankAccount): void {
            console.log(`Push notification: Your account balance has changed. Current balance: ${account.balanceInfo}`);
            // Далі відправити push-повідомлення
        }
    }

    // Клієнтський код
    const smsNotification = new SMSNotification();
    const emailNotification = new EmailNotification();
    const pushNotification = new PushNotification();

    const exchangeRates = {
        [CurrencyTypeEnum.USD]: 1.1,
        [CurrencyTypeEnum.EUR]: 0.9,
        [CurrencyTypeEnum.UAH]: 37,
    };

    const currentRateStrategy = new CurrentRateConversionStrategy(exchangeRates);
    const fixedRateStrategy = new FixedRateConversionStrategy(0.8); // Фіксований курс

    const accountWithCurrentRate = new BankAccount(
        new BankClient('Anna', 'Borisova', 30),
        CurrencyTypeEnum.USD,
        currentRateStrategy,
    );

    // додати спостерігачів
    accountWithCurrentRate.attach(emailNotification);
    accountWithCurrentRate.makeTransaction(100, CurrencyTypeEnum.EUR);

    const accountWithFixedRate = new BankAccount(
        new BankClient('Anna', 'Borisova', 30),
        CurrencyTypeEnum.USD,
        fixedRateStrategy,
    );
    // додати спостерігачів
    accountWithFixedRate.attach(smsNotification);
    accountWithFixedRate.attach(pushNotification);
    accountWithFixedRate.makeTransaction(100, CurrencyTypeEnum.UAH);
}

/**
 * Переваги
 *
 * Паттерн «Спостерігач» має безліч переваг, які роблять його дуже корисним під час проектування програм.
 * Ось деякі з головних переваг патерну «Спостерігач»:
 *
 * Розширюваність.
 * «Спостерігач» дає змогу легко додавати нових спостерігачів без зміни коду видавця та інших спостерігачів.
 * Це робить патерн гнучким і легко розширюваним.
 *
 * Ослаблення зв'язків.
 * Видавці та спостерігачі взаємодіють через абстрактний інтерфейс, що зменшує зв'язність і підвищує модульність коду.
 * Видавці не залежать від конкретних спостерігачів, і спостерігачі не залежать від конкретних видавців,
 * що робить систему гнучкішою і підтримуванішою.
 *
 * Централізація управління подіями.
 * Видавець бере на себе відповідальність за повідомлення всіх спостерігачів, що робить код більш структурованим
 * і спрощує управління подіями. Спостерігачі можуть легко реєструватися і скасовувати свою підписку на події.
 *
 * Підтримка принципу відкритості/закритості.
 * Додавання нових спостерігачів не вимагає зміни коду видавця. Це відповідає принципу відкритості/закритості,
 * який дає змогу розширювати функціональність без зміни наявного коду.
 *
 * Реалізація нотифікацій і подій.
 * Паттерн «Спостерігач» є основою для реалізації нотифікацій і подій у багатьох мовах програмування та бібліотеках.
 *
 * Простота підтримки асинхронних подій.
 * «Спостерігач» добре підходить для опрацювання асинхронних подій і дає змогу легко організувати опрацювання подій
 * і сповіщення про події в різних частинах системи.
 */

/**
 * Недоліки
 *
 * Крім своїх переваг, патерн «Спостерігач» також має деякі недоліки й обмеження, про які варто пам'ятати:
 *
 * Порядок сповіщень.
 * Порядок, у якому спостерігачі отримують сповіщення, не завжди гарантований і може залежати від реалізації патерну.
 * Це може бути проблемою, якщо порядок сповіщення має значення.
 *
 * Витоку пам'яті.
 * Якщо спостерігачі неправильно видаляються зі списку спостерігачів, може виникнути витік пам'яті,
 * коли об'єкти, які більше не потрібні, продовжують утримуватися видавцем.
 *
 * Низька зв'язність між змінами і спостерігачами.
 * Коли видавець випускає повідомлення про зміни, спостерігачі можуть реагувати на них у різні способи.
 * Це може ускладнити підтримку і супровід коду.
 *
 *
 * Загалом, патерн «Спостерігач» є потужним інструментом для організації взаємодії об'єктів у програмних системах.
 * Він сприяє створенню гнучкого, розширюваного і легко підтримуваного коду, що робить його одним із важливих патернів програмування.
 * Необхідно ретельно аналізувати вимоги системи та контекст використання патерну, щоб визначити,
 * наскільки він підходить для конкретної ситуації та які заходи вжити для усунення можливих недоліків.
 * У деяких випадках, простіші альтернативи, як-от використання подій або колбеків,
 * можуть бути більш придатними рішеннями для забезпечення взаємодії між об'єктами.
 */
