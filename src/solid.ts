/**
 Завдання 1: Принцип єдиної відповідальності (SRP)
Створіть невелику програму, яка моделює бібліотечну систему.
Реалізуйте класи для Книги, Бібліотеки та Користувача.
Переконайтеся, що кожен клас дотримується принципу єдиної відповідальності.
Наприклад, клас Книга повинен бути відповідальним за книжкові деталі,
Бібліотека за бібліотечні операції, а Користувач за користувальницькі дані.
 */
/* eslint no-underscore-dangle: 0 */
interface IBookLibrary {
    title: string;
    type: BookType;
    releaseYear: number;
}
export enum BookType {
    HISTORICAL = 'Historical',
    FANTASY = 'Fantasy',
    SCIENTIFIC = 'scientific',
}

class Book {
    private books: IBookLibrary[] = [];

    addBook(book: IBookLibrary): void {
        this.books = [...this.books, book];
    }
    removeBook(title: string): void {
        this.books = this.books.filter(book => book.title.toLowerCase() !== title.toLowerCase());
    }
    showAllBooks(): IBookLibrary[] {
        return this.books;
    }
}
type UserName = {
    firstName: string;
    lastName: string;
};

class User {
    private preferredBooks!: Book;
    private readonly fullname: UserName;
    constructor(fullName: UserName) {
        this.fullname = fullName;
    }

    createPreferredBooks(preferredBooks: Book): void {
        this.preferredBooks = preferredBooks;
    }
    addPreferredBook(book: IBookLibrary): void {
        if (!this.preferredBooks) {
            throw new Error('Error occured , maybe you didnt create a list of preferred Books');
        } else {
            this.preferredBooks?.addBook(book);
        }
    }
    removePreferredBook(title: string): void {
        if (!this.preferredBooks) {
            throw new Error('Error occured , maybe you didnt create a list of preferred Books');
        } else {
            this.preferredBooks?.removeBook(title);
        }
    }
}

class Library {
    private libraryVisitor!: User;
    constructor(private readonly name: string, private readonly location: string) {}
    createLibraryVisitor(user: User) {
        this.libraryVisitor = user;
    }
    get visitor(): User {
        if (this.libraryVisitor) return this.libraryVisitor;
        else {
            throw new Error('No one user exists');
        }
    }
}
const books = new Book();
export const user5 = new User({ firstName: 'Oleg', lastName: 'Ivanov' });
user5.createPreferredBooks(books);
user5.addPreferredBook({ title: 'You dont know JS', releaseYear: 2021, type: BookType.SCIENTIFIC });
export const library = new Library('Library #11', 'Odessa');
library.createLibraryVisitor(user5);

/*
Завдання 2: Принцип відкритості/закритості (OCP)
Розробіть простий графічний редактор, який дозволяє користувачам малювати різні форми
(наприклад, кола, прямокутники, трикутники).
Застосуйте принцип відкритості/закритості для зручного розширення для додавання нових форм
без змінення існуючого коду.
Покажіть приклад додавання нової форми (наприклад, еліпса) без модифікації основної
функціональності малювання.
*/

export enum ShapesEnum {
    Circle = 'Circle',
    Rectangle = 'Rectangle',
    Square = 'Square',
}
class Draw {
    draw(shape: ShapesEnum): void {
        console.log(`Drawing a ${shape}`);
    }
}
class Shape {
    private readonly toDraw: Draw;
    constructor(private readonly _shapeName: string, private readonly _type: ShapesEnum.Circle) {
        this.toDraw = new Draw();
    }
    get type(): ShapesEnum {
        return this._type;
    }
    get shapeName(): string {
        return this._shapeName;
    }
    drawing(): void {
        this.toDraw.draw(this._type);
    }
}

class Circle extends Shape {}

class Rectangle extends Shape {}

class Square extends Shape {}

export const circle2 = new Circle('circleFigure', ShapesEnum.Circle);
circle2.drawing();

/*
Завдання 3: Принцип підстановки Лісков (LSP)
Створіть ієрархію геометричних фігур з класами, такими як Квадрат, Коло та Трикутник.
Застосуйте принцип підстановки Ліскова, переконавшись, що об'єкти базового класу
(наприклад, Фігура) можуть бути замінені об'єктами похідних класів без впливу на коректність
програми. Покажіть приклад, де різні форми можуть використовуватися взаємозамінно.
 */
function WithScale<T, R>(
    originalMethod: (value: number) => R,
    context: ClassMethodDecoratorContext<T, (value: number) => R>,
) {
    if (context.kind !== 'method') throw new Error('Method-only decorator');
    function replaceWithValue(this: T, value: number): R {
        if (value < 0) {
            throw new Error('Value can not be less than 0');
        } else if (value > 10) {
            throw new Error('Value can not be more than 10');
        }
        return originalMethod.apply(this, [value]);
    }
    return replaceWithValue;
}

