export const purge = <T>(array: T[]): T[] => {
    return array.slice(2);
};

export enum Category {
    Software = 'Software',
}
interface IInventory {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
}
const inventory = [
    { id: 10, title: 'The C Programming Language', author: 'K & R', available: true, category: Category.Software },

    { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },

    { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },

    { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software },
];

console.log(purge<IInventory>(inventory));
console.log(purge<number>([1, 2, 3, 4, 5]));

const purgeNumbers = purge<number>;
console.log(purgeNumbers([1, 2, 3, 4]));
console.log(purgeNumbers(['1', '2', '3', '4'] as unknown as number[]));

export class Shelf<T> {
    private items: T[] = [];
    add(item: T): void {
        if (item) {
            this.items.push(item);
        }
    }
    getFirst(): T {
        return this.items[0];
    }
}
const bookShelf: Shelf<IInventory> = new Shelf();
inventory.forEach(book => bookShelf.add(book));
console.log(bookShelf.getFirst());

interface Magazine {
    title: string;
    publisher: string;
}

const magazines = [
    { title: 'Programming Language Monthly', publisher: 'Code Mags' },

    { title: 'Literary Fiction Quarterly', publisher: 'College Press' },

    { title: 'Five Points', publisher: 'GSU' },
];

const magazineShelf: Shelf<Magazine> = new Shelf();

magazines.forEach(magazine => magazineShelf.add(magazine));
console.log(magazineShelf.getFirst());

interface CallbackFn<T> {
    (err: Error | null, data: T | null): void;
}
export const data2: any[] = [];
export async function fetchData<T>(url: string, callback: CallbackFn<T>): Promise<void> {
    try {
        const data = await fetch(url);
        callback(null, await data.json());
    } catch (err: any) {
        callback(err, null);
        console.log(err);
    }
}
export function callback<T>(err: Error | null, data: T[] | null): void {
    if (err) {
        throw new Error('Error occured');
    } else if (data !== null) {
        data.map(item => data2.push(item));
    }
}

fetchData('https://jsonplaceholder.typicode.com/users', callback<any>);

console.log(data2);

// new variant of shelf

export type NewMagazine = {
    title: string;
    publisher: string;
};
export type Book = {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
};
// bad example (DRY)
// export class NewShelf {
//     private magazines: NewMagazine[] = [];
//     private books: Book[] = [];
//     addBook(item: Book): void {
//         if (item) {
//             this.books.push(item);
//         }
//     }
//     addMagazine(item: NewMagazine): void {
//         if (item) {
//             this.magazines.push(item);
//         }
//     }
//     getFirstBook() {
//         return this.books[0];
//     }
//     getFirstMagazine() {
//         return this.magazines[0];
//     }
//     printTitleBooks(): void {
//         const objTitles = this.books.map(obj => obj.title);
//         console.log(objTitles);
//     }
//     printTitleMagazines(): void {
//         const objTitles = this.magazines.map(obj => obj.title);
//         console.log(objTitles);
//     }
//     find(id: number): Book;
//     find(author: string): Book;
//     find(...args: [number] | [string]): Book | undefined {
//         const [arg] = args;
//         if (typeof arg === 'number') {
//             return this.books.find(item => item.id === arg);
//         } else {
//             return this.books.find(item => item.author === arg);
//         }
//     }
// }

type UnionVariant = NewMagazine | Book;

export class NewShelf2 {
    private items: UnionVariant[] = [];
    add(item: UnionVariant): void {
        if (item) {
            this.items.push(item);
        }
    }
    getFirst() {
        return this.items[0];
    }
    printTitle(): void {
        const objTitles = this.items.map(obj => obj.title);
        console.log(objTitles);
    }
    find(id: number): UnionVariant;
    find(author: string): UnionVariant;
    find(...args: [number] | [string]): UnionVariant | undefined {
        const [arg] = args;
        if (typeof arg === 'number') {
            return this.items.find(item => ('id' in item ? item.id === arg : undefined));
        } else {
            return this.items.find(item => ('author' in item ? item.author === arg : undefined));
        }
    }
}

const newMagazine = new NewShelf2();

newMagazine.add({ title: 'Hello', publisher: 'Nikita' });
newMagazine.add({ title: 'Hello', id: 1, author: 'Nikita', available: true, category: Category.Software });
console.log(newMagazine.getFirst());
newMagazine.printTitle();
console.log(newMagazine.find(1));
console.log(newMagazine.find('Nikita'));

// трохи погрався з construstor overload
export class NewShelf3 {
    private items: UnionVariant[] = [];
    title!: string;
    publisher!: string;
    author!: string;
    id!: number;
    available!: boolean;
    category!: Category;
    constructor(title: string, publisher: string);
    constructor(title: string, id: number, author: string, available: boolean, category: Category);
    constructor(...options: [string, string] | [string, number, string, boolean, Category]) {
        if (options.length === 2) {
            const [title, publisher] = options;
            this.title = title;
            this.publisher = publisher;
        } else {
            const [title, id, author, available, category] = options;
            this.title = title;
            this.author = author;
            this.id = id;
            this.available = available;
            this.category = category;
        }
    }
    add(item: UnionVariant): void {
        if (item) {
            this.items.push(item);
        }
    }
    getFirst() {
        return this.items[0];
    }
    printTitle(): void {
        const objTitles = this.items.map(obj => obj.title);
        console.log(objTitles);
    }
    find(id: number): UnionVariant;
    find(author: string): UnionVariant;
    find(...args: [number] | [string]): UnionVariant | undefined {
        const [arg] = args;
        if (typeof arg === 'number') {
            return this.items.find(item => ('id' in item ? item.id === arg : undefined));
        } else {
            return this.items.find(item => ('author' in item ? item.author === arg : undefined));
        }
    }
}
const newShelf2 = new NewShelf3('Hello', 'Nikita');

newShelf2.add({ title: newShelf2.title, publisher: newShelf2.publisher });
newShelf2.add({
    title: 'U dont know JS',
    id: 22,
    author: 'Kyle Simpson',
    available: true,
    category: Category.Software,
});
console.log(newShelf2.getFirst());
newShelf2.printTitle();
console.log(newShelf2.find(22));
console.log(newShelf2.find('Kyle Simpson'));
