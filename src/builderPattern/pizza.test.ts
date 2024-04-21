import { Ingredients, Pizza, Sauses, Shape, Size } from './builder';

describe('Pizza class test suits', () => {
    let pizza: Pizza;
    beforeEach(() => {
        pizza = new Pizza();
    });
    it('should create an instance of Pizza', () => {
        expect(pizza).toBeInstanceOf(Pizza);
    });
    it('should get all fields with undefined', () => {
        expect(pizza.size).toBe(undefined);
        expect(pizza.shape).toBe(undefined);
        expect(pizza.sause).toBe(undefined);
        expect(pizza.getToppings()).toEqual([]);
    });
    it('should set and get all the fields', () => {
        pizza.setSize(Size.LARGE);
        pizza.setShape(Shape.SQUARE);
        pizza.setSause(Sauses.TomatoSause);
        pizza.addIngredient(Ingredients.Chicken);

        expect(pizza.size).toBe(Size.LARGE);
        expect(pizza.shape).toBe(Shape.SQUARE);
        expect(pizza.sause).toBe(Sauses.TomatoSause);
        expect(pizza.getToppings()).toEqual([Ingredients.Chicken]);
        expect(pizza.getToppings()).toHaveLength(1);
    });
    it('should return a string', () => {
        expect(pizza.toString()).toBe(
            `Pizza has a ${pizza.shape} shape , size ${pizza.size}, with ${pizza.sause} sause and ingredients: ${pizza
                .getToppings()
                .join(',')}`,
        );
        expect(pizza.toString()).toMatchSnapshot();
    });
});