class Figure {
    constructor(private readonly _name: string, private _color: string, private _size: number) {}
    get name(): string {
        return this._name;
    }
    get size(): number {
        return this._size;
    }
    get color(): string {
        return this._color;
    }
    set color(color: string) {
        this._color = color;
    }
    @WithScale
    scale(size: number) {
        this._size *= size;
    }
}

class Square2 extends Figure {}

class Circle2 extends Figure {}

class Triangle2 extends Figure {}

export const basefigure = new Figure('Cube', 'Black', 999);
export const square2 = new Square2('Square', 'Red', 50);
export const circle3 = new Square2('Circle', 'Blue', 100);

export function toScaleFigures(figure: Figure, scale: number) {
    figure.scale(scale);
}

toScaleFigures(basefigure, 1.1);
toScaleFigures(square2, 1.3);
toScaleFigures(circle3, 1.5);
// toScaleFigures(basefigure, 11); error

/*
Завдання 4: Принцип розділення інтерфейсу (ISP)
Спроектуйте інтерфейс для Системи Управління Завданнями з методами, такими як createTask(),
assignTask() та completeTask().
Реалізуйте класи для різних типів користувачів (наприклад, Розробник, Менеджер).
Застосуйте принцип розділення інтерфейсу, переконавшись, що кожен клас реалізує лише ті методи,
які стосуються його ролі.

*/
enum Positions {
    DEV = 'dev',
    MANAGER = 'manager',
}
interface TaskManagerSystem {
    createTask(task: string): void;
}
interface IManager {
    assignTask(): void;
}
interface IDev {
    completeTask(): void;
}

abstract class TMS implements TaskManagerSystem {
    private tasks: string[] = [];
    createTask(task: string): void {
        this.tasks = [...this.tasks, task];
    }
    getAllTasks(): string[] {
        return this.tasks;
    }
}

class CompanyEmployee extends TMS {
    constructor(private readonly position: Positions) {
        super();
    }
}

class Manager extends CompanyEmployee implements IManager {
    assignTask(): void {}
}

class Developer extends CompanyEmployee implements IDev {
    completeTask(): void {}
}

const manager = new Manager(Positions.MANAGER);
manager.createTask('SOLID');
manager.assignTask();

const dev = new Developer(Positions.DEV);
dev.completeTask();

const processManager = (employee: TaskManagerSystem & IManager) => {
    employee.assignTask();
};
const processDevs = (employee: TaskManagerSystem & IDev) => {
    employee.completeTask();
};
processManager(manager);
processDevs(dev);
// processManagers(dev) // an error
// processDevs(manager); // err

/*
Завдання 5: Принцип інверсії залежностей (DIP)
Розробіть систему обміну повідомленнями, де високорівневі модулі відправляють повідомлення
низькорівневим модулям. Застосуйте принцип інверсії залежностей за допомогою введення залежностей
або абстракцій, щоб високорівневі модулі залежали від абстракцій, а не від конкретних реалізацій.
Продемонструйте, що зміна реалізації обміну повідомленнями не впливає на високорівневі модулі.
*/

interface IMessage {
    sendMessage(message: string): void;
}
type MessageType = TextMessage | AudioMessage | VideoMessage;

interface IUser {
    get userName(): string;
    sendMessage(message: MessageType, messageSystem: MessageSystem): void;
}
export class TextMessage {
    constructor(private readonly _text: string) {}
    get text(): string {
        return this._text;
    }
}
class VideoMessage {
    constructor(private readonly _video: string) {}
    get video(): string {
        return this._video;
    }
}
class AudioMessage {
    constructor(private readonly _audio: string) {}
    get audio(): string {
        return this._audio;
    }
}
export class MessageSystem implements IMessage {
    sendMessage(message: string): void {
        console.log(`${message} message was sent to the client`);
    }
}

export class UserOfMessageSystem implements IUser {
    constructor(private readonly name: string) {}
    get userName(): string {
        return this.name;
    }
    sendMessage(message: MessageType, messageSystem: MessageSystem): void {
        if (message instanceof TextMessage) {
            messageSystem.sendMessage(message.text);
        } else if (message instanceof VideoMessage) {
            messageSystem.sendMessage(message.video);
        } else {
            messageSystem.sendMessage(message.audio);
        }
    }
}
const newTextMessage = new TextMessage('Hello World');
const newVideoMessage = new TextMessage('video');
const newAudioMessage = new TextMessage('audio');
const messageSystem = new MessageSystem();
const userMessage = new UserOfMessageSystem('Igor');
userMessage.sendMessage(newTextMessage, messageSystem);
userMessage.sendMessage(newVideoMessage, messageSystem);
userMessage.sendMessage(newAudioMessage, messageSystem);
