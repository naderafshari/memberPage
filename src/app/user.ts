/*export interface Roles {
    reader?: boolean;
    author?: boolean;
    admin?:  boolean;
  }*/
  export class User {
    email:    string;
    photoURL: string;
    roles:    string;
    constructor(authData) {
      this.email    = authData.email
      this.photoURL = authData.photoURL
      this.roles    = 'author'
    }
  }