// showHello('greeting', 'TypeScript');

import {
    Ingredients,
    Manager,
    PizzaType,
    Sauses,
    Shape,
    Size,
    buildCustomPizza,
    buildPizza,
} from './builderPattern/builder';
import { Circle, Rectangle, Square, SquareCalculate, Squares, Triangle } from './classes';
import { Debounced, Memoization } from './decorators';
import { player, player2 } from './facade';
import { NewMagazine, NewShelf2, Shelf, callback, data2, fetchData, purge } from './generics';
import { checkObj, checkSignature } from './indexSignatures';
import { Area, Group, Level, School, Student } from './lesson03.3_HomeTask';
import { user } from './mappedTypes';
import { AdvancedNote, BasicNote, Note, NoteList, TodoList } from './oop';
import { ATB, CarsObserver, FoodObserver, Volkswagen, payment } from './patterns';
import {
    BookType,
    MessageSystem,
    ShapesEnum,
    TextMessage,
    UserOfMessageSystem,
    basefigure,
    circle2,
    circle3,
    library,
    square2,
    toScaleFigures,
    user5,
} from './solid';
import { filmsList, findFilmByQuery } from './typesInfer';
// function showHello(divName: string, name: string) {
//     const elt = document.getElementById(divName);
//     elt!.innerText = `Hello from ${name}`;
// }

// 1. Реалізуйте функцію getAllBooks(), яка повертає колекцію книжок. Об’явіть цю колекцію всередині функції.

function getAllBooks(): Object[] {
    const books = [
        {
            id: 1,
            title: 'Refactoring JavaScript',
            author: 'Evan Burchard',
            available: true,
            category: Category.JavaScript,
        },
        {
            id: 2,
            title: 'JavaScript Testing',
            author: 'Liang Yuxian Eugene',
            available: false,
            category: Category.JavaScript,
        },
        { id: 3, title: 'CSS Secrets', author: 'Lea Verou', available: true, category: Category.CSS },
        {
            id: 4,
            title: 'Mastering JavaScript Object-Oriented Programming',
            author: 'Andrea Chiarelli',
            available: true,
            category: Category.TypeScript,
        },
    ];
    return books;
}

// 2. Реалізуйте функцію logFirstAvailable(), яка приймає масив книг як параметр і виводить у консоль:
/* ·    кількість книг у масиві

·    назву першої доступної книги */
interface IBook {
    id: number;
    title: string;
    author: string;
    available: boolean;
}
const books = [
    { id: 1, title: 'Refactoring JavaScript', author: 'Evan Burchard', available: true },
    { id: 2, title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available: false },
    { id: 3, title: 'CSS Secrets', author: 'Lea Verou', available: true },
    {
        id: 4,
        title: 'Mastering JavaScript Object-Oriented Programming',
        author: 'Andrea Chiarelli',
        available: true,
    },
];
const logFirstAvailable = (books: Array<IBook>): void => {
    const firstAvailable = books.find(book => book.available);
    console.log(firstAvailable?.title, books.length);
};
logFirstAvailable(books);

// 3. Об’явіть enum Category для зберігання наступних категорій книг: JavaScript, CSS, HTML, TypeScript, Angular.
// Додайте категорію до об'єктів у функції getAllBooks().
enum Category {
    JavaScript = 'Javacript',
    CSS = 'CSS',
    HTML = 'HTML',
    TypeScript = 'TypeScript',
    Angular = 'Angular',
    Software = 'Software',
}
interface IBookNew {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
}

// 4.Реалізуйте функцію getBookTitlesByCategory(), яка на вхід повинна отримувати категорію та повертати масив найменувань книг, що належать зазначеній категорії.

const booksEnum = [
    {
        id: 1,
        title: 'Refactoring JavaScript',
        author: 'Evan Burchard',
        available: true,
        category: Category.JavaScript,
    },
    {
        id: 2,
        title: 'JavaScript Testing',
        author: 'Liang Yuxian Eugene',
        available: false,
        category: Category.JavaScript,
    },
    { id: 3, title: 'CSS Secrets', author: 'Lea Verou', available: true, category: Category.CSS },
    {
        id: 4,
        title: 'Mastering JavaScript Object-Oriented Programming',
        author: 'Andrea Chiarelli',
        available: true,
        category: Category.TypeScript,
    },
];
const getBookTitlesByCategory = (category: Category, array: IBookNew[]): string[] => {
    return array.filter(book => book.category === category).map(book => book.title);
};

getBookTitlesByCategory(Category.JavaScript, booksEnum);

// 5. Реалізуйте функцію logBookTitles(), яка повинна приймати масив рядків та виводити його в консоль. Викличте функції getBookTitlesByCategory() та logBookTitles().

