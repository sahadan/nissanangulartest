import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  //create a constructor
  constructor(private router: Router){}


  canActivate(
    next: ActivatedRouteSnapshot): boolean  {
    // check role: currentRole              Vs      expectedRole
    //              login - localStorage            app.routing.module
      const expectedRole = next.data.role;
      const currentRole = localStorage.getItem('ACCESSROLE');

      //check the condition
      if(currentRole !== expectedRole ){
        this.router.navigateByUrl('login');
        return false;
      }
    return true;
  }
  
}
