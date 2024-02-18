// 1. Обявіть інтерфейс Book, який включає такі поля:
enum Category {
    JavaScript = 'Javacript',
    CSS = 'CSS',
    HTML = 'HTML',
    TypeScript = 'TypeScript',
    Angular = 'Angular',
}
interface IBook {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;
    markDamaged?: DamageLogger;
}
// 2. Створіть функцію printBook(), яка повинна приймати один параметр - книгу та виводити у консоль фразу book.title + by + book.author. Використайте інтерфейс Book для типу параметра.

const printBook = (book: IBook) => {
    console.log(`${book.title} by ${book.author}`);
};

// 3. Обявіть змінну myBook і присвойте їй наступний об'єкт

const myBook: IBook = {
    id: 5,

    title: 'Colors, Backgrounds, and Gradients',

    author: 'Eric A. Meyer',

    available: true,

    category: Category.CSS,

    pages: 200,
    markDamaged: reason => {
        console.log(`Damaged: ${reason}.`);
    },
};

printBook(myBook);

// 4. Додайте до інтерфейсу Book властивість pages: number. Ви отримаєте помилку у функції getAllBooks(). Щоб помилка не виникала, зробіть властивість необов'язковою.
// 5. Вкажіть явно для змінної myBook тип Book. Ви знову отримаєте помилку. Видаліть властивості year, copies. Додайте властивість pages: 200.
// 6. Додайте в інтерфейс Book необов'язкову властивість markDamaged, яка є методом. Метод повинен приймати рядковий параметр reason і нічого не повертати. Додайте цей метод до myBook. Метод повинен виводити рядок `Damaged: ${reason}`. Викличте цей метод та передайте рядок 'missing back cover'.

// optional chaining didnt work , maybe due to tsconfig settings so did with if
if (myBook.markDamaged) {
    myBook.markDamaged('missing back cover');
}
// 7. Об’явіть інтерфейс DamageLogger, який описуватиме тип функції, яка повинна приймати один рядковий параметр і нічого не повертати.
interface DamageLogger {
    (param: string): void;
}
// 8. Внесіть зміни до інтерфейсу Book: використайте інтерфейс DamageLogger для поля markDamaged.

// 9. Об’явіть інтерфейс Person, який містить дві рядкові властивості – name і email.
interface Person {
    name: string;
    email: string;
}

// 10. Об’явіть інтерфейс Author на основі інтерфейсу Person, який розширює вказаний інтерфейс числовою властивістю numBooksPublished.

interface Author extends Person {
    numBooksPublished: number;
}

// 11. Об’явіть інтерфейс Librarian на основі інтерфейсу Person, який розширює цей інтерфейс двома властивостями:

interface Librarian extends Person {
    department: string;
    assistCustomer: (custName: string, bookTitle: string) => void;
}