const logBookTitles = (array: string[]): void => {
    console.log(array);
};

logBookTitles(getBookTitlesByCategory(Category.JavaScript, booksEnum));

// 6. Реалізуйте функцію getBookAuthorByIndex(), яка повинна приймати index книжки у масиві та повертати пару: назву книжки + автор. Використовуйте tuple для типу, що повертається. Викличте цю функцію.

// Внесіть зміни до типу, що повертається функцією getBookAuthorByIndex() – додайте мітки: title, author для типу tuple.

const getBookAuthorByIndex = (indexBook: number): [title: string, author: string] => {
    const filteredBook = books
        .filter((_, index) => index === indexBook)
        .map(book => {
            return [book.title, book.author];
        });
    return filteredBook.flat() as [title: string, author: string];
};

console.log(getBookAuthorByIndex(2));

// 7. Реалізуйте функцію calcTotalPages(), яка повинна підраховувати кількість сторінок книг у трьох бібліотеках міста, використовуючи такі дані:
type IArray = {
    lib: string;
    books: number;
    avgPagesPerBook: number;
};
const data = [
    { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },

    { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },

    { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 },
];
const calcTotalPages = (array: IArray[]): bigint => {
    let result: bigint = 0n;
    array.forEach(item => (result += BigInt(item.books) * BigInt(item.avgPagesPerBook)));
    return result;
};

console.log(calcTotalPages(data));

///

const school: School = new School();
console.log(school.areas);
school.addArea('math');
console.log(school.areas);
school.addArea('physics');
school.removeArea('math');
console.log(school.areas);
school.addLecturer({
    name: 'Joseph',
    surname: 'Besos',
    position: 'CEO',
    company: 'Google',
    experience: '15 years',
    courses: 'None',
    contacts: 'mail',
});
console.log(school.lecturers);
school.removeLecturer('Joseph');
console.log(school.lecturers);

///

const area: Area = new Area('Astronomy');
console.log(area.name);
console.log(area.levels);
area.addLevel('Proficiency');
console.log(area.levels);
area.removeLevel('Proficiency');
console.log(area.levels);

///

const level: Level = new Level('god', 'nothingToSay');
console.log(level.name);
console.log(level.description);
console.log(level.groups);
level.addGroup('medium');
console.log(level.groups);
level.removeGroup('Medium');
console.log(level.groups);

///

const group: Group = new Group('IT', 'senior');
group.area = 'frond-end';
group.status = true;
console.log(group);
group.addStudent('Mike');
group.addStudent('Anna');
console.log(group.studens);
console.log(group);
group.removeStudent('Anna');

///

const student: Student = new Student('Vlad', 'Ivanov', 2003);
student.grade = { react: 5 };
console.log(student);
console.log(student.getPerformanceRating());
student.visit = { react: true };
console.log(student.getPerformanceRating());

console.log('hello world');

// Classes HW
const circle: Circle = new Circle(20, 'Circle', 'Red');
const square: Square = new Square(15, 'Square', 'Blue');
const rectangle: Rectangle = new Rectangle(10, 15, 'Rectangle', 'Yellow');
const triangle: Triangle = new Triangle(20, 15, 'Triangle', 'Black');

const circleSquareCalc = SquareCalculate.calculateArea(Squares.Circle, circle.radius);
const rectangleSquareCalc = SquareCalculate.calculateArea(Squares.Rectangle, rectangle.firstSide, rectangle.secondSide);
const squareCalc = SquareCalculate.calculateArea(Squares.Square, square.side);
const triangleSquareCalc = SquareCalculate.calculateArea(Squares.Triangle, triangle.side, triangle.height);

console.log(circleSquareCalc);
console.log(rectangleSquareCalc);
console.log(squareCalc);
console.log(triangleSquareCalc);
// console.log(circle.calculateArea(Squares.Circle, circle.radius));
// console.log(square.calculateArea(Squares.Square, square.side));
// console.log(rectangle.calculateArea(Squares.Rectangle, rectangle.firstSide, rectangle.secondSide));
// console.log(triangle.calculateArea(Squares.Triangle, triangle.side, triangle.height));
rectangle.print();
square.print();
// console.log(circle.name);

console.log(checkSignature(checkObj));

// function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
//     return o.reduce((res, key) => {
//         res[key] = key;
//         return res;
//     }, Object.create(null));
// }

// const Direction = strEnum(['North', 'South', 'East', 'West']);

// console.log(Direction);

// type IDirection = keyof typeof Direction;

// let sample: IDirection;

// sample = Direction.North; // Okay
// sample = 'North'; // Okay
// sample = 'AnythingElse'; // ERROr

