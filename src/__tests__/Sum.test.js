import { Sum } from "../components/Sum";

test("Sum of two numbers should be" , () => {
    const result = Sum(3,4);
    expect(result).toBe(7);
});