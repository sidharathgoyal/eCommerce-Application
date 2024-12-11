import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles:[]){
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public setToken(jwtToken:string){
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string | null{
    return localStorage.getItem('jwtToken');
  }

  public clear(){
    localStorage.clear();
  }

  // public isLoggedIn(){
  //   if(typeof localStorage !== 'undefined') {
  //     return this.getRoles() && this.getToken();
  //   }
  //   else{
  //     return null;
  //   }
  // }

  getRoles(): string[] {
    if (typeof localStorage !== 'undefined') {
      const roles = localStorage.getItem('roles');
      return roles ? JSON.parse(roles) : [];
    }
    return [];
  }  

  public isLoggedIn(): boolean {
    if (typeof localStorage !== 'undefined') {
      return !!localStorage.getItem('jwtToken') && this.getRoles().length > 0;
    }
    return false;
  }
  
}
