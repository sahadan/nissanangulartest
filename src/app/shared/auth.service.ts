import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  /*
  //get UserName and Password ---1
  getUserNameByPassword(user: User): Observable<any> {

    // https://localhost:44340/api/login/Sanjay/san@123
    console.log(user.uName);        //userName
    console.log(user.uPassword);    // password
    return this.httpClient.get(environment.roleUrl + "/api/login/" + user.uName + "/" + user.uPassword);

  }
  */

  //get UserName and Password ---2
  public loginVerify(user: User){
    // calling webservice and passing username and password
    console.log(user);
    return this.httpClient.get(environment.roleUrl + "/api/login/" + user.uName + "/" + user.uPassword);
  }

  //logOut
  public logOut(){
    localStorage.removeItem("USERNAME");
    localStorage.removeItem("ACCESSROLE")
    sessionStorage.removeItem("USERNAME");
    sessionStorage.removeItem("JwtTOKEN");
  }

}
