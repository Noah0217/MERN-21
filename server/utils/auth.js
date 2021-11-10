import decode from 'jwt-decode';

class AuthService {
  // user profile
  getProfile() {
    return decode(this.getToken());
  }

  // logged in / signed up
  loggedIn() {
    
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); 
  }

  
}

export default new AuthService();