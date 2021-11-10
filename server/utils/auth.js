import decode from 'jwt-decode';

class AuthService {
  //user profile
  getProfile() {
    return decode(this.getToken());
  }

  //logged in / signed up
  loggedIn() {
    
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); 
  }

//checks to see if token is expired
isTokenExpired(token) {
  try {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      return true;
    } else return false;
  } catch (err) {
    return false;
  }
}

//gets token
getToken() {
  return localStorage.getItem('id_token');
}

//login for user
login(idToken) {
  localStorage.setItem('id_token', idToken);
  window.location.assign('/');
}

logout() {
  localStorage.removeItem('id_token');
  window.location.assign('/');
}
  
}

export default new AuthService();