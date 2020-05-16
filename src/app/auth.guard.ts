import { UserServiceService } from './shared/user-service.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private userService : UserServiceService , private router: Router){

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
  console.log('INSID CANACTIVATE')
    if(!this.userService.isLogedIn()){
      this.router.navigateByUrl('/login');
      this.userService.deleteToken();
      return false;
    }
    return true;
  } 
}
