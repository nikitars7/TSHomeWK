import { sum } from './sum';

test('add 1 + 2 equal 3', () => {
    const values: [number, number] = [1, 2];
    expect(sum(...values)).toBe(3);
});
