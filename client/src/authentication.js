class Auth {
  constructor() {
    this.authenticated = false;
  }

  login(next) {
    this.authenticated = true;
    next();
  }

  logout(next) {
    this.authenticated = false;
    next();
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
