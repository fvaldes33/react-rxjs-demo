import { BaseSubject } from './BaseSubject';
import { CartState, Product } from '../interfaces';

export class CartSubject extends BaseSubject<CartState> {
  constructor() {
    super({
      items: [],
      total: 0.00
    })
  }

  get total() {
    return this.state.items.reduce((total: number, item: Product) => {
      return total + +item.price;
    }, 0);
  }
}

export default new CartSubject();
