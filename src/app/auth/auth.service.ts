import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AuthResponseData{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  private token = "AIzaSyB0jiyMwMhbAds03lRZEUTTn6ELaSPwrRI";

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0jiyMwMhbAds03lRZEUTTn6ELaSPwrRI",
      {
        email: email, 
        password: password,
        returnSecureToken: true
      }
    );

  }

}
