import { Ingredients, Pizza, PizzaBuilder, Shape, Size } from './builder';

describe('PizzaBuilder test suits', () => {
    let builder: PizzaBuilder;
    beforeEach(() => {
        builder = new PizzaBuilder();
    });
    it('should create an instance of PizzaBuilder', () => {
        expect(builder).toBeInstanceOf(PizzaBuilder);
    });
    it('should create a pizza', () => {
        expect(builder.getPizza()).toBeDefined();
    });
    it('should add dough to pizza', () => {
        builder.addDough(Size.LARGE, Shape.CIRCLE);
        expect(builder.getPizza().size === Size.LARGE);
        expect(builder.getPizza().shape === Shape.CIRCLE);
    });
    it('should add toppings to the pizza', () => {
        const ingredients = [Ingredients.Cheese, Ingredients.Chicken, Ingredients.PineApple];
        builder.addIngredients(ingredients);
        expect(builder.getPizza().getToppings()).toEqual(ingredients);
        expect(builder.getPizza().getToppings()).toHaveLength(3);
    });
    it('should return an Instance of Pizza', () => {
        expect(builder.buildPizza()).toBeInstanceOf(Pizza);
    });
});
