import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import { CartState, Product } from './interfaces';
// import userSubject from './subjects/UserSubject';
import cartSubject from './subjects/CartSubject';
import { items } from './mock';

const App: React.FC = () => {

  // const [users, setUsers] = useState<User[]>([]);
  const [cart, setCart] = useState<CartState>({
    items: [],
    total: 0.00
  });

  // useEffect(
  //   () => {
  //     const sub = userSubject.state$.subscribe(state => setUsers(state.users));

  //     return () => {
  //       sub.unsubscribe();
  //     }
  //   },
  //   []
  // );

  useEffect(
    () => {
      const sub = cartSubject.state$.subscribe(state => setCart(state));

      return () => {
        sub.unsubscribe();
      }
    },
    []
  );

  // const getMockUsers = async () => {
  //   const response = await fetch('https://randomuser.me/api/');
  //   const data = await response.json();
  //   const newUsers = data.results.map((item: any, index: number) => {
  //     return {
  //       id: index + 1,
  //       name: `${item.name.first} ${item.name.last}`,
  //       email: item.email,
  //       avatar: item.picture.small
  //     }
  //   });
  //   userSubject.patch({
  //     users: [...newUsers, ...users ]
  //   })
  // };

  const inCart = (product: Product): boolean => {
    const exist = cart.items.find(item => item.id === product.id);
    return exist ? true : false;
  }

  return (
    <div className="App">
      <Header />
      <div className="container mx-auto p-6">
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
