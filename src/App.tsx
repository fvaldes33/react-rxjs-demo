import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import { CartState, Product, User } from './interfaces';
import userSubject from './subjects/UserSubject';
import cartSubject from './subjects/CartSubject';
import { items } from './mock';
import { combineLatest } from 'rxjs';

const App: React.FC = () => {

  const [user, setUser] = useState<User|null>();
  const [cart, setCart] = useState<CartState>({
    items: [],
    total: 0.00
  });

  useEffect(
    () => {
      const sub = combineLatest(userSubject.state$, cartSubject.state$)
        .subscribe(([userState, cartState]) => {
          setUser(userState.user);
          setCart(cartState)
        });

      return () => {
        sub.unsubscribe();
      }
    },
    [setUser, setCart]
  )

  const inCart = (product: Product): boolean => {
    const exist = cart.items.find(item => item.id === product.id);
    return exist ? true : false;
  }

  return (
    <div className="App">
      <Header />
      <div className="container mx-auto p-6">
        {!user
          ?
          <button onClick={() => userSubject.login()} className="text-white bg-teal-600 rounded px-4 py-2">Login</button>
          :
          <button onClick={() => userSubject.logout()} className="text-white bg-teal-600 rounded px-4 py-2">Logout</button>
        }

        <div className="flex flex-wrap">
          {items.map((item: Product, index: number) => {
            return (
              <div className="w-4/12 p-6" key={index}>
                <div className="rounded overflow-hidden shadow flex-column">
                  <img className="h-40 w-full object-cover" src={item.image} alt={item.name} />
                  <div className="p-6 flex-column">
                    <p className="text-xl font-bold mb-2">{item.name}</p>
                    <p className="text-4xl font-bold mb-2">${item.price}</p>
                    {inCart(item)
                    ?
                      <button onClick={() => cartSubject.removeFromCart(item)} className="text-white bg-teal-600 rounded px-4 py-2">Remove from cart</button>
                    :
                      <button onClick={() => cartSubject.addToCart(item)} className="text-white bg-teal-600 rounded px-4 py-2">Add to cart</button>
                    }
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
