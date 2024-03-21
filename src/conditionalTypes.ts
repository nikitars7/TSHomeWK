// 1. Об'явіть аліас типу BookRequiredFields, використовуючи інтерфейс Book та утиліту Required.

export enum Category {
    Software = 'Software',
}
export type Book = {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
};

type BookRequiredFields = Required<Book>;

// 2. Об'явіть змінну bookRequiredFields типу BookRequiredFields та присвойте їй відповідний об'єкт.

const bookRequiredFields: BookRequiredFields = {
    id: 1,
    title: 'U dont know JS',
    author: 'Kyle Simpson',
    available: true,
    category: Category.Software,
};

// 3. Об'явіть аліас типу UpdatedBook, використовуючи інтерфейс Book та утиліту Partial.

type UpdatedBook = Partial<Book>;

// 4. Об'явіть змінну updatedBook типу UpdatedBook і присвойте їй відповідний об'єкт.

const updatedBook: UpdatedBook = {
    id: 2,
    title: 'unknown',
    available: false,
};

// ! 5. Об'явіть аліас типу AuthorWoEmail, використовуючи інтерфейс Author та утиліту Omit.
interface Author {
    name: string;
    email: string;
}
type AuthorNoEmail<T> = Omit<T, 'email'>;
const author: AuthorNoEmail<Author> = { name: 'Vasya' };

// 6.Об'явіть аліас СreateCustomerFunctionType для функціонального типу функції createCustomer(). Функція приймає рядок і число і повертає їх конкатенацію.

const createCustomer = (...args: [string, number]): string => {
    const [param1, param2] = args;
    return param1 + param2;
};

type createCustomerFunctionType = typeof createCustomer;
// 7. Об'явіть змінну params, використовуючи аліас типу СreateCustomerFunctionType і утиліту Parameters, викличте функцію createCustomer(), передавши змінну params.

const params: Parameters<createCustomerFunctionType> = ['Oleg', 35];

const functionResult = createCustomer(...params);

// 8. Об'явіть аліас fn для функціонального типу функції, яка приймає три параметри з типами string, number, boolean і повертає тип symbol.

type fn = (param1: string, param2: number, param3: boolean) => symbol;

// 9.  Об'явіть аліаси типів Param1<T>, Param2<T>, Param3<T>, які повертають тип першого, другого та третього параметрів функції відповідно.

type Param1<T> = T extends (param1: infer P1, ...args: [number, boolean]) => symbol ? P1 : undefined;

type Param2<T> = T extends (param1: string, param2: infer P2, param3: boolean) => symbol ? P2 : undefined;

type Param3<T> = T extends (param1: string, param2: number, param3: infer P3) => symbol ? P3 : undefined;

// 10. Об'явіть аліаси P1, P2, P3 та отримайте типи першого, другого та третього параметрів типу fn.

type P1 = Param1<fn>;
type P2 = Param2<fn>;
type P3 = Param3<fn>;

// 11.
/*
Створіть утиліти RequiredProps<T> та OptionalProps<T>, які повертають union тип required та optional властивостей об'єкта. 
Використовуйте mapped type для перебору ключів T та conditional type для трансформації значень ключів типу T.
 Додайте загальне обмеження для T розширивши його від типу object у RequiredProps та OptionalProps.

*/
