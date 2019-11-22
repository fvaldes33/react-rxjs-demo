import { BaseSubject } from './BaseSubject';
import { UserState } from '../interfaces';

export class UserSubject extends BaseSubject<UserState> {
  constructor() {
    super({
      loading: true,
      user: null,
    })
  }

  async login() {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    const user = data.results.map((item: any, index: number) => {
      return {
        id: index + 1,
        name: `${item.name.first} ${item.name.last}`,
        email: item.email,
        avatar: item.picture.small
      }
    }).shift()
    this.patch({
      user
    })
  };

  logout() {
    this.patch({
      user: null
    });
  }
}

export default new UserSubject();
