import faker from 'faker';
import { Product } from "../interfaces";

const itemCount: number[] = [...Array(20).keys() ];

export const items: Product[] = itemCount.map((i: number) => {
  return {
    id: i + 1,
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: `https://source.unsplash.com/random/${faker.random.number()}`
  }
});