let a = Array(3);
let b = [undefined, undefined, undefined];
let c: any[] = [];
c.length = 3;
console.log(a);
console.log(b);
console.log(c);
console.log(a.join('-'));
console.log(b.join('-'));
const newArr = a.map((v, i) => i);
console.log(newArr);
const newArr2 = b.map((v, i) => i);
console.log(newArr2);

const fakeJoin = (arr: any[], connector: string): string => {
    let str = '';
    for (let i = 0; i < arr.length; i += 1) {
        if (i > 0) {
            str += connector;
        }
        if (arr[i] !== undefined) {
            str += arr[i];
        }
    }
    return str;
};

console.log(fakeJoin(a, '-'));

const inventory = [
    { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },

    { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },

    { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },

    { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software },
];

console.log(purge(inventory));
console.log(purge([1, 2, 3, 4, 5]));

// const bookShelf = new Shelf();
// inventory.forEach(book => bookShelf.add(book));
// console.log(bookShelf.getFirst());

fetchData('https://jsonplaceholder.typicode.com/users', callback<any>);

console.log(data2);

// const newMagazine = new NewShelf2();

// newMagazine.add({ id: 1, title: 'World', author: 'Vlad', available: true, category: 'Software' });
// console.log(filmsList.applySearchValue('year'));
// console.log(filmsList);
// console.log(filmsList.applyFiltersValue([{ filter: 4, filterTo: 9, type: 'range' }]));
// console.log(filmsList);
// console.log(filmsList.applyFiltersValue([{ filter: 6, filterTo: 9, type: 'range' }]));

// const memoize = new Memoization();
// console.log(memoize.multipleByTwo(5));
// console.log(memoize.multipleByTwo(5));
// console.log(memoize.multipleByTwo(10));
// console.log(memoize.multipleByTwo(10));

// const debounce = new Debounced();
// debounce.logAfterPause();
// debounce.logAfterPause();
// debounce.readyToStart();

// /* eslint no-underscore-dangle: 0 */
// const basicNote = new BasicNote('OOP', ['This is all about OOP']);
// const advancedNote = new AdvancedNote('SOLID', ['This is all about SOLID']);

// const notesList = new NoteList();
// notesList.addNewNote(basicNote);
// notesList.addNewNote(advancedNote);
// console.log(notesList.getFullInfo(basicNote._id));
// // notesList.isCompleted(basicNote._id);
// notesList.updateNote(advancedNote._id, ['Updated SOLID pripciples']);
// notesList.getAllNotes();
// notesList.removeSomeNote(basicNote._id);
// notesList.getAllNotes();
// console.log(notesList.getInfoAboutNotes());

// const todoList = new TodoList();
// const note1 = new Note('ООП', 'Все про ООП', 'default');
// const note2 = new Note('SOLID', 'Все про Solid', 'completed');
// const note3 = new Note('Jest', 'Все про Jest', 'default');
// todoList.addNote(note1);
// todoList.addNote(note3);
// todoList.addNote(note2);
// console.log(todoList.getNoteById(note1.id));
// todoList.setNoteStatus(note1.id, 'confirmationRequired');
// todoList.editNoteContent(note1.id, 'All about OOP');
// console.log(todoList.getNoteById(note1.id));
// console.log(todoList.getAllNotes());
// console.log(todoList.searchNotes('ООП'));
// console.log(todoList.sortNotesByCreatedDate());

// console.log(user5);
// console.log(library.visitor);

circle2.drawing();

// toScaleFigures(basefigure, 11);
// toScaleFigures(square2, 1.3);
// toScaleFigures(circle3, 1.5);

const newMessage = new TextMessage('Hello World');
const messageSystem = new MessageSystem();
const userMessage = new UserOfMessageSystem('Igor');
console.log(userMessage.sendMessage(newMessage, messageSystem));

// player.addAudio('Wind of Change');
// player.addAudio('Not Afraid');
// player.addAudio('Beautiful');
// player.addVideo('something');
// player.stop();
// player.next();
// player.next();
// player.next();
// player.prev();
// player.prev();
// player.prev();
// player.prev();

// payment.executePayment(10000);

const pizza = buildCustomPizza(Size.LARGE, Shape.SQUARE, Sauses.WhitSause, Ingredients.Cheese, Ingredients.Chicken);
console.log(pizza.toString());
const chickenPizza = buildPizza(Size.SMALL, Shape.CIRCLE, PizzaType.Chicken);
console.log(chickenPizza.toString());
const pepperoniPizza = buildPizza(Size.LARGE, Shape.SQUARE, PizzaType.Pepperoni);
console.log(pepperoniPizza.toString());
