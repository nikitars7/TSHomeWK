/* eslint no-underscore-dangle: 0 */
/*
Реалізуйте побудову складного об'єкту "Піца", яка має декілька розмірів, форм, видів начинок.

Результатом повинен бути об'єкт, метод якого toString() поверне опис "Піци"
*/
export enum Size {
    SMALL = '22cm',
    LARGE = '35cm',
}
export enum Shape {
    SQUARE = 'square',
    CIRCLE = 'circle',
}
export enum Sauses {
    TomatoSause = 'TomatoSause',
    WhitSause = 'WhiteSause',
}

export enum Ingredients {
    Chicken = 'Chicken',
    Tomato = 'Tomato',
    Cheese = 'Cheese',
    PineApple = 'PineApple',
    Cucumber = 'Cucumber',
    Sausage = 'Sausage',
    Salmon = 'Salmon',
    Mushrooms = 'Mushrooms',
}
interface IPizzaBuilder {
    addDough(size: Size, shape: Shape): PizzaBuilder;
    addSauce(sause: Sauses): PizzaBuilder;
    addIngredients(ingredients: Ingredients[]): PizzaBuilder;
    getNewOne(): void;
    buildPizza(): Pizza;
}

class Pizza {
    private _shape!: Shape;
    private _size!: Size;
    private _sause!: Sauses;
    private _ingredients: Ingredients[] = [];
    setShape(shape: Shape): Pizza {
        this._shape = shape;
        return this;
    }
    setSize(size: Size): Pizza {
        this._size = size;
        return this;
    }
    setSause(sause: Sauses): Pizza {
        this._sause = sause;
        return this;
    }
    addIngredient(ingredient: Ingredients): Pizza {
        this._ingredients.push(ingredient);
        return this;
    }
    toString(): string {
        return `Pizza has a ${this._shape} shape , size ${this._size}, with ${
            this._sause
        } sause and ingredients: ${this._ingredients.join(',')}`;
    }
}

class PizzaBuilder implements IPizzaBuilder {
    private pizza!: Pizza;

    constructor() {
        this.getNewOne();
    }
    getNewOne(): void {
        this.pizza = new Pizza();
    }
    addDough(size: Size, shape: Shape): PizzaBuilder {
        this.pizza.setShape(shape);
        this.pizza.setSize(size);
        return this;
    }
    addSauce(sause: Sauses): PizzaBuilder {
        this.pizza.setSause(sause);
        return this;
    }
    addIngredients(ingredients: Ingredients[]): PizzaBuilder {
        for (let ingredient of ingredients) {
            this.pizza.addIngredient(ingredient);
        }
        return this;
    }
    buildPizza(): Pizza {
        const cookedPizza = this.pizza;
        this.getNewOne();
        return cookedPizza;
    }
}

interface IManager {
    createChickenPizza(size: Size, shape: Shape): Pizza;
    createTropicPizza(size: Size, shape: Shape): Pizza;
    createPepperoniPizza(size: Size, shape: Shape): Pizza;
}

export enum PizzaType {
    Chicken = 'Chicken',
    Pepperoni = 'Pepperoni',
    Tropic = 'Tropic',
}

export class Manager implements IManager {
    private builder: PizzaBuilder;
    constructor() {
        this.builder = new PizzaBuilder();
    }
    createChickenPizza(size: Size, shape: Shape): Pizza {
        const ingredients = [Ingredients.Chicken, Ingredients.Tomato, Ingredients.Cheese];
        return this.builder.addDough(size, shape).addSauce(Sauses.TomatoSause).addIngredients(ingredients).buildPizza();
    }
    createTropicPizza(size: Size, shape: Shape): Pizza {
        const ingredients = [Ingredients.Cucumber, Ingredients.PineApple, Ingredients.Cheese];
        return this.builder.addDough(size, shape).addSauce(Sauses.WhitSause).addIngredients(ingredients).buildPizza();
    }
    createPepperoniPizza(size: Size, shape: Shape): Pizza {
        const ingredients = [Ingredients.Sausage, Ingredients.Tomato, Ingredients.Mushrooms, Ingredients.Cheese];
        return this.builder.addDough(size, shape).addSauce(Sauses.TomatoSause).addIngredients(ingredients).buildPizza();
    }
    createCustomPizza(size: Size, shape: Shape, sause: Sauses, ...ingredients: Ingredients[]): Pizza {
        return this.builder.addDough(size, shape).addSauce(sause).addIngredients(ingredients).buildPizza();
    }
}

export const buildCustomPizza = (size: Size, shape: Shape, sause: Sauses, ...ingredients: Ingredients[]): Pizza => {
    const manager = new Manager();
    return manager.createCustomPizza(size, shape, sause, ...ingredients);
};
export const buildPizza = (size: Size, shape: Shape, pizzaType: PizzaType): Pizza => {
    const manager = new Manager();
    if (pizzaType === PizzaType.Chicken) {
        return manager.createChickenPizza(size, shape);
    } else if (pizzaType === PizzaType.Pepperoni) {
        return manager.createPepperoniPizza(size, shape);
    } else {
        return manager.createTropicPizza(size, shape);
    }
};

const pizza = buildCustomPizza(Size.LARGE, Shape.SQUARE, Sauses.WhitSause, Ingredients.Cheese, Ingredients.Chicken);
console.log(pizza.toString());
const chickenPizza = buildPizza(Size.SMALL, Shape.CIRCLE, PizzaType.Chicken);
console.log(chickenPizza.toString());
const pepperoniPizza = buildPizza(Size.LARGE, Shape.SQUARE, PizzaType.Pepperoni);
console.log(pepperoniPizza.toString());
