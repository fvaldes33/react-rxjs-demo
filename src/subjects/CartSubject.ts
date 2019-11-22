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

  addToCart(product: Product) {
    this.patch({
      items: [...this.state.items, ...[product]]
    })
  }

  removeFromCart(product: Product) {
    const { items } = this.state;
    const index = items.findIndex(item => item.id === product.id);
    items.splice(index, 1);

    this.patch({
      items: [...items]
    })
  };
}

export default new CartSubject();
