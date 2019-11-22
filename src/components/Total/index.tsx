import React, { useEffect, useState } from 'react';
import cartSubject from '../../subjects/CartSubject';
import { CartState } from '../../interfaces';

const Total: React.FC = () => {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(
    () => {
      const sub = cartSubject.state$.subscribe((cart: CartState) => {
        setCount(cart.items.length);
        setTotal(cartSubject.total);
      })

      return () => {
        sub.unsubscribe();
      }
    },
    []
  );

  return (
    <>
      <span>Items: {count} | Total: ${total}</span>
    </>
  )
}

export default Total;
