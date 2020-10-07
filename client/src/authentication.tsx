class Auth {
  authenticated: boolean;

  constructor() {
    this.authenticated = false;
  }

  login(next: Function) {
    this.authenticated = true;
    next();
  }

  logout(next: Function) {
    this.authenticated = false;
    next();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
