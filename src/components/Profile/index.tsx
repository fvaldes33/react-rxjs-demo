import React, { useEffect, useState } from 'react';
import userSubject from '../../subjects/UserSubject';
import { UserState } from '../../interfaces';

const Profile: React.FC = () => {
  const [user, setUser] = useState();

  useEffect(
    () => {
      const sub = userSubject.state$.subscribe((state: UserState) => {
        setUser(state.user);
      });

      return () => {
        sub.unsubscribe();
      }
    },
    []
  );

  return (
    <>
      <span>{user ? user.name : 'Guest'}</span>
    </>
  )
}

export default Profile;
