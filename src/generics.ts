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

type UnionVariant = (NewMagazine | Book)[];

export class NewShelf2 {
    private items: UnionVariant = [];
    add(item: NewMagazine | Book): void {
        if (item) {
            this.items.push(item);
        }
    }
    getFirst() {
        return this.items[0];
    }
    printTitle(): void {
        this.items.forEach(obj => console.log(obj.title));
    }
    find(id: number): NewMagazine | Book;
    find(author: string): NewMagazine | Book;
    find(searchItem: number | string): NewMagazine | Book | undefined {
        if (typeof searchItem === 'number') {
            return this.items.find(item => ('id' in item ? item.id === searchItem : undefined));
        } else {
            return this.items.find(item => ('author' in item ? item.author === searchItem : undefined));
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

interface TField {
    id: number;
    title: string;
    author: string;
}
export class ShelfGen<T extends TField> {
    private items: T[] = [];
    add(item: T): void {
        if (item) {
            this.items.push(item);
        }
    }
    getFirst(): T {
        return this.items[0];
    }
    printTitles(): void {
        this.items.forEach((obj: T) => console.log(obj.title));
    }
    find(id: number): T | undefined;
    find(author: string): T | undefined;
    find(searchItem: number | string): T | undefined {
        if (typeof searchItem === 'number') {
            return this.items.find(item => item.id === searchItem);
        } else {
            return this.items.find(item => item.author === searchItem);
        }
    }
}
