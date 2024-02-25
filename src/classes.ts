interface IPrint {
    print(): void;
}
export enum Squares {
    Square = 'Square',
    Circle = 'Circle',
    Rectangle = 'Rectangle',
    Triangle = 'Triangle',
}

export class SquareCalculate {
    private constructor() {}
    static calculateArea(squareCalc: Squares, side: number): number;
    static calculateArea(squareCalc: Squares, side: number, height: number): number;
    static calculateArea(squareCalc: Squares, ...args: [number] | [number, number]): number {
        if (squareCalc === Squares.Circle && args.length === 1) {
            const [radius] = args;
            return Math.PI * Math.pow(radius, 2);
        } else if (squareCalc === Squares.Square && args.length === 1) {
            const [side] = args;
            return Math.pow(side, 2);
        } else if (squareCalc === Squares.Rectangle && args.length === 2) {
            const [arg1, arg2] = args;
            return arg1 * arg2;
        } else if (squareCalc === Squares.Triangle && args.length === 2) {
            const [side, height] = args;
            return (side * height) / 2;
        } else {
            throw new Error('Can not calculate due to something');
        }
    }
}
export class Circle {
    constructor(public radius: number, readonly name: string, readonly color: string) {}
}
export class Rectangle implements IPrint {
    constructor(public firstSide: number, public secondSide: number, readonly name: string, readonly color: string) {}
    print(): void {
        console.log('a*b');
    }
}
export class Square implements IPrint {
    constructor(public side: number, readonly name: string, readonly color: string) {}
    print(): void {
        console.log('a**2');
    }
}
export class Triangle {
    constructor(public side: number, public height: number, readonly name: string, readonly color: string) {}
}
