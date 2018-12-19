import Avatar from './Avatar';

import Repository from '../infrastructure/Repository';

const repository = new Repository();

class User {
  constructor() {
    this.name = '';
  }

  validName = () => {
    return (
      typeof this.name === 'string' &&
      this.name.length !== 0 && 
      this.name.length <= 40
    );
  }

  validGender = () => {
    return ['m', 'f'].some(param => {
      return this.gender === param;
    });
  }

  save = (callback) => {
    repository.save(this, callback);
  }

  static load = (success, fail) => {
    repository.load(
      json => {
        let user = new User();
        user.name = json.name;
        success(user);
      },
      fail
    );
  }

  toString() {
    return `${this.name}`;
  }
}

export default User;