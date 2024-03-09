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
