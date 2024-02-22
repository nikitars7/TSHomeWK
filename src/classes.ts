interface IShape {
    name: string;
}
interface IColor {
    color: string;
}
export enum Squares {
    Square = 'Square',
    Circle = 'Circle',
    Rectangle = 'Rectangle',
    Triangle = 'Triangle',
}
class SquareCalculate {
    calculateArea(squareCalc: Squares, ...args: [number] | [number, number]): number | undefined {
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
        }
    }
}
export class Circle extends SquareCalculate implements IShape, IColor {
    readonly name!: 'Circle';
    readonly color!: 'Red';
    radius;
    constructor(radius: number) {
        super();
        this.radius = radius;
    }
}
export class Rectangle extends SquareCalculate implements IShape, IColor {
    readonly name!: 'Rectangle';
    readonly color!: 'Blue';
    firstSide;
    secondSide;
    constructor(firstSide: number, secondSide: number) {
        super();
        this.firstSide = firstSide;
        this.secondSide = secondSide;
    }

    print(): void {
        console.log('a*b');
    }
}
export class Square extends SquareCalculate implements IShape, IColor {
    readonly name!: 'Square';
    readonly color!: 'Green';
    side;
    constructor(side: number) {
        super();
        this.side = side;
    }
    print(): void {
        console.log('a**2');
    }
}
export class Triangle extends SquareCalculate implements IShape, IColor {
    readonly name!: 'Triangle';
    readonly color!: 'Yellow';
    side;
    height;
    constructor(side: number, height: number) {
        super();
        this.side = side;
        this.height = height;
    }
}
