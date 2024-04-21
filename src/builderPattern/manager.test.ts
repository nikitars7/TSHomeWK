import { Manager, PizzaBuilder, Pizza, Size, Shape } from './builder';

describe('Manager test suits', () => {
    let manager: Manager;
    let builder: PizzaBuilder;
    beforeEach(() => {
        builder = new PizzaBuilder();
        manager = new Manager(builder);
    });
    it('should create an instance of Manager', () => {
        expect(manager).toBeInstanceOf(Manager);
    });
    it('should replace builder methods and call', () => {
        const dough = jest.spyOn(builder, 'addDough');
        const sause = jest.spyOn(builder, 'addSauce');
        const toppings = jest.spyOn(builder, 'addIngredients');
        const pizza = jest.spyOn(builder, 'buildPizza');

        let result = manager.createChickenPizza(Size.LARGE, Shape.CIRCLE);

        expect(result).toBeInstanceOf(Pizza);

        expect(dough).toHaveBeenCalled();
        expect(sause).toHaveBeenCalled();
        expect(toppings).toHaveBeenCalled();
        expect(pizza).toHaveBeenCalled();
    });
});
