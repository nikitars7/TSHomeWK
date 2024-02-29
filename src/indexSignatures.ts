// 1.

interface ISignature {
    [key: string]: number | string;
}

// 2.

interface IFunction {
    [key: string]: (...args: any[]) => void;
}
const objFunc: IFunction = {
    greetings: (arg1, arg2) => console.log(`Hello + ${arg1} + ${arg2}`),
};

// 3.
interface LikeArray {
    [index: number]: string | number | boolean;
}
const objArray: LikeArray = {
    0: 'First',
    1: 'Second',
};
// 4.
interface IDynamic {
    name: string;
    [key: number]: string;
    [key: string]: string;
    [key: symbol]: string;
}
// 5.

interface IAnimal {
    [key: string]: string;
    [key: number]: string;
}
interface IAnimal2 extends IAnimal {
    name: string;
    breed: string;
}
const animal: IAnimal2 = {
    name: 'Bird',
    breed: 'unknown',
    home: '',
};

// 6.
interface ICheck {
    [key: string]: string | number;
    [key: number]: string;
}
export const checkObj: ICheck = {
    name: 'Cat',
    age: 3,
    breed: 'Unknown',
};
export const checkSignature = (obj: ICheck) => {
    const result = [];
    for (let key in obj) {
        if (typeof obj[key] === 'number') {
            result.push(true);
        } else {
            result.push(false);
        }
    }
    return result;
};
