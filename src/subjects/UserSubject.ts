import { BaseSubject } from './BaseSubject';
import { UserState } from '../interfaces';

export class UserSubject extends BaseSubject<UserState> {
  constructor() {
    super({
      loading: true,
      users: [],
    })
  }
}

export default new UserSubject();
