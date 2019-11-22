import React, { useEffect, useState } from 'react';
import cartSubject from '../../subjects/CartSubject';

const Header: React.FC = () => {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(
    () => {
      const sub = cartSubject.state$.subscribe(state => {
        setCount(state.items.length);
        setTotal(cartSubject.total);
      });

      return () => {
        sub.unsubscribe();
      }
    },
    []
  );

  return (
    <header>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <svg className="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
          <span className="font-semibold text-xl tracking-tight">React / RxJs Demo</span>
        </div>
        <div className="lg:flex lg:items-center lg:w-auto text-white">
          <span>Items: {count} | Total: ${total}</span>
        </div>
      </nav>
    </header>
  )
}

export default Header;
